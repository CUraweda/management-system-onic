<template>
  <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
    <q-card flat>
      <q-card-section>
        <div class="bg-grey-3 q-pa-md text-center title-card">Monitoring Job Status</div>
      </q-card-section>

      <q-card-section class="row q-gutter-sm q-py-none q-mb-md justify-between">
        <q-select
          dense
          filled
          label="Division"
          v-model="divisi"
          use-input
          input-debounce="0"
          :options="divisiOptions"
          behavior="menu"
          class="col-3"
          :rules="[(val) => (val !== null && val !== '') || 'Required']"
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
          use-input
          input-debounce="0"
          :options="personOptions"
          behavior="menu"
          class="col-3"
          :rules="[(val) => (val !== null && val !== '') || 'Required']"
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
          class="col-2"
          :rules="[(val) => (val !== null && val !== '') || 'Required']"
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
          class="col-2"
          :rules="[(val) => (val !== null && val !== '') || 'Required']"
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

      <q-card-section>
        <CardBase>
          <div class="col-12">
            <apexchart
              type="bar"
              height="321"
              :options="chartOptions"
              :series="series"
            ></apexchart>
            <div>
              <!-- <q-btn @click="previousMonth" label="Previous" />
              <q-btn @click="nextMonth" label="Next" /> -->
            </div>
          </div>
        </CardBase>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import Vue from "vue";
import CardBase from "components/CardBase";
import { ref } from "vue";
export default {
  name: "TaskStatusChart",
  components: {
    CardBase,
  },
  data() {
    return {
      currentMonthIndex: 0,
      month: null,
      divisionId: sessionStorage.getItem("division_id")
        ? sessionStorage.getItem("division_id")
        : Cookies.get("division_id"),
      branchId: sessionStorage.getItem("branch_id")
        ? sessionStorage.getItem("branch_id")
        : Cookies.get("branch_id"),
      branch: sessionStorage.getItem("branch")
        ? sessionStorage.getItem("branch")
        : Cookies.get("branch"),
      TotalOpen: "0",
      TotalInProgress: "0",
      TotalOverdue: "0",
      TotalCompleted: "0",
      TotalTotal: "0",
      divisi: null,
      person: null,
      deposit: {
        start: "",
        due: "",
        start_1: "",
        due_1: "",
        start_2: "",
        due_2: "",
      },
      series: [],
      chartOptions: {
        colors: ["#9C27B0", "#2196F3", "#FF9800", "#4CAF50", "#2816F3"],
        animations: {
          enabled: true,
          easing: "easeinout",
          speed: 1000,
        },
        title: {
          text: "Column Charts Basic",
          align: "left",
          style: {
            color: "#fff",
          },
        },
        legend: {
          position: "top",
          offsetY: -20,
          labels: {
            colors: "#000",
          },
        },
        chart: {
          type: "bar",
          height: 450,
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "40%",
            endingShape: "rounded",
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"],
        },
        xaxis: {
          categories: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
          min: 2,
          max: 5, // Ubah nilai max menjadi 8
          range: 4,
          scrollbar: {
            enabled: true,
          },
          tickLength: 10,
          labels: {
            style: {
              colors: "#000",
            },
          },
        },
        yaxis: {
          labels: {
            style: {
              colors: "#000",
            },
          },
        },
        fill: {
          opacity: 1,
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val + " Task";
            },
          },
        },
      },
    };
  },

  setup() {
    return {
      // divisi:[],
      // person:[],
      divisiOptions: ref([]),
      personOptions: ref([]),
      token: ref(
        sessionStorage.getItem("token")
          ? sessionStorage.getItem("token")
          : Cookies.get("token")
      ),
      onItemClick() {},
    };
  },

  mounted() {
    Promise.all([
      this.fetchData(),
      this.fetchOpen(),
      this.fetchInProgress(),
      this.fetchCompleted(),
      this.fetchOverdue(),
      this.fetchTotal(),
    ]).then(() => {
      this.updateSeries();
      this.intervalId = setInterval(() => {
        this.fetchOpen();
        this.fetchInProgress();
        this.fetchCompleted();
        this.fetchOverdue();
        this.fetchTotal();
        this.updateSeries();
      }, 60000);
    });
  },

  beforeDestroy() {
    clearInterval(this.intervalId);
  },

  watch: {
    divisi: {
      handler(value) {
        // console.log("Selected Divisi changed. Updating SPV options...");
        // console.log("Divisi title:", value.title);
        if (divisi) {
          this.fetchPersonData();
        }
      },
    },
  },

  methods: {
    previousMonth() {
      if (this.currentMonthIndex > 0) {
        this.currentMonthIndex--;
      }
      // panggil fungsi untuk mengupdate grafik dengan data bulan yang baru
      this.updateChart();
    },

    // fungsi untuk menampilkan bulan berikutnya
    nextMonth() {
      if (this.currentMonthIndex < this.monthlyData.length - 1) {
        this.currentMonthIndex++;
      }
      // panggil fungsi untuk mengupdate grafik dengan data bulan yang baru
      this.updateChart();
    },

    updateChart() {
      const selectedMonthData = this.monthlyData[this.currentMonthIndex];
      // update data grafik dengan data bulan yang dipilih
      this.series = [{ data: selectedMonthData.data }];
      // update label x-axis dengan bulan yang dipilih
      this.chartOptions.xaxis.categories = selectedMonthData.month;
    },

    async fetchData() {
      try {
        const { status, data } = await this.$axios.get("/divisi", {
          headers: {
            branch: this.branchId,
            division: this.divisionId,
            Authorization: `Bearer ${this.token}`,
          },
        });

        if (status !== 200) {
          throw Error("Error while fetching");
        }

        // console.log("DATA:", data.data);
        const listOfDivisi = data.data.map((data) => ({
          label: data.d_name,
          value: data.id,
        }));

        this.divisiOptions = listOfDivisi;
        this.divisi = this.divisiOptions[0];

        const divisi = this.divisiOptions.divisionName;
        // console.log("Selected Divisi:", divisi);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },

    async fetchPersonData() {
      try {
        const { status, data } = await this.$axios.get("/user/all", {
          params: {
            branch: this.branch,
          },
          headers: {
            branch: this.branchId,
            division: this.divisionId,
            Authorization: `Bearer ${this.token}`,
          },
        });
        if (status !== 200) throw Error("Error while fetching");

        const listOfSpv = data.map((user) => ({
          label: user.u_name,
          value: user.u_name,
          title: user.title,
          id: user.u_id,
        }));

        const SelectedPic = this.selectedpic.title;
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },

    updateSeries() {
      // console.log("ping" + this.TotalOpen)
      this.series = [
        {
          name: "Completed",
          data: [this.TotalCompleted],
        },
        {
          name: "In-progress",
          data: [this.TotalInProgress],
        },
        {
          name: "Overdue",
          data: [this.TotalOverdue],
        },
        {
          name: "Open",
          data: [this.TotalOpen],
        },
        {
          name: "Total",
          data: [this.TotalTotal],
        },
      ];
    },

    async fetchOpen() {
      try {
        // console.log(this.token);
        const response = await this.$axios.get("/task/all", {
          params: { status: "Open", search: this.search },
          headers: {
            branch: this.branchId,
            division: this.divisionId,
            Authorization: `Bearer ${this.token}`,
          },
        });

        const openedTasks = response.data.filter((task) => task.status === "Open");
        this.TotalOpen = openedTasks.length;
        // console.log(openedTasks.length);

        return openedTasks.length;
      } catch (error) {
        console.error("Error fetching data:", error);
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

        const openedTasks = response.data.filter((task) => task.status === "Close");
        this.TotalCompleted = openedTasks.length;
        // console.log(openedTasks.length);

        return openedTasks.length;
      } catch (error) {
        console.error("Error fetching data:", error);
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
        const openedTasks = response.data.filter((task) => task.status === "In-progress");

        // Log the length of opened tasks
        this.TotalInProgress = openedTasks.length;
        // console.log(openedTasks.length);

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
        const openedTasks = response.data.filter((task) => task.status === "Idle");

        // Log the length of opened tasks
        this.TotalOverdue = openedTasks.length;
        // console.log(openedTasks.length);

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
        const openedTasks = response.data;

        // Log the length of opened tasks
        this.TotalTotal = openedTasks.length;
        // console.log(openedTasks.length);

        // You can use this value in your component or store it in a data property
        return openedTasks.length;
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle the error as needed, maybe set a default value or show an error message
        return 0;
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
