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
                @click="uploadTask = true"
              />
              <q-dialog v-model="uploadTask">
                <q-card>
                  <q-card-section class="row items-center q-pb-none">
                    <div class="text-h6">Upload Task</div>
                    <q-space />
                    <q-btn icon="close" flat round dense v-close-popup />
                  </q-card-section>

                  <q-card-section>
                    <q-file
                      v-model="fileTask"
                      label="Upload File"
                      filled
                      style="width: 400px"
                      multiple
                    >
                      <template v-slot:prepend>
                        <q-icon name="attach_file" />
                      </template>
                    </q-file>
                  </q-card-section>
                  <q-card-actions align="right">
                    <q-btn label="Submit" color="cyan" />
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
          :hide-header="mode === 'grid'"
          :columns="columns"
          row-key="pic"
          :grid="mode == 'grid'"
          :filter="filter"
          :pagination.sync="pagination"
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
                <div>{{ props.row.uploadDate }}</div>
              </q-td>

              <q-td key="upload_by" :props="props">
                <div>{{ props.row.uploadBy }}</div>
              </q-td>

              <q-td key="jabatan" :props="props">
                <div>{{ props.row.jabatan }}</div>
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

  formatted = S;
  formatted === void 0 || formatted === null ? "" : String(formatted);

  formatted = formatted.split('"').join('""');

  return `"${formatted}"`;
}

export default {
  name: "TaskMonitoring3",
  data() {
    return {
      fileTask: ref(),
      uploadTask: ref(false),
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
      data: [],
      pagination: {
        rowsPerPage: 5,
      },
    };
  },

  setup() {
    return {
      token: ref(localStorage.getItem("token")),
      model: ref(0),
      yellow: ["yellow"],
      id: store.id,
      onItemClick() {},
    };
  },

  mounted() {},

  watch: {},

  methods: {
    formatLocalTime(utcTime) {
      const localTime = new Date(utcTime).toLocaleString();
      return localTime;
    },

    getRowColor(status) {
      if (status === "Open") {
        return "bg-blue-3"; // Change it to your desired color class
      }
      return ""; // No background color for other statuses
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
