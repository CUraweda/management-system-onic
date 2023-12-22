<template>
  <q-page>
    <div id="q-app">
      <!-- kartu atas -->
      <q-card class="q-pa-md row items-start q-gutter-md border q-mx-md q-mt-md">
        <div class="col">

          <!-- Laporan Mingguan -->

          <q-card-section>
            <div class="row float-right q-pt-none">
              <q-circular-progress show-value class="text-black q-ma-md" value="1" size="100px" color="light-blue" />

              <q-circular-progress show-value class="text-black q-ma-md" value="4" size="100px" color="light-blue" />

              <q-circular-progress show-value class="text-black q-ma-md" value="45" size="100px" color="light-blue" />

              <q-circular-progress show-value class="text-black q-ma-md" value="55" size="100px" color="light-blue" />
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
                <div class=" q-mr-md"><q-input filled v-model="text" :dense="dense" disable label="Assigned By" /></div>
                <div class=" q-mr-md"><q-input filled v-model="text" :dense="dense" disable label="TASK TITLE" /></div>
                <div class=" q-mr-md"><q-input filled v-model="text" :dense="dense" disable label="DUE DATE" /></div>
              </div>
              <div class="row">
                <div class=" q-mr-xl"><q-input v-model="text" :dense="dense" readonly label="RIAN SPV" /></div>
                <div class=" q-mr-xl"><q-input v-model="text" :dense="dense" readonly label="Laporan Mingguan" /></div>
                <div class=" q-mr-xl"><q-input v-model="text" :dense="dense" readonly label="08-DEC-2023, 09.00AM" />
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
            <div class="q-mb-xl q-pt-md">Details</div>
            <card-base class="">
              <div class="">Job</div>
              <div class="row">Assigned By</div>
              <div class="row">Due Date</div>
            </card-base>
          </div>
          <!-- Details -->

        </div>
        <!-- feedback row float-right -->

        <!-- Job row -->
        <div class="col items-start q-pa-md q-gutter-lg q-mr-md">

          <!-- job chart -->
          <div class="row relative-position q-mb-sm">
            <div class="q-mb-xl q-pt-md">Description</div>
            <CardBase class="">

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
