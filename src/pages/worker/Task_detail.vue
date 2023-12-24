<template>
  <q-page>
    <div id="q-app">
      <!-- kartu atas -->
      <q-card class="q-pa-md row items-start q-gutter-md border q-mx-md q-mt-md">
        <div class="col">

          <!-- Laporan Mingguan -->

          <q-card-section>
            <div class="row float-right q-pt-none">

              <div class="">
                <q-circular-progress :max="30" show-value track-color="light-blue-2" class="text-black q-ma-md" value="0"
                  size="100px" color="light-blue" />
                <div class="vertical-bottom text-center">Days</div>
              </div>
              <div class="">
                <q-circular-progress :max="24" show-value track-color="light-blue-2" class="text-black q-ma-md" value="2"
                  size="100px" color="light-blue" />
                <div class="vertical-bottom text-center">Hours</div>
              </div>
              <div class="">
                <q-circular-progress :max="60" show-value track-color="light-blue-2" class="text-black q-ma-md" value="45"
                  size="100px" color="light-blue" />
                <div class="vertical-bottom text-center">Miunites</div>
              </div>
              <div class="">
                <q-circular-progress :max="60" show-value track-color="light-blue-2" class="text-black q-ma-md" value="55"
                  size="100px" color="light-blue" />
                <div class="vertical-bottom text-center">Second</div>
              </div>
            </div>

            <div class="row">
              <div class="text-h8 text-weight-bold q-mr-md q-mt-noe">LAPORAN MINGGUAN</div>
              <div class="bg-grey-3  q-mr-md tulisan">
                <div class="text-h8 text-weight-bold q-mt-none align-left tulisan q-my-xs">Finish</div>
              </div>
              <div class="bg-grey-3  q-mr-md tulisan ">
                <div class="text-h8 text-weight-bold q-mt-none align-left tulisan q-my-xs">On Schedule</div>
              </div>
            </div>
          </q-card-section>


          <q-card-section>
            <div class="col float-left">
              <div class="row">
                <div class=" q-mr-md"><q-input filled disable label="Assigned By" /></div>
                <div class=" q-mr-md"><q-input filled disable label="TASK TITLE" /></div>
                <div class=" q-mr-md"><q-input filled disable label="DUE DATE" /></div>
              </div>
              <div class="row">
                <div class=" q-mr-xl"><q-input readonly label="RIAN SPV" /></div>
                <div class=" q-mr-xl"><q-input readonly label="Laporan Mingguan" /></div>
                <div class=" q-mr-xl"><q-input readonly label="08-DEC-2023, 09.00AM" />
                </div>
              </div>
            </div>
          </q-card-section>

        </div>
      </q-card>

      <!-- Laporan Mingguan -->
      <!-- kartu atas -->

      <!-- title -->
      <div class="row items-start">
        <!-- feedback row -->
        <div class="col items-start q-pa-md q-gutter-lg">


          <!-- Details -->
          <div class="row q-ml-lg q-mr-none relative-position q-mb-sm">
            <div class="q-pt-md">Details</div>
            <card-base class="">
              <div class="q-ml-lg">Job</div>
              <div class="q-ml-lg q-pt-md">PIC</div>
              <div class="q-ml-lg q-pt-md">Due Date</div>
              <!-- dropdown -->
              <div class="q-pa-md" style="max-width: 100%">
                <q-list>
                  <q-expansion-item popup default-opened icon="" label="Progress">
                    <q-separator />
                    <q-card>
                      <q-card-section>
                        <div class="">Target</div>

                        <div class="q-pt-md">Actuals</div>

                        <div class="q-pt-md">Progress </div>
                      </q-card-section>
                    </q-card>
                  </q-expansion-item>
                  <q-expansion-item popup default-opened icon="" label="Addtional Details">
                    <q-separator />
                    <q-card>
                      <q-card-section>
                        <div class="">Create On</div>

                        <div class="q-pt-md">Create By</div>
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
            </card-base>
          </div>
          <!-- Details -->

        </div>
        <!-- feedback row float-right -->

        <!-- Job row -->
        <div class="col items-start q-pa-md q-gutter-lg q-mr-md">

          <!-- job chart -->
          <div class="row relative-position q-mb-sm">
            <div class=" q-pt-md">Description</div>
            <CardBase class="">
              <div class="q-ml-lg">Laporan Request :</div>
              <div class="q-ml-md">1. Pencatatan Penjualan selama 1 minggu terakhir</div>
              <div class="q-ml-md">2. Berisi data dari seluruh mitra</div>
              <div class="q-ml-md">3. Termasuk dengan perhitungan bahan </div>
              <div class="q-ml-lg">.</div>
            </CardBase>
          </div>
          <div class="q-pt-md">Attachments Download</div>
          <CardBase class="  ">
            <div class="q-pa-md">
              <div class="col-12">
                <div class="q-pa-md">
                  <q-uploader url="http://localhost:4444/upload" label="Upload files" color="grey" square flat bordered
                    style="max-width: 300px" />
                  <div class="q-pt-md">
                    <q-uploader style="max-width: 300px" url="http://localhost:4444/upload" label="Filtered (png only)"
                      multiple color="grey" />
                  </div>
                  <q-file outlined v-model="model" class="text-primary q-pt-md" label-color="primary"
                    label="Upload an attachment">
                    <template v-slot:prepend>
                      <q-icon name="attach_file" color="primary" class="rotate-45" />
                    </template>
                  </q-file>
                  <div class="q-pt-md ">
                  <q-btn unelevated class="q-mr-md" :ripple="{ color: 'blue' }" color="light-blue-1" text-color="blue"
                    label="Start" no-caps />
                  <q-btn unelevated :ripple="{ color: 'grey' }" color="grey-3" text-color="grey" label="Finish" no-caps />
                </div>
                </div>
              </div>

            </div>
          </CardBase>
        </div>
      </div>
    </div>


  </q-page>
</template>

<script>
import { ref } from 'vue';
import { exportFile } from "quasar";
import CardBase from "components/CardBase";

function wrapCsvValue(val, formatFn) {
  let formatted = formatFn !== void 0 ? formatFn(val) : val;

  formatted =
    formatted === void 0 || formatted === null ? "" : String(formatted);

  formatted = formatted.split('"').join('""');

  return "${formatted}";
}

export default {
  data() {
    return {
      search: "",
      deposit: {},
      ratingModel: ref(0),
      ratingColors: ['orange']
    };
  },
  setup() {
    return {
      model: ref(null),

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

  },
};


</script>

<style>
.border {
  border-radius: 10px;
}

.card-icon {
  width: 100%;
  height: 100%;
  max-height: 35px;
  max-width: 35px;
  border-radius: 6px;
}

.tulisan {
  width: 100%;
  max-width: 90px;
  max-height: 30px;
  border-radius: 10px;
  text-align: center;
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
