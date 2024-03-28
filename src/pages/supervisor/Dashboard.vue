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
import Cookies from 'js-cookie';
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
    divisionId: sessionStorage.getItem("division_id")? sessionStorage.getItem("division_id") : Cookies.get("division_id"),
      branchId: sessionStorage.getItem("branch_id")? sessionStorage.getItem("branch_id") : Cookies.get("branch_id"),
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
        start_1: "",
        due_1: "",
        start_2: "",
        due_2: "",
      },
    };
  },
  setup() {
    return {

      token: ref(sessionStorage.getItem("token")? sessionStorage.getItem("token") : Cookies.get("token")),
      onItemClick() {},
    };
  },

  mounted() {
    this.fetchOpen();
    this.fetchInProgress();
    this.fetchCompleted();
    this.fetchOverdue();
    this.fetchTotal();

    this.intervalId = setinterval(() => {
      this.fetchDeletedData();
      this.fetchData();
      this.fetchWaitedData();
    }, 6000);
  },

  methods: {
    async fetchOpen() {
      try {
        const response = await this.$axios.get("/task/all", {
          params: { status: "Open", search: this.search },
          headers: {
branch: this.branchId,
division: this.divisionId,
            Authorization: `Bearer ${this.token}`,
          },
        });

        // Assuming response.data is an array of tasks
        const openedTasks = response.data.filter((task) => task.pic_title === "operator");

        // Log the length of opened tasks
        this.TotalOpen = openedTasks.length;
        console.log(openedTasks.length);

        // You can use this value in your component or store it in a data property
        return openedTasks.length;
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle the error as needed, maybe set a default value or show an error message
        return 0;
      }
    },

    async fetchCompleted() {
      try {
        const response = await this.$axios.get("/task/all", {
          params: { status: "Close", search: this.search },
          headers: {
branch: this.branchId,
division: this.divisionId,
            Authorization: `Bearer ${this.token}`,
          },
        });

        // Assuming response.data is an array of tasks
        const openedTasks = response.data.filter((task) => task.pic_title === "operator");

        // Log the length of opened tasks
        this.TotalCompleted = openedTasks.length;
        console.log(openedTasks.length);

        // You can use this value in your component or store it in a data property
        return openedTasks.length;
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle the error as needed, maybe set a default value or show an error message
        return 0;
      }
    },

    async fetchInProgress() {
      try {
        const response = await this.$axios.get("/task/all", {
          params: { status: "In-progress", search: this.search },
          headers: {
branch: this.branchId,
division: this.divisionId,
            Authorization: `Bearer ${this.token}`,
          },
        });

        // Assuming response.data is an array of tasks
        const openedTasks = response.data.filter((task) => task.pic_title === "operator");

        // Log the length of opened tasks
        this.TotalInProgress = openedTasks.length;
        console.log(openedTasks.length);

        // You can use this value in your component or store it in a data property
        return openedTasks.length;
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle the error as needed, maybe set a default value or show an error message
        return 0;
      }
    },

    async fetchOverdue() {
      try {
        const response = await this.$axios.get("/task/all", {
          params: { status: "Idle", search: this.search },
          headers: {
branch: this.branchId,
division: this.divisionId,
            Authorization: `Bearer ${this.token}`,
          },
        });

        // Assuming response.data is an array of tasks
        const openedTasks = response.data.filter((task) => task.pic_title === "operator");

        // Log the length of opened tasks
        this.TotalOverdue = openedTasks.length;
        console.log(openedTasks.length);

        console.log(openedTasks.length);

        // You can use this value in your component or store it in a data property
        return openedTasks.length;
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle the error as needed, maybe set a default value or show an error message
        return 0;
      }
    },

    async fetchTotal() {
      try {
        const response = await this.$axios.get("/task/all", {
          params: { status: "", search: this.search },
          headers: {
branch: this.branchId,
division: this.divisionId,
            Authorization: `Bearer ${this.token}`,
          },
        });

        // Assuming response.data is an array of tasks
        const openedTasks = response.data.filter(
          (task) => task.pic_title !== "manager" && task.pic_title !== "supervisor"
        );

        // Log the length of opened tasks
        this.TotalTotal = openedTasks.length;
        console.log(openedTasks.length);

        // You can use this value in your component or store it in a data property
        return openedTasks.length;
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle the error as needed, maybe set a default value or show an error message
        return 0;
      }
    },

    redirectToTaskMonitoring(statusFilter) {
      this.$router.push({
        path: "/supervisor/task_monitoring",
        query: { status: statusFilter },
      });
    },

    SaveImage(type) {
      const linkSource = this.$refs[type].getDataURL();
      const downloadLink = document.createElement("a");
      document.body.appendChild(downloadLink);
      downloadLink.href = linkSource;
      downloadLink.target = "_self";
      downloadLink.download = type + ".png";
      downloadLink.click();
    },
    exportTable() {
      // naive encoding to csv format
      const content = [this.columns.map((col) => wrapCsvValue(col.label))]
        .concat(
          this.data.map((row) =>
            this.columns
              .map((col) =>
                wrapCsvValue(
                  typeof col.field === "function"
                    ? col.field(row)
                    : row[col.field === void 0 ? col.name : col.field],
                  col.format
                )
              )
              .join(",")
          )
        )
        .join("\r\n");

      const status = exportFile("activity.csv", content, "text/csv");

      if (status !== true) {
        this.$q.notify({
          message: "Browser denied file download...",
          color: "negative",
          icon: "warning",
        });
      }
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
