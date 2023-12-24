<template>
  <q-page class="q-pa-sm bg-white">
    <div class="row q-col-gutter-sm">
      <div class="col-lg-7 col-md-7 col-sm-12 col-xs-12">

        <q-card class="no-shadow" bordered>
          <div class="row">
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
                  <q-select dense filled outlined v-model="deposit.account" :options="options" stack-label
                    options-dense></q-select>
                </q-item-section>
              </q-item>
            </div>
            <div class="col-6">
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs text-weight-bold">Priority</q-item-label>
                  <q-select dense filled outlined v-model="deposit.account" :options="options" stack-label
                    options-dense></q-select>
                </q-item-section>
              </q-item>
            </div>
            <div class="col-6">
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs text-weight-bold">Deposit Date</q-item-label>
                  <q-input dense filled v-model="deposit.date" mask="date" placeholder="Deposit Date">
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy ref="depositDateProxy" transition-show="scale" transition-hide="scale">
                          <q-date v-model="deposit.date" @input="() => $refs.depositDateProxy.hide()" />
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
                  <q-item-label class="q-pb-xs text-weight-bold">Deposit Date</q-item-label>
                  <q-input dense filled v-model="deposit.date" mask="date" placeholder="Deposit Date">
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy ref="depositDateProxy" transition-show="scale" transition-hide="scale">
                          <q-date v-model="deposit.date" @input="() => $refs.depositDateProxy.hide()" />
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </q-item-section>
              </q-item>
            </div>
            <div class="col-12">
              <q-item>
                <q-item-selection>
                  <q-item-label class="text-weight-bold">Description</q-item-label>
                  <q-input v-model="text" dense filled type="textarea" class="full-width"
                    placeholder="Give some example" />
                </q-item-selection>
              </q-item>
            </div>
            <div class="col-12">
              <q-item>
                <q-item-selection>
                  <q-item-label class="text-weight-bold">PIC</q-item-label>
                </q-item-selection>
              </q-item>
            </div>
            <div class="col-12">
              <q-item>
                <q-item-selection>
                  <q-item-label class="text-weight-bold">Supervisor</q-item-label>
                </q-item-selection>
              </q-item>
            </div>
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

          <div class="col-12">
            <q-item>
              <q-item-section>
                <q-space></q-space>
                <div class="row">
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
      options: [
        "National Bank",
        "Bank of Asia",
        "Corporate Bank",
        "Public Bank"
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

<style></style>
