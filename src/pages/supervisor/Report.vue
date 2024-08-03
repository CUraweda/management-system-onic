<template>
  <q-page class="q-pt-xs">
    <div class="q-ma-md">
      <div
        class="row q-my-md shadow q-pa-md items-center"
        style="border-radius: 4px; border: 1px solid rgba(0, 0, 0, 0.12)"
      >
        <div class="col-md-6 col-lg-6 col-sm-12 col-xs-12 box_1">
          <q-card class="no-shadow q-pa-sm">
            <div class="row items-center">
              <div class="text-h6 text-weight-bold q-mr-md q-mt-noe">
                {{ task_title }}
              </div>
              <div class="bg-grey-3 q-mr-sm tulisan border1">
                <div
                  class="text-h8 text-weight-bold q-px-sm align-left tulisan q-my-xs text-indigo-7"
                >
                  {{ status }}
                </div>
              </div>
              <div class="bg-grey-3 q-mr-sm tulisan border1">
                <div
                  class="text-h8 text-weight-bold q-px-sm align-left tulisan q-my-xs text-indigo-7"
                >
                  {{ priority }}
                </div>
              </div>
            </div>
            <q-card-section>
              <div class="col float-left">
                <div class="row">
                  <div class="col-4">
                    <div
                      class="text-h8 text-weight-bold q-mt-none align-left tulisan q-my-xs bg-grey-3 q-mr-md q-pa-md border2"
                    >
                      Assigned By
                    </div>
                    <div class="q-mr-lg">{{ spv }}</div>
                  </div>
                  <div class="col-4">
                    <div
                      class="text-h8 text-weight-bold q-mt-none align-left tulisan q-my-xs bg-grey-3 q-mr-md q-pa-md border2"
                    >
                      TASK TITLE
                    </div>
                    <div class="q-mr-lg">{{ task_title }}</div>
                  </div>
                  <div class="col-4">
                    <div
                      class="text-h8 text-weight-bold q-mt-none align-left tulisan q-my-xs bg-grey-3 q-mr-md q-pa-md border2"
                    >
                      DUE DATE
                    </div>
                    <div class="q-mr-lg">{{ formatLocalTime(due_date) }}</div>
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>

        <div class="col-md-6 col-lg-6 col-sm-12 col-xs-12 box_2">
          <q-card
            class="no-shadow q-pa-sm row float-right q-pt-none justify-center"
          >
            <div
              v-for="(time, index) in timerData"
              :key="index"
              class="col-md-3 col-lg-3 col-sm-5 col-xs-5"
            >
              <q-circular-progress
                :max="time.max"
                show-value
                track-color="light-blue-2"
                class="text-black q-ma-md"
                :value="time.value"
                size="100px"
                color="light-blue"
              />
              <div
                v-if="time.labelPosition === 'bottom'"
                class="vertical-bottom text-center text-black"
              >
                {{ time.label }}
              </div>
              <div v-else class="text-center text-black">{{ time.label }}</div>
            </div>
          </q-card>
        </div>
      </div>

      <div class="row q-col-gutter-md q-pt-md">
        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
          Details
          <q-card flat bordered class="shadow q-pa-none q-ma-none fit">
            <q-card-section class="row">
              <div class="col q-ml-lg">
                <div class="">Job</div>
                <div class="">PIC</div>
                <div class="">Due Date</div>
              </div>
              <div class="col">
                <div class="">{{ task_title }}</div>
                <div class="">{{ pic }}</div>
                <div class="">{{ formatLocalTime(due_date) }}</div>
              </div>
            </q-card-section>
            <q-card-section class="col-12">
              <div class="q-pa-md" style="max-width: 100%">
                <q-list>
                  <q-expansion-item
                    popup
                    default-opened
                    icon=""
                    class="col-12"
                    label="Progress"
                  >
                    <q-separator />
                    <q-card>
                      <q-card-section>
                        <div class="row">
                          <div class="col">
                            <div class="">Target</div>
                            <div class="">Actuals</div>
                            <div class="">Progress</div>
                          </div>
                          <div class="col">
                            <div class="">100 %</div>
                            <div class="">{{ progress }} %</div>
                            <q-slider
                              readonly
                              v-model="progress"
                              color="blue"
                              track-color="light-blue-1"
                              inner-track-color="blue-3"
                              :max="100"
                            />
                          </div>
                        </div>
                      </q-card-section>
                    </q-card>
                  </q-expansion-item>
                  <q-expansion-item
                    popup
                    default-opened
                    icon=""
                    class="col-12"
                    label="Addtional Details"
                  >
                    <q-separator />
                    <q-card>
                      <q-card-section>
                        <div class="row">
                          <div class="col">
                            <div class="">Created On</div>
                            <div class="">Created By</div>
                          </div>
                          <div class="col">
                            <div class="">
                              {{ formatLocalTime(created_at) }}
                            </div>
                            <div class="">{{ created_by }}</div>
                          </div>
                        </div>
                      </q-card-section>
                      <q-card-section> </q-card-section>
                    </q-card>
                  </q-expansion-item>
                  <q-expansion-item
                    popup
                    default-opened
                    icon=""
                    label="History"
                  >
                    <q-separator />
                    <q-card>
                      <q-card-section>
                        <div class="row">
                          <div class="col">
                            <div class="">Started On</div>
                            <div class="">Finished On</div>
                          </div>
                          <div class="col">
                            <div class="">
                              {{ formatLocalTime(started_at) }}
                            </div>
                            <div class="">
                              {{ formatLocalTime(finished_at) }}
                            </div>
                          </div>
                        </div>
                      </q-card-section>
                    </q-card>
                  </q-expansion-item>
                </q-list>
              </div>
            </q-card-section>
          </q-card>
        </div>

        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
          Description
          <q-card flat bordered class="no-shadow q-pa-none q-ma-none">
            <q-card-section class="row justify-center">
              <CardBase class="col-12">
                <div class="q-ml-lg" style="white-space: pre-line">
                  {{ description }}
                </div>

                <div class="q-ml-lg">{{ chat }}</div>
              </CardBase>
              <CardBase class="col-6">
                <q-input
                  class="border2 col-6"
                  bottom-slots
                  v-model="chat"
                  label="Text"
                  dense
                >
                  <template v-slot:after>
                    <q-btn round dense flat icon="send" @click="SendUpdate()" />
                  </template>
                </q-input>
              </CardBase>
            </q-card-section>
          </q-card>

          <div class="q-mt-md">Attachment Download</div>
          <q-card flat bordered class="no-shadow col-12">
            <q-card-section class="">
              <CardBase class="col-12">
                <div class="q-pa-md col-12">
                  <q-btn
                    @click="downloadFile()"
                    :disable="this.fileName === null"
                    :color="
                      this.fileName === null ? 'white text-black' : 'green'
                    "
                  >
                    <q-tooltip v-if="this.fileName === null"
                      >No file attached</q-tooltip
                    >
                    Download File
                  </q-btn>
                  <q-btn
                    @click="downloadFileHasil()"
                    :disable="this.file_hasil === null"
                    :color="
                      this.file_hasil === null ? 'white text-black' : 'green'
                    "
                  >
                    <q-tooltip v-if="this.file_hasil === null"
                      >No file attached</q-tooltip
                    >
                    Download Dokumen Hasil
                  </q-btn>
                  <!-- <q-uploader class="col-6" url="" label="File" color="grey" square flat bordered /> -->
                  <div class="q-pt-md"></div>

                  <div
                    v-if="status === 'Wait-app'"
                    class="q-pt-md row q-gutter-md justify-between col-12 items-center"
                  >
                    <q-btn
                      unelevated
                      class="col-3"
                      :ripple="{ color: 'red' }"
                      color="red-1"
                      text-color="red"
                      label="Cancel"
                      @click="Cancel()"
                      no-caps
                    />
                    <q-btn
                      unelevated
                      :ripple="{ color: 'yellow' }"
                      color="yellow-2"
                      text-color="yellow-9"
                      label="Revise"
                      no-caps
                      class="col-3"
                      @click="Revise()"
                    />
                    <q-btn
                      unelevated
                      :ripple="{ color: 'blue' }"
                      color="light-blue-1"
                      text-color="blue"
                      label="Approved"
                      no-caps
                      class="col-3"
                      @click="Approve()"
                    />
                  </div>

                  <div
                    v-if="status !== 'Wait-app'"
                    class="q-pt-md row q-gutter-md justify-between col-12 items-center"
                  >
                    <q-btn
                      unelevated
                      class="col-5"
                      :ripple="{ color: 'red' }"
                      color="red-1"
                      text-color="red"
                      label="Revise"
                      no-caps
                      @click="Revise()"
                    />
                    <q-btn
                      unelevated
                      :ripple="{ color: 'blue' }"
                      color="light-blue-1"
                      text-color="blue"
                      label="OK"
                      no-caps
                      class="col-5"
                      :disable="
                        finished_at === null ||
                        (status !== 'In-progress' && status !== 'Idle')
                      "
                      @click="Ok()"
                    />
                    <div class="q-py-md text-weight-bold text-body1">
                      Beri Rating untuk Pekerja!
                    </div>
                    <div class="q-gutter-md row col-12 items-center">
                      <div
                        class="q-pa-sm col-lg-2 col-md-2 col-sm-3 text-center bg-yellow-2 text-yellow-9"
                      >
                        Feedback
                      </div>
                      <q-slider
                        class="col-lg-9 col-md-9 col-sm-8 col-xs-8 q-pt-lg"
                        v-model="rate"
                        color="orange"
                        :min="0"
                        :max="5"
                        markers
                        :marker-labels="rate"
                        label-always
                        :label-value="rate"
                      />
                    </div>
                  </div>
                </div>
              </CardBase>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import Cookies from "js-cookie";
import { defineComponent } from "vue";
import { ref } from "vue";
import Vue from "vue";
import { exportFile } from "quasar";
import axios from "axios";
import { store } from "../../store/store";

function wrapCsvValue(val, formatFn) {
  let formatted = formatFn !== void 0 ? formatFn(val) : val;

  formatted =
    formatted === void 0 || formatted === null ? "" : String(formatted);

  formatted = formatted.split('"').join('""');

  return `"${formatted}"`;
}

export default {
  name: "SupervisorReport",
  data() {
    return {
      loading: ref(true),
      formattedDueDate: "",
      formattedStartDate: "",
      divisionId: sessionStorage.getItem("division_id")
        ? sessionStorage.getItem("division_id")
        : Cookies.get("division_id"),
      branchId: sessionStorage.getItem("branch_id")
        ? sessionStorage.getItem("branch_id")
        : Cookies.get("branch_id"),
      token: ref(
        sessionStorage.getItem("token")
          ? sessionStorage.getItem("token")
          : Cookies.get("token")
      ),
      username: sessionStorage.getItem("username")
        ? sessionStorage.getItem("username")
        : Cookies.get("username"),
      chat: "",
      filter: "",
      mode: "list",
      timerData: [
        { label: "Days", labelPosition: "bottom", max: 30, value: 0 },
        { label: "Hours", labelPosition: "top", max: 24, value: 0 },
        { label: "Minutes", labelPosition: "bottom", max: 60, value: 0 },
        { label: "Seconds", labelPosition: "bottom", max: 60, value: 0 },
      ],
      countdown: null,
      task_title: "",
      status: "",
      priority: "",
      due_date: "",
      progress: 0,
      started_at: "",
      started_by: "",
      finished_at: "",
      finished_by: "",
      created_at: "",
      created_by: "",
      history: "",
      description: "",
      task_type: "",
      fileName: null,
      file_hasil: null,
      id: store.id,
      pic_id: pic_id,
      // Add other properties with default values
    };
  },

  setup() {
    return {
      rate: ref(0),
      text: ref(""),
      ratingModel: ref(0),
      ratingColors: ["yellow"],
      picrate: ref([]),
    };
  },

  mounted() {
    this.startCountdown();
    this.fetchData();
    this.intervalId = setInterval(() => {
      this.fetchData();
    }, 60000);
  },

  beforeDestroy() {
    clearInterval(this.intervalId);
  },

  methods: {
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
    async downloadFile() {
      try {
        // Mengganti URL dengan endpoint yang sesuai
        const response = await this.$axios.get("/image/" + this.fileName, {
          responseType: "blob",
          headers: {
            branch: this.branchId,
            division: this.divisionId,
            Authorization: `Bearer ${this.token}`,
          },
        });

        // Membuat objek URL dari blob
        const url = window.URL.createObjectURL(new Blob([response.data]));

        // Membuat elemen <a> untuk tautan unduhan
        const link = document.createElement("a");
        link.href = url;
        link.download = this.fileName; // Set nama berkas yang diinginkan
        document.body.appendChild(link);

        // Simulasi klik pada elemen <a> untuk memulai unduhan
        link.click();

        // Membersihkan objek URL dan menghapus elemen <a>
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);
      } catch (error) {
        console.error("Error downloading file:", error);
      }
    },

    async downloadFileHasil() {
      try {
        // Mengganti URL dengan endpoint yang sesuai
        const response = await this.$axios.get("/image/" + this.file_hasil, {
          responseType: "blob", // Menggunakan responseType 'blob' untuk menghandle file
        });

        // Membuat objek URL dari blob
        const url = window.URL.createObjectURL(new Blob([response.data]));

        // Membuat elemen <a> untuk tautan unduhan
        const link = document.createElement("a");
        link.href = url;
        link.download = this.file_hasil; // Set nama berkas yang diinginkan
        document.body.appendChild(link);

        // Simulasi klik pada elemen <a> untuk memulai unduhan
        link.click();

        // Membersihkan objek URL dan menghapus elemen <a>
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);
      } catch (error) {
        console.error("Error downloading file:", error);
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

    async SendUpdate() {
      const id = this.id;
      const updatedDescription = `${this.description} \n Supervisor: ${this.chat}`;

      const data = {
        progress: this.progress,
        description: updatedDescription,
      };

      try {
        const id = this.id;
        const response = await this.$axios.put("/task/edit/" + id, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          this.$q.notify({
            message: "Text sended",
          });
          this.chat = null;
          this.fetchData();
        } else {
          this.$q.notify({
            message: "Failed Updating task",
          });
        }
      } catch (error) {
        console.error("EROR:", error);
      }
    },

    async fetchData() {
      try {
        console.log(this.id);
        const response = await this.$axios.get("/task/get-by-id/" + this.id, {
          headers: {
            branch: this.branchId,
            division: this.divisionId,
            Authorization: `Bearer ${this.token}`,
          },
        });
        this.task_type = response.data.task_type;
        this.task_title = response.data.task_title;
        this.priority = response.data.priority;
        this.progress = response.data.progress;
        this.status = response.data.status;
        this.iteration = response.data.Iteration;
        this.created_by = response.data.created_by;
        this.created_by = response.data.created_by;
        this.started_at = response.data.started_at;
        this.created_at = response.data.created_at;
        this.due_date = response.data.due_date;
        this.finished_at = response.data.finished_at;
        this.fileName = response.data.fileName;
        this.file_hasil = response.data.file_hasil;

        this.description = response.data.description;
        this.pic_role = response.data.pic_role;
        this.pic_id = response.data.pic_id;
        this.spv_id = response.data.spv_id;
        this.pic = response.data.pic;
        this.spv = response.data.spv;
        this.pic_id = response.data.pic_id;
        const dueDate = new Date(this.due_date);
        const now = new Date();
        const timeDifference = dueDate.getTime() - now.getTime();

        this.timerData[0].value = Math.floor(
          timeDifference / (24 * 60 * 60 * 1000)
        );
        this.timerData[1].value = Math.floor(
          (timeDifference % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)
        );
        this.timerData[2].value = Math.floor(
          (timeDifference % (60 * 60 * 1000)) / (60 * 1000)
        );
        this.timerData[3].value = Math.floor(
          (timeDifference % (60 * 1000)) / 1000
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },

    startCountdown() {
      this.countdown = setInterval(() => {
        // Calculate seconds
        let totalSeconds =
          this.timerData[0].value * 24 * 60 * 60 +
          this.timerData[1].value * 60 * 60 +
          this.timerData[2].value * 60 +
          this.timerData[3].value;

        if (totalSeconds > 0) {
          totalSeconds--;
          this.timerData[0].value = Math.floor(totalSeconds / (24 * 60 * 60));
          this.timerData[1].value = Math.floor(
            (totalSeconds % (24 * 60 * 60)) / (60 * 60)
          );
          this.timerData[2].value = Math.floor((totalSeconds % (60 * 60)) / 60);
          this.timerData[3].value = totalSeconds % 60;
        } else {
          this.stopCountdown();
          this.UpdateStatus();
        }
      }, 1000);
    },

    async UpdateStatus() {
      // if (this.status === "Wait-app") {
      this.$q.notify({
        color: "warning",
        message: "This task is idle",
      });
      // } else {
      //   const data = {
      //     status: "Idle",
      //   };

      //   try {
      //     const id = this.id;
      //     await this.$axios.put("/task/edit/" + id, data, {
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //       body: JSON.stringify(data),
      //     });
      //   } catch (error) {
      //     console.error("EROR:", error);
      //   }
      // }
    },

    stopCountdown() {
      clearInterval(this.countdown);
    },

    send() {
      store.id = this.id;
      this.$router.push("/supervisor/task_detail_2/");
    },

    async Revise() {
      try {
        const id = this.id;
        // 1. Ambil data dari tugas yang akan direvisi
        const response = await this.$axios.get("/task/get-by-id/" + id, {
          headers: {
            branch: this.branchId,
            division: this.divisionId,
            Authorization: `Bearer ${this.token}`,
          },
        });

        let taskToRevise = response.data;
        taskToRevise.status =
          response.data.status === "Wait-app" ? "Wait-app" : "Open";
        taskToRevise.progress = 0;
        taskToRevise.file_hasil = null;

        taskToRevise.finished_at = null;
        taskToRevise.finished_by = null;
        taskToRevise.started_at = null;
        taskToRevise.started_by = null;

        // 3. Kirim permintaan untuk membuat tugas baru
        const createTaskResponse = await this.$axios.post(
          "/task/new",
          taskToRevise,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (createTaskResponse.status !== 200) {
          throw new Error("Failed to create revised task");
        }

        // 4. Setelah berhasil membuat tugas baru, ubah status dan hapus tugas yang lama
        const updateTaskResponse = await this.$axios.put(
          "/task/edit/" + id,
          {
            status: "Revised",
            deleted_at: new Date().toISOString(),
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (updateTaskResponse.status === 200) {
          this.$q.notify({
            message: "Task Revised",
          });
          this.$router.push("/supervisor/task_monitoring");
        } else {
          this.$q.notify({
            message: "Failed Revising Task",
          });
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },

    async Approve() {
      const data = {
        status: "Open",
        approved_by: this.username,
        approved_at: new Date().toISOString(),
      };

      try {
        const response = await this.$axios.put("/task/edit/" + this.id, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          this.$q.notify({
            type: "positive",
            message: "Task Approved",
          });
          this.$router.push("/supervisor/task_monitoring_2");
        } else {
          this.$q.notify({
            message: "Failed Approving Task",
          });
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },

    async Ok() {
      try {
        const data = {
          id:  this.id,
          status: "Close",
          pic_rating: this.rate,
          pic_id: this.pic_id,
        };

        const response = await this.$axios.put("/task/acc/" + this.id, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status != 200)
          throw Error("Terjadi kesalahan, mohon coba ulang");
        this.$q.notify({
          message: "Task Done",
        });
        this.fetchData();
      } catch (err) {
        console.log(err);
        return this.$q.notify(error.message);
      }
      this.$router.push({ path: "/supervisor/task_monitoring" });
    },

    async Cancel() {
      const data = {
        status: "Deleted",
        deleted_at: new Date().toISOString(),
      };

      try {
        const response = await this.$axios.put("/task/edit/" + this.id, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          this.$q.notify({
            type: "positive",
            message: "Task Canceled",
          });
          this.$router.push("/supervisor/task_monitoring_2");
        } else {
          this.$q.notify({
            message: "Failed Canceling Task",
          });
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },

    Done() {
      this.$q.notify({
        color: "positive",
        message: "Task Done",
      });
    },
  },
};
</script>

<style scoped>
.progress-bar-2 {
  height: 8px;
  border-radius: 3px;
  background: #f54ea2;
  background: -webkit-linear-gradient(45deg, #f54ea2, #ff7676) !important;
  background: linear-gradient(45deg, #f54ea2, #ff7676) !important;
}

.border1 {
  border-radius: 28px;
}

.border2 {
  border-radius: 8px;
}
</style>
