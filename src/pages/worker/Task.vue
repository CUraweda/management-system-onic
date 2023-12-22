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
        <q-item-section class="text-weight-bold">
             Tasks Completed 
            </q-item-section>
          
      </div>

      <q-page class="q-pa-sm">
    <q-card>
      <q-table
        title="Quotes"
        :data="data"
        :hide-header="mode === 'grid'"
        :columns="columns"
        row-key="name"
        :grid="mode=='grid'"
        :filter="filter"
        :pagination.sync="pagination"
      >


        <template >
          <!-- <q-input outlined dense debounce="300" v-model="filter" placeholder="Search">
            <template v-slot:append>
              <q-icon name="search"/>
            </template>
          </q-input> -->

          <!-- <q-btn
            flat
            round
            dense
            :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
            @click="props.toggleFullscreen"
            v-if="mode === 'list'"
          >
            <q-tooltip
              :disable="$q.platform.is.mobile"
              v-close-popup
            >{{props.inFullscreen ? 'Exit Fullscreen' : 'Toggle Fullscreen'}}
            </q-tooltip>
          </q-btn> -->

          <!-- <q-btn
            flat
            round
            dense
            :icon="mode === 'grid' ? 'list' : 'grid_on'"
            @click="mode = mode === 'grid' ? 'list' : 'grid'; separator = mode === 'grid' ? 'none' : 'horizontal'"
            v-if="!props.inFullscreen"
          >
            <q-tooltip
              :disable="$q.platform.is.mobile"
              v-close-popup
            >{{mode==='grid' ? 'List' : 'Grid'}}
            </q-tooltip>
          </q-btn> -->

          <q-btn
            color="primary"
            icon-right="archive"
            label="Export to csv"
            no-caps
            @click="exportTable"
          />
        </template>
        <!-- stage -->
        <template v-slot:body-cell-stage="props">
          <q-td :props="props">
            <q-chip
              :color="(props.row.stage == 'high')?'red':(props.row.stage == 'normal'?'blue':'secondary')"
              text-color="white"
              dense
              class="text-weight-bolder"
              square
              style="width: 85px"
            >{{props.row.stage}}
            </q-chip>
          </q-td>
        </template>

        <template v-slot:body-cell-status="props">
          <q-td :props="props">
            <q-chip
              :color="(props.row.status == 'complated')?'blue': (props.row.status == 'in-progres')?'orange':(props.row.status == 'open'?'green':'secondary')"
              text-color="white"
              dense
              class="text-weight-bolder"
              square
              style="width: 85px"
            >{{props.row.status}}
            </q-chip>
          </q-td>
        </template>
        <!-- stage -->

        <!-- action -->
        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <div class="q-gutter-sm">
              <q-btn dense color="primary" icon="edit"/>
              <q-btn dense color="red" icon="delete"/>
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
    import {exportFile} from "quasar";
    // import Status from "components/Status"


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
                employee_dialog: false,
                columns: [
                    {
                        name: "serial_no",
                        align: "left",
                        label: "Serial No.",
                        field: "serial_no",
                        sortable: true
                    },
                    {
                        name: "account",
                        align: "left",
                        label: "Account",
                        field: "account",
                        sortable: true
                    },
                    {
                        name: "entry_date",
                        align: "left",
                        label: "Entry Date",
                        field: "entry_date",
                        sortable: true
                    },
                    {
                        name: "stage",
                        align: "left",
                        label: "property",
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
                        subject_name: "Design",
                        account: "Leslie Tecklenburg",
                        amount: "$ 4200",
                        entry_date: "05/01/2020",
                        stage: "high",
                        status:"complated",
                    },
                    {
                        serial_no: "02",
                        subject_name: "Networking",
                        account: "Lia Whitledge",
                        abeng:"stage",
                        amount: "$ 4200",
                        entry_date: "15/12/2019",
                        stage: "normal",
                        status:"open",
                    },
                    {
                        serial_no: "03",
                        subject_name: "Networking",
                        account: "Sam Wileman",
                        abeng:"stage",
                        amount: "$ 4200",
                        entry_date: "12/11/2019",
                        stage: "high",
                        status:"in-progres",
                    },
                    {
                        serial_no: "06",
                        subject_name: "Technology",
                        account: "John Rozelle",
                        abeng:"aku",
                        amount: "$ 4200",
                        entry_date: "10/11/2019",
                        stage: "normal",
                        status:"in-progress",
                    },
                    {
                        serial_no: "04",
                        subject_name: "Technology",
                        account: "Edgar Colmer",
                        amount: "$ 4000",
                        entry_date: "11/09/2019",
                        stage: "normal",
                        status:"complated",
                    },
                    {
                        serial_no: "05",
                        subject_name: "Networking",
                        account: "Kaiden Rozelle",
                        amount: "$ 1200",
                        entry_date: "10/11/2019",
                        stage: "normal",
                        status:"complated",
                    },
                    {
                        serial_no: "07",
                        subject_name: "Technology",
                        account: "Jacob Firtado",
                        amount: "$ 2200",
                        entry_date: "09/10/2019",                      
                        stage: "normal",
                        status:"open",
                    },
                    {
                        serial_no: "05",
                        subject_name: "Design",
                        account: "John Doe",
                        amount: "$ 900",
                        entry_date: "12/11/2019",
                       stage: "high",
                       status:"open",
                    }
                ],
                pagination: {
                    rowsPerPage: 10
                }
            };
        },
        methods: {
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
            }
        }
    };

   
</script>
<style>
  
</style>