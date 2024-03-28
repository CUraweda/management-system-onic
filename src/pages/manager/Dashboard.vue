<template>
  <q-page>
    <Card></Card>
    <div>
      <div class="text-h6 q-pl-md q-ma-md">PERFORMANCE MONITORING</div>

      <div class="row q-col-gutter-sm q-ma-xs q-pt-none q-mt-none">
        <apex-half-donut></apex-half-donut>
        <apex-column-charts-basic></apex-column-charts-basic>
      </div>
    </div>
  </q-page>
</template>

<script>
import Cookies from "js-cookie";
import Vue from "vue";
import { exportFile } from "quasar";
import CardBase from "components/CardBase";
import { ref } from "vue";

// Vue.component('IEcharts', IEcharts);

function wrapCsvValue(val, formatFn) {
  let formatted = formatFn !== void 0 ? formatFn(val) : val;

  formatted = formatted === void 0 || formatted === null ? "" : String(formatted);

  formatted = formatted.split('"').join('""');

  return `"${formatted}"`;
}

export default {
  name: "Dashboard",
  data() {
    return {
      divisionId: sessionStorage.getItem("division_id")
        ? sessionStorage.getItem("division_id")
        : Cookies.get("division_id"),
      branchId: sessionStorage.getItem("branch_id")
        ? sessionStorage.getItem("branch_id")
        : Cookies.get("branch_id"),
      token: ref(
        sessionStorage.getItem("token")
          ? sessionStorage.getItem("token")
          : Cookies.get("token")
      ),
      TotalOpen: "0",
      TotalInProgress: "0",
      TotalOverdue: "0",
      TotalCompleted: "0",
      TotalTotal: "0",
      filter: "",
      mode: "list",
      search: "",
      rating: ref(2.5),
      deposit: {
        start: "",
        due: "",
      },
    };
  },
  setup() {
    return {
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
  },

  mounted() {
    this.fetchData();
    this.fetchDivisionData();
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
          title: this.title,
          branch: this.branchId,
          division: this.divisionId,
          Authorization: `Bearer ${this.token}`,
        },
      });

      const tasks = response.data.filter((item) => item.pic_title !== "manager");
      this.TotalOpen = tasks.filter((task) => task.status === "Open").length;
      this.TotalCompleted = tasks.filter((task) => task.status === "Close").length;
      this.TotalInProgress = tasks.filter((task) => task.status === "In-progress").length;
      this.TotalOverdue = tasks.filter((task) => task.status === "Idle").length;
      this.TotalTotal = tasks.length;
    },

    async fetchDivisionData() {
      try {
        const { status, data } = await this.$axios.get("/divisi", {
          headers: {
            title: this.title,
            branch: this.branchId,
            division: this.divisionId,
            title: this.title,
            Authorization: `Bearer ${this.token}`,
          },
        });

        if (status !== 200) {
          throw Error("Error while fetching");
        }

        console.log("DATA:", data.data);
        const listOfDivisi = data.data.map((data) => ({
          label: data.d_name,
          value: data.id,
        }));

        this.divisiOptions = listOfDivisi;
        this.divisi = this.divisiOptions[0];

        const divisi = this.divisiOptions.d_name;
        console.log("Selected Divisi:", divisi);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },

    redirectToTaskMonitoring(statusFilter) {
      this.$router.push({
        path: "/manager/task_monitoring",
        query: { status: statusFilter },
      });
    },

  },
  name: "PageIndex",
  components: {
    Card: () => import("components/Card"),
    ApexHalfDonut: () => import("components/ApexHalfDonut"),
    ApexColumnChartsBasic: () => import("components/ApexColumnChartsBasic"),
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
