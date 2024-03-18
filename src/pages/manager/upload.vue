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
                v-model="start"
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
                      <q-date v-model="start" />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>

              <q-input
                class="bg-grey-3 q-px-md under-title col-lg-2 col-md-2 col-sm-5 col-xs-5"
                borderless
                dense
                v-model="end"
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
                      <q-date v-model="end" />
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
          :hide-header="grid"
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
                <div>{{ props.row.uploadedDate }}</div>
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
import axios from "axios";
import { ref } from "vue";
import { exportFile } from "quasar";
// import Status from "components/Status"
import { store } from "../../store/store";

export default {
  name: "TaskMonitoring3",
  data() {
    return {
      search: ref(""),
      start: ref(),
      end: ref(),
      pagination: {
        rowsPerPage: 5,
      },
    };
  },

  setup() {
    return {
      token: ref(localStorage.getItem("token")),
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
        const { status, data } = await this.$axios.post(
          "/upload/store-excel/",
          { file: this.fileTask },
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
