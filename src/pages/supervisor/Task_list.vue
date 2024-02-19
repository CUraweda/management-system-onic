<template>
  <q-page>

    <div class="row q-col-gutter-sm q-ma-xs q-mr-sm justify-around items-stretch">

      <!-- completed task -->
      <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12">
        <q-card class="no-shadow">
          <q-card-section style="height: 180px" :class="$q.dark.isActive ? 'blue_dark' : 'bg-purple-1'" class="text-black">

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
          <q-card-section style="height: 180px" :class="$q.dark.isActive ? 'blue_dark' : 'bg-blue-1'" class="text-black">

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
          <q-card-section style="height: 180px" :class="$q.dark.isActive ? 'blue_dark' : 'bg-orange-1'" class="text-black">
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
          <q-card-section style="height: 180px" :class="$q.dark.isActive ? 'blue_dark' : 'bg-green-1'" class="text-black">
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


    <q-card class="q-mt-md row justify-end items-start text-h5 text-weight-bold text-black no-shadow q-ma-none q-pa-none">
      <div class=" col-lg-6 col-md-7 col-sm-12 col-xs-12">
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

          <q-btn-dropdown unelevated text-color="dark" color="grey-3" label="Category" dropdown-icon="expand_more" no-caps
            class="text-weight-regular under-title bg-grey-2 col-lg-2 col-md-2 col-sm-5 col-xs-5">
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
        </q-card-section>
      </div>
    </q-card>

    <q-expansion-item class="text-h5 text-weight-bold" popup default-opened icon="" >
      <div class="q-mx-md">
        <q-card class="table-bg no-shadow" bordered>
          <q-card-section>
            <div class="text-h5 text-weight-bold text-blue">
              Task Wait Approval
            </div>
          </q-card-section>

          <q-card-section class="q-pa-none">
            <q-table class="no-shadow q-ml-md text-body1" :data="waiting_data" :hide-header="mode === 'grid'"
              :columns="columns" row-key="task_title" :grid="mode == 'grid'" :filter="filter"
              :pagination.sync="pagination" separator="none">

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
                      :color="(props.row.status == 'Wait-app') ? 'blue' : (props.row.status == 'Completed') ? 'cyan  ' : (props.row.status == 'In-progres') ? 'orange' : (props.row.status == 'Open') ? 'green' : (props.row.status == 'Overdue' ? 'yellow' : 'secondary')"
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
                  <template v-if="props.row.priority === 'Normal'">
                    <q-rating :value="2" size="2em" color="orange" readonly />
                  </template>
                  <template v-else-if="props.row.priority === 'High'">
                    <q-rating :value="3" size="2em" color="orange" readonly />
                  </template>
                  <template v-else-if="props.row.priority === 'Important'">
                    <q-rating :value="5" size="2em" color="orange" readonly />
                  </template>
                  <template v-else>
                    <!-- Default case, for any other priority values -->
                    <q-rating :value="0" size="2em" color="orange" readonly />
                  </template>
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
                    <q-btn dense unelevated color="indigo-2" text-color="indigo-7" @click="Detail(props.row.id)">
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
    </q-expansion-item>




    <q-expansion-item class="text-h5 text-weight-bold" popup default-opened icon="">
      <div class="q-mx-md">
        <q-card class="table-bg no-shadow" bordered>
          <q-card-section>
            <div class="text-h5 text-weight-bold text-green">
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
                      :color="(props.row.status == 'Wait-app') ? 'blue' : (props.row.status == 'Completed') ? 'cyan  ' : (props.row.status == 'In-progres') ? 'orange' : (props.row.status == 'Open') ? 'green' : (props.row.status == 'Overdue' ? 'yellow' : 'secondary')"
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
                  <template v-if="props.row.priority === 'Normal'">
                    <q-rating :value="2" size="2em" color="orange" readonly />
                  </template>
                  <template v-else-if="props.row.priority === 'High'">
                    <q-rating :value="3" size="2em" color="orange" readonly />
                  </template>
                  <template v-else-if="props.row.priority === 'Important'">
                    <q-rating :value="5" size="2em" color="orange" readonly />
                  </template>
                  <template v-else>
                    <!-- Default case, for any other priority values -->
                    <q-rating :value="0" size="2em" color="orange" readonly />
                  </template>
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
                    <q-btn dense unelevated color="indigo-2" text-color="indigo-7" @click="Detail(props.row.id)">
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
    </q-expansion-item>

    <q-expansion-item class="text-h5 text-weight-bold" popup default-opened icon="">
      <div class="q-mx-md">
        <q-card class="table-bg no-shadow" bordered>
          <q-card-section>
            <div class="text-h5 text-weight-bold text-red">
              Deleted Task
            </div>
          </q-card-section>

          <q-card-section class="q-pa-none">
            <q-table class="no-shadow q-ml-md text-body1" :data="deleted_data" :hide-header="mode === 'grid'"
              :columns="columns" row-key="task_title" :grid="mode == 'grid'" :filter="filter"
              :pagination.sync="pagination" separator="none">

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
                      :color="(props.row.status == 'Wait-app') ? 'blue' : (props.row.status == 'Completed') ? 'cyan  ' : (props.row.status == 'In-progres') ? 'orange' : (props.row.status == 'Open') ? 'green' : (props.row.status == 'Overdue' ? 'yellow' : 'secondary')"
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
                  <template v-if="props.row.priority === 'Normal'">
                    <q-rating :value="2" size="2em" color="orange" readonly />
                  </template>
                  <template v-else-if="props.row.priority === 'High'">
                    <q-rating :value="3" size="2em" color="orange" readonly />
                  </template>
                  <template v-else-if="props.row.priority === 'Important'">
                    <q-rating :value="5" size="2em" color="orange" readonly />
                  </template>
                  <template v-else>
                    <!-- Default case, for any other priority values -->
                    <q-rating :value="0" size="2em" color="orange" readonly />
                  </template>
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
                    <q-btn dense unelevated color="indigo-2" text-color="indigo-7" @click="Detail(props.row.id)">
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
    </q-expansion-item>




  </q-page>
</template>

<script>
import { exportFile } from "quasar";
import { defineComponent } from 'vue';
import axios from 'axios';
// import Status from "components/Status"



const stringOptions = [
  // 'Google', 'Facebook', 'Twitter', 'Apple', 'Apples1', 'Apples2', 'Oracle'
]

function wrapCsvValue(val, formatFn) {
  let formatted = formatFn !== void 0 ? formatFn(val) : val;

  formatted =
    formatted === void 0 || formatted === null ? "" : String(formatted);

  formatted = formatted.split('"').join('""');

  return `"${formatted}"`;
}

export default {
  name: 'TaskList',
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
        { name: "id", align: "left", label: "Task Id", field: "id", sortable: true },
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
          label: "Status",
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
        },



      ],
      data: [

      ],

      waiting_data: [

      ],

      deleted_data: [

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

  mounted() {
    this.fetchDeletedData();
    this.fetchData();
    this.fetchWaitedData();
  },

  methods: {
    async fetchData() {
      try {
        const response = await axios.get('http://localhost:3000/task/all/supervisor');
        this.data = response.data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },

    async fetchWaitedData() {
      try {
        const response = await axios.get('http://localhost:3000/task/waited/supervisor');
        this.waiting_data = response.data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },

    async fetchDeletedData() {
      try {
        const response = await axios.get('http://localhost:3000/task/deleted/supervisor');
        this.deleted_data = response.data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },

    // filterFn(val, update) {
    //   if (val === '') {
    //     update(() => {
    //       this.options = stringOptions
    //     })
    //     return
    //   }

    //   update(() => {
    //     const needle = val.toLowerCase()
    //     this.options = stringOptions.filter(v => v.toLowerCase().indexOf(needle) > -1)
    //   })
    // },

    Detail(id) {
      this.$router.push('task_detail/' + id)
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
