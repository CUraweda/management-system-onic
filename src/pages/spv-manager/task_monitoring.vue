<template>
  <q-page>

    <div class="row items-start q-mt-sm q-mx-sm">
      <div class="q-mx-xs q-my-none">
        <q-input class="under-title-date col q-px-sm" outlined dense v-model="deposit.date" mask="date" label="From">
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
        <q-input class="under-title-date col q-px-sm" outlined dense v-model="deposit.date" mask="date" label="To">
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
            Tasks Open
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
          <div class="">
            Detail Task
            <q-icon name="text_snippet" color="cyan" class="q-mb-none" />
          </div>
          <q-space></q-space>
          <div class="row items-start float-right">
            <q-input class="toolbar-input bg-grey-2 under-title  q-mr-xs" dense text-color="grey-2"
              standout="bg-grey-3 no-shadow" v-model="search" placeholder="Search...">
              <template v-slot:prepend>
                <q-icon v-if="search === ''" name="search" />
                <q-icon v-else name="clear" class="cursor-pointer col" @click="search = ''" />
              </template>
            </q-input>

            <div class="q-mx-xs">
              <q-btn-dropdown unelevated text-color="dark" color="grey-3" label="Department" dropdown-icon="expand_more"
                no-caps class="text-weight-regular under-title col">
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
              <q-btn-dropdown unelevated text-color="black" borderless color="grey-3" label="Person"
                dropdown-icon="expand_more" no-caps class="text-weight-regular under-title col">
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

            <div>
              <q-select filled v-model="deposit.account" use-input multiple dense input-debounce="0" label="Filter"
                :options="options" @filter="filterFn" style="width: 250px" dropdown-icon="filter_list"></q-select>
            </div>

            <div class="q-mx-xs q-my-none">
              <q-btn class="under-title col" color="cyan" icon-right="upgrade" text-color="cyan" unelevated dense outline label="Export" no-caps
                @click="exportTable" />
            </div>
          </div>
        </div>
      </q-card-section>

    </div>

    <q-page class="q-pa-sm">
      <q-card>
        <q-table class="no-shadow q-ml-md" :data="data" :hide-header="mode === 'grid'" :columns="columns" row-key="name"
          :grid="mode == 'grid'" :filter="filter" :pagination.sync="pagination" selection="multiple" :selected.sync="selected">


          <template>

          </template>
          <!-- stage -->
          <template v-slot:body-cell-stage="props">
            <q-td :props="props">
              <q-chip :color="(props.row.stage == 'high') ? 'red-2 text-red' : (props.row.stage == 'normal' ? 'blue-2 text-blue' : 'secondary')"
                text-color="white" dense class="text-weight-bolder" square style="width: 85px" >{{ props.row.stage }}
              </q-chip>
            </q-td>
          </template>

          <template v-slot:body-cell-status="props">
            <q-td :props="props">
              <q-chip
                :color="(props.row.status == 'completed') ? 'blue-2 text-blue'   : (props.row.status == 'in-progress') ? 'orange-2 text-orange' : (props.row.status == 'open' ? 'green-2 text-green' : 'secondary')"
                dense class="text-weight-bolder" square style="width: 85px">{{ props.row.status }}
              </q-chip>
            </q-td>
          </template>
          
          <!-- stage -->
          <template v-slot:body-cell-Progress="props">
            <q-td :props="props">
              <q-linear-progress grey :color="getColor(props.row.progress)" :value="props.row.progress / 100"
                class="q-mt-md" />
            </q-td>
          </template>

          <template v-slot:body-cell-name="props">
            <q-td :props="props">
              <q-item style="max-width: 420px">
                <q-item-section avatar>
                  <q-avatar>
                    <img :src="props.row.avatar">
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label>{{ props.row.name }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-td>
          </template>


          <template v-slot:body-cell-feed="props">
            <q-td :props="props">
              <div class="q-gutter-sm">
                <q-btn dense class="under-title" no-caps unelevated rounded color="red-2" text-color="red"
                  label="Revise" />
                <q-btn dense unelevated rounded color="blue-2" text-color="blue" label="OK" />
              </div>
            </q-td>
          </template>

          <template v-slot:body-cell-report="props">
            <q-td :props="props">
              <div class="q-gutter-sm">
                <q-btn dense unelevated>
                  <q-icon name="img:/statics/reportc.svg" />
                </q-btn>
              </div>
            </q-td>
          </template>

          <!-- action -->
          <template v-slot:body-cell-action="props">
            <q-td :props="props">
              <div class="q-gutter-sm">
                <q-btn dense round unelevated color="blue-1">
                  <q-icon name="img:/statics/move.svg" />
                </q-btn>
              </div>
            </q-td>
          </template>
          <!-- action -->
        </q-table>
      </q-card>
    </q-page>





  </q-page>
</template>

<script>
import { exportFile } from "quasar";
// import Status from "components/Status"

const stringOptions = [
  'Google', 'Facebook', 'Twitter', 'Apple' , 'Apples1', 'Apples2', 'Oracle'
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
          label: "Task Title",
          field: "task_title",
          sortable: true
        },
        {
          name: "name",
          align: "left",
          label: "PIC",
          field: "name",
          sortable: true
        },
        {
          name: "entry_date",
          align: "left",
          label: "Due Date",
          field: "entry_date",
          sortable: true
        },
        {
          name: "stage",
          align: "left",
          label: "Priority",
          field: "stage",
          sortable: true
        },
        {
          name: "status",
          align: "left",
          label: "STATUS",
          field: "status",
          sortable: true
        },
        {
          name: "Progress",
          align: "left",
          label: "Progress bar",
          field: "Progress",
          sortable: true
        },
        {
          name: "report",
          align: "left",
          label: "report",
          field: "report",
          sortable: true
        },
        {
          name: "feed",
          align: "left",
          label: "feedback",
          field: "feed",
          sortable: true
        },
        {
          name: "action",
          align: "left",
          label: "Action",
          field: "action",
          sortable: true
        }

      ],
      data: [
        {
          serial_no: "01",
          task_title: "Laporan Mingguan",
          name: "Leslie Tecklenburg",

          entry_date: "05/01/2020",
          stage: "high",
          status: "completed",
          progress: 50,
          avatar: 'https://avatars3.githubusercontent.com/u/34883558?s=400&u=09455019882ac53dc69b23df570629fd84d37dd1&v=4',
        },
        {
          serial_no: "02",
          task_title: "Rekap Laporan Mitra",
          name: "Lia Whitledge",
          abeng: "stage",

          entry_date: "15/12/2019",
          stage: "normal",
          status: "open",
          progress: 50,
          avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw4TZ4MBGmThCq4F5qZ38R65CTfecb9j-PK8ErcxHlZg&s",
        },
        {
          serial_no: "03",
          task_title: "Laporan Bahan",
          name: "Sam Wileman",
          abeng: "stage",

          entry_date: "12/11/2019",
          stage: "high",
          status: "in-progress",
          progress: 100,
          avatar: "https://awsimages.detik.net.id/community/media/visual/2019/02/19/3fc2caf6-118c-457d-8a28-8868c1753fda.jpeg?w=600&q=90",
        },
        {
          serial_no: "06",
          task_title: "Laporan Laba Rugi",
          name: "John Rozelle",
          abeng: "aku",

          entry_date: "10/11/2019",
          stage: "normal",
          status: "in-progress",
          progress: 40,
          avatar: "https://avatars3.githubusercontent.com/u/34883558?s=400&u=09455019882ac53dc69b23df570629fd84d37dd1&v=4",
        },
        {
          serial_no: "04",
          task_title: "Mapping Market",
          name: "Edgar Colmer",

          entry_date: "11/09/2019",
          stage: "normal",
          status: "completed",
          progress: 100,
          avatar: "https://awsimages.detik.net.id/community/media/visual/2019/02/19/42393387-9c5c-4be4-97b8-49260708719e.jpeg?w=600&q=90",
        },
        {
          serial_no: "05",
          task_title: "Data Summary Mitra",
          name: "Kaiden Rozelle",

          entry_date: "10/11/2019",
          stage: "normal",
          status: "completed",
          progress: 30,
          avatar: "https://avatars2.githubusercontent.com/u/27857088?s=400&u=a898efbc753d93cf4c2070a7cf3b05544b50deea&v=4",
        },
        {
          serial_no: "07",
          name: "Jacob Firtado",

          entry_date: "09/10/2019",
          stage: "normal",
          status: "open",
          progress: 70,
          avatar: "https://avatars0.githubusercontent.com/u/55240045?s=400&u=cf9bffc2bd2d8e42ca6e5abf40ddd6c1a03ce2860&v=4",
        },
        {
          serial_no: "05",
          name: "John Doe",
          amount: "$ 900",
          entry_date: "12/11/2019",
          stage: "high",
          status: "open",
          progress: 80,
          avatar: "https://avatars1.githubusercontent.com/u/10262924?s=400&u=9f601b344d597ed76581e3a6a10f3c149cb5f6dc&v=4",
        }
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

    filterFn (val, update) {
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
.under-title-date {
  width: 100%;
  height: 100%;
  max-height: 100px;
  width: 100px;
  border-radius: 8px;
}
</style>
