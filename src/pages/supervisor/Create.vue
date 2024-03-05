<template>
  <q-page class="q-pa-sm bg-white">
    <div class="row q-col-gutter-sm">
      <div class="col-lg-7 col-md-7 col-sm-12 col-xs-12">

        <q-card class="no-shadow" bordered>
          <div class="row q-mb-md">
            <q-card-section class="text-center text-h6 text-black text-weight-bold">
              <q-img src="statics/info.svg" width="25px" class=" q-mr-sm" />
              General Information
            </q-card-section>


            <!-- <div class="col-12">
              <q-item>
                <q-item-section>
                  <div class="no-shadow">
                    <q-checkbox v-model="SpvApp" color="blue" class="q-pl-none q-ml-none"
                      label="Need to be approved by spv?" />
                  </div>
                </q-item-section>
              </q-item>
            </div> -->

            <div class="col-12">
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs text-weight-bold">Task Type</q-item-label>
                  <div class="no-shadow">
                    <q-btn-toggle v-model="task_type" spread no-caps toggle-color="cyan-6" class="no-shadow"
                      color="grey-3" text-color="black" :options="task_type_options" />
                  </div>
                </q-item-section>
              </q-item>
            </div>

            <div class="col-12">
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs text-weight-bold">Task Title</q-item-label>
                  <q-input dense autogrow filled class="full-width" placeholder="Type name" v-model="task_title"
                    :rules="[val => val !== null && val !== '' || 'Required']" />
                </q-item-section>
              </q-item>
            </div>

            <div class="col-12">
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs text-weight-bold">Priority</q-item-label>
                  <q-select dense filled outlined v-model="priority" :options="opsipriority" stack-label
                    :rules="[val => val !== null && val !== '' || 'Required']" options-dense></q-select>
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
                  <q-input filled dense v-model="start_date" :rules="[val => val !== null && val !== '' || 'Required']">
                    <template v-slot:prepend>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
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
                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
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
                  <q-input filled dense v-model="due_date" :rules="[val => val !== null && val !== '' || 'Required']">
                    <template v-slot:prepend>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
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
                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
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

            <!-- <div class="col-6">
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs text-weight-bold">Due Date</q-item-label>
                  <q-input dense filled v-model="duedate" mask="date" :rules="['date']">
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                          <q-date v-model="duedate">
                            <div class="row items-center justify-end">
                              <q-btn v-close-popup label="Close" color="primary" flat />
                            </div>
                          </q-date>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </q-item-section>
              </q-item>
            </div> -->
            <div class="col-12">
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs text-weight-bold">Description</q-item-label>
                  <q-input v-model="description" filled type="textarea" placeholder="Give some example"
                    :rules="[val => val !== null && val !== '' || 'Required']" />
                </q-item-section>
              </q-item>
            </div>

            <!-- pic -->
            <div class="col-12">
              <q-item>
                <q-item-selection class="row items-center">
                  <q-item-label class="text-weight-bold q-pb-xs col-12">PIC</q-item-label>

                  <q-form @submit="onSubmitpic" class="row q-gutter-sm items-center">
                    <q-select multiple dense filled v-model="selectedpic" name="pic" use-input input-debounce="0"
                      :options="picOptions" behavior="menu" class="col-6"
                      :rules="[val => val !== null && val !== '' || 'Required']">
                      <template v-slot:no-option>
                        <q-item>
                          <q-item-section class="text-grey">
                            No results
                          </q-item-section>
                        </q-item>
                      </template>
                    </q-select>

                    <div class="text-cyan col-5">
                      <q-btn dense flat color="cyan" icon="add" type="submit" label="Add Person" />
                    </div>
                  </q-form>

                  <!-- selected pic card -->
                  <q-card v-if="submittedpic" flat class="col-12 q-mt-md"
                    :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2'">
                    <template>
                      <q-separator></q-separator>
                      <q-card-section class="row q-gutter-sm items-center">
                        <div v-for="(item, index) in submitResultpic" :key="index"
                          class="q-pa-sm bg-blue-2 row items-center justify-between"
                          style="border-radius: 23px; width: 150px;">
                          <q-avatar size="30px" color="blue">
                            <img src="statics/worker.png">
                          </q-avatar>
                          {{ item.value }}
                          <q-btn removeable dense flat color="red" size="15px" icon="close"
                            @click="removeItempic(index)" />
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
                  <q-item-label class="text-weight-bold q-pb-xs col-12">Supervisor</q-item-label>
                  <q-form multiple @submit="onSubmitspv" class="row q-gutter-sm items-center">
                    <q-select multiple dense filled v-model="selectedspv" name="spv" use-input input-debounce="0"
                      :options="spvOptions" behavior="menu" class="col-6"
                      :rules="[val => val !== null && val !== '' || 'Required']">
                      <template v-slot:no-option>
                        <q-item>
                          <q-item-section class="text-grey">
                            No results
                          </q-item-section>
                        </q-item>
                      </template>
                    </q-select>
                    <div class="text-cyan col-5">
                      <q-btn dense flat color="cyan" icon="add" type="submit" label="Add Person" />
                    </div>
                  </q-form>

                  <q-card v-if="submittedspv" flat class="col-12 q-mt-md"
                    :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2'">
                    <template>
                      <q-card-section class="row q-gutter-sm items-center">
                        <div v-for="(item, index) in submitResultspv" :key="index"
                          class="q-pa-sm bg-blue-2 row items-center justify-between"
                          style="border-radius: 23px; width: 150px;">
                          <q-avatar size="30px" color="blue">
                            <img src="statics/worker.png">
                          </q-avatar>
                          {{ item.value }}
                          <!-- Tambahkan event click untuk memanggil fungsi removeItem dengan indeks item -->
                          <q-btn removeable dense flat color="red" size="15px" icon="close" @click="removeItem(index)" />
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
          <q-card-section class="text-weight-bold text-h6 text-black ">
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
                <div class="row justify-end">
                  <q-card-actions>
                    <q-checkbox v-model="SpvApp" color="blue" class="q-mr-lg" label="Requesting approval" />
                    <q-btn unelevated class="no-shadow" label="Cancel" color="grey-3" text-color="black" filled
                      type="submit" v-close-popup />
                    <q-btn unelevated class="no-shadow" label="Create" color="grey-3" text-color="primary" filled
                      type="submit" @click="create" to="/supervisor/task_monitoring" />
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
import { defineComponent } from 'vue';
import { ref } from 'vue';
import { exportFile } from "quasar";
import axios from 'axios';

export default {
  name: 'ManagerCreate',
  data() {
    return {
      spv_id: '',
      pic_id: '',
      pic: [],
      selectedpic: null,
      spv: [],
      selectedspv: { label: localStorage.getItem('username'), value: localStorage.getItem('username') },
      iteration: '',
    }
  },

  setup() {
    const SpvApp = ref(false);
    const submittedpic = ref(false)
    const submitEmptypic = ref(false)
    const submitResultpic = ref([])
    const submittedspv = ref(false)
    const submitEmptyspv = ref(false)
    const submitResultspv = ref([])

    return {
      SpvApp,
      task_type: ref([]),
      task_type_options: [
        {
          label: 'Single Task',
          value: 'Single'
        },
        {
          label: 'Multi Task',
          value: 'Multi'
        }
      ],
      task_title: ref(''),
      priority: ref([]),
      opsipriority: [
        {
          label: 'Important',
          value: 'Important'
        },
        {
          label: 'High',
          value: 'High'
        },
        {
          label: 'Normal',
          value: 'Normal'
        }
      ],
      start_date: ref(null),
      due_date: ref(null),
      description: ref(''),

      submittedpic,
      submitEmptypic,
      submitResultpic,

      onSubmitpic(evt) {
        const formData = new FormData(evt.target)
        const data = []

        for (const [name, value] of formData.entries()) {
          data.push({
            name,
            value
          })
        }

        submittedpic.value = true
        submitResultpic.value = data
        submitEmptypic.value = data.length === 0
      },

      submittedspv,
      submitEmptyspv,
      submitResultspv,

      onSubmitspv(evt) {
        const formData = new FormData(evt.target)
        const data = []

        for (const [name, value] of formData.entries()) {
          data.push({
            name,
            value
          })
        }

        submittedspv.value = true
        submitResultspv.value = data
        submitEmptyspv.value = data.length === 0

      },
      model: ref(null),
      text: ref(''),
      address_detail: ref({}),
      card_detail: ref({}),
    }
  },

  mounted() {
    this.fetchData()
  },

  computed: {
    picOptions() {
      return this.pic.map(pic => ({ label: pic.u_name, value: pic.u_name }));
    },
    spvOptions() {
      return this.spv.map(spv => ({ label: spv.u_name, value: spv.u_name }));
    },
    pic_title() {
      return this.SpvApp ? "supervisor" : "operator";
    },
  },

  watch: {
    // Menyebabkan pemanggilan metode getSelectedPicId() setiap kali selectedPic berubah
    selectedPic: 'getSelectedPicId',
    // Menyebabkan pemanggilan metode getSelectedSpvId() setiap kali selectedSpv berubah
    selectedSpv: 'getSelectedSpvId',
  },

  methods: {
    async fetchData() {
      try {
        const response = await this.$axios.get('/user/all');
        this.pic = response.data;
        this.spv = response.data;
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },

    // Metode untuk mengambil pic_id dari opsi pic yang dipilih
    getSelectedPicId() {
      if (this.selectedPic) {
        const selectedPic = this.pic.find(pic => pic.u_id === this.selectedPic.value);
        if (selectedPic) {
          this.pic_id = selectedPic.u_id;
        }
      }
    },

    // Metode untuk mengambil spv_id dari opsi spv yang dipilih
    getSelectedSpvId() {
      if (this.selectedSpv) {
        const selectedSpv = this.spv.find(spv => spv.u_id === this.selectedSpv.value);
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

    async create() {
      const formData = new FormData();
      formData.append('pic_id', this.pic_id);
      formData.append('spv_id', this.spv_id);
      formData.append('task_type', this.task_type);
      formData.append('task_title', this.task_title);
      formData.append('priority', this.priority.value);
      formData.append('status', 'Wait-app');
      formData.append('start_date', new Date(this.start_date).toISOString());
      formData.append('due_date', new Date(this.due_date).toISOString());
      formData.append('description', `${this.description} \n`);
      formData.append('pic_title', this.pic_title);
      formData.append('created_by', localStorage.getItem('username'));
      formData.append('bukti_tayang', this.model);
      formData.append('iteration', this.iteration);
      formData.append('pic', this.submitResultpic.map(item => item.value).join(','));
      formData.append('spv', this.submitResultspv.map(item => item.value).join(','));

      try {
        const response = await this.$axios.post('/task/new', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.status === 200) {
          this.$q.notify({
            message: 'Task Created',
          });
        } else {
          this.$q.notify({
            message: 'Failed Creating task',
          });
        }
      } catch (error) {
        console.error('Fa:', error);
      }
    },

    createNotify() {
      this.$q.notify({
        message: 'Task Created',
      })
    },

  },
}


</script>

<style scoped></style>
