<template>
  <q-page>
    <!-- overview -->
    <q-card flat>
      <q-card-section
        class="row q-gutter-sm q-pt-md q-ml-sm q-mr-md items-center"
      >
        <div class="text-h6 q-mt-xs q-ml-md col-md-5 col-sm-11 col-xs-11">
          Feedback Review
        </div>
        <q-space></q-space>

        <q-input
          class="bg-grey-3 q-px-md under-title col-lg-1 col-md-1 col-sm-5 col-xs-5"
          borderless
          dense
          v-model="deposit.start_2"
          mask="date"
          label="From"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                ref="depositDateProxy"
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="deposit.start_2" />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>

        <q-input
          class="bg-grey-3 q-px-md under-title col-lg-1 col-md-1 col-sm-5 col-xs-5"
          borderless
          dense
          v-model="deposit.due_2"
          mask="date"
          label="To"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                ref="depositDateProxy"
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="deposit.due_2" />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </q-card-section>
    </q-card>
    <!-- overview -->

    <!-- task card  -->
    <div
      class="row q-col-gutter-sm q-ma-xs q-mr-sm justify-around items-stretch"
    >
      <!-- completed task -->
      <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12">
        <q-card
          class="no-shadow cursor-pointer q-hoverable"
          v-ripple
          clickable
          @click="redirectToTaskList('Close')"
        >
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
            <q-card-section class="text-center">
              <div class="text-h4 text-weight-bold q-mt-none">
                {{ TotalCompleted }}
              </div>
              Increased by 6 this week
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
          @click="redirectToTaskList('In-progress')"
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
            <q-card-section class="text-center">
              <div class="text-h4 text-weight-bold q-mt-none">
                {{ TotalInProgress }}
              </div>
              Decreased by 5 this week
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
          @click="redirectToTaskList('Idle')"
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
            <q-card-section class="text-center">
              <div class="text-h4 text-weight-bold q-mt-none">
                {{ TotalOverdue }}
              </div>
              Increased by 3 this week
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
          @click="redirectToTaskList('Open')"
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
            <q-card-section class="text-center">
              <div class="text-h4 text-weight-bold q-mt-none">
                {{ TotalOpen }}
              </div>
              Increased by 8 this week
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
          @click="redirectToTaskList()"
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
            <q-card-section class="text-center">
              <div class="text-h4 text-weight-bold q-mt-none">
                {{ TotalTotal }}
              </div>
              Completion rate: 80%
            </q-card-section>
          </q-card-section>
        </q-card>
      </div>
      <!-- total -->
    </div>
    <!-- task card  -->

    <div>
      <div class="text-h6 q-pl-md q-ma-md">PERFORMANCE MONITORING</div>

      <div class="row q-col-gutter-sm q-ma-xs q-pt-none q-mt-none">
        <apex-half-donut></apex-half-donut>
        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
          <q-card flat>
            <q-card-section>
              <div class="bg-grey-3 q-pa-md text-center title-card">
                Monitoring Job Status
              </div>
            </q-card-section>

            <q-card-section>
              <CardBase>
                <!-- overview -->
                <q-card flat>
                  <q-card-section
                    class="row q-gutter-sm q-pt-md q-ml-sm q-mr-md items-center q-mb-xl"
                  >
                    <q-space></q-space>

                    <q-input
                      class="bg-grey-3 q-px-md under-title col-lg-2 col-md-2 col-sm-5 col-xs-5"
                      borderless
                      dense
                      v-model="deposit.start"
                      mask="date"
                      label="From"
                    >
                      <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy
                            ref="depositDateProxy"
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-date v-model="deposit.start" />
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>

                    <q-input
                      class="bg-grey-3 q-px-md under-title col-lg-2 col-md-2 col-sm-5 col-xs-5"
                      borderless
                      dense
                      v-model="deposit.due"
                      mask="date"
                      label="To"
                    >
                      <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy
                            ref="depositDateProxy"
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-date v-model="deposit.due" />
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </q-card-section>
                </q-card>
                <!-- overview -->
                <div class="">
                  <apex-bar-charts-basic
                    :TotalTotal="TotalTotal"
                  ></apex-bar-charts-basic>
                </div>
              </CardBase>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import Vue from "vue";
import { exportFile } from "quasar";
import CardBase from "components/CardBase";
import { ref } from "vue";

// Vue.component('IEcharts', IEcharts);

function wrapCsvValue(val, formatFn) {
  let formatted = formatFn !== void 0 ? formatFn(val) : val;

  formatted =
    formatted === void 0 || formatted === null ? "" : String(formatted);

  formatted = formatted.split('"').join('""');

  return `"${formatted}"`;
}

export default {
  name: "Dashboard",
  data() {
    return {
      token: ref(localStorage.getItem("token")),
      TotalOpen: "0",
      TotalInProgress: "0",
      TotalOverdue: "0",
      TotalCompleted: "0",
      TotalTotal: "0",
      filter: "",
      mode: "list",
      rating: ref(2.5),
      search: "",
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
      onItemClick() {
        console.log("Clicked on an Item");
      },
    };
  },

  mounted() {
    this.fetchOpen();
    this.fetchInProgress();
    this.fetchCompleted();
    this.fetchOverdue();
    this.fetchTotal();

    this.intervalId = setinterval(() => {
      this.fetchOpen();
      this.fetchInProgress();
      this.fetchCompleted();
      this.fetchOverdue();
      this.fetchTotal();
    });
  },

  methods: {
    async fetchOpen() {
      try {
        const username = localStorage.getItem("username");
        const response = await this.$axios.get("/task/all", {
          params: {
            status: "Open",
            search: this.search,
          },
          headers: {
            pic: username,
            Authorization: `Bearer ${this.token}`,
          },
        });

        const openedTasks = response.data.filter(
          (task) => task.pic.title !== "Open"
        );

        this.TotalOpen = openedTasks.length;
        console.log(openedTasks.length);

        return openedTasks.length;
      } catch (error) {
        console.error("Error fetching data:", error);
        return 0;
      }
    },

    async fetchCompleted() {
      try {
        const username = localStorage.getItem("username");
        const response = await this.$axios.get("/task/all", {
          params: {
            status: "Close",
            search: this.search,
          },
          headers: {
            pic: username,
            Authorization: `Bearer ${this.token}`,
          },
        });

        // Assuming response.data is an array of tasks
        const openedTasks = response.data.filter(
          (task) => task.pic.title !== "Close"
        );

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
        const username = localStorage.getItem("username");
        const response = await this.$axios.get("/task/all", {
          params: {
            status: "In-progress",
            search: this.search,
          },
          headers: {
            pic: username,
            Authorization: `Bearer ${this.token}`,
          },
        });

        // Assuming response.data is an array of tasks
        const openedTasks = response.data.filter(
          (task) => task.pic.title !== "In-progress"
        );

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
        const username = localStorage.getItem("username");
        const response = await this.$axios.get("/task/all", {
          params: {
            status: "Idle",
            search: this.search,
          },
          headers: {
            pic: username,
            Authorization: `Bearer ${this.token}`,
          },
        });

        // Assuming response.data is an array of tasks
        const openedTasks = response.data.filter(
          (task) => task.pic.title !== "Operator"
        );

        // Log the length of opened tasks
        this.TotalOverdue = openedTasks.length;
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
        const username = localStorage.getItem("username");
        const response = await this.$axios.get("/task/all", {
          params: {
            status: "",
            search: this.search,
          },
          headers: {
            pic: username,
            Authorization: `Bearer ${this.token}`,
          },
        });

        // Assuming response.data is an array of tasks
        const openedTasks = response.data;

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

    redirectToTaskList(statusFilter) {
      this.$router.push({
        path: "/operator/task_list",
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
    CardBase,
    ApexHalfDonut: () => import("components/ApexHalfDonut"),
    ApexBarChartsBasic: () => import("components/ApexBarChartsBasic"),
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
