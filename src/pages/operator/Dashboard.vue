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
import axios from "axios";

export default {
  name: "DashboardManager",
  components: {
    Card: () => import("components/Card"),
    ApexHalfDonut: () => import("components/ApexHalfDonut"),
    ApexColumnChartsBasic: () => import("components/ApexColumnChartsBasic"),
  },
  data() {
    return {
      id: sessionStorage.getItem("id")
        ? sessionStorage.getItem("id")
        : Cookies.get("id"),
      email: sessionStorage.getItem("email")
        ? sessionStorage.getItem("email")
        : Cookies.get("email"),
      password: sessionStorage.getItem("password")
        ? sessionStorage.getItem("password")
        : Cookies.get("password"),
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
      roles: [],
      // branches: [],
    };
  },

  setup() {
    return {
      // role: ref(),
      branch: ref(),
      divisi: ref(),
      person: ref(),
      personOptions: [],
      divisiOptions: [],
      branchOptions: [],
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
        sessionStorage.setItem("divisi1", this.divisi.label);
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
        this.changeCompany();
        this.fetchDivisionData();
        // this.fetchPersonData();
      },
    },
  },

  mounted() {
    // this.getRole();
    this.fetchBranchData();
    this.fetchDivisionData();
    this.fetchPersonData();
    this.checker();
    this.notifChecker();
    // this.fetchData();
  },

  beforeDestroy() {
    clearInterval(this.intervalId);
  },

  methods: {
    async checker() {
      try {
        const response = await this.$axios.get("/task/checker");
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },

    async notifChecker() {
      console.log("🚀 ~ checker ~ id:", this.id)

      try{
        const response = await this.$axios.get(`/task/late-notification/${this.id}`);

        const lateTask = response.data.length

          if (lateTask > 0) {
            this.$q.notify({
              color: "negative",
              message: `You Have ${lateTask} Overdue Task` ,
            });
        }

      } catch (err) {
        console.error(err);
        throw err;
      }
    },

    async changeCompany() {
      const data = {
        u_email: this.email,
        u_password: this.password,
        uc_company_id: this.branch.value,
      };

      const loginUrl = "https://office.onic.co.id/api/auth/login";

      try {
        const response = await axios.post(loginUrl, data, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        if (response.status !== 200) {
          console.log("err");
        }

        const ResDat = await response.data;
        const ResponseData = await ResDat.data.data;
        const AucData = await ResponseData.active_user_company;
        const DivisionData = await AucData.division;
        const BranchData = await AucData.company;
        const PositionData = await AucData.position;

        const division = DivisionData.d_name;
        const branch = BranchData.c_name;
        const position = PositionData.p_name;
        const position_id = PositionData.p_id;
        const division_id = DivisionData.d_id;
        const branch_id = BranchData.c_id;

        const dataData = {
          division,
          branch,
          position,
          position_id,
          division_id,
          branch_id,
        };

        // console.log("🚀 ~ changeCompany ~ dataData:", dataData)

        sessionStorage.setItem("division", division);
        sessionStorage.setItem("branch", branch);
        sessionStorage.setItem("position", position);
        sessionStorage.setItem("position_id", position_id);
        sessionStorage.setItem("division_id", division_id);
        sessionStorage.setItem("branch_id", branch_id);

        // console.log("Diganti ", response);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },

    async getRole() {
      try {
        // console.log("bangbang")
        const response = await this.$axios.get(`/role`, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${this.token}`,
          },
        });

        this.roles = response.data.data;
        // console.log("🚀 ~ getRole ~ ole:", this.roles);

        // return role;
      } catch (err) {
        console.error(err);
        throw err;
      }
    },
    async fetchDivisionData() {
      // const loginUrl = "https://office.onic.co.id/api/master/division";

      // Make the POST request using fetch
      try {
        // const response = await axios.get(loginUrl, {
        //   headers: {
        //     "Content-Type": "application/json",
        //     Accept: "application/json",
        //     Authorization: `Bearer ${this.token}`,
        //   },
        // });

        // console.log("🚀 ~ fetchDivisionData ~ response:", response)

        // if (response.status !== 200) {
        //   throw Error("Error while fetching");
        // }

        const d_name = sessionStorage.getItem("division")
        ? sessionStorage.getItem("division")
        : Cookies.get("division")

        const d_id = sessionStorage.getItem("division_id")
        ? sessionStorage.getItem("division_id")
        : Cookies.get("division_id")

        const listOfDivisi = [{
          label: d_name,
          value: d_id,
        }]


        this.divisiOptions = listOfDivisi;
        this.divisi = this.divisiOptions[0];

        const divisi = this.divisiOptions.d_name;
        // console.log("Selected Divisi:", divisi);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },

    async fetchPersonData() {
      // const loginUrl = "https://office.onic.co.id/api/master/employee/active";

      // Make the POST request using fetch
      try {
      //   const response = await axios.get(loginUrl, {
      //     headers: {
      //       "Content-Type": "application/json",
      //       Accept: "application/json",
      //       Authorization: `Bearer ${this.token}`,
      //     },
      //   });

        // console.log("🚀 ~ fetchPersonData ~ response:", response)

        // if (response.status !== 200) {
        //   throw Error("Error while fetching");
        // }

        // const branch = this.branch.label;
        // const division = this.divisi.label;

        // const filteredData = response.data.data.filter(
        //   (user) => user.company_name === branch && user.division === division
        // );

        // console.log("🚀 ~ fetchPersonData ~ filteredData:", filteredData)

        // const userRolesMap = {};

        // this.roles.forEach((role) => {
        //   userRolesMap[role.u_id] = role;
        // });

        // const listOfPerson = filteredData.map((data) => ({
        //   label: data.name,
        //   value: data.id,
        //   title: userRolesMap[data.id] ? userRolesMap[data.id].role : "",
        // }));

        // const filteredTitle = listOfPerson.filter(
        //   (user) =>
        //     user.title !== "director" &&
        //     user.title !== "direktur" &&
        //     user.title !== "admin"
        // );

        const name = sessionStorage.getItem("username")
        ? sessionStorage.getItem("username")
        : Cookies.get("username")

        const id = sessionStorage.getItem("id")
        ? sessionStorage.getItem("id")
        : Cookies.get("id")

        const filteredTitle = [{
          label: name,
          value: id,
        }]

        console.log("🚀 ~ fetchPersonData ~ filteredTitle:", filteredTitle)

        this.personOptions = filteredTitle;
        this.person = this.personOptions[0];

        const person = this.personOptions.length > 0 ? this.personOptions[0] : null;
        // console.log("Selected Person:", person);
        eventBus.$emit("person-selected", this.person);
        // this.fetchData(person);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },

    async fetchBranchData() {
      // const loginUrl = "https://office.onic.co.id/api/master/company-entity?status=null";

      try {
        const branches = sessionStorage.getItem("branches");
        if (branches) {
          this.branches = JSON.parse(branches);
        }

        // console.log("🚀 DATA:", this.branches);

        const listOfBranch = this.branches.map((branch) => ({
          label: branch.company.c_name,
          value: branch.company.c_id,
        }));

        const branchId = parseInt(this.branchId)
        const branchesList = listOfBranch.filter(
          (data) => data.value === branchId
        )

        this.branchOptions = listOfBranch;
        this.branch = branchesList[0];

        // const branch = this.branchOptions.d_name;
        // console.log("Selected Branch:", this.branch);
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
          path: "/operator/task_monitoring",
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
