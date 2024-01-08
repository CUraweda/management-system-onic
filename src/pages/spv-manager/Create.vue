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
                  <q-item-label class="q-pb-xs text-weight-bold">Task Title</q-item-label>
                  <q-input dense autogrow filled class="full-width" placeholder="Type name" />
                </q-item-section>
              </q-item>
            </div>
            <div class="col-6">
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs text-weight-bold">Status</q-item-label>
                  <q-select dense filled outlined v-model="deposit.status" :options="statusoptions" stack-label
                    options-dense></q-select>
                </q-item-section>
              </q-item>
            </div>
            <div class="col-6">
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs text-weight-bold">Priority</q-item-label>
                  <q-select dense filled outlined v-model="deposit.priority" :options="priorityoptions" stack-label
                    options-dense></q-select>
                </q-item-section>
              </q-item>
            </div>
            <div class="col-6">
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs text-weight-bold">Start Date</q-item-label>
                  <q-input dense filled v-model="deposit.date" mask="date" placeholder="Deposit Date">
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy ref="depositDateProxy" transition-show="scale" transition-hide="scale">
                          <q-date v-model="deposit.startdate" @input="() => $refs.depositDateProxy.hide()" />
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </q-item-section>
              </q-item>
            </div>
            <div class="col-6">
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs text-weight-bold">Due Date</q-item-label>
                  <q-input dense filled v-model="deposit.date" mask="date" placeholder="Deposit Date">
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy ref="depositDateProxy" transition-show="scale" transition-hide="scale">
                          <q-date v-model="deposit.duedate" @input="() => $refs.depositDateProxy.hide()" />
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
                  <q-item-label class="q-pb-xs text-weight-bold">Task Title</q-item-label>
                  <q-input v-model="text" filled type="textarea" placeholder="Give some example"/>
                </q-item-section>
              </q-item>
            </div>

            <!-- pic -->
            <div class="col-12">
              <q-item>
                <q-item-selection>
                  <q-item-label class="text-weight-bold">PIC</q-item-label>
                </q-item-selection>
              </q-item>

              <!-- pic card -->
              <div class="row q-ml-xs q-gutter-md">

                <div class="bg-blue-2 q-pa-sm" style="border-radius: 20px; width: 150px;">
                  <q-avatar size="30px" color="blue">
                    <img src="statics/worker.png">
                  </q-avatar>
                  Bambang
                  <q-btn dense flat color="red" size="15px" icon="close" />
                </div>

                <div class="bg-purple-2 q-pa-sm" style="border-radius: 20px; width: 150px">
                  <q-avatar size="30px" color="purple">
                    <img src="statics/worker.png">
                  </q-avatar>
                  Rini
                  <q-btn dense flat color="red" size="15px" icon="close" />
                </div>

                <div class="bg-white-2 q-pa-sm text-cyan" style="border-radius: 20px; width: 150px">
                  <q-btn dense flat color="cyan" size="15px" icon="add" />
                  Add Person
                </div>
              </div>
              <!-- pic card -->
            </div>
            <!-- pic -->

            <!-- spv -->
            <div class="col-12">
              <q-item>
                <q-item-selection>
                  <q-item-label class="text-weight-bold">Supervisor</q-item-label>
                </q-item-selection>
              </q-item>

              <!-- spv card -->
              <div class="row q-ml-xs q-gutter-md justify-between">
                <div class="bg-purple-2 q-pa-sm q-mr-md" style="border-radius: 20px; width: 150px">
                  <q-avatar size="30px" color="purple">
                    <img src="statics/worker.png">
                  </q-avatar>
                  Rian
                  <q-btn dense flat color="red" size="15px" icon="close" />
                </div>
              </div>
              <!-- spv card -->
            </div>
            <!-- spv -->

          </div>
        </q-card>


      </div>
      <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12">
        <q-card class="no-shadow" bordered>
          <q-card-section class="text-weight-bold text-h6 text-black ">
            Add to card
          </q-card-section>
          <div class="col-12">
            <q-item>
              <q-item-section>
                <q-file outlined v-model="model" label="Upload File">
                  <template v-slot:append>
                    <q-icon name="ios_share" />
                  </template>
                </q-file>
              </q-item-section>
            </q-item>
          </div>
          <div class="col-12">
            <q-item>
              <q-item-section>
                <q-file outlined v-model="model" label="Upload File">
                  <template v-slot:append>
                    <q-icon name="ios_share" />
                  </template>
                </q-file>
              </q-item-section>
            </q-item>
          </div>
          <div class="col-12">
            <q-item>
              <q-item-section>
                <q-file outlined v-model="model" class="text-primary" label-color="primary" label="Upload an attachment">
                  <template v-slot:prepend>
                    <q-icon name="attach_file" color="primary" class="rotate-45" />
                  </template>
                </q-file>
              </q-item-section>
            </q-item>
          </div>

          <q-space></q-space>

          <div class="col-12 bottom-right" width="400px">
            <q-item>
              <q-item-section>
                <q-space></q-space>
                <div class="row q-mb-xl q-mr-md">
                <q-card-actions>
                  <q-btn unelevated class="no-shadow" label="Cancel" color="grey-3" text-color="black" filled
                    type="submit" v-close-popup />
                </q-card-actions>
                <q-card-actions>
                  <q-btn unelevated class="no-shadow" label="Next" color="grey-3" text-color="primary" filled
                    type="submit" v-close-popup />
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
    }
  },
  name: "Checkout",
  setup() {
    return {
      model: ref(null),
      text: ref(''),
      step: ref(1),
      address_detail: ref({}),
      card_detail: ref({})
    }
  }
})
</script>

<style>



</style>

