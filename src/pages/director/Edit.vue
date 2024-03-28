<template>
  <q-page class="q-pa-sm bg-white">
    <div class="row q-col-gutter-sm">
      <div class="col-lg-7 col-md-7 col-sm-12 col-xs-12">
        <q-card class="no-shadow" bordered>
          <div class="row q-mb-md">
            <q-card-section
              class="text-center text-h6 text-black text-weight-bold"
            >
              <q-img src="statics/info.svg" width="25px" class="q-mr-sm" />
              General Information
            </q-card-section>

            <div class="col-12">
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs text-weight-bold"
                    >Task Type</q-item-label
                  >
                  <div class="no-shadow">
                    <q-btn-toggle
                      v-model="form.task_type"
                      spread
                      no-caps
                      toggle-color="cyan-6"
                      class="no-shadow"
                      color="grey-3"
                      text-color="black"
                      :options="task_type_options"
                    />
                  </div>
                </q-item-section>
              </q-item>
            </div>

            <div class="col-12">
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs text-weight-bold"
                    >Task Title</q-item-label
                  >
                  <q-input
                    dense
                    autogrow
                    filled
                    class="full-width"
                    placeholder="Type name"
                    v-model="form.task_title"
                  />
                </q-item-section>
              </q-item>
            </div>

            <div class="col-12">
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs text-weight-bold"
                    >Priority</q-item-label
                  >
                  <q-select
                    dense
                    filled
                    outlined
                    v-model="form.priority"
                    :options="opsipriority"
                    stack-label
                    options-dense
                  ></q-select>
                </q-item-section>
              </q-item>
            </div>

            <div class="col-12">
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs text-weight-bold"></q-item-label>
                  <div class="q-gutter-sm">
                    <q-radio
                      v-model="form.iteration"
                      label="Daily"
                      val="daily"
                    />
                    <q-radio
                      v-model="form.iteration"
                      label="Weekly"
                      val="weekly"
                    />
                    <q-radio
                      v-model="form.iteration"
                      label="Monthly"
                      val="monthly"
                    />
                    <q-radio
                      v-model="form.iteration"
                      label="Insidental"
                      val="insidental"
                    />
                  </div>
                </q-item-section>
              </q-item>
            </div>

            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs text-weight-bold"
                    >Start Date</q-item-label
                  >
                  <q-input filled dense v-model="form.start_date">
                    <template v-slot:prepend>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy
                          cover
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-date
                            v-model="form.start_date"
                            mask="YYYY-MM-DD HH:mm"
                          >
                            <div class="row items-center justify-end">
                              <q-btn
                                v-close-popup
                                label="Close"
                                color="primary"
                                flat
                              />
                            </div>
                          </q-date>
                        </q-popup-proxy>
                      </q-icon>
                    </template>

                    <template v-slot:append>
                      <q-icon name="access_time" class="cursor-pointer">
                        <q-popup-proxy
                          cover
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-time
                            v-model="form.start_date"
                            mask="YYYY-MM-DD HH:mm"
                            format24h
                          >
                            <div class="row items-center justify-end">
                              <q-btn
                                v-close-popup
                                label="Close"
                                color="primary"
                                flat
                              />
                            </div>
                          </q-time>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </q-item-section>
              </q-item>
            </div>

            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs text-weight-bold"
                    >Due Date</q-item-label
                  >
                  <q-input filled dense v-model="form.due_date">
                    <template v-slot:prepend>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy
                          cover
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-date
                            v-model="form.due_date"
                            mask="YYYY-MM-DD HH:mm"
                          >
                            <div class="row items-center justify-end">
                              <q-btn
                                v-close-popup
                                label="Close"
                                color="primary"
                                flat
                              />
                            </div>
                          </q-date>
                        </q-popup-proxy>
                      </q-icon>
                    </template>

                    <template v-slot:append>
                      <q-icon name="access_time" class="cursor-pointer">
                        <q-popup-proxy
                          cover
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-time
                            v-model="form.due_date"
                            mask="YYYY-MM-DD HH:mm"
                            format24h
                          >
                            <div class="row items-center justify-end">
                              <q-btn
                                v-close-popup
                                label="Close"
                                color="primary"
                                flat
                              />
                            </div>
                          </q-time>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </q-item-section>
              </q-item>
            </div>

            <div class="col-12">
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs text-weight-bold"
                    >Description</q-item-label
                  >
                  <q-input
                    v-model="form.description"
                    filled
                    type="textarea"
                    placeholder="Give some example"
                  />
                </q-item-section>
              </q-item>
            </div>

            <!-- pic -->
            <div class="col-12">
              <q-item>
                <q-item-selection class="row items-center">
                  <q-item-label class="text-weight-bold q-pb-xs col-12"
                    >PIC</q-item-label
                  >

                  <q-form
                    @submit="onSubmitpic"
                    class="row q-gutter-sm items-center"
                  >
                    <q-select
                      readonly
                      multiple
                      dense
                      filled
                      v-model="form.pic"
                      name="pic"
                      use-input
                      input-debounce="0"
                      :options="picoptions"
                      behavior="menu"
                      class="col-6"
                    >
                      <template v-slot:no-option>
                        <q-item>
                          <q-item-section class="text-grey">
                            No results
                          </q-item-section>
                        </q-item>
                      </template>
                    </q-select>

                    <div class="text-cyan col-5">
                      <q-btn
                        disable
                        dense
                        flat
                        color="cyan"
                        icon="add"
                        type="submit"
                        label="Add Person"
                      />
                    </div>
                  </q-form>

                  <!-- selected pic card -->
                  <q-card
                    v-if="submittedpic"
                    flat
                    class="col-12 q-mt-md"
                    :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2'"
                  >
                    <template>
                      <q-separator></q-separator>
                      <q-card-section class="row q-gutter-sm items-center">
                        <div
                          v-for="(item, index) in submitResultpic"
                          :key="index"
                          class="q-pa-sm bg-blue-2 row items-center justify-between"
                          style="border-radius: 23px; width: 150px"
                        >
                          <q-avatar size="30px" color="blue">
                            <img src="statics/worker.png" />
                          </q-avatar>
                          {{ item.value }}
                          <q-btn
                            round
                            flat
                            dense
                            icon="close"
                            class="float-right"
                            color="grey-8"
                            v-close-popup
                          />
                        </div>
                      </q-card-section>
                    </template>
                  </q-card>
                  <!-- selected  card -->
                </q-item-selection>
              </q-item>
            </div>
            <!-- pic -->

            <!-- spv -->
            <div class="col-12">
              <q-item>
                <q-item-selection class="row items-center">
                  <q-item-label class="text-weight-bold q-pb-xs col-12"
                    >Superior</q-item-label
                  >
                  <q-form
                    multiple
                    @submit="onSubmitspv"
                    class="row q-gutter-sm items-center"
                  >
                    <q-select
                      readonly
                      multiple
                      dense
                      filled
                      v-model="form.spv"
                      name="spv"
                      use-input
                      input-debounce="0"
                      :options="spvoptions"
                      behavior="menu"
                      class="col-6"
                    >
                      <template v-slot:no-option>
                        <q-item>
                          <q-item-section class="text-grey">
                            No results
                          </q-item-section>
                        </q-item>
                      </template>
                    </q-select>
                    <div class="text-cyan col-5">
                      <q-btn
                        disable
                        dense
                        flat
                        color="cyan"
                        icon="add"
                        type="submit"
                        label="Add Person"
                      />
                    </div>
                  </q-form>

                  <q-card
                    v-if="submittedspv"
                    flat
                    class="col-12 q-mt-md"
                    :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2'"
                  >
                    <template>
                      <q-card-section class="row q-gutter-sm items-center">
                        <div
                          v-for="(item, index) in submitResultspv"
                          :key="index"
                          class="q-pa-sm bg-blue-2 row items-center justify-between"
                          style="border-radius: 23px; width: 150px"
                        >
                          <q-avatar size="30px" color="blue">
                            <img src="statics/worker.png" />
                          </q-avatar>
                          {{ item.value }}
                          <q-btn
                            removeable
                            dense
                            flat
                            color="red"
                            size="15px"
                            icon="close"
                          />
                        </div>
                      </q-card-section>
                    </template>
                  </q-card>
                </q-item-selection>
              </q-item>
            </div>
            <!-- spv -->
          </div>
        </q-card>
      </div>
      <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12">
        <!-- <q-card
          class="no-shadow fit row wrap items-start content-start"
          bordered
        > -->
          <!-- <q-card-section class="text-weight-bold text-h6 text-black">
            Add to card
          </q-card-section> -->
          <!-- <div class="col-12">
            <q-item>
              <q-item-section class="q-mb-xl">
                <q-file
                  outlined
                  v-model="form.model"
                  label="Upload File"
                  class="q-mb-xl"
                >
                  <template v-slot:append>
                    <q-icon name="ios_share" />
                  </template>
                </q-file>
              </q-item-section>
            </q-item>
          </div> -->

          <q-space></q-space>

          <div class="col-12 absolute-bottom-right q-mt-xl">
            <q-item>
              <q-item-section>
                <div class="row justify-end">
                  <q-card-actions>
                    <q-btn
                      unelevated
                      class="no-shadow"
                      label="Cancel"
                      color="grey-3"
                      text-color="black"
                      filled
                      type="submit"
                      v-close-popup
                      to="/director/task_monitoring"
                    />
                    <q-btn
                      unelevated
                      class="no-shadow"
                      label="Edit"
                      color="grey-3"
                      text-color="primary"
                      filled
                      type="submit"
                      @click="edit"
                    />
                  </q-card-actions>
                </div>
              </q-item-section>
            </q-item>
          </div>
        <!-- </q-card> -->
      </div>
    </div>
  </q-page>
</template>

<script>
import Cookies from 'js-cookie';
import { defineComponent } from "vue";
import { ref } from "vue";
import { exportFile } from "quasar";
import axios from "axios";
import { store } from "../../store/store";

export default {
  name: "DirectorEdit",
  data() {
    return {
    divisionId: sessionStorage.getItem("division_id")? sessionStorage.getItem("division_id") : Cookies.get("division_id"),
      branchId: sessionStorage.getItem("branch_id")? sessionStorage.getItem("branch_id") : Cookies.get("branch_id"),
      token: ref(sessionStorage.getItem("token")? sessionStorage.getItem("token") : Cookies.get("token")),
      id: store.id,
      form: {
        task_type: "",
        task_title: "",
        priority: "",
        iteration: "",
        start_date: null,
        due_date: null,
        description: "",
        pic: "",
        spv: "",
      },
    };
  },

  setup() {
    const submittedpic = ref(false);
    const submitEmptypic = ref(false);
    const submitResultpic = ref([]);
    const submittedspv = ref(false);
    const submitEmptyspv = ref(false);
    const submitResultspv = ref([]);

    return {
      iteration: ref(""),
      task_type_options: [
        {
          label: "Single Task",
          value: "Single",
        },
        {
          label: "Multi Task",
          value: "Multi",
        },
      ],
      priority: ref([]),
      opsipriority: [
        {
          label: "Important",
          value: "Important",
        },
        {
          label: "High",
          value: "High",
        },
        {
          label: "Normal",
          value: "Normal",
        },
      ],
      start_date: ref(null),
      due_date: ref(null),
      pic: ref([]),
      picoptions: [
        {
          label: "Bambang",
          value: "Bambang",
        },
        {
          label: "Tami",
          value: "Tami",
        },
        {
          label: "Rani",
          value: "Rani",
        },
      ],
      submittedpic,
      submitEmptypic,
      submitResultpic,

      onSubmitpic(evt) {
        const formData = new FormData(evt.target);
        const data = [];

        for (const [name, value] of formData.entries()) {
          data.push({
            name,
            value,
          });
        }

        submittedpic.value = true;
        submitResultpic.value = data;
        submitEmptypic.value = data.length === 0;
      },
      spv: ref([]),
      spvoptions: [],
      submittedspv,
      submitEmptyspv,
      submitResultspv,

      onSubmitspv(evt) {
        const formData = new FormData(evt.target);
        const data = [];

        for (const [name, value] of formData.entries()) {
          data.push({
            name,
            value,
          });
        }

        submittedspv.value = true;
        submitResultspv.value = data;
        submitEmptyspv.value = data.length === 0;
      },
      model: ref(null),
      text: ref(""),
      address_detail: ref({}),
      card_detail: ref({}),
    };
  },

  mounted() {
    this.fetchData();
    this.intervalId = setInterval(() => {
      this.fetchData();
    }, 60000);
  },

  beforeDestroy() {
    clearInterval(this.intervalId);
  },

  methods: {
    async fetchData() {
      console.log(this.id);
      try {
        const response = await this.$axios.get("/task/get-by-id/" + this.id, {
          headers: {
branch: this.branchId,
division: this.divisionId,
            Authorization: `Bearer ${this.token}`,
          },
        });
        this.form.task_type = response.data.task_type;
        this.form.task_title = response.data.task_title;
        this.form.priority = response.data.priority;
        this.form.iteration = response.data.Iteration;
        this.form.start_date = new Date(
          response.data.start_date
        ).toLocaleString();
        this.form.due_date = new Date(response.data.due_date).toLocaleString();
        this.form.description = response.data.description;
        this.form.pic = response.data.pic;
        this.form.spv = response.data.spv;
        this.form.pic.value = response.data.pic_id;
        this.form.spv.value = response.data.spv_id;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },

    async edit() {
      const data = {
        task_type: this.form.task_type,
        task_title: this.form.task_title,
        priority: this.form.priority.value,
        start_date: new Date(this.form.start_date).toISOString(),
        due_date: new Date(this.form.due_date).toISOString(),
        description: this.form.description,
        pic: this.form.pic.value,
        spv: this.form.spv.value,
      };

      try {
        const response = await this.$axios.put("/task/edit/" + this.id, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          this.$q.notify({
            message: "Task Edited",
          });
          this.$router.push("/director/task_monitoring");
        } else {
          this.$q.notify({
            message: "Failed Edited task",
          });
        }
      } catch (error) {
        console.error("EROR:", error);
      }
    },

    // handleFileUpload(event) {
    //   const file = event.target.files[0];

    //   if (file) {
    //     const reader = new FileReader();

    //     reader.onload = (e) => {
    //       const content = e.target.result;

    //       // Determine if the file is XLSX or CSV
    //       if (file.name.endsWith('.xlsx')) {
    //         this.parseXLSX(content);
    //       } else if (file.name.endsWith('.csv')) {
    //         this.parseCSV(content);
    //       }
    //     };

    //     reader.readAsBinaryString(file);
    //   }

    // },
  },
};
</script>

<style scoped></style>
