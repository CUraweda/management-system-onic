<template>
  <q-page>
    <div>
      <q-card-section class="text-h5 text-weight-bold text-black">
        <div class="row items-start">
          <div class="">
            Detail Task
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

              <q-btn-dropdown
                unelevated
                text-color="dark"
                color="grey-3"
                label="Category"
                dropdown-icon="expand_more"
                no-caps
                class="text-weight-regular under-title bg-grey-2 col-lg-2 col-md-2 col-sm-5 col-xs-5"
              >
                <q-list>
                  <q-item clickable v-close-popup @click="onItemClick">
                    <q-item-section>
                      <q-item-label>Category 1</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable v-close-popup @click="onItemClick">
                    <q-item-section>
                      <q-item-label>Category 2</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable v-close-popup @click="onItemClick">
                    <q-item-section>
                      <q-item-label>Category 3</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>

              <q-select
                class="bg-grey-2 col-lg-2 col-md-2 col-sm-5 col-xs-5 under-title"
                filled
                v-model="deposit.account"
                use-input
                multiple
                dense
                input-debounce="0"
                label="Filter"
                :options="options"
                @filter="filterFn"
                dropdown-icon="filter_list"
              ></q-select>

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
              :class="
                props.row.status == 'Idle'
                  ? 'bg-yellow-3 text-black'
                  : 'bg-white text-black'
              "
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

              <q-td key="pic_title" :props="props">
                <div>{{ props.row.pic_title }}</div>
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
                    props.row.status == 'Deleted'
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
                <div>{{ props.row.progress }}</div>
              </q-td>

              <q-td key="Review" :props="props">
                <div class="q-gutter-sm">
                  <q-btn dense unelevated @click="Report(props.row.id)">
                    <q-icon name="img:/statics/reportc.svg" />
                  </q-btn>
                </div>
              </q-td>
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
                v-model="model"
                color="orange"
                :min="0"
                :max="5"
                markers
                :marker-labels="model"
                label-always
                :label-value="model"
              />
              <q-btn
                class="q-px-sm bg-yellow-2 text-yellow-9"
                v-close-popup
                unelevated
                @click="submit"
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
import axios from "axios";
import { ref } from "vue";
import { exportFile } from "quasar";
// import Status from "components/Status"
import { store } from "../../store/store";

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

  return `"${formatted}"`;
}

export default {
  name: "TaskMonitoring2",
  data() {
    return {
      filter: "",
      mode: "list",
      invoice: {},
      selected: [],
      search: "",
      deposit: {
        start:"",
        due:"",
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
          name: "pic_title",
          align: "left",
          label: "Title",
          field: "pic_title",
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
          name: "Review",
          align: "left",
          label: "Review",
          field: "Review",
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
  },
  watch: {
    search: {
      handler(value) {
        this.search = value != "" ? value : "";
        this.fetchData();
      },
    },
  },
  setup() {
    return {
      model: ref(0),
      yellow: ["yellow"],
      id: store.id,
      onItemClick() {
        // console.log('Clicked on an Item')
      },
    };
  },

  methods: {
    formatLocalTime(utcTime) {
      const localTime = new Date(utcTime).toLocaleString();
      return localTime;
    },

    async fetchData() {
      try {
        const response = await this.$axios.get("/task/waited", {
          params: {
            search: this.search,
          },
        });

        this.data = response.data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
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

    Report(id) {
      store.id = id;
      this.$router.push("report/");
    },

    acc() {
      this.$q.notify({
        message: "Task Accepted",
      });
    },

    submit() {
      this.$q.notify({
        message: "Task Done",
      });
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
