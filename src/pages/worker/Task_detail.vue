<template>
  <q-page class="q-pt-xs">
    <div class="q-ma-md">

      <div class="row q-my-md shadow q-pa-md items-center"
        style="border-radius: 4px;border: 1px solid rgba(0, 0, 0, 0.12);">

        <div class="col-md-6 col-lg-6 col-sm-12 col-xs-12 box_1">
          <q-card class="no-shadow q-pa-sm">
            <div class="row items-center">
              <div class="text-h8 text-weight-bold q-mr-md q-mt-noe">LAPORAN MINGGUAN</div>
              <div class="bg-grey-3  q-mr-sm tulisan border1">
                <div class="text-h8 text-weight-bold q-px-sm align-left tulisan q-my-xs text-indigo-7">Finish</div>
              </div>
              <div class="bg-grey-3  q-mr-sm tulisan border1">
                <div class="text-h8 text-weight-bold q-px-sm align-left tulisan q-my-xs text-indigo-7">On Schedule</div>
              </div>
            </div>
            <q-card-section>
              <div class="col float-left">
                <div class="row">
                  <div class="col-4">
                    <div
                      class="text-h8 text-weight-bold q-mt-none align-left tulisan q-my-xs bg-grey-3  q-mr-md q-pa-md border2">
                      Assigned By</div>
                    <div class="q-mr-lg"><q-input readonly label="RIAN SPV" /></div>
                  </div>
                  <div class="col-4">
                    <div
                      class="text-h8 text-weight-bold q-mt-none align-left tulisan q-my-xs bg-grey-3  q-mr-md q-pa-md border2">
                      TASK TITLE</div>
                    <div class="q-mr-lg"><q-input readonly label="Laporan Mingguan" /></div>
                  </div>
                  <div class="col-4">
                    <div
                      class="text-h8 text-weight-bold q-mt-none align-left tulisan q-my-xs bg-grey-3  q-mr-md q-pa-md border2">
                      DUE DATE</div>
                    <div class="q-mr-lg"><q-input readonly label="08-DEC-2023, 09.00AM" />
                    </div>
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>

        <div class="col-md-6 col-lg-6 col-sm-12 col-xs-12 box_2">
          <q-card class="no-shadow q-pa-sm row float-right q-pt-none justify-center">
            <div v-for="(time, index) in timerData" :key="index" class="col-md-3 col-lg-3 col-sm-5 col-xs-5 ">
              <q-circular-progress :max="time.max" show-value track-color="light-blue-2" class="text-black q-ma-md"
                :value="time.value" size="100px" color="light-blue" />
              <div v-if="time.labelPosition === 'bottom'" class="vertical-bottom text-center text-black">{{ time.label }}
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
                <div class="">Laporan Mingguan</div>
                <div class="">Bambang</div>
                <div class="">08-DEC-2023, 09.00AM</div>
              </div>
            </q-card-section>
            <q-card-section class="col-12">
              <div class="q-pa-md" style="max-width: 100%">
                <q-list>
                  <q-expansion-item popup default-opened icon="" class="col-12" label="Progress">
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
                            <div class="">{{ slide }} %</div>
                            <q-slider v-model="slide" color="blue" track-color="light-blue-1" inner-track-color="blue-3"
                              :max="100" />
                          </div>
                        </div>
                      </q-card-section>
                    </q-card>
                  </q-expansion-item>
                  <q-expansion-item popup default-opened icon="" class="col-12" label="Addtional Details">
                    <q-separator />
                    <q-card>
                      <q-card-section>
                        <div class="row">
                          <div class="col">
                            <div class="">Create On</div>
                            <div class="">Create By</div>
                          </div>
                          <div class="col">
                            <div class="">04-DEC-2023, 09.15 AM</div>
                            <div class="">RIAN SPV</div>
                          </div>
                        </div>
                      </q-card-section>
                      <q-card-section>

                      </q-card-section>
                    </q-card>
                  </q-expansion-item>
                  <q-expansion-item popup default-opened icon="" label="History">
                    <q-separator />
                    <q-card>
                      <q-card-section>
                        <div class="">Bambang logged 1 Days, 4 Hours, 45 Minutes, 55 Seconds.</div>
                        <div class="q-pt-md">Finished on 05 Dec 2023, 15:45</div>
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
                <div class="q-ml-lg">Laporan Request :</div>
                <div class="q-ml-md">1. Pencatatan Penjualan selama 1 minggu terakhir</div>
                <div class="q-ml-md">2. Berisi data dari seluruh mitra</div>
                <div class="q-ml-md">3. Termasuk dengan perhitungan bahan </div>
                <div class="q-ml-lg">.</div>
              </CardBase>
              <CardBase class="col-6">

                <q-input class=" border2 col-6" bottom-slots v-model="text" label="Text" dense>
                  <template v-slot:after>
                    <q-btn round dense flat icon="send" />
                  </template>
                </q-input>
              </CardBase>
            </q-card-section>
          </q-card>

          <div class="q-mt-md">
            Attachment Download
          </div>
          <q-card flat bordered class="no-shadow col-12">
            <q-card-section class="row">
              <CardBase class="  ">
                <div class="q-pa-md">
                  <q-uploader url="" label="File" color="grey" square flat bordered style="max-width: 300px" />
                  <div class="q-pt-md"></div>
                  <q-uploader style="max-width: 300px" url="" label="Dokumen Hasil" multiple color="grey" />
                  <div class="q-pt-md row justify-between">
                    <q-btn unelevated class="q-mr-md" :ripple="{ color: 'blue' }" color="blue-1" text-color="blue"
                      label="Start" no-caps @click="startCountdown" />
                    <q-btn unelevated :ripple="{ color: 'grey' }" color="grey-3" text-color="grey-7"
                      label="Send To Other PIC" no-caps to="task_detail_2" />
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
import { ref } from 'vue';
import Vue from 'vue';
import { exportFile } from 'quasar';

function wrapCsvValue(val, formatFn) {
  let formatted = formatFn !== void 0
    ? formatFn(val)
    : val

  formatted = formatted === void 0 || formatted === null
    ? ''
    : String(formatted)

  formatted = formatted.split('"').join('""')

  return `"${formatted}"`
}

export default {
  setup() {
    return {
      slide: ref(15)
    }
  },

  data() {
    return {
      filter: '',
      mode: 'list',
      timerData: [
        { label: 'Days', labelPosition: 'bottom', max: 30, value: 1 },
        { label: 'Hours', labelPosition: 'top', max: 24, value: 4 },
        { label: 'Minutes', labelPosition: 'bottom', max: 60, value: 45 },
        { label: 'Seconds', labelPosition: 'bottom', max: 60, value: 55 },
      ],
      countdown: null,
    }
  },
  methods: {
    startCountdown() {
      this.countdown = setInterval(() => {
        // Calculate seconds
        let totalSeconds = this.timerData[0].value * 24 * 60 * 60 +
          this.timerData[1].value * 60 * 60 +
          this.timerData[2].value * 60 +
          this.timerData[3].value;

        if (totalSeconds > 0) {
          totalSeconds--;
          this.timerData[0].value = Math.floor(totalSeconds / (24 * 60 * 60));
          this.timerData[1].value = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
          this.timerData[2].value = Math.floor((totalSeconds % (60 * 60)) / 60);
          this.timerData[3].value = totalSeconds % 60;
        } else {
          this.stopCountdown();
        }
      }, 1000);
    },
    stopCountdown() {
      clearInterval(this.countdown);
    },
  },
  beforeDestroy() {
    this.stopCountdown();
  },
}
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
