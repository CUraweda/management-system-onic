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
                          ref="startDateProxy"
                        >
                          <q-date @input="() => $refs.startDateProxy.hide()" v-model="start_date" mask="DD-MM-YYYY HH:mm">
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
                          ref="startTimeProxy"
                        >
                          <q-time @input="() => $refs.startTimeProxy.hide()" v-model="start_date" mask="DD-MM-YYYY HH:mm" format24h>
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
                          ref="dueDateProxy"
                        >
                          <q-date @input="() => $refs.dueDateProxy.hide()" v-model="due_date" mask="DD-MM-YYYY HH:mm">
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
                          ref="dueTimeProxy"
                        >
                          <q-time @input="() => $refs.dueTimeProxy.hide()" v-model="due_date" mask="DD-MM-YYYY HH:mm" format24h>
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
                      v-model="selectedpic"
                      name="pic"
                      use-input
                      input-debounce="0"
                      :options="filteredPicOptions"
                      @filter="filterPic"
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
                      :options="filteredSpvOptions"
                      @filter="filterSpv"
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
                      to="/manager/task_monitoring"
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
import axios from "axios";
import Cookies from "js-cookie";
import { ref } from "vue";
import { store } from "../../store/store.js";

export default {
  name: "DirectorCreate",
  data() {
    return {
      loading: ref(true),
      formattedDueDate:'',
      formattedStartDate:'',
      division: sessionStorage.getItem("division")
        ? sessionStorage.getItem("division")
        : Cookies.get("division"),
      branch: sessionStorage.getItem("branch")
        ? sessionStorage.getItem("branch")
        : Cookies.get("branch"),
      token: ref(
        sessionStorage.getItem("token")
          ? sessionStorage.getItem("token")
          : Cookies.get("token")
      ),
      spv_id: "",
      pic_id: "",
      pic: [],
      selectedpic: null,
      spv: [],
      selectedspv: {
        label: sessionStorage.getItem("username")
          ? sessionStorage.getItem("username")
          : Cookies.get("username"),
        value: sessionStorage.getItem("username")
          ? sessionStorage.getItem("username")
          : Cookies.get("username"),
      },
      iteration: "daily",
      isMultitask: ref(false),
      sendedForm: ref({}),
      filteredPicOptions: [],
      filteredSpvOptions: []
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
      role: ref(),
      roles: [],
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
    this.getRole();
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
        this.fetchSpvData();
      },
    },
  },

    methods: {
      filterPic(val, update, abort) {
      // console.log("🚀 ~ filterPic ~ val:", val)
      // console.log("🚀 ~ update ~ this.picOptions:", this.picOptions)
      if (val === '') {
        update(() => {
          this.filteredPicOptions = this.picOptions
        })
      }

      update(() => {
        const needle = val.toLowerCase()
        this.filteredPicOptions = this.picOptions.filter(option => {
          return option.label.toLowerCase().includes(needle)
        })
      })
        // console.log("🚀 ~ update ~ this.filteredBranchOptions:", this.filteredPersonOptions)
    },

    filterSpv(val, update, abort) {
      // console.log("🚀 ~ filterSpv ~ val:", val)
      // console.log("🚀 ~ update ~ this.spvOptions:", this.spvOptions)
      if (val === '') {
        // this.fetchSpvData()
        update(() => {
          this.filteredSpvOptions = this.spvOptions
        })
      }

      update(() => {
        const needle = val.toLowerCase()
        this.filteredSpvOptions = this.spvOptions.filter(option => {
          return option.label.toLowerCase().includes(needle)
        })
      })
        // console.log("🚀 ~ update ~ this.filteredBranchOptions:", this.filteredPersonOptions)
    },

      convertToDate(dateString) {
      const [day, month, yearTime] = dateString.split('-');
      const [year, time] = yearTime.split(' ');
      const formattedString = `${year}-${month}-${day}T${time}:00`;
      return new Date(formattedString);
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
    async getRole() {
      try {
        // console.log("bangbang");
        const response = await this.$axios.get(`/role`, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${this.token}`,
          },
        });

        this.roles = response.data.data;
        // console.log("🚀 ~ getRole ~ ole:", this.roles);

        // return role;
      } catch (err) {
        console.error(err);
        throw err;
      }
    },

    async fetchData() {
      const loginUrl = "https://office.onic.co.id/api/master/employee/active";

      // Make the POST request using fetch
      try {
        const response = await axios.get(loginUrl, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${this.token}`,
          },
        });

        // console.log("🚀 ~ fetchData ~ response:", response);

        if (response.status !== 200) {
          throw Error("Error while fetching");
        }

        const filteredCompany = response.data.data.filter(
          (user) => user.company_name === this.branch && user.division === this.division
        );

        // console.log("🚀 ~ fetchData ~ filteredCompany:", filteredCompany);

        const userRolesMap = {};

        this.roles.forEach((role) => {
          userRolesMap[role.u_id] = role;
        });

        const listOfPic = filteredCompany.map((user) => ({
          label: user.name,
          value: user.name,
          title: userRolesMap[user.id] ? userRolesMap[user.id].role : "",
          division: user.division,
          branch: user.company_name,
          id: user.id,
        }));

        const filteredData = listOfPic.filter((user) => {
          return user.title !== "director" && user.title !== "admin";
        });

        this.picOptions = filteredData;
        // console.log("🚀 ~ fetchData ~ filteredData:", filteredData);
        this.selectedpic = this.picOptions[0];

        const selectedpic = this.picOptions.title;
        // console.log("Selected pic:", this.selectedpic);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },

    async fetchSpvData() {
      const loginUrl = "https://office.onic.co.id/api/master/employee/active";

      // Make the POST request using fetch
      // console.log("kabom");
      try {
        const response = await axios.get(loginUrl, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${this.token}`,
          },
        });
        // console.log("🚀 ~ fetchSpvData ~ response:", response);

        if (response.status !== 200) throw Error("Error while fetching");

        const filteredCompany = response.data.data.filter(
          (user) =>
            user.company_name === this.selectedpic.branch &&
            user.division === this.selectedpic.division
        );

        // console.log("🚀 ~ fetchSpvData ~ filteredCompany:", filteredCompany);

        const userRolesMap = {};

        this.roles.forEach((role) => {
          userRolesMap[role.u_id] = role;
        });

        const listOfSpv = filteredCompany.map((user) => ({
          label: user.name,
          value: user.name,
          title: userRolesMap[user.id] ? userRolesMap[user.id].role : "",
          id: user.id,
        }));

        // console.log("🚀 ~ listOfSpv ~ listOfSpv:", listOfSpv);

        const SelectedPic = this.selectedpic.title;
        let supervisors;
        // console.log(
        //   "🚀 ~ fetchSpvData ~ this.selectedpic.title:",
        //   this.selectedpic.label
        // );

        if (SelectedPic === "operator") {
          supervisors = listOfSpv.filter((user) => {
            const titleLowerCase = user.title;
            return titleLowerCase === "supervisor";
          });
          console.log("titel nya op");
        } else if (SelectedPic === "supervisor") {
          supervisors = listOfSpv.filter((user) => {
            const titleLowerCase = user.title;
            return titleLowerCase === "manager";
          });
          console.log("titel nya spv");
        } else if (SelectedPic === "manager") {
          supervisors = listOfSpv.filter((user) => {
            const titleLowerCase = user.title;
            return titleLowerCase === "director";
          });
          console.log("titel nya manager");
        }

        // console.log("dadakan ", supervisors);

        const listCompany = response.data.data.filter(
          (user) => user.company_name === this.selectedpic.branch && this.selectedpic.division
        );

        const listOfDirec = listCompany.map((user) => ({
          label: user.name,
          value: user.name,
          title: userRolesMap[user.id] ? userRolesMap[user.id].role : "",
          id: user.id,
          divisi: user.division
        }));

        // console.log("🚀 ~ listSupervisor ~ listSupervisor:", listOfDirec);
        const listSupervisor = listOfDirec.filter((user) => {
          const title = user.title;
          return (
            title !== "admin" &&
            title !== "operator" &&
            user.id !== this.selectedpic.id &&
            title !== this.selectedpic.title
          );
        });

        this.spvOptions =
          supervisors && supervisors.length > 0 ? supervisors : listSupervisor;
        this.selectedspv = this.spvOptions[0];
        // console.log("🚀 ~ fetchSpvData ~ selectedspv:", this.spvOptions)
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
        console.log(value);
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
        this.addToForm("start_date", this.convertToDate(this.start_date));
        this.addToForm("due_date", this.convertToDate(this.due_date));
        this.addToForm("description", `${this.description} \n`);
        this.addToForm("pic_title", this.selectedpic.title);
        this.addToForm(
          "created_by",
          sessionStorage.getItem("username")
            ? sessionStorage.getItem("username")
            : Cookies.get("username") || "Unknown"
        );
        this.addToForm("bukti_tayang", this.model);
        this.addToForm("iteration", this.iteration);
        this.addToForm("pic", this.selectedpic.label);
        this.addToForm("spv", this.selectedspv.label);

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
            ? this.$router.push({ path: "/manager/task_monitoring_2" })
            : this.$router.push({ path: "/manager/task_monitoring" });
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
