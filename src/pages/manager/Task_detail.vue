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
                              :disable="
                                status === 'Wait-app' || status === 'Deleted'
                              "
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
                            <div class="">Create On</div>
                            <div class="">Create By</div>
                          </div>
                          <div class="col">
                            <div class="">
                              {{ formatLocalTime(created_at) }}
                            </div>
                            <div class="">RIAN</div>
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
                <p class="q-ml-lg" style="white-space: pre-line">
                  {{ description }}
                </p>

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
                    <q-btn
                      round
                      dense
                      flat
                      icon="send"
                      @click="SendUpdate()"
                      :disable="status === 'Wait-app' || status === 'Deleted'"
                    />
                  </template>
                </q-input>
              </CardBase>
            </q-card-section>
          </q-card>

          <div class="q-mt-md">Attachment Download</div>
          <q-card flat bordered class="no-shadow col-12">
            <q-card-section class="row">
              <CardBase class="  ">
                <div class="q-pa-md">
                  <q-uploader
                    url=""
                    label="File"
                    color="grey"
                    square
                    flat
                    bordered
                    style="max-width: 300px"
                  />
                  <div class="q-pt-md"></div>
                  <q-uploader
                    style="max-width: 300px"
                    url=""
                    label="Dokumen Hasil"
                    multiple
                    color="grey"
                  />
                  <div class="q-pt-md row justify-between">
                    <q-btn
                      unelevated
                      class="q-mr-md"
                      :ripple="{ color: 'blue' }"
                      :color="started_at ? 'red-1' : 'blue-1'"
                      :text-color="started_at ? 'red' : 'blue'"
                      :label="started_at ? 'Finish' : 'Start'"
                      @click="started_at ? FinishTask() : StartTask()"
                      :disable="status === 'Wait-app' || status === 'Deleted'"
                    />
                    <q-btn
                      unelevated
                      :ripple="{ color: 'grey' }"
                      color="grey-3"
                      text-color="grey-7"
                      :disable="status === 'Wait-app' || status === 'Deleted'"
                      label="Send To Other PIC"
                      no-caps
                      @click="send"
                      v-if="task_type === 'Multi'"
                    />

                    <q-btn
                      unelevated
                      :ripple="{ color: 'grey' }"
                      color="grey-3"
                      text-color="grey-7"
                      :disable="status === 'Wait-app' || status === 'Deleted'"
                      label="Submit To Superior"
                      no-caps
                      @click="submitToSuperior"
                      v-else-if="task_type === 'Single'"
                    />
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
import { ref } from "vue";
import Vue from "vue";
import { exportFile } from "quasar";
import axios from "axios";
import { store } from '../../store/store'

function wrapCsvValue(val, formatFn) {
  let formatted = formatFn !== void 0 ? formatFn(val) : val;

  formatted =
    formatted === void 0 || formatted === null ? "" : String(formatted);

  formatted = formatted.split('"').join('""');

  return `"${formatted}"`;
}

export default {
  name: "TaskDetail",
  setup() {
    return {
      model: ref(0),
      text: ref(""),
      id: store.id,
      ratingModel: ref(0),
      ratingColors: ["yellow"],
      // pic: ref(''),
    };
  },

  data() {
    return {
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
      pic: "",
      due_date: "",
      progress: 0,
      started_at: "",
      started_by: "",
      created_at: "",
      created_by: "",
      history: "",
      description: "",
      task_type: "",
      // Add other properties with default values
    };
  },

  mounted() {
    this.fetchData();
  },

  methods: {
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

    async StartTask() {
      const data = {
        status: "In-progress",
        started_at: new Date().toISOString(),
      };

      try {
        const response = await this.$axios.put("/task/edit/" + this.id, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          this.$q.notify({
            message: "Progress Updated",
          });
        } else {
          this.$q.notify({
            message: "Failed Updating task",
          });
        }
      } catch (error) {
        console.error("EROR:", error);
      }
       this.$router.push({ path: "/manager/task_list" });
    },

    async FinishTask() {
      const data = {
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
            message: "Progress Updated",
          });
        } else {
          this.$q.notify({
            message: "Failed Updating task",
          });
        }
      } catch (error) {
        console.error("EROR:", error);
      }
       this.$router.push({ path: "/manager/task_list" });
    },

    async SendUpdate() {
      const updatedDescription = `${this.description} \n Manager: ${this.chat}`;

      const data = {
        progress: this.progress,
        description: updatedDescription,
      };

      try {
        const response = await this.$axios.put("/task/edit/" + this.id, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          this.$q.notify({
            message: "Progress Updated",
          });
        } else {
          this.$q.notify({
            message: "Failed Updating task",
          });
        }
      } catch (error) {
        console.error("EROR:", error);
      }
       this.$router.push({ path: "/manager/task_list" });
    },

    async fetchData() {
      try {
        const response = await this.$axios.get("/task/get-by-id/" + this.id);
        this.task_type = response.data.task_type;
        this.task_title = response.data.task_title;
        this.priority = response.data.priority;
        this.progress = response.data.progress;
        this.status = response.data.status;
        this.iteration = response.data.Iteration;
        this.created_by = response.data.created_by;
        this.started_at = response.data.started_at;
        this.created_at = response.data.created_at;
        this.due_date = response.data.due_date;
        this.finished_at = response.data.finished_at;

        this.description = response.data.description;
        this.pic = response.data.pic;
        this.spv = response.data.spv;

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

        // Start the countdown
        this.startCountdown();
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
          console.log(totalSeconds);
          console.log("Countdown reached 0");
          this.stopCountdown();
          this.UpdateStatus();
        }
      }, 1000);
    },

    async UpdateStatus() {
      if (this.status === "Idle") {
        this.$q.notify({
          color: "warning",
          message: "Task Idle",
        });
      } else {
        const data = {
          status: "Idle",
        };

        try {
          await this.$axios.put("/task/edit/" + this.id, data, {
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
        } catch (error) {
          console.error("EROR:", error);
        }
      }
    },

    stopCountdown() {
      clearInterval(this.countdown);
    },

    send() {
      this.$router.push("/manager/task_detail_2/" + this.id);
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
