<template>
  <q-page>
    <q-card-section class="row q-gutter-sm q-pt-md q-ml-sm items-center">
      <div class="text-h6 q-mt-xs q-ml-md">Feedback Review</div>
      <q-space></q-space>
      <q-select
        dense
        filled
        label="Cabang"
        v-model="branch"
        name="Cabang"
        use-input
        input-debounce="0"
        :options="branchOptions"
        behavior="menu"
        class="col-2"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey"> No results </q-item-section>
          </q-item>
        </template>
      </q-select>
      <q-select
        dense
        filled
        label="Division"
        v-model="divisi"
        name="Division"
        use-input
        input-debounce="0"
        :options="divisiOptions"
        behavior="menu"
        class="col-2"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey"> No results </q-item-section>
          </q-item>
        </template>
      </q-select>

      <q-select
        dense
        filled
        label="Person"
        v-model="person"
        name="Person"
        use-input
        input-debounce="0"
        :options="personOptions"
        behavior="menu"
        class="col-2"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey"> No results </q-item-section>
          </q-item>
        </template>
      </q-select>

      <q-input
        filled
        label="From"
        dense
        v-model="deposit.start"
        class=""
        style="width: 155px"
      >
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-date v-model="deposit.start" mask="YYYY-MM-DD HH:mm">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>

      <q-input
        filled
        label="To"
        dense
        v-model="deposit.due"
        class=""
        style="width: 155px"
      >
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-date v-model="deposit.due" mask="YYYY-MM-DD HH:mm">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </q-card-section>
    <Card></Card>
    <div>
      <div class="text-h6 q-pl-md q-ma-md">PERFORMANCE MONITORING</div>
      <div class="row q-col-gutter-sm q-mt-xs">
        <apex-half-donut></apex-half-donut>
        <apex-column-charts-basic></apex-column-charts-basic>
      </div>
    </div>
  </q-page>
</template>

<script>
import { eventBus } from "../../event-bus.js";
import Cookies from "js-cookie";
import Vue from "vue";
import { exportFile } from "quasar";
import CardBase from "components/CardBase";
import { ref } from "vue";

export default {
  name: "Dashboard",
  components: {
    Card: () => import("components/Card"),
    ApexHalfDonut: () => import("components/ApexHalfDonut"),
    ApexColumnChartsBasic: () => import("components/ApexColumnChartsBasic"),
  },
  data() {
    return {
      username: sessionStorage.getItem("username")
        ? sessionStorage.getItem("username")
        : Cookies.get("username"),
      title: sessionStorage.getItem("title")
        ? sessionStorage.getItem("title")
        : Cookies.get("title"),
      divisionId: sessionStorage.getItem("division_id")
        ? sessionStorage.getItem("division_id")
        : Cookies.get("division_id"),
      branchId: sessionStorage.getItem("branch_id")
        ? sessionStorage.getItem("branch_id")
        : Cookies.get("branch_id"),
      TotalOpen: "0",
      TotalInProgress: "0",
      TotalOverdue: "0",
      TotalCompleted: "0",
      TotalTotal: "0",
      filter: "",
      mode: "list",
      search: "",
      deposit: {
        start: "",
        due: "",
      },
    };
  },
  setup() {
    return {
      branch: ref(),
      divisi: ref(),
      person: ref(),
      divisi1: [],
      token: ref(
        sessionStorage.getItem("token")
          ? sessionStorage.getItem("token")
          : Cookies.get("token")
      ),
      onItemClick() {},
    };
  },

  watch: {
    "deposit.start": {
      handler(value) {
        this.deposit.start = value != "" ? value : "";
        this.fetchData();
      },
      // deep: true,
    },

    "deposit.due": {
      handler(value) {
        this.deposit.due = value != "" ? value : "";
        this.fetchData();
      },
    },

    divisi: {
      handler(value) {
        // console.log("WAKWAW");
        // console.log("UWAW: ", value.label);
        this.fetchPersonData();
      },
    },

    person: {
      handler(value) {
        // console.log("OWIGH");
        // console.log("LASOA: ", value.label);
        eventBus.$emit("person-selected", this.person);
      },
    },

    branch: {
      handler(value) {
        // console.log("UWEY");
        // console.log("OOOOP: ", value.label);
        this.fetchDivisionData();
      },
    },
  },

  mounted() {
    this.fetchBranchData();
    this.fetchDivisionData();
    this.fetchPersonData();
    this.fetchData();
    this.intervalId = setInterval(() => {
      this.fetchData();
    }, 60000);
  },

  beforeDestroy() {
    clearInterval(this.intervalId);
  },
  methods: {
    async fetchData() {
      const response = await this.$axios.get("/task/all", {
        params: { startDate: this.deposit.start, dueDate: this.deposit.due },
        headers: {
          title: this.title.toLowerCase(),
          branch: this.branchId,
          division: this.divisi.value,
          Authorization: `Bearer ${this.token}`,
        },
      });

      // console.log("walawe: ", this.divisi.value);
      let tasks;
      const role = this.title.toLowerCase();
      if (role === "director" || role === "direktur") {
        tasks = response.data.filter(
          (task) =>
            task.pic_title !== "director" &&
            task.pic_title !== "direktur" &&
            task.pic_title !== "admin"
        );
      } else if (this.title.toLowerCase() === "manager") {
        tasks = response.data.filter(
          (task) =>
            task.pic_title !== "director" ||
            ("direktur" && task.pic_title !== "admin" && task.pic_title !== "manager")
        );
      } else if (this.title.toLowerCase() === "supervisor") {
        tasks = response.data.filter((task) => task.pic_title === "operator");
      } else if (this.title.toLowerCase() === "operator") {
        tasks = response.data.filter((task) => task.u_name === this.username);
      }
      this.TotalOpen = tasks.filter((task) => task.status === "Open").length;
      this.TotalCompleted = tasks.filter((task) => task.status === "Close").length;
      this.TotalInProgress = tasks.filter((task) => task.status === "In-progress").length;
      this.TotalOverdue = tasks.filter((task) => task.status === "Idle").length;
      this.TotalTotal = tasks.length;

      // console.log("NGGAH", this.TotalTotal);
    },

    async fetchDivisionData() {
      try {
        const divisionId = parseInt(this.divisionId)

        const { status, data } = await this.$axios.get("/divisi", {
          headers: {
            branch: this.branch.value,
            Authorization: `Bearer ${this.token}`,
          },
        });

        if (status !== 200) {
          throw Error("Error while fetching");
        }

        const filteredData = data.data.filter(
          (divisi) =>
            divisi.id === divisionId
        );

        const listOfDivisi = filteredData.map((data) => ({
          label: data.d_name,
          value: data.id,
        }));

        this.divisiOptions = listOfDivisi;
        this.divisi = this.divisiOptions[0];

        const divisi = this.divisiOptions.d_name;
        // console.log("Selected Divisi:", divisi);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },

    async fetchPersonData() {
      try {
        const id = parseInt(sessionStorage.getItem("id") || Cookies.get("id"), 10);
        const { status, data } = await this.$axios.get("/user/division", {
          params: {
            division: this.divisi.value,
            branch: this.branch,
          },
          headers: {
            branch: this.branchId,
            division: this.divisionId,
            Authorization: `Bearer ${this.token}`,
          },
        });

        if (status !== 200) {
          throw Error("Error while fetching");
        }


        const filteredData = data.filter(
          (user) =>
            user.u_id === id
        );

        const listOfPerson = filteredData.map((data) => ({
          label: data.u_name,
          value: data.u_id,
          title: data.title,
        }));

        this.personOptions = listOfPerson;
        this.person = this.personOptions[0];

        const person = this.personOptions.length > 0 ? this.personOptions[0] : null;
        // console.log("Selected Person:", person);
        eventBus.$emit("person-selected", this.person);
        this.fetchData(person);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },

    async fetchBranchData() {
      try {
        const branchId = parseInt(this.branchId)
        const { status, data } = await this.$axios.get("/branch", {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });

        if (status !== 200) {
          throw Error("Error while fetching");
        }

        const filteredBranch = data.data.filter(
          (branch) =>
            branch.id === branchId
        );

        const listOfBranch = filteredBranch.map((data) => ({
          label: data.b_name,
          value: data.id,
        }));

        this.branchOptions = listOfBranch;
        this.branch = this.branchOptions[0];

        const branch = this.branchOptions.d_name;
        // console.log("Selected Branch:", branch);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },

    redirectToTaskMonitoring(statusFilter) {
      if (this.title.toLowerCase() === "operator") {
        this.$router.push({
          path: `/${this.title.toLowerCase()}/task_list`,
          query: { status: statusFilter },
        });
      } else if (this.title.toLowerCase() === "direktur") {
        this.$router.push({
          path: "/director/task_monitoring",
          query: { status: statusFilter },
        });
      } else {
        this.$router.push({
          path: `/${this.title.toLowerCase()}/task_monitoring`,
          query: { status: statusFilter },
        });
      }
    },
  },
};
</script>

<style scoped>
.card-icon {
  border-radius: 6px;
}

.my-card {
  width: 175px;
}

.title-card {
  border-radius: 20px;
}

.under-title {
  border-radius: 8px;
}

.bintang {
  border-radius: 18px;
}
</style>
