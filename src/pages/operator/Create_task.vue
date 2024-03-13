<template>
  <q-page class="q-pa-sm bg-white">
    <div class="row q-col-gutter-sm">
      <div class="col-lg-7 col-md-7 col-sm-12 col-xs-12">
        <q-card class="no-shadow" bordered>
          <div class="row q-mb-md">
            <q-card-section class="text-center text-h6 text-black text-weight-bold">
              <q-img src="statics/info.svg" width="25px" class="q-mr-sm" />
              General Information
            </q-card-section>

            <!-- <div class="col-12">
              <q-item>
                <q-item-section>
                  <div class="no-shadow">
                    <q-checkbox v-model="SpvApp" color="blue" class="q-pl-none q-ml-none" label="Requesting approval" />
                  </div>
                </q-item-section>
              </q-item>
            </div> -->

            <div class="col-12">
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs text-weight-bold">Task Type</q-item-label>
                  <div class="no-shadow">
                    <q-btn-toggle
                      v-model="task_type"
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
                  <q-item-label class="q-pb-xs text-weight-bold">Task Title</q-item-label>
                  <q-input
                    dense
                    autogrow
                    filled
                    class="full-width"
                    placeholder="Type name"
                    v-model="task_title"
                    :rules="[(val) => (val !== null && val !== '') || 'Required']"
                  />
                </q-item-section>
              </q-item>
            </div>

            <div class="col-12">
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs text-weight-bold">Priority</q-item-label>
                  <q-select
                    dense
                    filled
                    outlined
                    v-model="priority"
                    :options="opsipriority"
                    stack-label
                    :rules="[(val) => (val !== null && val !== '') || 'Required']"
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
                    <q-radio v-model="iteration" val="daily" label="Daily" />
                    <q-radio v-model="iteration" val="weekly" label="Weekly" />
                    <q-radio v-model="iteration" val="monthly" label="Monthly" />
                    <q-radio v-model="iteration" val="insidental" label="Insidental" />
                  </div>
                </q-item-section>
              </q-item>
            </div>

            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs text-weight-bold">Start Date</q-item-label>
                  <q-input
                    filled
                    dense
                    v-model="start_date"
                    :rules="[(val) => (val !== null && val !== '') || 'Required']"
                  >
                    <template v-slot:prepend>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy
                          cover
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-date v-model="start_date" mask="YYYY-MM-DD HH:mm">
                            <div class="row items-center justify-end">
                              <q-btn v-close-popup label="Close" color="primary" flat />
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
                          <q-time v-model="start_date" mask="YYYY-MM-DD HH:mm" format24h>
                            <div class="row items-center justify-end">
                              <q-btn v-close-popup label="Close" color="primary" flat />
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
                  <q-item-label class="q-pb-xs text-weight-bold">Due Date</q-item-label>
                  <q-input
                    filled
                    dense
                    v-model="due_date"
                    :rules="[(val) => (val !== null && val !== '') || 'Required']"
                  >
                    <template v-slot:prepend>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy
                          cover
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-date v-model="due_date" mask="YYYY-MM-DD HH:mm">
                            <div class="row items-center justify-end">
                              <q-btn v-close-popup label="Close" color="primary" flat />
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
                          <q-time v-model="due_date" mask="YYYY-MM-DD HH:mm" format24h>
                            <div class="row items-center justify-end">
                              <q-btn v-close-popup label="Close" color="primary" flat />
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
                    v-model="description"
                    filled
                    type="textarea"
                    placeholder="Give some example"
                    :rules="[(val) => (val !== null && val !== '') || 'Required']"
                  />
                </q-item-section>
              </q-item>
            </div>

            <!-- pic -->
            <div class="col-12">
              <q-item>
                <q-item-selection class="row items-center">
                  <q-item-label class="text-weight-bold q-pb-xs col-12">PIC</q-item-label>

                  <q-form @submit="onSubmitpic" class="row q-gutter-sm items-center">
                    <q-select
                      :multiple="isMultitask"
                      dense
                      filled
                      disable
                      v-model="selectedpic"
                      name="pic"
                      use-input
                      input-debounce="0"
                      :options="picOptions"
                      behavior="menu"
                      class="col-6"
                      :rules="[(val) => (val !== null && val !== '') || 'Required']"
                    >
                      <template v-slot:no-option>
                        <q-item>
                          <q-item-section class="text-grey"> No results </q-item-section>
                        </q-item>
                      </template>
                    </q-select>

                    <div class="text-cyan col-5 q-mb-lg q-mt-md">
                      <q-btn
                        dense
                        flat
                        color="cyan"
                        class="text-center"
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
                            removeable
                            dense
                            flat
                            color="red"
                            size="15px"
                            icon="close"
                            @click="removeItempic(index)"
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
                      dense
                      filled
                      v-model="selectedspv"
                      name="spv"
                      use-input
                      input-debounce="0"
                      :options="spvOptions"
                      behavior="menu"
                      class="col-6"
                      :rules="[(val) => (val !== null && val !== '') || 'Required']"
                    >
                      <template v-slot:no-option>
                        <q-item>
                          <q-item-section class="text-grey"> No results </q-item-section>
                        </q-item>
                      </template>
                    </q-select>
                    <div class="text-cyan col-5 q-mb-lg q-mt-md">
                      <q-btn
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
                          <!-- Tambahkan event click untuk memanggil fungsi removeItem dengan indeks item -->
                          <q-btn
                            removeable
                            dense
                            flat
                            color="red"
                            size="15px"
                            icon="close"
                            @click="removeItem(index)"
                          />
                        </div>
                      </q-card-section>
                    </template>
                  </q-card>
                </q-item-selection>
              </q-item>
            </div>
          </div>
        </q-card>
      </div>
      <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12">
        <q-card class="no-shadow fit row wrap items-start content-start" bordered>
          <q-card-section class="text-weight-bold text-h6 text-black">
            Add to card
          </q-card-section>
          <!-- frontend.html -->
          <div class="col-12">
            <q-item>
              <q-item-section class="q-mb-xl">
                <q-file outlined v-model="model" label="Upload File" class="q-mb-xl">
                  <template v-slot:append>
                    <q-icon name="ios_share" />
                  </template>
                </q-file>
              </q-item-section>
            </q-item>
          </div>

          <q-space></q-space>

          <div class="col-12 absolute-bottom-right q-mt-xl">
            <q-item>
              <q-item-section>
                <div class="row justify-end q-gutter-sm">
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
                      to="/operator/task_list"
                    />
                    <q-btn
                      unelevated
                      class="no-shadow"
                      label="Create"
                      color="grey-3"
                      text-color="primary"
                      filled
                      type="submit"
                      @click="create"
                    />
                  </q-card-actions>
                </div>
              </q-item-section>
            </q-item>
          </div>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref } from "vue";
import { store } from "../../store/store.js";

export default {
  name: "ManagerCreate",
  data() {
    return {
      spv_id: "",
      pic_id: "",
      pic: [],
      selectedpic: null,
      spv: [],
      selectedspv: {
        label: localStorage.getItem("username"),
        value: localStorage.getItem("username"),
      },
      iteration: "daily",
      isMultitask: ref(false),
      sendedForm: ref({}),
    };
  },

  setup() {
    const SpvApp = ref(false);
    const submittedpic = ref(false);
    const submitEmptypic = ref(false);
    const submitResultpic = ref([]);
    const submittedspv = ref(false);
    const submitEmptyspv = ref(false);
    const submitResultspv = ref([]);

    return {
      SpvApp,
      picOptions: ref([]),
      spvOptions: ref([]),
      task_type: ref("Single"),
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
      task_title: ref(""),
      priority: ref(),
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
      start_date: ref(),
      due_date: ref(),
      description: ref(""),

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
  },

  computed: {
    pic_title() {
      return this.SpvApp ? "supervisor" : "manager";
    },
  },

  watch: {
    task_type: {
      handler(value) {
        if (value != "Single") {
          this.isMultitask = true;
        } else this.isMultitask = false;
        this.selectedpic = null;
      },
    },

    selectedpic: {
      handler(value) {
        console.log("Selected PIC changed. Updating SPV options...");
        console.log("PIC title:", value.title);

        if (value.title) {
          console.log(
            "Ping:",
            this.picOptions.find((user) => user.title === value.title)
          );
          // Perbarui opsi SPV berdasarkan peran PIC yang dipilih
          const selectedpic = this.picOptions.find((user) => user.title === value.title);
          console.log("Selected pic:", selectedpic);

          if (selectedpic) {
            this.fetchSpvData();
          }
        }
      },
    },
  },

  methods: {
    async fetchData() {
      try {
        const username = localStorage.getItem("username")
        const { status, data } = await this.$axios.get("/user/all");
        if (status !== 200) throw Error("Error while fetching");

        const filteredData = data.filter((user) => user.u_name === username);

        const listOfPic = filteredData.map((user) => ({
          label: user.u_name,
          value: user.u_name,
          title: user.title,
          id: user.u_id,
        }));

        this.picOptions = listOfPic;
        this.selectedpic = this.picOptions[0];

        const selectedpic = this.picOptions.title;
        console.log("Selected pic:", selectedpic);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },

    async fetchSpvData() {
      try {
        const { status, data } = await this.$axios.get("/user/all");
        if (status !== 200) throw Error("Error while fetching");

        const listOfSpv = data.map((user) => ({
          label: user.u_name,
          value: user.u_name,
          title: user.title,
          id: user.u_id,
        }));

        const SelectedPic = this.selectedpic.title;

        if (SelectedPic) {
          const selectedTitleLowerCase = SelectedPic.toLowerCase();

          if (selectedTitleLowerCase === "operator") {
            this.spvOptions = listOfSpv.filter(
              (user) => user.title.toLowerCase() === "supervisor"
            );
            console.log("Updating SPV options to supervisor.");
            this.selectedspv = this.spvOptions[0];
          } else if (selectedTitleLowerCase === "supervisor") {
            this.spvOptions = listOfSpv.filter(
              (user) => user.title.toLowerCase() === "manager"
            );
            console.log("Updating SPV options to manager.");
            this.selectedspv = this.spvOptions[0];
          } else if (selectedTitleLowerCase === "manager") {
            this.spvOptions = listOfSpv.filter(
              (user) => user.title.toLowerCase() === "director"
            );
            console.log("Updating SPV options to director.");
            this.selectedspv = this.spvOptions[0];
          } else {
            this.spvOptions = null;
            this.selectedspv = null;
          }
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },

    // Metode untuk mengambil pic_id dari opsi pic yang dipilih
    getSelectedPicId() {
      if (this.selectedPic) {
        const selectedPic = this.pic.find((pic) => pic.u_id === this.selectedPic.value);
        if (selectedPic) {
          this.pic_id = selectedPic.u_id;
        }
      }
    },

    // Metode untuk mengambil spv_id dari opsi spv yang dipilih
    getSelectedSpvId() {
      if (this.selectedSpv) {
        const selectedSpv = this.spv.find((spv) => spv.u_id === this.selectedSpv.value);
        if (selectedSpv) {
          this.spv_id = selectedSpv.u_id;
        }
      }
    },

    removeItem(index) {
      this.submitResultspv.splice(index, 1);
    },

    removeItempic(index) {
      this.submitResultpic.splice(index, 1);
    },

    addToForm(properties, value) {
      // Check if the value is empty (undefined, null, or empty string)
      if (
        properties !== "bukti_tayang" &&
        (value === undefined || value === null || value === "")
      ) {
        throw new Error(`Please fill all input`);
      } else {
        // Assign the value to the specified property in sendedForm
        this.sendedForm[properties] = value;
      }
    },

    async create() {
      try {
        const pic =
          this.selectedpic.value != undefined
            ? this.selectedpic.value
            : this.selectedpic.map((user) => user.value).join(",");
        const spv = this.selectedspv.value;
        this.addToForm("pic_id", this.selectedpic.id);
        this.addToForm("spv_id", this.selectedspv.id);
        this.addToForm("task_type", this.task_type);
        this.addToForm("task_title", this.task_title);
        this.addToForm("priority", this.priority.value);
        this.addToForm("status", "Wait-app");
        this.addToForm("start_date", new Date(this.start_date).toISOString());
        this.addToForm("due_date", new Date(this.due_date).toISOString());
        this.addToForm("description", `${this.description} \n`);
        this.addToForm("pic_title", this.selectedpic.title);
        this.addToForm("created_by", localStorage.getItem("username") || "Unknown");
        this.addToForm("bukti_tayang", this.model);
        this.addToForm("iteration", this.iteration);
        this.addToForm("pic", pic);
        this.addToForm("spv", spv);

        const response = await this.$axios.post("/task/new", this.sendedForm, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status === 200) {
          this.$q.notify({
            message: "Task Created",
          });
          this.SpvApp
            ? this.$router.push({ path: "/operator/task_list" })
            : this.$router.push({ path: "/operator/task_list" });
        } else {
          this.$q.notify({
            message: "Failed Creating task",
          });
        }
      } catch (error) {
        console.error("Error when creating task:", error);
        return this.$q.notify({ message: error.message });
      }
    },
  },
};
</script>

<style scoped></style>
