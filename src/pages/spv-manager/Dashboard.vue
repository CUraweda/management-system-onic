<template>
  <q-page>
    <div id="q-app">

      <!-- overview -->
      <div class="row q-pt-sm">
        <div class="text-h6 q-mt-xs q-pl-md">Overview</div>
        <q-space></q-space>
        <div class="q-mx-xs">
          <q-btn-dropdown text-color="dark" unelevated borderless color="grey-3" label="Department" dropdown-icon="expand_more" no-caps
            class="text-weight-regular under-title col no-shadow">
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
        </div>

        <div class="q-mx-xs q-my-none">
          <q-input class="under-title-date col bg-grey-3 q-px-md" borderless dense v-model="deposit.date" mask="date"
            label="From">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="depositDateProxy" transition-show="scale" transition-hide="scale">
                  <q-date v-model="deposit.date" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>

        <div class="q-mx-xs q-my-none">
          <q-input class="under-title-date col bg-grey-3 q-px-md" borderless dense v-model="deposit.date" mask="date"
            label="To">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="depositDateProxy" transition-show="scale" transition-hide="scale">
                  <q-date v-model="deposit.date" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </div>
      <!-- overview -->

      <!-- kartu atas -->
      <div class="q-pa-md row items-start q-gutter-md">
        <!-- complete -->
        <q-card class="my-card bg-purple-1 col q-mr-md" flat>
          <q-item>
            <q-item-section avatar>
              <q-icon class="bg-purple card-icon">
                <img src="statics/check.svg" />
              </q-icon>
            </q-item-section>
            <q-item-section class="text-weight-bold">
              Completed Tasks
            </q-item-section>
          </q-item>
          <q-card-section>
            <q-card-section class="q-pa-none">
              <div class="text-h4 text-weight-bold q-mt-none">68</div>
              Increased by 6 this week
            </q-card-section>
          </q-card-section>
        </q-card>
        <!-- complete -->

        <!-- in progres -->
        <q-card class="my-card bg-blue-1 col q-mr-md" flat>
          <q-item>
            <q-item-section avatar>
              <q-icon class="bg-blue-8 card-icon">
                <img src="statics/load.svg" />
              </q-icon>
            </q-item-section>
            <q-item-section class="text-weight-bold">
              In Progress Tasks
            </q-item-section>
          </q-item>
          <q-card-section>
            <q-card-section class="q-pa-none">
              <div class="text-h4 text-weight-bold q-mt-none">17</div>
              Decreased by 5 this week
            </q-card-section>
          </q-card-section>
        </q-card>
        <!-- in progres -->

        <!-- overdue -->
        <q-card class="my-card bg-orange-1 col q-mr-md" flat>
          <q-item>
            <q-item-section avatar>
              <q-icon class="bg-orange card-icon">
                <img src="statics/jam.svg" />
              </q-icon>
            </q-item-section>
            <q-item-section class="text-weight-bold">
              Overdue Tasks
            </q-item-section>
          </q-item>
          <q-card-section>
            <q-card-section class="q-pa-none">
              <div class="text-h4 text-weight-bold q-mt-none">9</div>
              Increased by 3 this week
            </q-card-section>
          </q-card-section>
        </q-card>
        <!-- overdue -->

        <!-- total -->
        <q-card class="my-card bg-cyan-1 col q-mr-xs" flat>
          <q-item>
            <q-item-section avatar>
              <q-icon class="bg-cyan card-icon">
                <img src="statics/list.svg" />
              </q-icon>
            </q-item-section>
            <q-item-section class="text-weight-bold">
              Total Tasks
            </q-item-section>
          </q-item>
          <q-card-section>
            <q-card-section class="q-pa-none">
              <div class="text-h4 text-weight-bold q-mt-none">85</div>
              Completion rate: 80%
            </q-card-section>
          </q-card-section>
        </q-card>
        <!-- total -->
      </div>
      <!-- kartu atas -->

      <div class="text-h6 q-pl-md">PERFORMANCE MONITORING</div>

      <!-- title -->
      <div class="row items-start">
        <!-- feedback row -->
        <div class="col items-start q-pa-md q-gutter-lg">
          <q-card class="title-card bg-grey-3 q-mb-none" flat>
            <q-card-section>
              <q-card-section class="q-pa-none">
                Feedback Review
              </q-card-section>
            </q-card-section>
          </q-card>

          <!-- bawah feedback -->
          <div class="row items-start q-mt-sm">
            <q-input class="toolbar-input bg-grey-2 under-title q-mr-xs col" dense text-color="grey-2"
              standout="bg-grey-3 no-shadow" v-model="search" placeholder="Search...">
              <template v-slot:prepend>
                <q-icon v-if="search === ''" name="search" />
                <q-icon v-else name="clear" class="cursor-pointer col" @click="search = ''" />
              </template>
            </q-input>

            <div class="q-mx-xs">
              <q-btn-dropdown unelevated text-color="dark" color="grey-3" label="Department" dropdown-icon="expand_more" no-caps
                class="text-weight-regular under-title col">
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
            </div>

            <div class="q-mx-xs">
              <q-btn-dropdown unelevated text-color="dark" borderless color="grey-3" label="Person" dropdown-icon="expand_more"
                no-caps class="text-weight-regular under-title col">
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
            </div>

            <div class="q-mx-xs q-my-none">
              <q-input class="under-title-date col bg-grey-3 q-px-md" borderless dense v-model="deposit.date" mask="date"
                label="From">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy ref="depositDateProxy" transition-show="scale" transition-hide="scale">
                      <q-date v-model="deposit.date" />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>

            <div class="q-mx-xs q-my-none">
              <q-input class="under-title-date col bg-grey-3 q-px-md" borderless dense v-model="deposit.date" mask="date"
                label="To">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy ref="depositDateProxy" transition-show="scale" transition-hide="scale">
                      <q-date v-model="deposit.date" />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
          </div>
          <!-- bawah feedback -->

          <!-- feedback chart -->
          <div class="row q-ml-lg q-mr-none relative-position q-mb-sm">
            <card-base class="">
              <div class="q-mb-xl">Employee Performance Monitoring</div>
              <div class="row">
                <div class="col float-right">

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

                <div class="col q-pt-xl q-px-none">
                  <apex-half-donut></apex-half-donut>
                </div>
              </div>

            </card-base>
          </div>
          <!-- feedback chart -->

        </div>
        <!-- feedback row float-right -->

        <!-- Job row -->
        <div class="col items-start q-pa-md q-gutter-lg q-mr-md">
          <q-card class="title-card bg-grey-3 q-mb-none" flat>
            <q-card-section>
              <q-card-section class="q-pa-none">
                Monitoring Job Status
              </q-card-section>
            </q-card-section>
          </q-card>

          <!-- bawah Job -->
          <div class="row items-start q-mt-sm">
            <q-space></q-space>
            <div class="q-mx-xs">
              <q-btn-dropdown unelevated text-color="dark" color="grey-3" label="Department" dropdown-icon="expand_more" no-caps
                class="text-weight-regular under-title col">
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
            </div>

            <div class="q-mx-xs">
              <q-btn-dropdown unelevated text-color="dark" borderless color="grey-3" label="Person" dropdown-icon="expand_more"
                no-caps class=" no-box-shadow text-weight-regular under-title col">
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
            </div>

            <div class="q-mx-xs q-my-none">
              <q-input class="under-title-date col bg-grey-3 q-px-md" borderless dense v-model="deposit.date" mask="date"
                label="From">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy ref="depositDateProxy" transition-show="scale" transition-hide="scale">
                      <q-date v-model="deposit.date" />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>

            <div class="q-mx-xs q-my-none">
              <q-input class="under-title-date col bg-grey-3 q-px-md" borderless dense v-model="deposit.date" mask="date"
                label="To">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy ref="depositDateProxy" transition-show="scale" transition-hide="scale">
                      <q-date v-model="deposit.date" />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
          </div>
          <!-- bawah Job -->

          <!-- job chart -->
          <div class="row relative-position q-mb-sm">
            <CardBase>
              <apex-column-charts-basic></apex-column-charts-basic>
            </CardBase>
          </div>
        </div>
        <!-- Job row -->
      </div>


    </div>
  </q-page>
</template>

<script>
import { exportFile } from "quasar";
import CardBase from "components/CardBase";

function wrapCsvValue(val, formatFn) {
  let formatted = formatFn !== void 0 ? formatFn(val) : val;

  formatted =
    formatted === void 0 || formatted === null ? "" : String(formatted);

  formatted = formatted.split('"').join('""');

  return `"${formatted}"`;
}

export default {
  data() {
    return {
      search: "",
      deposit: {},
    };
  },
  setup() {
    return {
      onItemClick() {
        // console.log('Clicked on an Item')
      },
    };
  },
  methods: {
    exportDepositsTable() {
      // naive encoding to csv format
      const content = [this.columns.map((col) => wrapCsvValue(col.label))]
        .concat(
          this.data.map((row) =>
            this.columns
              .map((col) =>
                wrapCsvValue(
                  typeof col.field === "function"
                    ? col.field(row)
                    : row[col.field === void 0 ? col.name : col.field],
                  col.format
                )
              )
              .join(",")
          )
        )
        .join("\r\n");

      const status = exportFile("deposits.csv", content, "text/csv");

      if (status !== true) {
        this.$q.notify({
          message: "Browser denied file download...",
          color: "negative",
          icon: "warning",
        });
      }
    },
  },

  name: "PageIndex",
  components: {
    CardBase,
    ApexHalfDonut: () => import("components/ApexHalfDonut"),
    ApexColumnChartsBasic: () => import("components/ApexColumnChartsBasic"),
  },
};
</script>

<style>

.card-icon {
  width: 100%;
  height: 100%;
  max-height: 35px;
  max-width: 35px;
  border-radius: 6px;
}

.title-card {
  width: 100%;
  height: 100%;
  max-height: 100px;
  border-radius: 20px;
  text-align: center;
}

.under-title {
  width: 100%;
  height: 100%;
  width: 113px;
  border-radius: 8px;
}

.under-title-date {
  width: 100%;
  height: 100%;
  max-height: 100px;
  width: 100px;
  border-radius: 8px;
}

.bintang {
  border-radius: 18px;
}
</style>
