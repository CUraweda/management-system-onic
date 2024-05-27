<template>
  <q-page>
    <div>
      <q-card-section class="text-h5 text-weight-bold text-black">
        <div class="row items-start">
          <div class="">
            {{ statusFilter ? statusFilter + " Task" : "Detail Task" }}
            <q-icon name="text_snippet" color="cyan" class="q-mb-none" />
          </div>
          <q-space></q-space>
          <div class="col-lg-6 col-md-7 col-sm-12 col-xs-12">
            <q-card-section class="row q-gutter-xs q-pt-none justify-between">
              <q-input
                class="bg-grey-2 col-lg-2 col-md-2 col-sm-12 col-xs-12 under-title"
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

              <q-btn
                class="under-title col-lg col-md col-sm-12 col-xs-12"
                color="cyan"
                icon-right="upgrade"
                text-color="cyan"
                unelevated
                dense
                outline
                label="Export"
                no-caps
                @click="exportTable"
              />
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
          :hide-header="mode === 'grid'"
          :columns="columns"
          row-key="pic"
          :grid="mode == 'grid'"
          :filter="filter"
          :pagination.sync="pagination"
        >
          <template v-slot:body="props">
            <q-tr
              :props="props"
              :class="props.row.overdue ? 'bg-yellow-3 text-black' : 'bg-white text-black'"
            >
              <q-td key="id" :props="props">
                <div>{{ props.row.id }}</div>
              </q-td>

              <q-td key="task_title" :props="props">
                <div>{{ props.row.task_title }}</div>
              </q-td>

              <q-td key="pic" :props="props">
                <div>{{ props.row.pic }}</div>
              </q-td>

              <q-td key="pic_role" :props="props">
                <div>{{ props.row.pic_role }}</div>
              </q-td>

              <q-td key="start_date" :props="props">
                <div>{{ formatLocalTime(props.row.start_date) }}</div>
              </q-td>

              <q-td key="due_date" :props="props">
                <div>{{ formatLocalTime(props.row.due_date) }}</div>
              </q-td>

              <!-- priority -->

              <q-td key="priority" :props="props">
                <q-chip
                  :color="
                    props.row.priority == 'Important'
                      ? 'white text-red'
                      : props.row.priority == 'High'
                      ? 'white text-orange'
                      : props.row.priority == 'Normal'
                      ? 'white text-blue'
                      : 'secondary'
                  "
                  text-color="white"
                  dense
                  class="text-center under-title q-px-sm tex"
                  rounded
                  >{{ props.row.priority }}
                </q-chip>
              </q-td>

              <q-td key="status" :props="props">
                <q-chip
                  :color="
                    props.row.status == 'Close'
                      ? 'white text-deep-orange'
                      : props.row.status == 'Deleted'
                      ? 'white text-red'
                      : props.row.status == 'Idle'
                      ? 'white text-orange'
                      : props.row.status == 'Wait-app'
                      ? 'white text-blue'
                      : props.row.status == 'Completed'
                      ? 'white text-blue'
                      : props.row.status == 'In-progress'
                      ? 'white text-orange'
                      : props.row.status == 'Open'
                      ? 'white text-green'
                      : 'secondary'
                  "
                  dense
                  class="under-title q-px-sm tex"
                  rounded
                  >{{ props.row.status }}
                </q-chip>
              </q-td>

              <!-- priority -->
              <q-td key="Progress" :props="props">
                <q-linear-progress
                  grey
                  :color="getColor(props.row.progress)"
                  :value="props.row.progress / 100"
                  class="q-mt-md"
                />
              </q-td>

              <q-td key="progress" :props="props">
                <div>{{ props.row.progress }}%</div>
              </q-td>

              <q-td key="detail" :props="props">
                <div class="q-gutter-sm">
                  <q-btn dense unelevated @click="Report(props.row.id)">
                    <q-icon name="img:/statics/reportc.svg" />
                  </q-btn>
                </div>
              </q-td>

              <q-td key="feed" :props="props">
                <div class="q-gutter-sm">
                  <q-btn
                    dense
                    class="under-title q-px-sm"
                    rounded
                    no-caps
                    unelevated
                    color="red-2"
                    text-color="red"
                    label="Revise"
                    :disable="props.row.spv !== username"
                    @click="Revise(props.row.id)"
                  />
                  <q-btn
                    dense
                    unelevated
                    color="blue-2"
                    class="under-title q-px-sm"
                    rounded
                    text-color="blue"
                    label="OK"
                    :disable="
                      props.row.finished_at === null ||
                      (props.row.status !== 'In-progress' &&
                        props.row.status !== 'Idle') ||
                      props.row.spv !== username
                    "
                    @click="openEmployeeDialog(props.row)"
                  />
                </div>
              </q-td>

              <!-- action -->
              <q-td key="action" :props="props">
                <div class="q-gutter-sm">
                  <q-btn
                    dense
                    class="under-title q-px-sm text-green"
                    no-caps
                    unelevated
                    color="green-2"
                    rounded
                    label="Edit"
                    :disable="props.row.spv !== username"
                    @click="Edit(props.row.id)"
                  />
                  <q-btn
                    dense
                    class="under-title q-px-sm text-red"
                    no-caps
                    unelevated
                    color="red-2"
                    rounded
                    label="Delete"
                    :disable="props.row.spv !== username"
                    @click="Delete(props.row.id)"
                  />
                </div>
              </q-td>
              <!-- action -->
            </q-tr>
          </template>
        </q-table>
      </q-card>
      <q-dialog v-model="employee_dialog">
        <q-card class="" flat bordered>
          <q-card-section>
            <div class="text-h6">
              Beri Rating untuk Pekerja!
              <q-btn
                round
                flat
                dense
                icon="close"
                class="q-ml-sm float-right"
                color="grey-8"
                v-close-popup
              ></q-btn>
            </div>
          </q-card-section>
          <q-card-section>
            <div class="q-gutter-md row items-center">
              <q-slider
                class=""
                v-model="rate"
                color="orange"
                :min="0"
                :max="5"
                markers
                :marker-labels="rate"
                label-always
                :label-value="rate"
              />
              <q-btn
                class="q-px-sm bg-yellow-2 text-yellow-9"
                v-close-popup
                unelevated
                @click="submit()"
                >Submit</q-btn
              >
            </div>
          </q-card-section>
        </q-card>
      </q-dialog>
    </q-page>
  </q-page>
</template>

<script>
import Cookies from 'js-cookie';
import { ref } from "vue";
import { exportFile } from "quasar";
import { store } from "../../store/store";
import axios from "axios";
// import Status from "components/Status"

const stringOptions = [
  "Google",
  "Facebook",
  "Twitter",
  "Apple",
  "Apples1",
  "Apples2",
  "Oracle",
];

function wrapCsvValue(val, formatFn) {
  let formatted = formatFn !== void 0 ? formatFn(val) : val;

  formatted = formatted === void 0 || formatted === null ? "" : String(formatted);

  formatted = formatted.split('"').join('""');

  return `"${formatted}"`;
}

export default {
  name: "TaskMonitoring",
  data() {
    return {
    divisionId: sessionStorage.getItem("division_id")? sessionStorage.getItem("division_id") : Cookies.get("division_id"),
      branchId: sessionStorage.getItem("branch_id")? sessionStorage.getItem("branch_id") : Cookies.get("branch_id"),
      token: ref(sessionStorage.getItem("token")? sessionStorage.getItem("token") : Cookies.get("token")),
      username: sessionStorage.getItem("username")? sessionStorage.getItem("username") : Cookies.get("username"),
      title: sessionStorage.getItem("title")? sessionStorage.getItem("title") : Cookies.get("title"),
      id: ref(null),
      statusFilter: "",
      filter: "",
      mode: "list",
      invoice: {},
      selected: [],
      search: "",
      deposit: {
        start: "",
        due: "",
      },
      options: stringOptions,
      employee_dialog: false,
      columns: [
        {
          name: "id",
          align: "left",
          label: "Task Id",
          field: "id",
          sortable: true,
        },
        {
          name: "task_title",
          align: "left",
          label: "Project",
          field: "task_title",
          sortable: true,
        },
        {
          name: "pic",
          align: "left",
          label: "PIC",
          field: "pic",
          sortable: true,
        },
        {
          name: "pic_role",
          align: "left",
          label: "Title",
          field: "pic_role",
          sortable: true,
        },
        {
          name: "start_date",
          align: "left",
          label: "Start Project",
          field: "start_date",
          sortable: true,
        },
        {
          name: "due_date",
          align: "left",
          label: "End Project",
          field: "due_date",
          sortable: true,
        },
        {
          name: "status",
          align: "center",
          label: "Stage saat ini",
          field: "status",
          sortable: true,
        },
        {
          name: "Progress",
          align: "left",
          label: "Progress bar",
          field: "Progress",
          sortable: true,
        },
        {
          name: "progress",
          align: "left",
          label: "%",
          field: "progress",
          sortable: true,
        },
        {
          name: "detail",
          align: "left",
          label: "Detail",
          field: "detail",
          sortable: true,
        },
        {
          name: "feed",
          align: "left",
          label: "Feedback",
          field: "feed",
          sortable: true,
        },
        {
          name: "action",
          align: "left",
          label: "Action",
          field: "action",
          sortable: true,
        },
      ],
      data: [],
      pagination: {
        rowsPerPage: 5,
      },
    };
  },
  mounted() {
    this.fetchData();
    this.intervalId = setInterval(() => {
      this.fetchData();
    }, 60000);
    this.statusFilter = this.$route.query.status;
  },

  beforeDestroy() {
    clearInterval(this.intervalId);
  },

  setup() {
    return {

      rate: ref(0),
      yellow: ["yellow"],
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
      // deep: true,
    },

    search: {
      handler(value) {
        this.search = value != "" ? value : "";
        this.fetchData();
      },
    },
  },

  methods: {
    openEmployeeDialog(row) {
      this.id = row.id;
      this.pic = row.pic;
      this.employee_dialog = true;
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

    Edit(id) {
      store.id = id;
      this.$router.push("edit/");
    },

    Report(id) {
      store.id = id;
      this.$router.push("report/");
    },

    async Delete(id) {
      const data = {
        status: "Deleted",
        deleted_at: new Date().toISOString(),
      };

      try {
        const response = await this.$axios.put("/task/edit/" + id, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          this.$q.notify({
            message: "Task Deleted",
          });
          this.fetchData();
        } else {
          this.$q.notify({
            message: "Failed Deleted Task",
          });
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },

    async fetchTaskById(id) {
      try {
        const response = await this.$axios.get("/task/get-by-id/" + id, {
          headers: {
            branch: this.branchId,
            division: this.divisionId,
            Authorization: `Bearer ${this.token}`,
          },
        });
        return response.data;
      } catch (error) {
        console.error("Error fetching task by ID:", error);
        throw error; // lemparkan kembali kesalahan untuk ditangani di luar
      }
    },

    async Revise(id) {
      try {
        let taskToRevise = await this.fetchTaskById(id);
        taskToRevise.status = "Open";
        taskToRevise.progress = 0;
        taskToRevise.approved_at = null;
        taskToRevise.approved_by = null;
        taskToRevise.finished_at = null;
        taskToRevise.finished_by = null;
        taskToRevise.started_at = null;
        taskToRevise.started_by = null;

        const createTaskResponse = await this.$axios.post("/task/new", taskToRevise, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!createTaskResponse.status === 200)
          throw Error("Failed to create revised task");

        await this.Delete(id);
        this.$q.notify({
          message: "Task Revised",
        });
        this.fetchData();
      } catch (error) {
        console.error("Error:", error);
        return this.$q.notify(error.message);
      }
      this.fetchData();
    },

    async fetchData() {
      try {
        const statusFilter = this.$route.query.status;
        const response = await this.$axios.get("/task/all", {
          params: {
            status: statusFilter,
            search: this.search,
            startDate: this.deposit.start,
            dueDate: this.deposit.due,
          },
          headers: {
          title: this.title,
          branch: this.branchId,
          division: this.divisionId,
          Authorization: `Bearer ${this.token}`,
        },
        });

        if (Array.isArray(response.data)) {
          this.data = response.data.sort(
            (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
          );
        } else {
          console.error("Invalid response format:", response);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },

    getRowColor(status) {
      if (status === "Open") {
        return "bg-blue-3"; // Change it to your desired color class
      }
      return ""; // No background color for other statuses
    },

    async submit() {
      try {
        const data = {
          status: "Close",
          approved_at: new Date().toISOString(),
          pic_rating: this.rate,
          pic: this.pic,
        };

        const response = await this.$axios.put("/task/acc/" + this.id, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status != 200) throw Error("Terjadi kesalahan, mohon coba ulang");
        this.$q.notify({
          message: "Task Done",
        });
        this.fetchData();
      } catch (err) {
        console.log(err);
        return this.$q.notify(error.message);
      }
    },

    filterFn(val, update) {
      if (val === "") {
        update(() => {
          this.options = stringOptions;
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        this.options = stringOptions.filter((v) => v.toLowerCase().indexOf(needle) > -1);
      });
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
                    : row[col.field === void 0 ? col.pic : col.field],
                  col.format
                )
              )
              .join(",")
          )
        )
        .join("\r\n");

      const status = exportFile("change-request.csv", content, "text/csv");

      if (status !== true) {
        this.$q.notify({
          message: "Browser denied file download...",
          color: "negative",
          icon: "warning",
        });
      }
    },

    getColor(val) {
      if (val > 70 && val <= 100) {
        return "green";
      } else if (val > 50 && val <= 70) {
        return "blue";
      }
      return "red";
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
