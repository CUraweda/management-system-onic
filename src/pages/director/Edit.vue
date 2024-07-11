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
                    >Supervisor</q-item-label
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
      loading: ref(true),
      formattedDueDate:'',
      formattedStartDate:'',
    division: sessionStorage.getItem("division")
        ? sessionStorage.getItem("division")
        : Cookies.get("division"),
      branch: sessionStorage.getItem("branch")
        ? sessionStorage.getItem("branch")
        : Cookies.get("branch"),
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
      selectedpic: '',
      selectedspv: '',
      taskPic: "",
      taskSpv: "",
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
      start_date: ref(),
      due_date: ref(),
      pic: ref([]),

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
        // console.log("TITLE PIC : ", this.selectedpic.title);
        // console.log("TITLE SPV : ", this.selectedspv.title);
      },
    },

    selectedspv: {
      handler(value) {
        // console.log("TITLE PIC : ", this.selectedpic.title);
        // console.log("TITLE SPV : ", this.selectedspv.title);
      },
    },
  },

  mounted() {
    this.getRole();
    this.fetchData();
    // this.fetchPic();
    this.intervalId = setInterval(() => {
      this.fetchData();
    }, 60000);
  },

  beforeDestroy() {
    clearInterval(this.intervalId);
  },

    methods: {
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

    filterPic(val, update, abort) {
      // console.log("🚀 ~ filterPic ~ val:", val)
      // console.log("🚀 ~ update ~ this.picOptions:", this.picOptions)
      if (val === "") {
        update(() => {
          this.filteredPicOptions = this.picOptions;
        });
      }

      update(() => {
        const needle = val.toLowerCase();
        this.filteredPicOptions = this.picOptions.filter((option) => {
          return option.label.toLowerCase().includes(needle);
        });
      });
      // console.log("🚀 ~ update ~ this.filteredBranchOptions:", this.filteredPersonOptions)
    },

    filterSpv(val, update, abort) {
      // console.log("🚀 ~ filterSpv ~ val:", val)
      // console.log("🚀 ~ update ~ this.spvOptions:", this.spvOptions)
      if (val === "") {
        // this.fetchSpvData()
        update(() => {
          this.filteredSpvOptions = this.spvOptions;
        });
      }

      update(() => {
        const needle = val.toLowerCase();
        this.filteredSpvOptions = this.spvOptions.filter((option) => {
          return option.label.toLowerCase().includes(needle);
        });
      });
      // console.log("🚀 ~ update ~ this.filteredBranchOptions:", this.filteredPersonOptions)
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

    async fetchPic() {
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
          (user) => user.company_name === this.branch
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

        // console.log("🚀 ~ filteredData ~ filteredData:", listOfPic)


        const userList = filteredData.filter((user) => user.id === this.taskPic);

        this.picOptions = filteredData;
        // console.log("🚀 ~ fetchData ~ filteredData:", filteredData);
        this.selectedpic = userList[0];

        // const selectedpic = this.picOptions.title;
        // console.log("Selected pic:", this.selectedpic);
      } catch (error) {
        console.error("Error fetching users:", error);

        if (error.response && error.response.status === 401) {
          alert("Your session has expired. Please sign in again.");
          // Arahkan pengguna ke halaman sign in
          this.$router.push( "/" ); // Sesuaikan dengan nama rute sign in Anda
        }
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

        const responseData = response.data.data.map((user) => ({
          label: user.name,
          value: user.name,
          title: userRolesMap[user.id] ? userRolesMap[user.id].role : "",
          id: user.id,
        }));

        const listOfSpv = filteredCompany.map((user) => ({
          label: user.name,
          value: user.name,
          title: userRolesMap[user.id] ? userRolesMap[user.id].role : "",
          id: user.id,
        }));

        // console.log("🚀 ~ listOfSpv ~ listOfSpv:", listOfSpv);

        const SelectedPic = this.selectedpic.title;
        let supervisors;

        // console.log("dadakan ", supervisors);

        const listCompany = response.data.data.filter(
          (user) => user.company_name === this.selectedpic.branch
        );

        const listOfDirec = listCompany.map((user) => ({
          label: user.name,
          value: user.name,
          title: userRolesMap[user.id] ? userRolesMap[user.id].role : "",
          id: user.id,
          divisi: user.division,
        }));

        const listCompanyDivision = response.data.data.filter(
          (user) =>
            user.company_name === this.selectedpic.branch &&
            user.division === this.selectedpic.division
        );

        const listOfDirecDivision = listCompanyDivision.map((user) => ({
          label: user.name,
          value: user.name,
          title: userRolesMap[user.id] ? userRolesMap[user.id].role : "",
          id: user.id,
          divisi: user.division,
        }));

        // console.log(listOf)

        let listSupervisor;

        if (SelectedPic === "operator") {
          // Ambil data manager dan director dari listOfDirec
          const managersAndDirectors = listOfDirec.filter((user) => {
            const titleLowerCase = user.title; // ubah menjadi huruf kecil
            return (
              (titleLowerCase === "manager" || titleLowerCase === "director") &&
              user.id !== this.selectedpic.id
            );
          });

          // Ambil data supervisor dari listOfDirecDivision
          const supervisors = listOfDirecDivision.filter((user) => {
            const titleLowerCase = user.title; // ubah menjadi huruf kecil
            return titleLowerCase === "supervisor" && user.id !== this.selectedpic.id;
          });

          // Gabungkan kedua array
          listSupervisor = [...managersAndDirectors, ...supervisors];
        } else if (SelectedPic === "supervisor") {
          listSupervisor = listOfDirec.filter((user) => {
            const titleLowerCase = user.title.toLowerCase(); // ubah menjadi huruf kecil
            return (
              (titleLowerCase === "manager" || titleLowerCase === "director") &&
              user.id !== this.selectedpic.id
            );
          });
        } else if (SelectedPic === "manager") {
          listSupervisor = listOfDirec.filter((user) => {
            const titleLowerCase = user.title.toLowerCase(); // ubah menjadi huruf kecil
            return titleLowerCase === "director" && user.id !== this.selectedpic.id;
          });
        }

        // console.log("🚀 ~ listSupervisor ~ listSupervisor:", listOfDirec);
        //  listOfDirec.filter((user) => {
        //   const title = user.title;
        //   return (
        //     title !== "admin" &&
        //     title !== "operator" &&
        //     user.id !== this.selectedpic.id &&
        //     title !== this.selectedpic.title
        //   );
        // });

        const foundData = responseData.filter((item) => item.id === 12566);
        //
        foundData;
        const options = supervisors && supervisors.length > 0 ? supervisors : listSupervisor;
        const direktur = options.filter((item) => item.id === 12566);
        // console.log(direktur)
        //
        options;
        const optionsList = direktur.length > 0 ? options : [...options, ...foundData];
        //
        const userList = optionsList.filter((user) => user.id === this.taskSpv);
        this.spvOptions = optionsList;
        this.selectedspv = userList[0];
        // console.log("🚀 ~ fetchSpvData ~ selectedspv:", this.spvOptions)
      } catch (error) {
        console.error("Error fetching users:", error);

        if (error.response && error.response.status === 401) {
          alert("Your session has expired. Please sign in again.");
          // Arahkan pengguna ke halaman sign in
          this.$router.push( "/" ); // Sesuaikan dengan nama rute sign in Anda
        }
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

    async fetchData() {
      // console.log(this.id);
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
        this.form.iteration = response.data.iteration;
        this.form.start_date = new Date(
          response.data.start_date
        ).toLocaleString();
        this.form.due_date = new Date(response.data.due_date).toLocaleString();
        this.form.description = response.data.description;
        // const pic_role = response.data.pic_role;
        // const pic = response.data.pic;
        // const spv = response.data.spv;
        // const pic_id = response.data.pic_id;
        // const spv_id = response.data.spv_id;

        // this.taskPic = response.data.map((user) => ({
        //   label: user.pic,
        //   value: user.pic,
        //   title: user.pic_role,
        //   id: user.pic_id,
        // }));

        this.taskPic = response.data.pic_id;
        this.taskSpv = response.data.spv_id;

        this.fetchPic();

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },

    async edit() {
      const data = {
        task_type: this.form.task_type,
        task_title: this.form.task_title,
        iteration: this.form.iteration,
        priority: this.form.priority.value,
        start_date: new Date(this.form.start_date).toISOString(),
        due_date: new Date(this.form.due_date).toISOString(),
        description: this.form.description,
        pic_id: this.selectedpic.id,
        spv_id: this.selectedspv.id,
        pic_role: this.selectedpic.title,
        pic: this.selectedpic.label,
        spv: this.selectedspv.label,
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

  },
};
</script>

<style scoped></style>
