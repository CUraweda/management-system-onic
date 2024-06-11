<template>
  <q-page>
    <q-card
      class="q-mt-md row justify-end items-start text-h5 text-weight-bold text-black no-shadow q-ma-none q-pa-none"
    >
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
            v-model="formattedStartDate"
            mask="##/##/####"
            label="From"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  transition-show="scale"
                  transition-hide="scale"
                  ref="popupProxy"
                >
                  <q-date mask="YYYY-MM-DD" @input="updateStartDate" v-model="deposit.start" />
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
                  transition-show="scale"
                  transition-hide="scale"
                  ref="duePopupProxy"
                >
                  <q-date mask="YYYY-MM-DD" @input="updateDueDate" v-model="deposit.due" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </q-card-section>
      </div>
    </q-card>

    <q-expansion-item
      class="text-h5 text-weight-bold"
      popup
      default-opened
      icon=""
    >
      <div class="q-mx-md">
        <q-card class="table-bg no-shadow" bordered>
          <q-card-section>
            <div class="text-h5 text-weight-bold text-blue">
              Task Wait Approval
            </div>
          </q-card-section>

          <q-card-section class="q-pa-none">
            <q-table
              class="no-shadow q-ml-md"
              :data="waiting_data"
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

                  <q-td key="Progress" :props="props">
                    <div>{{ props.row.progress }} %</div>
                  </q-td>

                  <q-td key="detail" :props="props">
                    <div class="q-gutter-sm">
                      <q-btn dense unelevated @click="Detail(props.row.id)">
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
                        :disabled="
                          props.row.finished_at === null ||
                          (props.row.status !== 'In-progress' &&
                            props.row.status !== 'Idle')
                        "
                      />
                      @click="openEmployeeDialog(props.row.id)" />
                    </div>
                  </q-td>
                </q-tr>
              </template>
            </q-table>
          </q-card-section>
        </q-card>
      </div>
    </q-expansion-item>

    <q-expansion-item
      class="text-h5 text-weight-bold"
      popup
      default-opened
      icon=""
    >
      <div class="q-mx-md">
        <q-card class="table-bg no-shadow" bordered>
          <q-card-section>
            <div class="text-h5 text-weight-bold text-green">This Week</div>
          </q-card-section>

          <q-card-section class="q-pa-none">
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

                  <q-td key="Progress" :props="props">
                    <div>{{ props.row.progress }} %</div>
                  </q-td>

                  <q-td key="detail" :props="props">
                    <div class="q-gutter-sm">
                      <q-btn dense unelevated @click="Detail(props.row.id)">
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
                        :disabled="
                          props.row.finished_at === null ||
                          (props.row.status !== 'In-progress' &&
                            props.row.status !== 'Idle')
                        "
                      />
                      @click="openEmployeeDialog(props.row.id)" />
                    </div>
                  </q-td>
                </q-tr>
              </template>
            </q-table>
          </q-card-section>
        </q-card>
      </div>
    </q-expansion-item>

    <q-expansion-item
      class="text-h5 text-weight-bold"
      popup
      default-opened
      icon=""
    >
      <div class="q-mx-md">
        <q-card class="table-bg no-shadow" bordered>
          <q-card-section>
            <div class="text-h5 text-weight-bold text-red">Deleted Task</div>
          </q-card-section>

          <q-card-section class="q-pa-none">
            <q-table
              class="no-shadow q-ml-md"
              :data="deleted_data"
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

                  <q-td key="Progress" :props="props">
                    <div>{{ props.row.progress }} %</div>
                  </q-td>

                  <q-td key="detail" :props="props">
                    <div class="q-gutter-sm">
                      <q-btn dense unelevated @click="Detail(props.row.id)">
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
                        :disabled="
                          props.row.finished_at === null ||
                          (props.row.status !== 'In-progress' &&
                            props.row.status !== 'Idle')
                        "
                      />
                      @click="openEmployeeDialog(props.row.id)" />
                    </div>
                  </q-td>
                </q-tr>
              </template>
            </q-table>
          </q-card-section>
        </q-card>
      </div>
    </q-expansion-item>
  </q-page>
</template>

<script>
import Cookies from 'js-cookie';
import { exportFile } from "quasar";
import { defineComponent } from "vue";
import axios from "axios";
import {date} from 'quasar';
// import Status from "components/Status"
import { store } from "../../store/store.js";
import { ref } from "vue";

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

  formatted =
    formatted === void 0 || formatted === null ? "" : String(formatted);

  formatted = formatted.split('"').join('""');

  return "${formatted}";
}

export default {
  name: "TaskMonitoring",
  data() {
    return {
      loading: ref(true),
      formattedDueDate:'',
      formattedStartDate:'',
    divisionId: sessionStorage.getItem("division_id")? sessionStorage.getItem("division_id") : Cookies.get("division_id"),
      branchId: sessionStorage.getItem("branch_id")? sessionStorage.getItem("branch_id") : Cookies.get("branch_id"),
      token: ref(sessionStorage.getItem("token")? sessionStorage.getItem("token") : Cookies.get("token")),
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
      ],
      data: [],
      waiting_data: [],
      deleted_data: [],
      pagination: {
        rowsPerPage: 10,
      },
    };
  },
  setup() {
    return {

      onItemClick() {},
    };
  },


  mounted() {
    const { start, end } = this.getStartAndEndOfWeek();
    this.deposit.start = this.formatDate(start);
    this.deposit.due = this.formatDate(end);
    this.updateStartDate(this.deposit.start)
    this.updateDueDate(this.deposit.due)
    this.fetchDeletedData();
    this.fetchData();
    this.fetchWaitedData();
    // this.intervalId = setinterval(() => {
    //   this.fetchDeletedData();
    //   this.fetchData();
    //   this.fetchWaitedData();
    // });
  },
  watch: {
    "deposit.due": {
      handler(value) {
        this.fetchData();
        this.fetchDeletedData();
        this.fetchWaitedData();
      },
    },

    "deposit.start": {
      handler(value) {
        this.fetchData();
        this.fetchDeletedData();
        this.fetchWaitedData();
      },
    },

    "search": {
      handler(value) {
        this.search = value != "" ? value : "";
        this.fetchData();
        this.fetchDeletedData();
        this.fetchWaitedData();
      },
  },
},

    methods: {
    getStartAndEndOfWeek() {
      const today = new Date();
      const dayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)
      const startOfYear = new Date(today.getFullYear(), 0, 1); // 1st January of current year
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
        start: startOfYear,
        end: endOfWeek
      };
    },

    formatDate(dateObj) {
      return date.formatDate(dateObj, 'YYYY-MM-DD');
    },

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
    async fetchData() {
      try {
        const statusFilter = this.$route.query.status;
        const id = sessionStorage.getItem("id")? sessionStorage.getItem("id") : Cookies.get("id");
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
            "pic": id,
            "Authorization": `Bearer ${this.token}`,
          },
        });
        this.data = response.data.sort(
          (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
        );
      this.loading = false;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
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
         timeZone: "Asia/Jakarta", // Pastikan waktu yang diterima dianggap sebagai waktu UTC
      };

      const localTime = new Date(utcTime).toLocaleString("id-ID", options);
      return localTime;
    },

    async fetchWaitedData() {
      try {
        const statusFilter = this.$route.query.status;
        const id = sessionStorage.getItem("id")? sessionStorage.getItem("id") : Cookies.get("id");
        const response = await this.$axios.get("/task/waited", {
          params: {
            status: "Wait-app",
            search: this.search,
            startDate: this.deposit.start,
            dueDate: this.deposit.due,
          },
          headers: {
            "pic": id,
            "Authorization": `Bearer ${this.token}`,
          },
        });
        this.waiting_data = response.data.sort(
          (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
        );
      this.loading = false;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },

    async fetchDeletedData() {
      try {
        const statusFilter = this.$route.query.status;
        const id = sessionStorage.getItem("id")? sessionStorage.getItem("id") : Cookies.get("id");
        const response = await this.$axios.get("/task/deleted", {
          params: {
            status: "Deleted",
            search: this.search,
            startDate: this.deposit.start,
            dueDate: this.deposit.due,
          },
          headers: {
            "pic": id,
            "Authorization": `Bearer ${this.token}`,
          },
        });
        this.deleted_data = response.data.sort(
          (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
        );
      this.loading = false;
      } catch (error) {
        console.error("Error fetching data:", error);
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
        this.options = stringOptions.filter(
          (v) => v.toLowerCase().indexOf(needle) > -1
        );
      });
    },

    Detail(id) {
      store.id = id;
      this.$router.push("task_detail/");
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

thead tr:first-child th {
  /* bg color is important for th; just specify one */
  background-color: #f8f9fa;
  border-bottom: 3px solid white;
}

.under-title-date {
  width: 100%;
  height: 100%;
  max-height: 100px;
  width: 100px;
  border-radius: 8px;
}
</style>
