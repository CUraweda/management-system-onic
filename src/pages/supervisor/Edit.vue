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


            <div class="col-12">
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs text-weight-bold">Task Type</q-item-label>
                  <div class="no-shadow">
                    <q-btn-toggle v-model="form.task_type" spread no-caps toggle-color="cyan-6" class="no-shadow"
                      color="grey-3" text-color="black" :options="task_type_options" />
                  </div>
                </q-item-section>
              </q-item>
            </div>

            <div class="col-12">
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs text-weight-bold">Task Title</q-item-label>
                  <q-input dense autogrow filled class="full-width" placeholder="Type name" v-model="form.task_title" />
                </q-item-section>
              </q-item>
            </div>

            <div class="col-12">
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs text-weight-bold">Priority</q-item-label>
                  <q-select dense filled outlined v-model="form.priority" :options="opsipriority" stack-label
                    options-dense></q-select>
                </q-item-section>
              </q-item>
            </div>

            <div class="col-12">
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs text-weight-bold"></q-item-label>
                  <div class="q-gutter-sm">
                    <q-radio v-model="form.iteration" label="Daily" val="daily" />
                    <q-radio v-model="form.iteration" label="Weekly" val="weekly" />
                    <q-radio v-model="form.iteration" label="Monthly" val="monthly" />
                    <q-radio v-model="form.iteration" label="Insidental" val="insidental" />
                  </div>
                </q-item-section>
              </q-item>
            </div>

            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs text-weight-bold">Start Date</q-item-label>
                  <q-input filled dense v-model="form.start_date">
                    <template v-slot:prepend>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                          <q-date v-model="form.start_date" mask="YYYY-MM-DD HH:mm">
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
                          <q-time v-model="form.start_date" mask="YYYY-MM-DD HH:mm" format24h>
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
                  <q-input filled dense v-model="form.due_date">
                    <template v-slot:prepend>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                          <q-date v-model="form.due_date" mask="YYYY-MM-DD HH:mm">
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
                          <q-time v-model="form.due_date" mask="YYYY-MM-DD HH:mm" format24h>
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
                  <q-item-label class="q-pb-xs text-weight-bold">Description</q-item-label>
                  <q-input v-model="form.description" filled type="textarea" placeholder="Give some example" />
                </q-item-section>
              </q-item>
            </div>

            <!-- pic -->
            <div class="col-12">
              <q-item>
                <q-item-selection class="row items-center">
                  <q-item-label class="text-weight-bold q-pb-xs col-12">PIC</q-item-label>

                  <q-form @submit="onSubmitpic" class="row q-gutter-sm items-center">
                    <q-select readonly multiple dense filled v-model="form.pic" name="pic" use-input input-debounce="0"
                      :options="picoptions" behavior="menu" class="col-6">
                      <template v-slot:no-option>
                        <q-item>
                          <q-item-section class="text-grey">
                            No results
                          </q-item-section>
                        </q-item>
                      </template>
                    </q-select>

                    <div class="text-cyan col-5">
                      <q-btn disable dense flat color="cyan" icon="add" type="submit" label="Add Person" />
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
                          <q-btn round flat dense icon="close" class="float-right" color="grey-8" v-close-popup />
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
                  <q-item-label class="text-weight-bold q-pb-xs col-12">Supervisor</q-item-label>
                  <q-form multiple @submit="onSubmitspv" class="row q-gutter-sm items-center">
                    <q-select readonly multiple dense filled v-model="form.spv" name="spv" use-input input-debounce="0"
                      :options="spvoptions" behavior="menu" class="col-6">
                      <template v-slot:no-option>
                        <q-item>
                          <q-item-section class="text-grey">
                            No results
                          </q-item-section>
                        </q-item>
                      </template>
                    </q-select>
                    <div class="text-cyan col-5">
                      <q-btn disable dense flat color="cyan" icon="add" type="submit" label="Add Person" />
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
                          <q-btn removeable dense flat color="red" size="15px" icon="close" />
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
        <q-card class="no-shadow fit row wrap items-start content-start" bordered>
          <q-card-section class="text-weight-bold text-h6 text-black ">
            Add to card
          </q-card-section>
          <div class="col-12">
            <q-item>
              <q-item-section class="q-mb-xl">
                <q-file outlined v-model="form.model" label="Upload File" class="q-mb-xl">
                  <template v-slot:append>
                    <q-icon name="ios_share" />
                  </template>
                </q-file>
              </q-item-section>
            </q-item>
          </div>

          <!-- <div class="col-12">
            <q-item>
              <q-item-section>
                <q-item-label class="q-pb-xs text-weight-bold">Upload Excel File</q-item-label>
                <q-file outlined  label="Upload File" class="q-mb-xl" accept=".xlsx, .csv" @change="handleFileUpload">
                  <template v-slot:append>
                    <q-icon name="ios_share" />
                  </template>
                </q-file>
                <q-input filled dense v-model="excelFile" type="file" @change="onFileChange" />
              </q-item-section>
            </q-item>
          </div> -->

          <q-space></q-space>

          <div class="col-12 absolute-bottom-right q-mt-xl">
            <q-item>
              <q-item-section>
                <div class="row justify-end">
                  <q-card-actions>
                    <q-btn unelevated class="no-shadow" label="Cancel" color="grey-3" text-color="black" filled
                      type="submit" v-close-popup />
                    <q-btn unelevated class="no-shadow" label="Create" color="grey-3" text-color="primary" filled
                      type="submit" @click="edit" to="task_monitoring" />
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
import * as XLSX from 'xlsx';
import Papa from 'papaparse';
import axios from 'axios';

export default {
  name: 'ManagerEdit',
  props: ['id'],
  data() {
    return {
      form: {
        task_type: '',
        task_title: '',
        priority: '',
        iteration: '',
        start_date: null,
        due_date: null,
        description: '',
        pic: '',
        spv: '',
      },
    };
  },


  setup() {
    const submittedpic = ref(false)
    const submitEmptypic = ref(false)
    const submitResultpic = ref([])
    const submittedspv = ref(false)
    const submitEmptyspv = ref(false)
    const submitResultspv = ref([])

    return {
      iteration: ref(''),
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
      pic: ref([]),
      picoptions: [
        {
          label: 'Bambang',
          value: 'Bambang'
        },
        {
          label: 'Tami',
          value: 'Tami'
        },
        {
          label: 'Rani',
          value: 'Rani'
        }
      ],
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
      spv: ref([]),
      spvoptions: [
        {
          label: 'Rian',
          value: 'Rian'
        },
        {
          label: 'Kusuma',
          value: 'Kusuma'
        },
        {
          label: 'Didit',
          value: 'Didit'
        }
      ],
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
    this.fetchData();
  },

  methods: {
    async fetchData() {
      try {
        const response = await axios.get('https://api-prmn.curaweda.com:3000/task/all/' + this.id);
        this.form.task_type = response.data.task_type;
        this.form.task_title = response.data.task_title;
        this.form.priority = response.data.priority;
        this.form.iteration = response.data.Iteration;
        this.form.start_date = response.data.start_date;
        this.form.due_date = response.data.due_date;
        this.form.description = response.data.description;
        this.form.pic = response.data.pic;
        this.form.spv = response.data.spv;

        console.log(response.data.start_date)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },

    async edit() {
      const data = {
        task_type: this.form.task_type,
        task_title: this.form.task_title,
        priority: this.form.priority.value,
        start_date: this.form.start_date,
        due_date: this.form.due_date,
        description: this.form.description,
        // pic: this.pic.map(item => item.value),
        // spv: this.spv.map(item => item.value),
      };

      try {
        const response = await fetch('https://api-prmn.curaweda.com:3000/task/edit/' + this.id, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          this.$q.notify({
            message: 'Task Edited',
          });
          this.$router.push('/supervisor/task_monitoring')
        } else {
          this.$q.notify({
            message: 'Failed Edited task',
          });
        }
      } catch (error) {
        console.error('EROR:', error);
      }
    },

    handleFileUpload(event) {
      const file = event.target.files[0];

      if (file) {
        const reader = new FileReader();

        reader.onload = (e) => {
          const content = e.target.result;

          // Determine if the file is XLSX or CSV
          if (file.name.endsWith('.xlsx')) {
            this.parseXLSX(content);
          } else if (file.name.endsWith('.csv')) {
            this.parseCSV(content);
          }
        };

        reader.readAsBinaryString(file);
      }

    },

    parseXLSX(content) {
      const workbook = XLSX.read(content, { type: 'binary' });
      const firstSheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[firstSheetName];
      const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      // Assuming data is a 2D array where each row represents a record
      // Update your form fields accordingly
      this.title = data[0][0]; // Example: Assuming the title is in the first cell of the first row
      // Repeat for other fields

      this.$q.notify({
        message: 'Data from XLSX file has been loaded',
      });
    },

    parseCSV(content) {
      Papa.parse(content, {
        header: true,
        complete: (result) => {
          const data = result.data;

          // Assuming data is an array of objects with header as keys
          // Update your form fields accordingly
          if (data.length > 0) {
            this.title = data[0].TaskTitle; // Example: Assuming TaskTitle is a header in the CSV
            // Repeat for other fields
          }

          this.$q.notify({
            message: 'Data from CSV file has been loaded',
          });
        },
      });
    },

  },
}
</script>

<style scoped></style>
