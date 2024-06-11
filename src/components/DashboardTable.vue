<template>
  <div id="chart">
    <q-card class="no-shadow border-sm q-mx-lg" bordered>
      <q-table
      class="no-shadow q-mx-md"
      :data="data"
      :hide-header="mode === 'grid'"
      :columns="columns"
      row-key="pic"
      :grid="mode == 'grid'"
      :pagination.sync="pagination"
      :loading="loading"
      >
      <template #loading>
        <q-inner-loading showing color="primary">
        </q-inner-loading>
      </template>

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

            <!-- <q-td key="detail" :props="props">
              <div class="q-gutter-sm">
                <q-btn dense unelevated @click="Report(props.row.id)">
                  <q-icon name="img:/statics/reportc.svg" />
                </q-btn>
              </div>
            </q-td> -->

            <!-- <q-td key="feed" :props="props">
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
                  :disable="props.row.spv.toLowerCase() !== username.toLowerCase()"
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
                    props.row.spv.toLowerCase() !== username.toLowerCase()
                  "
                  @click="openEmployeeDialog(props.row)"
                />
              </div>
            </q-td> -->

            <!-- action -->
            <!-- <q-td key="action" :props="props">
              <div class="q-gutter-sm">
                <q-btn
                  dense
                  class="under-title q-px-sm text-green"
                  no-caps
                  unelevated
                  color="green-2"
                  rounded
                  label="Edit"
                  :disable="props.row.spv.toLowerCase() !== username.toLowerCase()"
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
                  :disable="props.row.spv.toLowerCase() !== username.toLowerCase()"
                  @click="Delete(props.row.id)"
                />
              </div> -->
            <!-- </q-td> -->
            <!-- action -->
          </q-tr>
        </template>
      </q-table>
    </q-card>
  </div>
</template>

<script>
import { ref } from "vue";
import { eventBus } from "../event-bus.js";
import Cookies from 'js-cookie';

export default {
  name: "DashboardTable",
  data() {
    return {
      mode: "list",
      loading: ref(true),
      person: null,
      personId: sessionStorage.getItem("person_id")? sessionStorage.getItem("person_id") : Cookies.get("person_id"),
      divisionId: sessionStorage.getItem("division_id")? sessionStorage.getItem("division_id") : Cookies.get("division_id"),
      branchId: sessionStorage.getItem("branch_id")? sessionStorage.getItem("branch_id") : Cookies.get("branch_id"),
      token: ref(sessionStorage.getItem("token")? sessionStorage.getItem("token") : Cookies.get("token")),
      username: sessionStorage.getItem("username")? sessionStorage.getItem("username") : Cookies.get("username"),
      title: sessionStorage.getItem("title")? sessionStorage.getItem("title") : Cookies.get("title"),
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
        // {
        //   name: "detail",
        //   align: "left",
        //   label: "Detail",
        //   field: "detail",
        //   sortable: true,
        // },
        // {
        //   name: "feed",
        //   align: "left",
        //   label: "Feedback",
        //   field: "feed",
        //   sortable: true,
        // },
        // {
        //   name: "action",
        //   align: "left",
        //   label: "Action",
        //   field: "action",
        //   sortable: true,
        // },
      ],
      data: [],
      pagination: {
        // page: 1,
        rowsPerPage: 10, // jumlah item per halaman
      },
    };
  },
  watch: {
    "deposit.start": {
      handler(value) {
        this.deposit.start = value != "" ? value : "";
        this.fetchDataTable();
      },
      // deep: true,
    },

    "deposit.due": {
      handler(value) {
        this.deposit.due = value != "" ? value : "";
        this.fetchDataTable();
      },
    },

      person: {
      handler(value) {
        if (value) {
          this.fetchDataTable();
        }
      }
      },
    },

  mounted() {
    eventBus.$on('person-selected', person => {
      this.person = person;
      // console.log('Person yang dipilih:', this.person);
      this.fetchDataTable();
    });
    eventBus.$on('start-date-selected', start => {
      this.start = start;
      // console.log('Start yang dipilih:', this.start);
      this.fetchDataTable();
    });
    eventBus.$on('due-date-selected', due => {
      this.due = due;
      // console.log('Due yang dipilih:', this.due);
      this.fetchDataTable();
    });
  },

  methods: {
      async fetchDataTable() {
        try {
        if (!this.person) {
          this.data = []
        }

        const response = await this.$axios.get("/task/all", {
          params: {
            startDate: this.start,
            dueDate: this.due,
          },
          headers: {
          pic: this.person.value,
          // title: this.title,
          // branch: this.branchId,
          // division: this.divisionId,
          Authorization: `Bearer ${this.token}`,
        },
        });

        if (Array.isArray(response.data)) {
          this.data = response.data.sort(
            (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
          );
          this.loading = false;
        } else {
          console.error("Invalid response format:", response);
        }
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
