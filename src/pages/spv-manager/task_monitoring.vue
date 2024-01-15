<template>
  <q-page>

    <div class="row q-col-gutter-sm q-ma-xs q-mr-sm justify-around items-stretch">

      <!-- completed task -->
      <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12">
        <q-card class="no-shadow">
          <q-card-section :class="$q.dark.isActive ? 'blue_dark' : 'bg-purple-1'" class="text-black">

            <q-item-section class="text-weight-bold">
              Tasks Completed
            </q-item-section>
            <q-item-section avatar>
              <q-icon class="card-icon">
                <img src="statics/Button-129.svg" />
              </q-icon>
            </q-item-section>

            <q-card-section>
              <q-card-section class="q-pa-none">
                <div class="text-h4 text-weight-bold q-mt-none">68</div>
                Increased by 6 this week
              </q-card-section>
            </q-card-section>
          </q-card-section>
        </q-card>
      </div>
      <!-- completed task -->

      <!-- in progres task -->
      <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12">
        <q-card class="no-shadow">
          <q-card-section :class="$q.dark.isActive ? 'blue_dark' : 'bg-blue-1'" class="text-black">

            <q-item-section class="text-weight-bold">
              Tasks Open
            </q-item-section>
            <q-item-section avatar>
              <q-icon class="card-icon">
                <img src="statics/Button-142.svg" />
              </q-icon>
            </q-item-section>
            <q-card-section>
              <q-card-section class="q-pa-none">
                <div class="text-h4 text-weight-bold q-mt-none">17</div>
                Decreased by 5 this week
              </q-card-section>
            </q-card-section>
          </q-card-section>

        </q-card>
      </div>
      <!-- in progres task -->

      <!-- overdue -->
      <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12">
        <q-card class="no-shadow">
          <q-card-section :class="$q.dark.isActive ? 'blue_dark' : 'bg-orange-1'" class="text-black">
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
          </q-card-section>

        </q-card>
      </div>
      <!-- overdue -->

      <!-- opened -->
      <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12">
        <q-card class="no-shadow">
          <q-card-section :class="$q.dark.isActive ? 'blue_dark' : 'bg-green-1'" class="text-black">
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
          </q-card-section>
        </q-card>
      </div>
      <!-- opened -->
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
          <div class=" col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <q-card-section class="row q-gutter-xs q-pt-none justify-between">
              <q-input class="bg-grey-2 col-lg-2 col-md-2 col-sm-12 col-xs-12 under-title" dense text-color="black"
                standout="bg-grey-3 no-shadow under-title" v-model="search" placeholder="Search...">
                <template v-slot:prepend>
                  <q-icon v-if="search === ''" name="search" text-color="black" />
                  <q-icon v-else name="clear" class="cursor-pointer col" @click="search = ''" />
                </template>
              </q-input>

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

              <q-btn-dropdown unelevated text-color="dark" color="grey-3" label="Category" dropdown-icon="expand_more"
                no-caps class="text-weight-regular under-title bg-grey-2 col-lg-2 col-md-2 col-sm-5 col-xs-5">
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

              <q-select class="bg-grey-2 col-lg-2 col-md-2 col-sm-5 col-xs-5 under-title" filled v-model="deposit.account"
                use-input multiple dense input-debounce="0" label="Filter" :options="options" @filter="filterFn"
                dropdown-icon="filter_list"></q-select>

              <q-btn class="under-title col-lg col-md col-sm-12 col-xs-12" color="cyan" icon-right="upgrade" text-color="cyan" unelevated dense outline
                label="Export" no-caps @click="exportTable" />

            </q-card-section>
          </div>

        </div>

      </q-card-section>
    </div>

    <q-page class="q-pa-sm">
      <q-card>
        <q-table class="no-shadow q-ml-md" :data="data" :hide-header="mode === 'grid'" :columns="columns" row-key="name"
          :grid="mode == 'grid'" :filter="filter" :pagination.sync="pagination" selection="multiple"
          :selected.sync="selected">


          <template>

          </template>
          <!-- priority -->
          <template v-slot:body-cell-priority="props">
            <q-td :props="props">
              <q-chip
                :color="(props.row.priority == 'High') ? 'red-2 text-red' : (props.row.priority == 'Normal' ? 'blue-2 text-blue' : 'secondary')"
                text-color="white" dense class="text-center under-title q-px-sm tex" rounded>{{ props.row.priority }}
              </q-chip>
            </q-td>
          </template>

          <template v-slot:body-cell-status="props">
            <q-td :props="props">
              <q-chip
                :color="(props.row.status == 'Wait-app') ? 'blue-2 text-blue' : (props.row.status == 'Completed') ? 'blue-2 text-blue' : (props.row.status == 'In-progress') ? 'orange-2 text-orange' : (props.row.status == 'Open' ? 'green-2 text-green' : 'secondary')"
                dense class="under-title q-px-sm tex" rounded>{{ props.row.status }}
              </q-chip>
            </q-td>
          </template>

          <!-- priority -->
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
              <div class="q-gutter-sm" v-if="props.row.status === 'Wait-app'">
                <q-btn dense class="under-title q-px-sm" rounded no-caps unelevated color="red-2" text-color="red"
                  label="Cancle" />
                <q-btn dense class="under-title q-px-sm" rounded no-caps unelevated color="yellow-2" text-color="yellow-9"
                  label="Revise" />
                <q-btn dense unelevated color="blue-2" text-color="blue" label="OK" class="under-title q-px-sm" rounded
                  @click="employee_dialog = true" />
              </div>
              <div class="q-gutter-sm" v-else>
                <q-btn dense class="under-title q-px-sm" rounded no-caps unelevated color="red-2" text-color="red"
                  label="Revise" />
                <q-btn dense unelevated color="blue-2" class="under-title q-px-sm" rounded text-color="blue" label="OK"
                  @click="employee_dialog = true" />
              </div>
            </q-td>
          </template>


          <template v-slot:body-cell-detail="props">
            <q-td :props="props">
              <div class="q-gutter-sm">
                <q-btn dense unelevated to="detail">
                  <q-icon name="img:/statics/reportc.svg" />
                </q-btn>
              </div>
            </q-td>
          </template>

          <!-- action -->
          <template v-slot:body-cell-action="props">
            <q-td :props="props">
              <div class="q-gutter-sm">
                <q-btn dense class="under-title q-px-sm text-green" no-caps unelevated color="green-2" rounded
                  label="Edit" />
                <q-btn dense class="under-title q-px-sm text-red " no-caps unelevated color="red-2" rounded
                  label="Delete" />
              </div>
            </q-td>
          </template>
          <!-- action -->
        </q-table>
      </q-card>
      <q-dialog v-model="employee_dialog">
        <q-card class="" flat bordered>
          <q-card-section>
            <div class="text-h6">
              Employee Details
              <q-btn round flat dense icon="close" class="float-right" color="grey-8" v-close-popup></q-btn>
            </div>
          </q-card-section>
          <q-card-section>
            <div class="q-gutter-md row items-center">

              <q-rating v-model="ratingModel" size="3em" color="grey" :color-selected="yellow" @click="submit"
                v-close-popup />
            </div>
          </q-card-section>

        </q-card>
      </q-dialog>
    </q-page>





  </q-page>
</template>

<script>
import { ref } from 'vue';
import { exportFile } from "quasar";
import html2pdf from "html2pdf.js";
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
          name: "priority",
          align: "center",
          label: "Priority",
          field: "priority",
          sortable: true
        },
        {
          name: "status",
          align: "center",
          label: "Status",
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
          name: "detail",
          align: "left",
          label: "Detail",
          field: "detail",
          sortable: true
        },
        {
          name: "feed",
          align: "left",
          label: "Feedback",
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
          priority: "High",
          status: "Wait-app",
          progress: 0,
          avatar: 'https://avatars3.githubusercontent.com/u/34883558?s=400&u=09455019882ac53dc69b23df570629fd84d37dd1&v=4',
        },
        {
          serial_no: "02",
          task_title: "Rekap Laporan Mitra",
          name: "Lia Whitledge",
          abeng: "priority",

          entry_date: "15/12/2019",
          priority: "High",
          status: "Open",
          progress: 0,
          avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw4TZ4MBGmThCq4F5qZ38R65CTfecb9j-PK8ErcxHlZg&s",
        },
        {
          serial_no: "03",
          task_title: "Laporan Bahan",
          name: "Sam Wileman",
          abeng: "priority",

          entry_date: "12/11/2019",
          priority: "High",
          status: "In-progress",
          progress: 50,
          avatar: "https://awsimages.detik.net.id/community/media/visual/2019/02/19/3fc2caf6-118c-457d-8a28-8868c1753fda.jpeg?w=600&q=90",
        },
        {
          serial_no: "06",
          task_title: "Laporan Laba Rugi",
          name: "John Rozelle",
          abeng: "aku",

          entry_date: "10/11/2019",
          priority: "Normal",
          status: "In-progress",
          progress: 50,
          avatar: "https://avatars3.githubusercontent.com/u/34883558?s=400&u=09455019882ac53dc69b23df570629fd84d37dd1&v=4",
        },
        {
          serial_no: "04",
          task_title: "Mapping Market",
          name: "Edgar Colmer",

          entry_date: "11/09/2019",
          priority: "Normal",
          status: "Completed",
          progress: 100,
          avatar: "https://awsimages.detik.net.id/community/media/visual/2019/02/19/42393387-9c5c-4be4-97b8-49260708719e.jpeg?w=600&q=90",
        },
        {
          serial_no: "05",
          task_title: "Data Summary Mitra",
          name: "Kaiden Rozelle",

          entry_date: "10/11/2019",
          priority: "Normal",
          status: "Completed",
          progress: 100,
          avatar: "https://avatars2.githubusercontent.com/u/27857088?s=400&u=a898efbc753d93cf4c2070a7cf3b05544b50deea&v=4",
        },
        {
          serial_no: "07",
          name: "Jacob Firtado",

          entry_date: "09/10/2019",
          priority: "Normal",
          status: "Open",
          progress: 0,
          avatar: "https://avatars0.githubusercontent.com/u/55240045?s=400&u=cf9bffc2bd2d8e42ca6e5abf40ddd6c1a03ce2860&v=4",
        },
        {
          serial_no: "05",
          name: "John Doe",
          amount: "$ 900",
          entry_date: "12/11/2019",
          priority: "High",
          status: "Open",
          progress: 0,
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
      ratingModel: ref(0),
      yellow: ['yellow'],
      onItemClick() {
        // console.log('Clicked on an Item')
      },
    };
  },
  methods: {

    submit() {
      this.$q.notify({
        message: 'Task Done',
      })
    },

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

      // Create a hidden HTML element
      const hiddenElement = document.createElement('div');
      hiddenElement.style.visibility = 'hidden';
      hiddenElement.innerHTML = `<pre>${content}</pre>`;
      document.body.appendChild(hiddenElement);

      // Use html2pdf to generate a PDF and download it
      html2pdf(hiddenElement, {
        margin: 10,
        filename: 'Detail.pdf',
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      }).then(() => {
        // Clean up: remove the hidden element from the DOM
        document.body.removeChild(hiddenElement);
      }).catch(error => {
        console.error("Error generating PDF:", error);
        // Handle error if necessary
      });
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
<style scoped>
.my-card {
  width: 175px;
}

.under-title-date {
  width: 100%;
  height: 100%;
  max-height: 100px;
  width: 100px;
  border-radius: 8px;
}
</style>
