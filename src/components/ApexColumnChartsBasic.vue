<template>
  <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
    <q-card flat>
      <q-card-section>
        <div class="bg-grey-3 q-pa-md text-center title-card">Monitoring Job Status</div>
      </q-card-section>

      <q-card-section class="row q-gutter-sm q-py-none q-mb-md justify-between">
        <!-- <q-select
          dense
          filled
          label="Division"
          v-model="divisi"
          use-input
          input-debounce="0"
          :options="divisiOptions"
          behavior="menu"
          class="col-3"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey"> No results </q-item-section>
            </q-item>
          </template>
        </q-select> -->

        <!-- <q-select
          dense
          filled
          label="Person"
          v-model="person"
          use-input
          input-debounce="0"
          :options="personOptions"
          behavior="menu"
          class="col-3"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey"> No results </q-item-section>
            </q-item>
          </template>
        </q-select> -->

        <!-- <q-input filled label="From" dense v-model="formattedStartDate" class="col-2">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date v-model="formattedStartDate" mask="YYYY-MM-DD HH:mm">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input> -->

        <!-- <q-input filled label="To" dense v-model="formattedDueDate" class="col-2">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date v-model="formattedDueDate" mask="YYYY-MM-DD HH:mm">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input> -->
      </q-card-section>

      <template>
        <q-scroll-area class="horizontal-scrollbar" style="height: 410px">
          <div class="scroll-content" style="width: 1000px">
            <q-card-section>
              <CardBase>
                <div class="col-12">
                  <apexchart
                    type="bar"
                    height="321"
                    :options="chartOptions"
                    :series="series"
                    :pagination.sync="pagination"
                  ></apexchart>
                  <div>
                    <!-- <q-btn @click="previousMonth" label="Previous" />
              <q-btn @click="nextMonth" label="Next" /> -->
                  </div>
                </div>
              </CardBase>
            </q-card-section>
          </div>
        </q-scroll-area>
      </template>
    </q-card>
  </div>
</template>

<script>
import { eventBus } from '../event-bus.js';
const { DateTime } = require("luxon");
import Cookies from "js-cookie";
import Vue from "vue";
import CardBase from "components/CardBase";
import { ref, inject } from "vue";
export default {
  name: "TaskStatusChart",
  components: {
    CardBase,
  },
  data() {
    return {
      formattedDueDate:'',
      formattedStartDate:'',
      monthlyStatusCounts: {},
      currentMonthIndex: 0,
      month: null,
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
      pagination: {
        rowsPerPage: 5,
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

    eventBus.$on('person-selected', person => {
      this.person = person;
      // console.log('Person yang dipilih:', this.person);
    });
    
    if(this.person) {
      Promise.all([
        this.fetchData(),
        // this.fetchInProgress(),
        // this.fetchCompleted(),
        // this.fetchOverdue(),
        // this.fetchTotal(),
        // this.fetchPersonData(),
        // this.fetchDivisionData(),
      ]).then(() => {
        this.updateSeries();
        this.intervalId = setInterval(() => {
          // this.fetchData();
          // this.fetchInProgress();
          // this.fetchCompleted();
          // this.fetchOverdue();
          // this.fetchTotal();
          // this.updateSeries();
        }, 60000);
      });
    }
  },

  watch: {
    "deposit.start": {
      handler(value) {
        this.deposit.start = value != "" ? value : "";
        this.fetchData();
      },
    },

    "deposit.due": {
      handler(value) {
        this.deposit.due = value != "" ? value : "";
        this.fetchData();
      },
    },

    person: {
      handler(val) {
        if (val) {
          const person = this.person.value;
          // console.log("Selected Person:", person);
          this.fetchData(person);
          // console.log("wowoowwo", this.series);
        }
      },
    },

    divisi: {
      handler(value) {
        // console.log("Selected PIC changed. Updating SPV options...");
        // console.log("PIC title:", value.label);

        if (value) {
          // this.fetchPersonData();
        }
      },
    },
  },

  beforeDestroy() {
    clearInterval(this.intervalId);
  },

    methods: {
    updateStartDate (val) {
      if (val) {
        const [year, month, day] = val.split('-')
        this.formattedStartDate = `${day}/${month}/${year}`
      }
      this.$refs.popupProxy.hide()
    },

    updateDueDate (val) {
      if (val) {
        const [year, month, day] = val.split('-')
        this.formattedDueDate = `${day}/${month}/${year}`
      }
      this.$refs.duePopupProxy.hide()
    },
    async fetchData(person) {
      const response = await this.$axios.get("/task/all", {
        params: {
          search: this.search,
          startDate: this.deposit.start,
          dueDate: this.deposit.due,
        },
        headers: {
          title: this.title,
          pic: this.person.value || undefined,
          branch: this.branchId,
          division: this.divisionId,
          Authorization: `Bearer ${this.token}`,
        },
      });

      const tasks = response.data;

      const monthsTasks = {
        January: [],
        February: [],
        March: [],
        April: [],
        May: [],
        June: [],
        July: [],
        August: [],
        September: [],
        October: [],
        November: [],
        December: [],
      };

      tasks.forEach((task) => {
        // Parse tanggal jatuh tempo dari tugas
        const dueDate = DateTime.fromISO(task.start_date);

        // Ambil nama bulan dari tanggal jatuh tempo
        const month = dueDate.monthLong;
        // console.log("🚀 ~ tasks.forEach ~ month:", month);

        // Masukkan tugas ke dalam objek monthsTasks
        monthsTasks[month].push(task);
      });

      // console.log("LOL");
      // console.log(tasks.start_date);
      // const january = tasks.filter((task) => task.status.getMonth() === "01");

      Object.keys(monthsTasks).forEach((month) => {
        const tasksOfMonth = monthsTasks[month];
        const statusCounts = {
          Open: tasksOfMonth.filter((task) => task.overdue !== true && task.status === "Open").length,
          Completed: tasksOfMonth.filter((task) => task.status === "Close").length,
          InProgress: tasksOfMonth.filter((task) => task.overdue !== true && task.status === "In-progress").length,
          Overdue: tasksOfMonth.filter((task) => task.status !== "Close" && task.overdue === true).length,
          Total: tasksOfMonth.length,
        };
        this.monthlyStatusCounts[month] = statusCounts;
      });
      // console.log("🚀 ~ fetchData ~ monthlyStatusCounts:", this.monthlyStatusCounts);
      this.updateSeries();

      // console.log("Jumlah Tugas Terbuka:", this.TotalOpen);
      // console.log("Jumlah Tugas Selesai:", this.TotalCompleted);
      // console.log("Jumlah Tugas Sedang Berlangsung:", this.TotalInProgress);
      // console.log("Jumlah Tugas Telat:", this.TotalOverdue);
      // console.log("Total Tugas:", this.TotalTotal);
    },

    async fetchDivisionData() {
      try {
        const { status, data } = await this.$axios.get("/divisi", {
          headers: {
            branch: this.branchId,
            division: this.divisionId,
            title: this.title,
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

        const divisi = this.divisiOptions.d_name;
        // console.log("Selected Divisi:", divisi);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },

    // // async fetchPersonData() {
    //   try {
    //     console.log("🚀 ~ listOfDivisi ~ value:", this.divisi.value);
    //     const { status, data } = await this.$axios.get("/user/division", {
    //       params: {
    //         division: this.divisi.value,
    //         branch: this.branch,
    //       },
    //       headers: {
    //         branch: this.branchId,
    //         division: this.divisionId,
    //         Authorization: `Bearer ${this.token}`,
    //       },
    //     });

    //     if (status !== 200) {
    //       throw Error("Error while fetching");
    //     }

    //     let filteredData;
    //     if (this.title === "director" || "direktur") {
    //       filteredData = data.filter(
    //         (user) => user.title!== "director" || "direktur" && user.title!== "admin"
    //       );
    //     } else if (this.title === "manager") {
    //       filteredData = data.filter(
    //         (user) =>
    //           user.title!== "director" || "direktur" &&
    //           user.title!== "admin" &&
    //           user.title!== "manager"
    //       );
    //     } else if (this.title === "supervisor") {
    //       filteredData = data.filter((user) => user.title=== "operator");
    //     } else if (this.title === "operator") {
    //       filteredData = data.filter((user) => user.u_name === this.username);
    //     }

    //     const listOfPerson = filteredData.map((data) => ({
    //       label: data.u_name,
    //       value: data.u_id,
    //       title: data.title,
    //     }));

    //     this.personOptions = listOfPerson;
    //     this.person = this.personOptions[0];
    //   } catch (error) {
    //     console.error("Error fetching users:", error);
    //   }
    // },

    updateSeries() {
      const months = [
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
      ];
      // Memperbarui data series untuk grafik berdasarkan jumlah tugas per status
      this.series = [
        {
          name: "Completed",
          data: months.map(
            function (month) {
              return this.monthlyStatusCounts[month]
                ? this.monthlyStatusCounts[month].Completed || 0
                : 0;
            }.bind(this)
          ),
        },
        {
          name: "In-progress",
          data: months.map(
            function (month) {
              return this.monthlyStatusCounts[month]
                ? this.monthlyStatusCounts[month].InProgress || 0
                : 0;
            }.bind(this)
          ),
        },
        {
          name: "Overdue",
          data: months.map(
            function (month) {
              return this.monthlyStatusCounts[month]
                ? this.monthlyStatusCounts[month].Overdue || 0
                : 0;
            }.bind(this)
          ),
        },
        {
          name: "Open",
          data: months.map(
            function (month) {
              return this.monthlyStatusCounts[month]
                ? this.monthlyStatusCounts[month].Open || 0
                : 0;
            }.bind(this)
          ),
        },
        {
          name: "Total",
          data: months.map(
            function (month) {
              return this.monthlyStatusCounts[month]
                ? this.monthlyStatusCounts[month].Total || 0
                : 0;
            }.bind(this)
          ),
        },
      ];
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

.horizontal-scrollbar {
  overflow-x: auto; /* Mengaktifkan scrollbar horizontal */
  overflow-y: hidden; /* Menonaktifkan scrollbar vertikal */
}

.scroll-content {
  white-space: nowrap; /* Membuat konten horizontal */
}
</style>
