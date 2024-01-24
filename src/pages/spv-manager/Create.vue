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
                    <q-btn-toggle v-model="btnmodel" spread no-caps toggle-color="cyan-6" class="no-shadow" color="grey-3"
                      text-color="black" :options="[
                        { label: 'Single Task', value: 'single' },
                        { label: 'Multi Task', value: 'multi' }
                      ]" />
                  </div>
                </q-item-section>
              </q-item>
            </div>

            <div class="col-12">
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs text-weight-bold">Task Title</q-item-label>
                  <q-input dense autogrow filled class="full-width" placeholder="Type name" v-model="title" />
                </q-item-section>
              </q-item>
            </div>

            <div class="col-12">
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs text-weight-bold">Priority</q-item-label>
                  <q-select dense filled outlined v-model="deposit.priority" :options="priorityoptions" stack-label
                    options-dense></q-select>
                </q-item-section>
              </q-item>
            </div>

            <div class="col-12">
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs text-weight-bold"></q-item-label>
                  <div class="q-gutter-sm">
                    <q-radio v-model="shape" val="daily" label="Daily" />
                    <q-radio v-model="shape" val="weekly" label="Weekly" />
                    <q-radio v-model="shape" val="monthly" label="Monthly" />
                  </div>
                </q-item-section>
              </q-item>
            </div>

            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs text-weight-bold">Start Date</q-item-label>
                  <q-input filled dense v-model="startdate">
                    <template v-slot:prepend>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                          <q-date v-model="startdate" mask="YYYY-MM-DD HH:mm">
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
                          <q-time v-model="startdate" mask="YYYY-MM-DD HH:mm" format24h>
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
                  <q-input filled dense v-model="duedate">
                    <template v-slot:prepend>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                          <q-date v-model="duedate" mask="YYYY-MM-DD HH:mm">
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
                          <q-time v-model="duedate" mask="YYYY-MM-DD HH:mm" format24h>
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
                  <q-input v-model="text" filled type="textarea" placeholder="Give some example" />
                </q-item-section>
              </q-item>
            </div>

            <!-- pic -->
            <div class="col-12">
              <q-item>
                <q-item-selection class="row items-center">
                  <q-item-label class="text-weight-bold q-pb-xs col-12">PIC</q-item-label>

                  <q-form @submit="onSubmitpic" class="row q-gutter-sm items-center">
                    <q-select multiple dense filled v-model="pic" name="pic" use-input input-debounce="0"
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
                    <q-select multiple dense filled v-model="spv" name="spv" use-input input-debounce="0"
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
                    <q-btn unelevated class="no-shadow" label="Cancel" color="grey-3" text-color="black" filled
                      type="submit" v-close-popup />
                    <q-btn unelevated class="no-shadow" label="Create" color="grey-3" text-color="primary" filled
                      type="submit" @click="createNotify" to="task_monitoring" />
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

export default defineComponent({
  data() {
    return {
      deposit: {},
      statusoptions: [
        "To-do",
      ],
      priorityoptions: [
        "Important",
        "High",
        "Normal",
      ],
      shape: [
        "Daily",
        "Weekly",
        "Monthly",
      ],
    }
  },

  setup() {
    const submittedpic = ref(false)
    const submitEmptypic = ref(false)
    const submitResultpic = ref([])
    const submittedspv = ref(false)
    const submitEmptyspv = ref(false)
    const submitResultspv = ref([])
    return {
      title: ref(''),
      startdate: ref(''),
      duedate: ref(''),
      model: ref(null),
      btnmodel: ref('single'),
      text: ref(''),
      step: ref(1),
      address_detail: ref({}),
      card_detail: ref({}),
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
    }
  },

  methods: {
    createNotify() {
      this.$q.notify({
        message: 'Task Created',
      })
    }
  },
})
</script>

<style scoped></style>

