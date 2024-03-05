<template>
  <q-page>
    <q-card flat>

      <q-card-section class="row q-gutter-sm q-pt-md  q-ml-sm q-mr-md items-center">
        <div class="text-h6 q-mt-xs q-ml-md col-md-5 col-sm-11 col-xs-11">Feedback Review</div>
        <q-space></q-space>

        <q-btn-dropdown unelevated text-color="dark" color="grey-3" label="Departement" dropdown-icon="expand_more"
          no-caps class="text-weight-regular under-title col-lg-2 col-md-2 col-sm-5 col-xs-5">
          <q-list>
            <q-item clickable v-close-popup @click="onItemClick">
              <q-item-section>
                <q-item-label>Dep 1</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup @click="onItemClick">
              <q-item-section>
                <q-item-label>Dep 2</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup @click="onItemClick">
              <q-item-section>
                <q-item-label>Dep 3</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>

        <q-input class=" bg-grey-3 q-px-md under-title col-lg-1 col-md-1 col-sm-3 col-xs-3" borderless dense
          v-model="deposit.date" mask="date" label="From">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy ref="depositDateProxy" transition-show="scale" transition-hide="scale">
                <q-date v-model="deposit.date" />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>

        <q-input class="bg-grey-3 q-px-md under-title col-lg-1 col-md-1 col-sm-3 col-xs-3" borderless dense
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
    <!-- task card  -->
    <div class="row q-col-gutter-sm q-ma-xs q-mr-sm justify-around items-stretch">

      <!-- completed task -->
      <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12">
        <q-card class="no-shadow cursor-pointer q-hoverable" v-ripple clickable @click="redirectToTaskMonitoring('Close')">
          <span class="q-focus-helper"></span>
          <q-card-section style="height: 270px" :class="$q.dark.isActive ? 'blue_dark' : 'bg-purple-1'"
            class="text-black">
            <q-card-section class="row items-center justify-center q-gutter-md">
              <div class="bg-purple q-px-sm q-pt-xs card-icon q-mb-sm">
                <img width="35px" src="statics/check.svg" />
              </div>
              <div class="text-weight-bold text-center">Completed Tasks</div>
            </q-card-section>
            <q-space></q-space>
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
        <q-card class="no-shadow cursor-pointer q-hoverable" v-ripple clickable @click="redirectToTaskMonitoring('In-progress')">
          <q-card-section style="height: 270px" :class="$q.dark.isActive ? 'blue_dark' : 'bg-blue-1'" class="text-black">
            <q-card-section class="row items-center justify-center q-gutter-md">
              <div class="bg-blue q-px-sm q-pt-xs card-icon q-mb-sm">
                <img width="35px" src="statics/Load.svg" />
              </div>
              <div class="text-weight-bold text-center">In Progress Tasks</div>
            </q-card-section>
            <q-space></q-space>
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
        <q-card class="no-shadow cursor-pointer q-hoverable" v-ripple clickable @click="redirectToTaskMonitoring('Idle')">
          <q-card-section style="height: 270px" :class="$q.dark.isActive ? 'blue_dark' : 'bg-orange-1'"
            class="text-black">
            <q-card-section class="row items-center justify-center q-gutter-md">
              <div class="bg-orange q-px-sm q-pt-xs card-icon q-mb-sm">
                <img width="35px" src="statics/Jam.svg" />
              </div>
              <div class="text-weight-bold text-center">Overdue Tasks</div>
            </q-card-section>
            <q-space></q-space>
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
        <q-card class="no-shadow cursor-pointer q-hoverable" v-ripple clickable @click="redirectToTaskMonitoring('Open')">
          <q-card-section style="height: 270px" :class="$q.dark.isActive ? 'blue_dark' : 'bg-green-1'" class="text-black">
            <q-card-section class="row items-center justify-center q-gutter-md">
              <div class="bg-green q-px-sm q-pt-xs card-icon q-mb-sm">
                <img width="35px" src="statics/check.svg" />
              </div>
              <div class="text-weight-bold text-center">Opened Tasks</div>
            </q-card-section>
            <q-space></q-space>
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
        <q-card class="no-shadow cursor-pointer q-hoverable" v-ripple clickable @click="redirectToTaskMonitoring()">
          <q-card-section style="height: 270px" :class="$q.dark.isActive ? 'blue_dark' : 'bg-cyan-1'" class="text-black">
            <q-card-section class="row items-center justify-center q-gutter-md">
              <div class="bg-cyan q-px-sm q-pt-xs card-icon q-mb-sm">
                <img width="35px" src="statics/list.svg" />
              </div>
              <div class="text-weight-bold text-center">Total Tasks</div>
            </q-card-section>
            <q-space></q-space>
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

            <q-card-section class="row q-gutter-sm q-pt-none justify-between">

              <q-input class="bg-grey-2 col-lg-2 col-md-2 col-sm-12 col-xs-12 under-title" dense text-color="black"
                standout="bg-grey-3 no-shadow under-title" v-model="search" placeholder="Search...">
                <template v-slot:prepend>
                  <q-icon v-if="search === ''" name="search" text-color="black" />
                  <q-icon v-else name="clear" class="cursor-pointer col" @click="search = ''" />
                </template>
              </q-input>

              <q-btn-dropdown unelevated text-color="dark" color="grey-3" label="Departement" dropdown-icon="expand_more"
                no-caps class="text-weight-regular under-title col-lg-3 col-md-3 col-sm-5 col-xs-5">
                <q-list>
                  <q-item clickable v-close-popup @click="onItemClick">
                    <q-item-section>
                      <q-item-label>Dep 1</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable v-close-popup @click="onItemClick">
                    <q-item-section>
                      <q-item-label>Dep 2</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable v-close-popup @click="onItemClick">
                    <q-item-section>
                      <q-item-label>Dep 3</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>

              <q-btn-dropdown unelevated text-color="dark" borderless color="grey-3" label="Person"
                dropdown-icon="expand_more" no-caps
                class="text-weight-regular under-title col-lg-2 col-md-2 col-sm-5 col-xs-5">
                <q-list>
                  <q-item clickable v-close-popup @click="onItemClick">
                    <q-item-section>
                      <q-item-label>Per 1</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable v-close-popup @click="onItemClick">
                    <q-item-section>
                      <q-item-label>Per 2</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable v-close-popup @click="onItemClick">
                    <q-item-section>
                      <q-item-label>Per 3</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>

              <q-input class=" bg-grey-3 q-px-md under-title col-lg-2 col-md-2 col-sm-5 col-xs-5" borderless dense
                v-model="deposit.start_1" mask="date" label="From">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy ref="depositDateProxy" transition-show="scale" transition-hide="scale">
                      <q-date v-model="deposit.start_1" />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>

              <q-input class="bg-grey-3 q-px-md under-title col-lg-2 col-md-2 col-sm-5 col-xs-5" borderless dense
                v-model="deposit.due_1" mask="date" label="To">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy ref="depositDateProxy" transition-show="scale" transition-hide="scale">
                      <q-date v-model="deposit.due_1" />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </q-card-section>

            <q-card-section>
              <card-base class="">
                <div class="q-mb-xl">Employee Performance Monitoring</div>
                <div class="row justify-center">
                  <div class="col-12">
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

            <q-card-section class="row q-gutter-sm q-pt-none justify-between">

              <q-btn-dropdown unelevated text-color="dark" color="grey-3" label="Departement" dropdown-icon="expand_more"
                no-caps class="text-weight-regular under-title col-lg-3 col-md-3 col-sm-5 col-xs-5">
                <q-list>
                  <q-item clickable v-close-popup @click="onItemClick">
                    <q-item-section>
                      <q-item-label>Dep 1</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable v-close-popup @click="onItemClick">
                    <q-item-section>
                      <q-item-label>Dep 2</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable v-close-popup @click="onItemClick">
                    <q-item-section>
                      <q-item-label>Dep 3</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>

              <q-btn-dropdown unelevated text-color="dark" borderless color="grey-3" label="Person"
                dropdown-icon="expand_more" no-caps
                class="text-weight-regular under-title col-lg-2 col-md-2 col-sm-5 col-xs-5">
                <q-list>
                  <q-item clickable v-close-popup @click="onItemClick">
                    <q-item-section>
                      <q-item-label>Per 1</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable v-close-popup @click="onItemClick">
                    <q-item-section>
                      <q-item-label>Per 2</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable v-close-popup @click="onItemClick">
                    <q-item-section>
                      <q-item-label>Per 3</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>

              <q-input class=" bg-grey-3 q-px-md under-title col-lg-2 col-md-2 col-sm-5 col-xs-5" borderless dense
                v-model="deposit.start" mask="date" label="From">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy ref="depositDateProxy" transition-show="scale" transition-hide="scale">
                      <q-date v-model="deposit.start" />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>

              <q-input class="bg-grey-3 q-px-md under-title col-lg-2 col-md-2 col-sm-5 col-xs-5" borderless dense
                v-model="deposit.due" mask="date" label="To">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy ref="depositDateProxy" transition-show="scale" transition-hide="scale">
                      <q-date v-model="deposit.due" />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>

            </q-card-section>


            <q-card-section>
              <CardBase>
                <div class="col-12">
                  <apex-column-charts-basic></apex-column-charts-basic>
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
  name: 'DirectorDashboard',
  data() {
    return {
      filter: '',
      mode: 'list',
      search: "",
start:"",
due:"",
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

    redirectToTaskMonitoring(statusFilter) {
      this.$router.push({
        path: '/director/task_monitoring',
        query: { status: statusFilter }
      });
    },

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
    ApexColumnChartsBasic: () => import("components/ApexColumnChartsBasic"),
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
