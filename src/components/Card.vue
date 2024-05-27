<template>
  <q-card flat>

    <!-- task card  -->
    <div class="row q-col-gutter-sm q-ma-xs q-mr-sm justify-around items-stretch">
      <!-- completed task -->
      <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12">
        <q-card
          class="no-shadow cursor-pointer q-hoverable"
          v-ripple
          clickable
          @click="redirectToTaskMonitoring('Close')"
        >
          <span class="q-focus-helper"></span>
          <q-card-section
            style="height: 270px"
            :class="$q.dark.isActive ? 'blue_dark' : 'bg-purple-1'"
            class="text-black"
          >
            <q-card-section class="row items-center justify-center q-gutter-md">
              <div class="bg-purple q-px-sm q-pt-xs card-icon q-mb-sm">
                <img width="35px" src="statics/check.svg" />
              </div>
              <div class="text-weight-bold text-center">Completed Tasks</div>
            </q-card-section>
            <q-space></q-space>
            <q-card-section class="text-center">
              <div class="text-h4 text-weight-bold q-mt-none">
                {{ TotalCompleted }}
              </div>
              <!-- Increased by 6 this week -->
            </q-card-section>
          </q-card-section>
        </q-card>
      </div>
      <!-- completed task -->

      <!-- in progres task -->
      <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12">
        <q-card
          class="no-shadow cursor-pointer q-hoverable"
          v-ripple
          clickable
          @click="redirectToTaskMonitoring('In-progress')"
        >
          <q-card-section
            style="height: 270px"
            :class="$q.dark.isActive ? 'blue_dark' : 'bg-blue-1'"
            class="text-black"
          >
            <q-card-section class="row items-center justify-center q-gutter-md">
              <div class="bg-blue q-px-sm q-pt-xs card-icon q-mb-sm">
                <img width="35px" src="statics/Load.svg" />
              </div>
              <div class="text-weight-bold text-center">In Progress Tasks</div>
            </q-card-section>
            <q-space></q-space>
            <q-card-section class="text-center">
              <div class="text-h4 text-weight-bold q-mt-none">
                {{ TotalInProgress }}
              </div>
              <!-- Decreased by 5 this week -->
            </q-card-section>
          </q-card-section>
        </q-card>
      </div>
      <!-- in progres task -->

      <!-- overdue -->
      <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12">
        <q-card
          class="no-shadow cursor-pointer q-hoverable"
          v-ripple
          clickable
          @click="redirectToTaskMonitoring('Overdue')"
        >
          <q-card-section
            style="height: 270px"
            :class="$q.dark.isActive ? 'blue_dark' : 'bg-orange-1'"
            class="text-black"
          >
            <q-card-section class="row items-center justify-center q-gutter-md">
              <div class="bg-orange q-px-sm q-pt-xs card-icon q-mb-sm">
                <img width="35px" src="statics/Jam.svg" />
              </div>
              <div class="text-weight-bold text-center">Overdue Tasks</div>
            </q-card-section>
            <q-space></q-space>
            <q-card-section class="text-center">
              <div class="text-h4 text-weight-bold q-mt-none">
                {{ TotalOverdue }}
              </div>
              <!-- Increased by 3 this week -->
            </q-card-section>
          </q-card-section>
        </q-card>
      </div>
      <!-- overdue -->

      <!-- opened -->
      <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12">
        <q-card
          class="no-shadow cursor-pointer q-hoverable"
          v-ripple
          clickable
          @click="redirectToTaskMonitoring('Open')"
        >
          <q-card-section
            style="height: 270px"
            :class="$q.dark.isActive ? 'blue_dark' : 'bg-green-1'"
            class="text-black"
          >
            <q-card-section class="row items-center justify-center q-gutter-md">
              <div class="bg-green q-px-sm q-pt-xs card-icon q-mb-sm">
                <img width="35px" src="statics/check.svg" />
              </div>
              <div class="text-weight-bold text-center">Opened Tasks</div>
            </q-card-section>
            <q-space></q-space>
            <q-card-section class="text-center">
              <div class="text-h4 text-weight-bold q-mt-none">
                {{ TotalOpen }}
              </div>
              <!-- Increased by 8 this week -->
            </q-card-section>
          </q-card-section>
        </q-card>
      </div>
      <!-- opened -->

      <!-- total -->
      <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12">
        <q-card
          class="no-shadow cursor-pointer q-hoverable"
          v-ripple
          clickable
          @click="redirectToTaskMonitoring()"
        >
          <q-card-section
            style="height: 270px"
            :class="$q.dark.isActive ? 'blue_dark' : 'bg-cyan-1'"
            class="text-black"
          >
            <q-card-section class="row items-center justify-center q-gutter-md">
              <div class="bg-cyan q-px-sm q-pt-xs card-icon q-mb-sm">
                <img width="35px" src="statics/list.svg" />
              </div>
              <div class="text-weight-bold text-center">Total Tasks</div>
            </q-card-section>
            <q-space></q-space>
            <q-card-section class="text-center">
              <div class="text-h4 text-weight-bold q-mt-none">
                {{ TotalTotal }}
              </div>
              <!-- Completion rate: 80% -->
            </q-card-section>
          </q-card-section>
        </q-card>
      </div>
      <!-- total -->
    </div>
    <!-- task card  -->
  </q-card>
</template>

<script>
import { eventBus } from '../event-bus.js';
import Cookies from "js-cookie";
import Vue from "vue";
import { exportFile } from "quasar";
import CardBase from "components/CardBase";
import { ref } from "vue";

function wrapCsvValue(val, formatFn) {
  let formatted = formatFn !== void 0 ? formatFn(val) : val;

  formatted = formatted === void 0 || formatted === null ? "" : String(formatted);

  formatted = formatted.split('"').join('""');

  return `"${formatted}"`;
}

export default {
  name: "Card",
  props: {},
  data() {
    return {
      person: null,
      username: sessionStorage.getItem("username")
        ? sessionStorage.getItem("username")
        : Cookies.get("username"),
      role: sessionStorage.getItem("role")
        ? sessionStorage.getItem("role")
        : Cookies.get("role"),
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
      divisi: ref(),
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
        this.fetchData();
      },
    },
  },

  mounted() {
    eventBus.$on('person-selected', person => {
      this.person = person;
      // console.log('Person yang dipilih:', this.person);
      this.fetchData();
    });

    // this.fetchBranchData();
    // this.fetchDivisionData();
    // this.fetchData();
    // this.intervalId = setInterval(() => {
    //   this.fetchData();
    // }, 60000);
  },

  beforeDestroy() {
    clearInterval(this.intervalId);
  },

  methods: {
    async fetchData() {
      const response = await this.$axios.get("/task/all", {
        // params: { startDate: this.deposit.start, dueDate: this.deposit.due },
        headers: {
          pic: this.person.value,
          Authorization: `Bearer ${this.token}`,
        },
      });
      // console.log("HAHAHAHA:", response)

      // console.log("walawe: ", this.divisi.value);
      // let tasks;
      // const role =  this.role;
      // if (
      //   role === "director" ||
      //   role === "direktur"
      // ) {
      //   tasks = response.data.filter(
      //     (task) =>
      //       task.pic_title !== "director" &&
      //       task.pic_title !== "direktur" &&
      //       task.pic_title !== "admin"
      //   );
      // } else if (this.role === "manager") {
      //   tasks = response.data.filter(
      //     (task) =>
      //       task.pic_title !== "director" ||
      //       ("direktur" && task.pic_title !== "admin" && task.pic_title !== "manager")
      //   );
      // } else if (this.role === "supervisor") {
      //   tasks = response.data.filter((task) => task.pic_title === "operator");
      // } else if (this.role === "operator") {
      //   tasks = response.data.filter((task) => task.u_name === this.username);
      // }
      this.TotalOpen = response.data.filter((task) => task.overdue !== true && task.status === "Open").length;
      this.TotalCompleted = response.data.filter((task) => task.status === "Close").length;
      this.TotalInProgress = response.data.filter((task) => task.overdue !== true && task.status === "In-progress").length;
      this.TotalOverdue = response.data.filter((task) => task.overdue === true && task.status !== "Close").length;
      this.TotalTotal = response.data.length;

      // console.log("NGGAH", this.TotalTotal);
    },

    redirectToTaskMonitoring(statusFilter) {
      if (this.role === "operator") {
        this.$router.push({
          path: `/${this.role}/task_list`,
          query: { status: statusFilter },
        });
      } else if (this.role === "direktur") {
        this.$router.push({
          path: "/director/task_monitoring",
          query: { status: statusFilter },
        });
      } else {
        this.$router.push({
          path: `/${this.role}/task_monitoring`,
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

.role-card {
  border-radius: 20px;
}

.under-role {
  border-radius: 8px;
}

.bintang {
  border-radius: 18px;
}
</style>
