<template>
  <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
    <q-card flat>
      <q-card-section>
        <div class="bg-grey-3 q-pa-md text-center title-card">Feedback Review</div>
      </q-card-section>

      <q-card-section class="row q-gutter-sm q-pt-none justify-between">
        <!-- <q-select
          dense
          filled
          label="Division"
          v-model="divisi"
          name="division"
          use-input
          input-debounce="0"
          :options="divisiOptions"
          behavior="menu"
          class="col-5"
          :rules="[(val) => (val !== null && val !== '') || 'Required']"
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
          v-model="person"
          name="person"
          label="Person"
          use-input
          input-debounce="0"
          :options="personOptions"
          behavior="menu"
          class="col-5"
          :rules="[(val) => (val !== null && val !== '') || 'Required']"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey"> No results </q-item-section>
            </q-item>
          </template>
        </q-select> -->
      </q-card-section>

      <q-card-section>
        <card-base class="">
          <div class="q-mb-xl col justify-left">
            <span>Employee Performance Monitoring</span>

            <!-- <q-separator inset /> -->
            <!-- <q-scroll-area style="height: 150px; border-radius: '1px solid #BCC1CA'" class="q-mt-md">
                <span class="text-h6 text-bold q-pr-xl  q-ml-md q-mt-md text-red">Overdue Task</span>
                <q-separator inset />
              <div v-for="overdueTask in overdueTasks" :key="overdueTask" class="q-py-xs">
                <div class="task_title-item q-ml-md q-mx-md row justify-between">
                  <span class="text-red">{{ overdueTask.task_title }}</span>
                  <span class="text-red">{{
                    overdueTask.due_date | formatTanggal
                  }}</span>
                  <span class="text-red">{{ overdueTask.due_date }}</span>
                </div>
              </div>
              <q-space></q-space>
              <q-separator inset />
              <span class="text-h6 text-bold text-green q-ml-md q-mt-xl q-pt-xl">Open Task</span>
              <q-separator inset />
              <div v-for="openTask in openTasks" :key="openTask" class="q-py-xs">
                <div class="task_title-item q-ml-md q-mx-md row justify-between">
                  <span class="">{{ openTask.task_title }}</span>
                  <span class="">{{ openTask.due_date | formatTanggal }}</span>
                </div>
              </div>
              <q-separator inset />
            </q-scroll-area> -->
            <!-- <q-separator inset /> -->
          </div>
          <div class="row justify-center">
            <div class="col-12">
              <div style="margin: 109px" class="q-ml-md text-center">
                <q-rating
                  v-model="Avgrate"
                  class="q-ml-md"
                  max="5"
                  size="5em"
                  color="yellow"
                  icon="star_border"
                  icon-selected="star"
                  icon-half="star_half"
                  no-dimming
                  hint="readonly"
                  readonly
                />
                <div class="text-h5">SKOR {{ personName }} {{ Avgrate }}</div>
              </div>
            </div>
          </div>
        </card-base>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import moment from 'moment';
import 'moment/locale/id';
import { eventBus } from "../event-bus.js";
import Cookies from "js-cookie";
import { ref, inject } from "vue";
import CardBase from "components/CardBase";

moment.locale('id');
export default {
  name: "ApexHalfDonut",
  components: {
    CardBase,
  },
  filters: {
    formatTanggal(value) {
      if (value) {
        return moment(value).format('DD MMMM YYYY [pukul] HH:mm'); // Format tanggal Indonesia
      }
      return value;
    }
  },
  data() {
    return {
      overdueTasks: "",
      openTasks: "",
      loading: ref(true),
      formattedDueDate: "",
      formattedStartDate: "",
      person: 0,
      divisionId: sessionStorage.getItem("division_id")
        ? sessionStorage.getItem("division_id")
        : Cookies.get("division_id"),
      branchId: sessionStorage.getItem("branch_id")
        ? sessionStorage.getItem("branch_id")
        : Cookies.get("branch_id"),
      branch: sessionStorage.getItem("branch")
        ? sessionStorage.getItem("branch")
        : Cookies.get("branch"),
      deposit: {
        start: "",
        due: "",
        start_1: "",
        due_1: "",
        start_2: "",
        due_2: "",
      },
      divisi: null,
      id: sessionStorage.getItem("id") ? sessionStorage.getItem("id") : Cookies.get("id"),
      left: false,
      token: ref(
        sessionStorage.getItem("token")
          ? sessionStorage.getItem("token")
          : Cookies.get("token")
      ),
      title: sessionStorage.getItem("title")
        ? sessionStorage.getItem("title")
        : Cookies.get("title"),
      username: sessionStorage.getItem("username")
        ? sessionStorage.getItem("username")
        : Cookies.get("username"),
      Avgrate: 0,
      columns: [
        { name: 'Task', align: 'center', label: 'Task', field: 'task_title', sortable: true },
        { name: 'Due Date', align: 'center', label: 'Due Date', field: 'due_date', sortable: true }
      ]
    };
  },

  setup() {
    return {
      personOptions: ref([]),
      divisiOptions: ref([]),
    };
  },

  mounted() {
    eventBus.$on("person-selected", (person) => {
      this.person = person;
      this.fetchData();
      this.getData();
    });
    eventBus.$on('start-date-selected', start => {
      this.start = start;
      // console.log('Start yang dipilih:', this.start);
      this.fetchData();
      this.getData();
    });
    eventBus.$on('due-date-selected', due => {
      this.due = due;
      // console.log('Due yang dipilih:', this.due);
      this.fetchData();
      this.getData();
    });

    // this.fetchDivisionData();
    // console.log("wong: ", this.person);
  },

  watch: {
    "deposit.start": {
      handler(value) {
        this.deposit.start = value != "" ? value : "";
        this.fetchData();
        this.getData();
      },
      // deep: true,
    },

    "deposit.due": {
      handler(value) {
        this.deposit.due = value != "" ? value : "";
        this.fetchData();
        this.getData();
      },
    },

      person: {
      handler(value) {
        if (value) {
          this.fetchData();
          this.getData();
        }
      }
      },
  },

  computed: {
    personName() {
      return this.person ? this.person.label.toUpperCase() : "";
    },
  },

  methods: {
    // formatLocalTime(tanggalIso) {
    //   if (value) {
    //     return moment(value).format('DD MMMM YYYY [pukul] HH:mm'); // Format tanggal Indonesia
    //   }
    //   return value;
    // },
    // formatLocalTime(tanggalIso) {
    //   // Parse string ISO 8601 ke objek Date
    //   const tanggal = new Date(tanggalIso);
    //   console.log("🚀 ~ formatLocalTime ~ tanggal:", tanggal)

    //   // Format ke string tanggal Indonesia
    //   const hari = String(tanggal.getUTCDate()).padStart(2, "0");
    //   console.log("🚀 ~ formatLocalTime ~ hari:", hari)
    //   const bulan = String(tanggal.getUTCMonth() + 1).padStart(2, "0"); // getUTCMonth() dimulai dari 0
    //   const tahun = tanggal.getUTCFullYear();
    //   const jam = String(tanggal.getUTCHours()).padStart(2, "0");
    //   const menit = String(tanggal.getUTCMinutes()).padStart(2, "0");
    //   const detik = String(tanggal.getUTCSeconds()).padStart(2, "0");

    //   return `${hari}-${bulan}-${tahun} ${jam}:${menit}:${detik}`;
    // },

    async getData() {
      const response = await this.$axios.get("/task/all", {
        params: { startDate: this.start, dueDate: this.due },
        headers: {
          pic: this.person.value,
          Authorization: `Bearer ${this.token}`,
        },
      });
      this.openTasks = response.data.filter(
        (task) => task.overdue !== true && task.status === "Open"
      );
      // this.TaskCompleted = response.data.filter((task) => task.status === "Close");
      // this.TaskInProgress = response.data.filter((task) => task.overdue !== true && task.status === "In-progress");
      this.overdueTasks = response.data.filter(
        (task) =>
          task.overdue === true && task.status !== "Close" && task.status !== "Wait-app"
      );
      // this.TaskTotal = response.data.length;
    },

    updateStartDate(val) {
      if (val) {
        const [year, month, day] = val.split("-");
        this.formattedStartDate = `${day}/${month}/${year}`;
      }
      this.$refs.popupProxy.hide();
    },

    updateDueDate(val) {
      if (val) {
        const [year, month, day] = val.split("-");
        this.formattedDueDate = `${day}/${month}/${year}`;
      }
      this.$refs.duePopupProxy.hide();
    },
    async fetchDivisionData() {
      try {
        const { status, data } = await this.$axios.get("/divisi", {
          headers: {
            branch: this.branchId,
            division: this.divisionId,
            title: this.title.toLowerCase(),
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

        if (error.response && error.response.status === 401) {
          alert("Your session has expired. Please sign in again.");
          // Arahkan pengguna ke halaman sign in
          this.$router.push( "/" ); // Sesuaikan dengan nama rute sign in Anda
        }
      }
    },

    // async fetchPersonData() {
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
    //     if(this.title.toLowerCase() === "director" || "direktur") {
    //     filteredData = data.filter(
    //       (user) => user.title.toLowerCase()!== "director" || "direktur" && user.title.toLowerCase()!== "admin"
    //     );
    //     }else if (this.title.toLowerCase() === "manager") {
    //       filteredData = data.filter(
    //       (user) => user.title.toLowerCase()!== "director" || "direktur" && user.title.toLowerCase()!== "admin" && user.title.toLowerCase()!== "manager"
    //     );
    //     }else if (this.title.toLowerCase() === "supervisor") {
    //       filteredData = data.filter(
    //       (user) => user.title.toLowerCase()=== "operator"
    //     );
    //     }else if (this.title.toLowerCase() === "operator") {
    //       filteredData = data.filter(
    //       (user) => user.u_name === this.username
    //     );
    //     }

    //     const listOfPerson = filteredData.map((data) => ({
    //       label: data.u_name,
    //       value: data.u_id,
    //       title: data.title,
    //     }));

    //     this.personOptions = listOfPerson;
    //     this.person = this.personOptions[0];

    //     const person = this.personOptions.length > 0 ? this.personOptions[0] : null;
    //     console.log("Selected Person:", person);
    //     this.fetchData(person);
    //   } catch (error) {
    //     console.error("Error fetching users:", error);
    //   }
    // },

    async fetchData() {
      try {
        if (!this.person) {
          this.Avgrate = 0;
        } else {
          const id = this.person.value;
          // console.log("ini id " + id);

          const response = await this.$axios.get("/rating/get-by-id/" + id, {
            headers: {
              "Content-Type": "application/json",
            },
          });

          // console.log("🚀 ~ fetchData ~ response:", response)

          if (!response.data.data.total_rating) {
            // console.log("gada")
            this.Avgrate = 0;
          } else {
            const total_rating = response.data.data.total_rating;
            // console.log("🚀 ~ fetchData ~ total_rating:", total_rating)
            const total_task = response.data.data.total_task;
            // console.log("🚀 ~ fetchData ~ total_task:", total_task)
            // console.log("hasil" + response.data.u_rate);
            const Avgrate = total_rating / total_task;
            // console.log("🚀 ~ fetchData ~ Avgrate:", Avgrate)
            this.Avgrate = parseFloat(Avgrate.toFixed(2));
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
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
