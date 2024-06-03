<template>
  <q-page>
    <div>
      <q-card-section class="text-h5 text-weight-bold text-black">
        <div class="row items-start">
          <div class="">
            Task Upload
            <q-icon name="text_snippet" color="cyan" class="q-mb-none" />
          </div>
          <q-space></q-space>
          <div class="col-lg-6 col-md-7 col-sm-12 col-xs-12">
            <q-card-section class="row q-gutter-xs q-pt-none justify-between">
              <q-input
                class="bg-grey-2 col-lg-2 col-md-4 col-sm-12 col-xs-12 under-title"
                dense
                text-color="black"
                standout="bg-grey-3 no-shadow under-title"
                v-model="search"
                placeholder="Search..."
              >
                <template v-slot:prepend>
                  <q-icon name="search" text-color="black" />
                  <q-icon class="cursor-pointer col" />
                </template>
              </q-input>

              <q-input
                class="bg-grey-3 q-px-md under-title col-lg-2 col-md-2 col-sm-5 col-xs-5"
                borderless
                dense
                v-model="formattedStartDate"
                mask="##/##/####"
                label="From"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      ref="startDateProxy"
                      transition-show="scale"
                      transition-hide="scale"
                    >
                    <q-date v-model="start" @input="updateStartDate" mask="YYYY-MM-DD" />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>

              <q-input
                class="bg-grey-3 q-px-md under-title col-lg-2 col-md-2 col-sm-5 col-xs-5"
                borderless
                dense
                v-model="formattedDueDate"
                mask="##/##/####"
                label="To"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      ref="dueDateProxy"
                      transition-show="scale"
                      transition-hide="scale"
                    >
                    <q-date v-model="end" @input="updateDueDate" mask="YYYY-MM-DD" />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>

              <q-btn
                class="under-title col-lg col-md col-sm-12 col-xs-12"
                color="cyan"
                icon-right="upgrade"
                text-color="cyan"
                unelevated
                dense
                outline
                label="Import Task"
                no-caps
                @click="uploadTask = true"
              />
              <q-dialog v-model="uploadTask">
                <q-card>
                  <q-card-section class="row items-center q-pb-none">
                    <div class="text-h6">Upload Excel File</div>
                    <q-space />
                    <q-btn icon="close" flat round dense v-close-popup />
                  </q-card-section>

                  <q-card-section>
                    <q-file
                      v-model="fileTask"
                      label="Upload File"
                      filled
                      text-color="black"
                      style="width: 400px"
                    >
                      <template v-slot:prepend>
                        <q-icon name="attach_file" />
                      </template>
                    </q-file>
                  </q-card-section>
                  <q-card-actions align="right">
                    <q-btn label="Submit" @click="importExcel" color="cyan" />
                  </q-card-actions>
                </q-card>
              </q-dialog>
            </q-card-section>
          </div>
        </div>
      </q-card-section>
    </div>

    <q-page class="q-pa-sm">
      <q-card>
        <q-table
          class="no-shadow q-ml-md"
          :data="data"
          :columns="columns"
        >
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="no" :props="props">
                <div>{{ props.row.no }}</div>
              </q-td>

              <q-td key="file_names" :props="props">
                <div>{{ props.row.fileName }}</div>
              </q-td>

              <q-td key="upload_date" :props="props">
                <div>{{ formatLocalTime(props.row.uploadedDate) }}</div>
              </q-td>

              <q-td key="upload_by" :props="props">
                <div>{{ props.row.uploadedBy }}</div>
              </q-td>

              <q-td key="jabatan" :props="props">
                <div>{{ props.row.jabatan }}</div>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </q-card>
    </q-page>
  </q-page>
</template>

<script>
import Cookies from "js-cookie";
import axios from "axios";
import {date} from 'quasar';
import { ref } from "vue";
import { exportFile } from "quasar";
// import Status from "components/Status"
import { store } from "../../store/store";

export default {
  name: "TaskMonitoring3",
  data() {
    return {
      loading: ref(true),
      formattedDueDate:'',
      formattedStartDate:'',
      divisionId: sessionStorage.getItem("division_id")
        ? sessionStorage.getItem("division_id")
        : Cookies.get("division_id"),
      branchId: sessionStorage.getItem("branch_id")
        ? sessionStorage.getItem("branch_id")
        : Cookies.get("branch_id"),
      search: ref(""),
      start: ref(),
      employes: [],
      role: [],
      end: ref(),
      pagination: {
        page: 1,
        rowsPerPage: 0, // jumlah item per halaman
      },
    };
  },

  setup() {
    return {
      token: ref(
        sessionStorage.getItem("token")
          ? sessionStorage.getItem("token")
          : Cookies.get("token")
      ),
      fileTask: ref(),
      data: ref([]),
      columns: [
        {
          name: "no",
          align: "left",
          label: "No",
          field: "no",
          sortable: true,
        },
        {
          name: "file_names",
          align: "left",
          label: "File Names",
          field: "fileName",
          sortable: true,
        },
        {
          name: "upload_date",
          align: "left",
          label: "Upload Date",
          field: "uploadDate",
          sortable: true,
        },
        {
          name: "upload_by",
          align: "left",
          label: "Upload By",
          field: "uploadBy",
          sortable: true,
        },
        {
          name: "jabatan",
          align: "left",
          label: "Jabatan",
          field: "jabatan",
          sortable: true,
        },
      ],
      uploadTask: ref(false),
    };
  },


  mounted() {
    const { startDate, endDate } = this.getStartAndEndOfWeek();
    this.start = this.formatDate(startDate);
    this.end = this.formatDate(endDate);
    this.updateStartDate(this.start)
    this.updateDueDate(this.end)
    this.getRole();
    this.fetchPersonData();
    this.fetchHistory();
    this.intervalId = setInterval(() => {
      this.fetchHistory();
    }, 60000);
  },

  beforeDestroy() {
    clearInterval(this.intervalId);
  },

  watch: {
    uploadTask: {
      handler(value) {
        if (!value) this.fileTask = null;
      },
    },
    search: {
      handler(value) {
        this.search = value != "" ? value : "";
        this.fetchHistory();
      },
    },
    start: {
      handler(value) {
        this.start = this.formatDashToSlash(value);
        this.fetchHistory();
      },
    },
    end: {
      handler(value) {
        this.end = this.formatDashToSlash(value);
        this.fetchHistory();
      },
    },
  },

    methods: {
    getStartAndEndOfWeek() {
      const today = new Date();
      const dayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)
      const startOfWeek = new Date(today);
      const endOfWeek = new Date(today);

      // Set startOfWeek to the previous Monday
      const diffToMonday = (dayOfWeek + 6) % 7;
      startOfWeek.setDate(today.getDate() - diffToMonday);
      startOfWeek.setHours(0, 0, 0, 0); // Set to 00:00

      // Set endOfWeek to the next Sunday
      const diffToSunday = (7 - dayOfWeek) % 7;
      endOfWeek.setDate(today.getDate() + diffToSunday);
      endOfWeek.setHours(23, 59, 59, 999); // Set to 23:59:59.999 for end of day

      return {
        startDate: startOfWeek,
        endDate: endOfWeek
      };
    },

    formatDate(dateObj) {
      return date.formatDate(dateObj, 'YYYY-MM-DD');
    },

      formatLocalTime(utcTime) {
      if (utcTime === null) {
        return ""; // Jika utcTime null, kembalikan string kosong
      }

      const options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: false,
        timeZone: "UTC", // Pastikan waktu yang diterima dianggap sebagai waktu UTC
      };

      const localTime = new Date(utcTime).toLocaleString("id-ID", options);
      return localTime;
    },

    updateStartDate (val) {
      if (val) {
        const [year, month, day] = val.split('-')
        this.formattedStartDate = `${day}/${month}/${year}`
      }
      this.$refs.startDateProxy.hide()
    },

    updateDueDate (val) {
      if (val) {
        const [year, month, day] = val.split('-')
        this.formattedDueDate = `${day}/${month}/${year}`
      }
      this.$refs.dueDateProxy.hide()
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
        // console.log("🚀 ~ getRole ~ this.roles:", this.roles)
      } catch (err) {
        console.error(err);
        throw err;
      }
    },

    async fetchPersonData() {
      const loginUrl = "https://office.onic.co.id/api/master/employee/active";

      // Make the POST request using fetch
      try {
        const response = await axios.get(loginUrl, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${this.token}`,
          },
        });

        if (response.status !== 200) {
          throw Error("Error while fetching");
        }

        const userRolesMap = {};

        this.roles.forEach((role) => {
          userRolesMap[role.u_id] = role;
        });

        const listOfPerson = response.data.data.map((data) => ({
          id: data.id,
          username: data.name,
          role: userRolesMap[data.id] ? userRolesMap[data.id].role : "",
        }));

        this.employes = listOfPerson;
        console.log("🚀 ~ fetchPersonData ~ employes:", this.employes);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },

    formatDashToSlash(data) {
      return data.replace(/\//g, "-");
    },

    async fetchHistory() {
      try {
        const histories = await this.$axios.get("/upload/", {
          params: {
            search: this.search,
            ...(this.start && { from: this.start }),
            ...(this.end && { to: this.end }),
          },
        });
        this.data = histories.data.data;
        console.log(this.data);
      } catch (err) {
        console.log(err);
        return this.$q.notify({
          message: "Error occured while fetching data",
        });
      }
    },

    async importExcel() {
      try {
        if (!this.token) throw Error("You need to Log In first");
        if (!this.fileTask) throw Error("Please include an Excel file");
        const username = sessionStorage.getItem("username")
        ? sessionStorage.getItem("username")
        : Cookies.get("username")
        const u_id = sessionStorage.getItem("id")
        ? sessionStorage.getItem("id")
        : Cookies.get("id")
        const title = sessionStorage.getItem("role")
        ? sessionStorage.getItem("role")
        : Cookies.get("role")
        const user = {username, u_id, title}
        console.log("🚀 ~ importExcel ~ this.employes:", this.employes);
        const formData = new FormData();
        formData.append("file", this.fileTask);
        formData.append("user", JSON.stringify(user));
        formData.append("employes", JSON.stringify(this.employes));

        const { status, data } = await this.$axios.post(
          "/upload/store-excel/",
          formData,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (status != 200) throw Error(data.message);
        this.fileTask = null;
        this.$router.push({ path: "/manager/task_monitoring" });
        return this.$q.notify({
          message: data.message,
        });
      } catch (err) {
        console.log(err);
        return this.$q.notify({
          message: err.message,
        });
      }
    },
  },
};
</script>
<style scoped>
.my-card {
  width: 175px;
}

.under-title-date {
  width: 100%;
  height: 100%;
  max-height: 100px;
  width: 100px;
  border-radius: 8px;
}
</style>
