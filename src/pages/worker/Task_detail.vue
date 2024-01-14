<template>
  <q-page class="q-pt-xs">
    <div class="q-ma-md">

      <div class="row q-my-md shadow q-pa-md" style="border-radius: 4px;border: 1px solid rgba(0, 0, 0, 0.12);">

        <div class="col-md-6 col-lg-6 col-sm-12 col-xs-12 box_1">
          <q-card class="no-shadow q-pa-sm">
            <div class="row">
              <div class="text-h8 text-weight-bold q-mr-md q-mt-noe">LAPORAN MINGGUAN</div>
              <div class="bg-grey-3  q-mr-md tulisan border1">
                <div class="text-h8 text-weight-bold q-px-md align-left tulisan q-my-xs">Finish</div>
              </div>
              <div class="bg-grey-3  q-mr-md tulisan border1">
                <div class="text-h8 text-weight-bold q-px-md align-left tulisan q-my-xs">On Schedule</div>
              </div>
            </div>
            <q-card-section>
              <div class="col float-left">
                <div class="row">
                  <div class="col-4">
                    <div class="text-h8 text-weight-bold q-mt-none align-left tulisan q-my-xs bg-grey-3  q-mr-md q-pa-md border2">
                      Assigned By</div>
                    <div class="q-mr-lg"><q-input readonly label="RIAN SPV" /></div>
                  </div>
                  <div class="col-4">
                    <div class="text-h8 text-weight-bold q-mt-none align-left tulisan q-my-xs bg-grey-3  q-mr-md q-pa-md border2">
                      TASK TITLE</div>
                    <div class="q-mr-lg"><q-input readonly label="Laporan Mingguan" /></div>
                  </div>
                  <div class="col-4">
                    <div class="text-h8 text-weight-bold q-mt-none align-left tulisan q-my-xs bg-grey-3  q-mr-md q-pa-md border2">
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
            <div class="col-md-3 col-lg-3 col-sm-5 col-xs-5 ">
              <q-circular-progress :max="30" show-value track-color="light-blue-2" class="text-black q-ma-md" value="1"
                size="100px" color="light-blue" />
              <div class="vertical-bottom text-center text-black">Days</div>
            </div>
            <div class="col-md-3 col-lg-3 col-sm-5 col-xs-5 ">
              <q-circular-progress :max="24" show-value track-color="light-blue-2" class="text-black q-ma-md" value="4"
                size="100px" color="light-blue" />
              <div class="text-center text-black">Hours</div>
            </div>
            <div class="col-md-3 col-lg-3 col-sm-5 col-xs-5 ">
              <q-circular-progress :max="60" show-value track-color="light-blue-2" class="text-black q-ma-md" value="45"
                size="100px" color="light-blue" />
              <div class="vertical-bottom text-center text-black">Miunites</div>
            </div>
            <div class="col-md-3 col-lg-3 col-sm-5 col-xs-5 ">
              <q-circular-progress :max="60" show-value track-color="light-blue-2" class="text-black q-ma-md" value="55"
                size="100px" color="light-blue" />
              <div class="vertical-bottom text-center text-black">Second</div>
            </div>
          </q-card>
        </div>
      </div>

      <div class="row q-col-gutter-md q-pt-md">
        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
          Details
          <q-card flat bordered class="shadow q-pa-none q-ma-none">
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
                            <div class="">100%</div>
                            <div class="">100%</div>
                            <q-item class="q-py-xs" style="min-height: unset">
                              <q-item-section>
                                <div class="progress-base q-my-sm">
                                  <div class="progress-bar-2" style="width:100%"></div>
                                </div>
                              </q-item-section>
                            </q-item>
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
            <q-card-section class="row">
              <CardBase class="">
                <div class="q-ml-lg">Laporan Request :</div>
                <div class="q-ml-md">1. Pencatatan Penjualan selama 1 minggu terakhir</div>
                <div class="q-ml-md">2. Berisi data dari seluruh mitra</div>
                <div class="q-ml-md">3. Termasuk dengan perhitungan bahan </div>
                <div class="q-ml-lg">.</div>
              </CardBase>
            </q-card-section>
          </q-card>

          <q-card flat bordered class="q-mt-md no-shadow">
            Attachment Download
            <q-card-section class="row">
              <CardBase class="  ">
                <div class="q-pa-md">
                  <q-uploader url="http://localhost:4444/download" label="File" color="grey" square flat bordered
                    style="max-width: 300px" />
                  <div class="q-pt-md"></div>
                  <q-uploader style="max-width: 300px" url="http://localhost:4444/download" label="Screenchot" multiple
                    color="grey" />
                  <div class="q-pt-md ">
                    <q-btn unelevated class="q-mr-md" :ripple="{ color: 'red' }" color="red-1" text-color="red"
                      label="Revise" no-caps />
                    <q-btn unelevated :ripple="{ color: 'blue' }" color="light-blue-1" text-color="blue" label="OK"
                      no-caps />
                  </div>
                  <div class="q-pt-md">Beri Rating untuk Pekerja!</div>
                  <div class="q-gutter-y-md column">
                    <q-rating v-model="ratingModel" size="2em" color="grey" :color-selected="ratingColors" />
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
  data() {
    return {
      filter: '',
      mode: 'list',
    }
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
