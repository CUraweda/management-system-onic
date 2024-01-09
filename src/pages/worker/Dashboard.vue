<template>
  <q-page>

    <!-- overview -->
    <q-card flat>
      <q-card-section class="row q-gutter-sm q-pt-md  q-ml-sm q-mr-md items-center">
        <div class="text-h6 q-mt-xs q-ml-md col-md-5 col-sm-11 col-xs-11">Feedback Review</div>
        <q-space></q-space>

        <q-input class=" bg-grey-3 q-px-md under-title col-lg-1 col-md-1 col-sm-5 col-xs-5" borderless dense
          v-model="deposit.date" mask="date" label="From">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy ref="depositDateProxy" transition-show="scale" transition-hide="scale">
                <q-date v-model="deposit.date" />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>

        <q-input class="bg-grey-3 q-px-md under-title col-lg-1 col-md-1 col-sm-5 col-xs-5" borderless dense
          v-model="deposit.date" mask="date" label="To">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy ref="depositDateProxy" transition-show="scale" transition-hide="scale">
                <q-date v-model="deposit.date" />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </q-card-section>
    </q-card>
    <!-- overview -->

    <!-- task card  -->
    <div class="row q-col-gutter-sm q-ma-xs q-mr-sm justify-around items-stretch">

      <!-- completed task -->
      <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12">
        <q-card class="no-shadow">
          <q-card-section :class="$q.dark.isActive ? 'blue_dark' : 'bg-purple-1'" class="text-black">
            <q-card-section class="row items-center justify-center">
              <div class="bg-purple q-px-sm q-pt-xs q-mr-md card-icon q-mb-sm">
                <img width="35px" src="statics/check.svg" />
              </div>
              <div class="text-weight-bold text-center">Completed Tasks</div>
            </q-card-section>
            <q-card-section class="text-center">
              <div class="text-h4 text-weight-bold q-mt-none">68</div>
              Increased by 6 this week
            </q-card-section>
          </q-card-section>
        </q-card>
      </div>
      <!-- completed task -->

      <!-- in progres task -->
      <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12">
        <q-card class="no-shadow">
          <q-card-section :class="$q.dark.isActive ? 'blue_dark' : 'bg-blue-1'" class="text-black">
            <q-card-section class="row items-center justify-center">
              <div class="bg-blue q-px-sm q-pt-xs q-mr-md card-icon q-mb-sm">
                <img width="35px" src="statics/Load.svg" />
              </div>
              <div class="text-weight-bold text-center">In Progress Tasks</div>
            </q-card-section>
            <q-card-section class="text-center">
              <div class="text-h4 text-weight-bold q-mt-none">17</div>
              Decreased by 5 this week
            </q-card-section>
          </q-card-section>
        </q-card>
      </div>
      <!-- in progres task -->

      <!-- overdue -->
      <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12">
        <q-card class="no-shadow">
          <q-card-section :class="$q.dark.isActive ? 'blue_dark' : 'bg-orange-1'" class="text-black">
            <q-card-section class="row items-center justify-center">
              <div class="bg-orange q-px-sm q-pt-xs q-mr-md card-icon q-mb-sm">
                <img width="35px" src="statics/Jam.svg" />
              </div>
              <div class="text-weight-bold text-center">Overdue Tasks</div>
            </q-card-section>
            <q-card-section class="text-center">
              <div class="text-h4 text-weight-bold q-mt-none">9</div>
              Increased by 3 this week
            </q-card-section>
          </q-card-section>
        </q-card>
      </div>
      <!-- overdue -->

      <!-- opened -->
      <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12">
        <q-card class="no-shadow">
          <q-card-section :class="$q.dark.isActive ? 'blue_dark' : 'bg-green-1'" class="text-black">
            <q-card-section class="row items-center justify-center">
              <div class="bg-green q-px-sm q-pt-xs q-mr-md card-icon q-mb-sm">
                <img width="35px" src="statics/check.svg" />
              </div>
              <div class="text-weight-bold text-center">Opened Tasks</div>
            </q-card-section>
            <q-card-section class="text-center">
              <div class="text-h4 text-weight-bold q-mt-none">84</div>
              Increased by 8 this week
            </q-card-section>
          </q-card-section>
        </q-card>
      </div>
      <!-- opened -->

      <!-- total -->
      <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12">
        <q-card class="no-shadow">
          <q-card-section :class="$q.dark.isActive ? 'blue_dark' : 'bg-cyan-1'" class="text-black">
            <q-card-section class="row items-center justify-center">
              <div class="bg-cyan q-px-sm q-pt-xs q-mr-md card-icon q-mb-sm">
                <img width="35px" src="statics/list.svg" />
              </div>
              <div class="text-weight-bold text-center">Total Tasks</div>
            </q-card-section>
            <q-card-section class="text-center">
              <div class="text-h4 text-weight-bold q-mt-none">85</div>
              Completion rate: 80%
            </q-card-section>
          </q-card-section>
        </q-card>
      </div>
      <!-- total -->

    </div>
    <!-- task card  -->

    <div>
      <div class="text-h6 q-pl-md q-ma-md">PERFORMANCE MONITORING</div>
      <div class="row q-col-gutter-sm q-ma-xs q-pt-none q-mt-none">
        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
          <q-card flat>
            <q-card-section>
              <div class="bg-grey-3 q-pa-md text-center title-card">Feedback Review</div>
            </q-card-section>

            <q-card-section>
              <card-base class="">
                <!-- overview -->
                <q-card flat>
                  <q-card-section class="row q-gutter-sm q-pt-md  q-ml-sm q-mr-md items-center q-mb-xl">
                    <div class="col-xl-5 col-md-5 col-sm-12 col-xs-12">Employee Performance Monitoring</div>
                    <q-space></q-space>

                    <q-input class=" bg-grey-3 q-px-md under-title col-lg-2 col-md-2 col-sm-5 col-xs-5" borderless dense
                      v-model="deposit.date" mask="date" label="From">
                      <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy ref="depositDateProxy" transition-show="scale" transition-hide="scale">
                            <q-date v-model="deposit.date" />
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>

                    <q-input class="bg-grey-3 q-px-md under-title col-lg-2 col-md-2 col-sm-5 col-xs-5" borderless dense
                      v-model="deposit.date" mask="date" label="To">
                      <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy ref="depositDateProxy" transition-show="scale" transition-hide="scale">
                            <q-date v-model="deposit.date" />
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </q-card-section>
                </q-card>
                <!-- overview -->

                <div class="row items-end justify-center">
                  <div class="col-md-6 col-sm-12">

                    <!-- bad -->
                    <div class="row q-mb-md q-mt-sm  ">
                      <q-icon name="star" class="" size="25px" style="color: #ece9ea;"></q-icon>
                      <div class=" bintang q-ml-md q-px-md q-py-xs bg-grey-3 float-right">Bad</div>
                    </div>
                    <!-- bad -->

                    <!-- poor -->
                    <div class="row q-mb-md  ">
                      <q-icon name="star" class="" size="25px" style="color: #f3c677;"></q-icon>
                      <q-icon name="star" class="" size="25px" style="color: #f3c677;"></q-icon>
                      <div class=" bintang q-ml-md q-px-md q-py-xs bg-grey-3">Poor</div>
                    </div>
                    <!-- poor -->

                    <!-- Average -->
                    <div class="row q-mb-md  ">
                      <q-icon name="star" class="" size="25px" style="color: #64c6c3;"></q-icon>
                      <q-icon name="star" class="" size="25px" style="color: #64c6c3;"></q-icon>
                      <q-icon name="star" class="" size="25px" style="color: #64c6c3;"></q-icon>
                      <div class=" bintang q-ml-md q-px-md q-py-xs bg-grey-3">Average</div>
                    </div>
                    <!-- Average -->

                    <!-- Good -->
                    <div class="row q-mb-md  ">
                      <q-icon name="star" class="" size="25px" style="color: #5876e0;"></q-icon>
                      <q-icon name="star" class="" size="25px" style="color: #5876e0;"></q-icon>
                      <q-icon name="star" class="" size="25px" style="color: #5876e0;"></q-icon>
                      <q-icon name="star" class="" size="25px" style="color: #5876e0;"></q-icon>
                      <div class=" bintang q-ml-md q-px-md q-py-xs bg-grey-3">Good</div>
                    </div>
                    <!-- Good -->

                    <!-- Excelent -->
                    <div class="row q-mb-md ">
                      <q-icon name="star" class="" size="25px" style="color: #2ed0a2;"></q-icon>
                      <q-icon name="star" class="" size="25px" style="color: #2ed0a2;"></q-icon>
                      <q-icon name="star" class="" size="25px" style="color: #2ed0a2;"></q-icon>
                      <q-icon name="star" class="" size="25px" style="color: #2ed0a2;"></q-icon>
                      <q-icon name="star" class="" size="25px" style="color: #2ed0a2;"></q-icon>
                      <div class=" bintang q-ml-md q-px-md q-py-xs bg-grey-3">Excelent</div>
                    </div>
                    <!-- Excelent -->

                  </div>
                  <q-space></q-space>

                  <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                    <apex-half-donut></apex-half-donut>
                  </div>
                </div>
              </card-base>
            </q-card-section>
          </q-card>
        </div>

        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
          <q-card flat>
            <q-card-section>
              <div class="bg-grey-3 q-pa-md text-center title-card">Monitoring Job Status</div>
            </q-card-section>

            <q-card-section>
              <CardBase>
                <!-- overview -->
                <q-card flat>
                  <q-card-section class="row q-gutter-sm q-pt-md  q-ml-sm q-mr-md items-center q-mb-xl">
                    <q-space></q-space>

                    <q-input class=" bg-grey-3 q-px-md under-title col-lg-2 col-md-2 col-sm-5 col-xs-5" borderless dense
                      v-model="deposit.date" mask="date" label="From">
                      <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy ref="depositDateProxy" transition-show="scale" transition-hide="scale">
                            <q-date v-model="deposit.date" />
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>

                    <q-input class="bg-grey-3 q-px-md under-title col-lg-2 col-md-2 col-sm-5 col-xs-5" borderless dense
                      v-model="deposit.date" mask="date" label="To">
                      <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy ref="depositDateProxy" transition-show="scale" transition-hide="scale">
                            <q-date v-model="deposit.date" />
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </q-card-section>
                </q-card>
                <!-- overview -->
                <div class="">
                  <apex-bar-charts-basic></apex-bar-charts-basic>
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
import CardBase from "components/CardBase";

// Vue.component('IEcharts', IEcharts);

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
      search: "",
      deposit: {},
    }
  },
  setup() {
    return {
      onItemClick() {
        console.log('Clicked on an Item')
      },
    };
  },
  methods: {
    SaveImage(type) {
      const linkSource = this.$refs[type].getDataURL();
      const downloadLink = document.createElement('a');
      document.body.appendChild(downloadLink);
      downloadLink.href = linkSource;
      downloadLink.target = '_self';
      downloadLink.download = type + '.png';
      downloadLink.click();
    },
    exportTable() {
      // naive encoding to csv format
      const content = [this.columns.map(col => wrapCsvValue(col.label))].concat(
        this.data.map(row => this.columns.map(col => wrapCsvValue(
          typeof col.field === 'function'
            ? col.field(row)
            : row[col.field === void 0 ? col.name : col.field],
          col.format
        )).join(','))
      ).join('\r\n')

      const status = exportFile(
        'activity.csv',
        content,
        'text/csv'
      )

      if (status !== true) {
        this.$q.notify({
          message: 'Browser denied file download...',
          color: 'negative',
          icon: 'warning'
        })
      }
    }
  },
  name: "PageIndex",
  components: {
    CardBase,
    ApexHalfDonut: () => import("components/ApexHalfDonut"),
    ApexBarChartsBasic: () => import("components/ApexBarChartsBasic"),
  },
}
</script>

<style scoped>
.card-icon {
  border-radius: 6px;
}

.my-card {
  width: 175px;
}

.title-card {
  border-radius: 20px;
}

.under-title {
  border-radius: 8px;
}

.bintang {
  border-radius: 18px;
}
</style>
