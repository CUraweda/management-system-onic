<template>
  <q-page>

    <div class="q-pa-md row items-start q-gutter-md">
      <!-- complete -->
      <q-card class="my-card bg-cyan-1 col q-mr-md" flat>
        <!-- <Status text="completed"/> -->
        <q-item>
          <q-item-section class="text-weight-bold">
            Tasks Completed
          </q-item-section>
          <q-item-section avatar>
            <q-icon class="card-icon">
              <img src="statics/Button-129.svg" />
            </q-icon>
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
      <q-card class="my-card bg-purple-1 col q-mr-md" flat>
        <q-item>
          <q-item-section class="text-weight-bold">
            Tasks Stuck
          </q-item-section>
          <q-item-section avatar>
            <q-icon class="card-icon">
              <img src="statics/Button-142.svg" />
            </q-icon>
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
          <q-item-section class="text-weight-bold">
            Tasks In Progress
          </q-item-section>
          <q-item-section avatar>
            <q-icon class="card-icon">
              <img src="statics/Button-143.svg" />
            </q-icon>
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
          <q-item-section class="text-weight-bold">
            Tasks Delayed
          </q-item-section>
          <q-item-section avatar>
            <q-icon class="card-icon">
              <img src="statics/Button-144.svg" />
            </q-icon>
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

    <div>
      <q-card-section class="text-h5 text-weight-bold text-black">
        <div class="row items-start">

          <q-space></q-space>
          <div class="row items-start float-right">
            <q-input class="toolbar-input bg-grey-2 under-title  q-mr-xs" dense text-color="grey-2"
              standout="bg-grey-3 no-shadow" v-model="search" placeholder="Search...">
              <template v-slot:prepend>
                <q-icon v-if="search === ''" name="search" />
                <q-icon v-else name="clear" class="cursor-pointer col" @click="search = ''" />
              </template>
            </q-input>

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

            <div class="q-mx-xs">
              <q-btn-dropdown unelevated text-color="dark" color="grey-3" label="Category" dropdown-icon="expand_more"
                no-caps class="text-weight-regular under-title col">
                <q-list>
                  <q-item clickable v-close-popup @click="onItemClick">
                    <q-item-section>
                      <q-item-label>Category 1</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable v-close-popup @click="onItemClick">
                    <q-item-section>
                      <q-item-label>Category 2</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable v-close-popup @click="onItemClick">
                    <q-item-section>
                      <q-item-label>Category 3</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </div>

            <div>
              <q-select filled v-model="deposit.account" use-input multiple dense input-debounce="0" label="Filter"
                :options="options" @filter="filterFn" style="width: 250px" dropdown-icon="filter_list"></q-select>
            </div>

          </div>
        </div>
      </q-card-section>

    </div>

    <div class="q-mx-md">
      <q-card class="table-bg no-shadow" bordered>
        <q-card-section>
          <div class="text-h5 text-weight-bold text-blue">
            This Week
          </div>
        </q-card-section>

        <q-card-section class="q-pa-none">
          <q-table class="no-shadow q-ml-md text-body1" :data="data" :hide-header="mode === 'grid'" :columns="columns"
            row-key="task_title" :grid="mode == 'grid'" :filter="filter" :pagination.sync="pagination" separator="none">

            <template v-slot:body-cell-task_title="props">
              <q-td :props="props">
                <q-card class=" q-pa-md no-shadow align-left text-body1" color="black" bordered>
                  {{ props.row.task_title }}
                </q-card>
              </q-td>
            </template>

            <template v-slot:body-cell-status="props">
              <q-td :props="props">
                <div class="text-center" style="width: 100%">
                  <q-chip
                    :color="(props.row.status == 'Done') ? 'orange' : (props.row.status == 'In-progres') ? 'cyan' : (props.row.status == 'Stuck' ? 'purple' : 'secondary')"
                    text-color="white" dense class="text-weight-bolder q-py-md q-px-lg" text-center round
                    style="width: 150px">{{ props.row.status }}
                  </q-chip>
                </div>
              </q-td>
            </template>

            <template v-slot:body-cell-progress="props">
              <q-td :props="props">
                <q-linear-progress grey color="purple" rounded size="15px" :value="props.row.progress / 100"
                  class="q-mt-md" />
              </q-td>
            </template>

            <template v-slot:body-cell-priority="props">
              <q-td :props="props" class="q-py-md  no-shadow align-left bg-grey-1" outlined bordered>
                <q-rating :value="props.row.priority" size="2em" color="orange" readonly />
              </q-td>
            </template>

            <template v-slot:body-cell-date="props">
              <q-td :props="props" class=" no-shadow align-left bg-grey-3">
                <div class="text-body1">
                  {{ props.row.date }}
                </div>
              </q-td>
            </template>

            <template v-slot:body-cell-details="props">
              <q-td :props="props" class="q-py-md  no-shadow align-left bg-grey-3">
                <div class="q-gutter-sm">
                  <q-btn dense unelevated color="indigo-2" text-color="indigo-7">
                    <q-icon name="img:/statics/Filesearch.svg" />
                    View
                  </q-btn>
                </div>
              </q-td>
            </template>

          </q-table>
        </q-card-section>
      </q-card>
    </div>





  </q-page>
</template>

<script>
import { exportFile } from "quasar";
import { defineComponent } from 'vue'
// import Status from "components/Status"



const stringOptions = [
  'Google', 'Facebook', 'Twitter', 'Apple', 'Apples1', 'Apples2', 'Oracle'
]

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
      filter: "",
      mode: "list",
      invoice: {},
      selected: [],
      search: "",
      deposit: {},
      options: stringOptions,
      employee_dialog: false,
      columns: [
        {
          name: "task_title",
          align: "left",
          label: "",
          field: "task_title",
          sortable: true
        },
        {
          name: "status",
          align: "center",
          label: "STATUS",
          field: "status",
          sortable: true
        },
        {
          name: "progress",
          align: "center",
          label: "Progress",
          field: "progress",
          sortable: true
        },
        {
          name: "date",
          align: "center",
          label: "Due Date",
          field: "date",
          sortable: true
        },
        {
          name: "priority",
          align: "center",
          label: "Priority",
          field: "priority",
          sortable: true
        },
        {
          name: "details",
          align: "center",
          label: "Details",
          field: "details",
          sortable: true
        }

      ],
      data: [
        {
          serial_no: "01",
          task_title: "Laporan Mingguan",
          name: "Leslie Tecklenburg",

          date: "10 Dec",
          priority: "3",
          status: "Done",
          progress: 50,
        },
        {
          serial_no: "02",
          task_title: "Rekap Laporan Mitra",
          name: "Lia Whitledge",

          date: "11 Dec",
          priority: "3",
          status: "Stuck",
          progress: 50,
        },
        {
          serial_no: "03",
          task_title: "Laporan Bahan",
          name: "Sam Wileman",

          date: "12 Dec",
          priority: "5",
          status: "in-progress",
          progress: 100,
        },
        {
          serial_no: "06",
          task_title: "Laporan Laba Rugi",
          name: "John Rozelle",

          date: "13 Dec",
          priority: "3",
          status: "in-progress",
          progress: 40,
        },
        // {
        //   serial_no: "04",
        //   task_title: "Mapping Market",
        //   name: "Edgar Colmer",

        //   date: "11/09/2019",
        //   priority: "3",
        //   status: "Done",
        //   progress: 100,
        // },
        // {
        //   serial_no: "05",
        //   task_title: "Data Summary Mitra",
        //   name: "Kaiden Rozelle",

        //   date: "10/11/2019",
        //   priority: "3",
        //   status: "Done",
        //   progress: 30,
        // },
        // {
        //   serial_no: "07",
        //   name: "Jacob Firtado",

        //   date: "09/10/2019",
        //   priority: "3",
        //   status: "Stuck",
        //   progress: 70,
        // },
        // {
        //   serial_no: "05",
        //   name: "John Doe",
        //   amount: "$ 900",
        //   date: "12/11/2019",
        //   priority: "5",
        //   status: "Stuck",
        //   progress: 80,
        // }
      ],
      pagination: {
        rowsPerPage: 5
      }
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

    filterFn(val, update) {
      if (val === '') {
        update(() => {
          this.options = stringOptions
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.options = stringOptions.filter(v => v.toLowerCase().indexOf(needle) > -1)
      })
    },


    exportTable() {
      // naive encoding to csv format
      const content = [this.columns.map(col => wrapCsvValue(col.label))]
        .concat(
          this.data.map(row =>
            this.columns
              .map(col =>
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

      // const status = exportFile("quotes.csv", content, "text/csv");

      // if (status !== true) {
      //     this.$q.notify({
      //         message: "Browser denied file download...",
      //         color: "negative",
      //         icon: "warning"
      //     });
      // }
    },

    getColor(val) {
      if (val > 70 && val <= 100) {
        return 'green'
      } else if (val > 50 && val <= 70) {
        return 'blue'
      }
      return 'red'
    }
  }
};



</script>
<style>
thead tr:first-child th {
  /* bg color is important for th; just specify one */
  background-color: #F8F9FA;
  border-bottom: 3px solid white;
}

.under-title-date {
  width: 100%;
  height: 100%;
  max-height: 100px;
  width: 100px;
  border-radius: 8px;
}
</style>
