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
        <template v-slot:body-cell-Progress="props">
          <q-td :props="props">
            <q-linear-progress grey :color="getColor(props.row.progress)" :value="props.row.progress/100"
                               class="q-mt-md"/>
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
              <q-btn dense color="red" label="REVICE"/>
              <q-btn dense color="primary" label="OK"/>
            </div>
          </q-td>
        </template>

        <template v-slot:body-cell-report="props">
          <q-td :props="props">
            <div class="q-gutter-sm">
              <q-btn>
                <q-icon name="img:/statics/reportc.svg" />
              </q-btn>
            </div>
          </q-td>
        </template>


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
                        name: "name",
                        align: "left",
                        label: "name",
                        field: "name",
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
                        name: "Progress",
                        align: "left",
                        label: "Progress",
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
                        label: "feed",
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
                        subject_name: "Design",
                        name: "Leslie Tecklenburg",
                  
                        entry_date: "05/01/2020",
                        stage: "high",
                        status:"complated",
                        progress:50,
                        avatar: 'https://avatars3.githubusercontent.com/u/34883558?s=400&u=09455019882ac53dc69b23df570629fd84d37dd1&v=4',
                    },
                    {
                        serial_no: "02",
                        subject_name: "Networking",
                        name: "Lia Whitledge",
                        abeng:"stage",
               
                        entry_date: "15/12/2019",
                        stage: "normal",
                        status:"open",
                        progress:50,
                        avatar:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw4TZ4MBGmThCq4F5qZ38R65CTfecb9j-PK8ErcxHlZg&s",
                    },
                    {
                        serial_no: "03",
                        subject_name: "Networking",
                        name: "Sam Wileman",
                        abeng:"stage",
           
                        entry_date: "12/11/2019",
                        stage: "high",
                        status:"in-progres",
                        progress:100,
                        avatar:"https://awsimages.detik.net.id/community/media/visual/2019/02/19/3fc2caf6-118c-457d-8a28-8868c1753fda.jpeg?w=600&q=90",
                    },
                    {
                        serial_no: "06",
                        subject_name: "Technology",
                        name: "John Rozelle",
                        abeng:"aku",
            
                        entry_date: "10/11/2019",
                        stage: "normal",
                        status:"in-progress",
                        progress: 40,
                        avatar:"https://avatars3.githubusercontent.com/u/34883558?s=400&u=09455019882ac53dc69b23df570629fd84d37dd1&v=4",
                    },
                    {
                        serial_no: "04",
                        subject_name: "Technology",
                        name: "Edgar Colmer",
     
                        entry_date: "11/09/2019",
                        stage: "normal",
                        status:"complated",
                        progress: 100,
                        avatar:"https://awsimages.detik.net.id/community/media/visual/2019/02/19/42393387-9c5c-4be4-97b8-49260708719e.jpeg?w=600&q=90",
                    },
                    {
                        serial_no: "05",
                        subject_name: "Networking",
                        name: "Kaiden Rozelle",
                     
                        entry_date: "10/11/2019",
                        stage: "normal",
                        status:"complated",
                        progress:30,
                        avatar:"https://avatars2.githubusercontent.com/u/27857088?s=400&u=a898efbc753d93cf4c2070a7cf3b05544b50deea&v=4",
                    },
                    {
                        serial_no: "07",
                        subject_name: "Technology",
                        name: "Jacob Firtado",
                     
                        entry_date: "09/10/2019",                      
                        stage: "normal",
                        status:"open",
                        progress:70,
                        avatar:"https://avatars0.githubusercontent.com/u/55240045?s=400&u=cf9bffc2bd2d8e42ca6e5abf40ddd6c1a03ce2860&v=4",
                    },
                    {
                        serial_no: "05",
                        subject_name: "Design",
                        name: "John Doe",
                        amount: "$ 900",
                        entry_date: "12/11/2019",
                       stage: "high",
                       status:"open",
                       progress: 80,
                        avatar:"https://avatars1.githubusercontent.com/u/10262924?s=400&u=9f601b344d597ed76581e3a6a10f3c149cb5f6dc&v=4",
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
  
</style>