<template>
  <q-page>
    <q-card
      class="q-mt-md row justify-end items-start text-h5 text-weight-bold text-black no-shadow q-ma-none q-pa-none"
    >
      <div class="col-lg-6 col-md-7 col-sm-12 col-xs-12">
        <q-card-section class="row q-gutter-xs q-pt-none justify-between">
          <q-input
                class="bg-grey-2 col-lg-2 col-md-2 col-sm-12 col-xs-12 under-title"
                dense
                text-color="black"
                standout="bg-grey-3 no-shadow under-title"
                v-model="search"
                placeholder="Search..."
              >
                <template v-slot:prepend>
                  <q-icon name="search" text-color="black" />
                  <q-icon class="cursor-pointer col" />
                </template>
              </q-input>

          <q-input
            class="bg-grey-3 q-px-md under-title col-lg-2 col-md-2 col-sm-5 col-xs-5"
            borderless
            dense
            v-model="deposit.start"
            mask="date"
            label="From"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  ref="depositDateProxy"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="deposit.start" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

          <q-input
            class="bg-grey-3 q-px-md under-title col-lg-2 col-md-2 col-sm-5 col-xs-5"
            borderless
            dense
            v-model="deposit.due"
            mask="date"
            label="To"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  ref="depositDateProxy"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="deposit.due" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>


        </q-card-section>
      </div>
    </q-card>

    <q-expansion-item
      class="text-h5 text-weight-bold"
      popup
      default-opened
      icon=""
    >
      <div class="q-mx-md">
        <q-card class="table-bg no-shadow" bordered>
          <q-card-section>
            <div class="text-h5 text-weight-bold text-blue">
              Task Wait Approval
            </div>
          </q-card-section>

          <q-card-section class="q-pa-none">
            <q-table
<<<<<<< HEAD
          class="no-shadow q-ml-md"
          :data="data"
          :hide-header="mode === 'grid'"
          :columns="columns"
          row-key="pic"
          :grid="mode == 'grid'"
          :filter="filter"
          :pagination.sync="pagination"
        >
=======
              class="no-shadow q-ml-md text-body1"
              :data="waiting_data"
              :hide-header="mode === 'grid'"
              :columns="columns"
              row-key="id"
              :grid="mode == 'grid'"
              :filter="filter"
              :pagination.sync="pagination"
              separator="none"
            >
>>>>>>> 4b347f5d15053186276a5dd608ccca913af1c8e0
              <template v-slot:body-cell-task_title="props">
                <q-tr
              :props="props"
              :class="
                props.row.status == 'Idle'
                  ? 'bg-yellow-3 text-black'
                  : 'bg-white text-black'
              "
            >
            <q-td key="id" :props="props">
                <div>{{ props.row.id }}</div>
              </q-td>

              <q-td key="task_title" :props="props">
                <div>{{ props.row.task_title }}</div>
              </q-td>

              <q-td key="pic" :props="props">
                <div>{{ props.row.pic }}</div>
              </q-td>

              <q-td key="pic_title" :props="props">
                <div>{{ props.row.pic_title }}</div>
              </q-td>

              <q-td key="start_date" :props="props">
                <div>{{ formatLocalTime(props.row.start_date) }}</div>
              </q-td>

              <q-td key="due_date" :props="props">
                <div>{{ formatLocalTime(props.row.due_date) }}</div>
              </q-td>

              <!-- priority -->

              <q-td key="priority" :props="props">
                <q-chip
                  :color="
                    props.row.priority == 'Important'
                      ? 'white text-red'
                      : props.row.priority == 'High'
                      ? 'white text-orange'
                      : props.row.priority == 'Normal'
                      ? 'white text-blue'
                      : 'secondary'
                  "
                  text-color="white"
                  dense
                  class="text-center under-title q-px-sm tex"
                  rounded
                  >{{ props.row.priority }}
                </q-chip>
              </q-td>

              <q-td key="status" :props="props">
                <q-chip
                  :color="
                    props.row.status == 'Close'
                      ? 'white text-deep-orange'
                      : props.row.status == 'Deleted'
                      ? 'white text-red'
                      : props.row.status == 'Idle'
                      ? 'white text-orange'
                      : props.row.status == 'Wait-app'
                      ? 'white text-blue'
                      : props.row.status == 'Completed'
                      ? 'white text-blue'
                      : props.row.status == 'In-progress'
                      ? 'white text-orange'
                      : props.row.status == 'Open'
                      ? 'white text-green'
                      : 'secondary'
                  "
                  dense
                  class="under-title q-px-sm tex"
                  rounded
                  >{{ props.row.status }}
                </q-chip>
              </q-td>

              <!-- priority -->
              <q-td key="Progress" :props="props">
                <q-linear-progress
                  grey
                  :color="getColor(props.row.progress)"
                  :value="props.row.progress / 100"
                  class="q-mt-md"
                />
              </q-td>

              <q-td key="progress" :props="props">
                <div>{{ props.row.progress }}</div>
              </q-td>

              <q-td key="detail" :props="props">
                <div class="q-gutter-sm">
                  <q-btn dense unelevated @click="Report(props.row.id)">
                    <q-icon name="img:/statics/reportc.svg" />
                  </q-btn>
                </div>
              </q-td>

             
                
              

              <!-- action -->
          
              <!-- action -->
            </q-tr>
             
              
              </template>

              <template v-slot:body-cell-status="props">
                <q-td :props="props">
                  <div class="text-center" style="width: 100%">
                    <q-chip
                      :color="
                        props.row.status == 'Wait-app'
                          ? 'blue'
                          : props.row.status == 'Completed'
                          ? 'cyan  '
                          : props.row.status == 'In-progres'
                          ? 'orange'
                          : props.row.status == 'Open'
                          ? 'green'
                          : props.row.status == 'Overdue'
                          ? 'yellow'
                          : props.row.status == 'Close'
                          ? 'brown'
                          : 'secondary'
                      "
                      text-color="white"
                      dense
                      class="text-weight-bolder q-py-md q-px-lg"
                      text-center
                      round
                      style="width: 150px"
                      >{{ props.row.status }}
                    </q-chip>
                  </div>
                </q-td>
              </template>

              <template v-slot:body-cell-progress="props">
                <q-td :props="props">
                  <q-linear-progress
                    grey
                    color="purple"
                    rounded
                    size="15px"
                    :value="props.row.progress / 100"
                    class="q-mt-md"
                  />
                </q-td>
              </template>

              <template v-slot:body-cell-priority="props">
                <q-td
                  :props="props"
                  class="q-py-md no-shadow align-left bg-grey-1"
                  outlined
                  bordered
                >
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
                <q-td :props="props" class="no-shadow align-left bg-grey-3">
                  <div class="text-body1">
                    {{ props.row.date }}
                  </div>
                </q-td>
              </template>

              <template v-slot:body-cell-details="props">
                <q-td
                  :props="props"
                  class="q-py-md no-shadow align-left bg-grey-3"
                >
                  <div class="q-gutter-sm">
                    <q-btn
                      dense
                      unelevated
                      color="indigo-2"
                      text-color="indigo-7"
                      @click="Detail(props.row.id)"
                    >
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

    <q-expansion-item
      class="text-h5 text-weight-bold"
      popup
      default-opened
      icon=""
    >
      <div class="q-mx-md">
        <q-card class="table-bg no-shadow" bordered>
          <q-card-section>
            <div class="text-h5 text-weight-bold text-green">This Week</div>
          </q-card-section>

          <q-card-section class="q-pa-none">
            <q-table
<<<<<<< HEAD
          class="no-shadow q-ml-md"
          :data="data"
          :hide-header="mode === 'grid'"
          :columns="columns"
          row-key="pic"
          :grid="mode == 'grid'"
          :filter="filter"
          :pagination.sync="pagination"
        >
=======
              class="no-shadow q-ml-md text-body1"
              :data="data"
              :hide-header="mode === 'grid'"
              :columns="columns"
              row-key="id"
              :grid="mode == 'grid'"
              :filter="filter"
              :pagination.sync="pagination"
              separator="none"
            >
>>>>>>> 4b347f5d15053186276a5dd608ccca913af1c8e0
              <template v-slot:body-cell-task_title="props">
                <q-tr
              :props="props"
              :class="
                props.row.status == 'Idle'
                  ? 'bg-yellow-3 text-black'
                  : 'bg-white text-black'
              "
            >
            <q-td key="id" :props="props">
                <div>{{ props.row.id }}</div>
              </q-td>

              <q-td key="task_title" :props="props">
                <div>{{ props.row.task_title }}</div>
              </q-td>

              <q-td key="pic" :props="props">
                <div>{{ props.row.pic }}</div>
              </q-td>

              <q-td key="pic_title" :props="props">
                <div>{{ props.row.pic_title }}</div>
              </q-td>

              <q-td key="start_date" :props="props">
                <div>{{ formatLocalTime(props.row.start_date) }}</div>
              </q-td>

              <q-td key="due_date" :props="props">
                <div>{{ formatLocalTime(props.row.due_date) }}</div>
              </q-td>

              <!-- priority -->

              <q-td key="priority" :props="props">
                <q-chip
                  :color="
                    props.row.priority == 'Important'
                      ? 'white text-red'
                      : props.row.priority == 'High'
                      ? 'white text-orange'
                      : props.row.priority == 'Normal'
                      ? 'white text-blue'
                      : 'secondary'
                  "
                  text-color="white"
                  dense
                  class="text-center under-title q-px-sm tex"
                  rounded
                  >{{ props.row.priority }}
                </q-chip>
              </q-td>

              <q-td key="status" :props="props">
                <q-chip
                  :color="
                    props.row.status == 'Close'
                      ? 'white text-deep-orange'
                      : props.row.status == 'Deleted'
                      ? 'white text-red'
                      : props.row.status == 'Idle'
                      ? 'white text-orange'
                      : props.row.status == 'Wait-app'
                      ? 'white text-blue'
                      : props.row.status == 'Completed'
                      ? 'white text-blue'
                      : props.row.status == 'In-progress'
                      ? 'white text-orange'
                      : props.row.status == 'Open'
                      ? 'white text-green'
                      : 'secondary'
                  "
                  dense
                  class="under-title q-px-sm tex"
                  rounded
                  >{{ props.row.status }}
                </q-chip>
              </q-td>

              <!-- priority -->
              <q-td key="Progress" :props="props">
                <q-linear-progress
                  grey
                  :color="getColor(props.row.progress)"
                  :value="props.row.progress / 100"
                  class="q-mt-md"
                />
              </q-td>

              <q-td key="progress" :props="props">
                <div>{{ props.row.progress }}</div>
              </q-td>

              <q-td key="detail" :props="props">
                <div class="q-gutter-sm">
                  <q-btn dense unelevated @click="Report(props.row.id)">
                    <q-icon name="img:/statics/reportc.svg" />
                  </q-btn>
                </div>
              </q-td>

              <q-td key="feed" :props="props">
                <div class="q-gutter-sm">
                  <q-btn
                    dense
                    class="under-title q-px-sm"
                    rounded
                    no-caps
                    unelevated
                    color="red-2"
                    text-color="red"
                    label="Revise"
                    @click="Revise(props.row.id)"
                  />
                  <q-btn
                    dense
                    unelevated
                    color="blue-2"
                    class="under-title q-px-sm"
                    rounded
                    text-color="blue"
                    label="OK"
                    @click="openEmployeeDialog(props.row)"
                  />
                </div>
              </q-td>

              <!-- action -->
              <q-td key="action" :props="props">
                <div class="q-gutter-sm">
                  <q-btn
                    dense
                    class="under-title q-px-sm text-green"
                    no-caps
                    unelevated
                    color="green-2"
                    rounded
                    label="Edit"
                    @click="Edit(props.row.id)"
                  />
                  <q-btn
                    dense
                    class="under-title q-px-sm text-red"
                    no-caps
                    unelevated
                    color="red-2"
                    rounded
                    label="Delete"
                    @click="Delete(props.row.id)"
                  />
                </div>
              </q-td>
              <!-- action -->
            </q-tr>
             
              
              </template>

              <template v-slot:body-cell-status="props">
                <q-td :props="props">
                  <div class="text-center" style="width: 100%">
                    <q-chip
                      :color="
                        props.row.status == 'Wait-app'
                          ? 'blue'
                          : props.row.status == 'Completed'
                          ? 'cyan  '
                          : props.row.status == 'In-progres'
                          ? 'orange'
                          : props.row.status == 'Open'
                          ? 'green'
                          : props.row.status == 'Overdue'
                          ? 'yellow'
                          : props.row.status == 'Close'
                          ? 'brown'
                          : 'secondary'
                      "
                      text-color="white"
                      dense
                      class="text-weight-bolder q-py-md q-px-lg"
                      text-center
                      round
                      style="width: 150px"
                      >{{ props.row.status }}
                    </q-chip>
                  </div>
                </q-td>
              </template>

              <template v-slot:body-cell-progress="props">
                <q-td :props="props">
                  <q-linear-progress
                    grey
                    color="purple"
                    rounded
                    size="15px"
                    :value="props.row.progress / 100"
                    class="q-mt-md"
                  />
                </q-td>
              </template>

              <template v-slot:body-cell-priority="props">
                <q-td
                  :props="props"
                  class="q-py-md no-shadow align-left bg-grey-1"
                  outlined
                  bordered
                >
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
                <q-td :props="props" class="no-shadow align-left bg-grey-3">
                  <div class="text-body1">
                    {{ props.row.date }}
                  </div>
                </q-td>
              </template>

              <template v-slot:body-cell-details="props">
                <q-td
                  :props="props"
                  class="q-py-md no-shadow align-left bg-grey-3"
                >
                  <div class="q-gutter-sm">
                    <q-btn
                      dense
                      unelevated
                      color="indigo-2"
                      text-color="indigo-7"
                      @click="Detail(props.row.id)"
                    >
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

    <q-expansion-item
      class="text-h5 text-weight-bold"
      popup
      default-opened
      icon=""
    >
      <div class="q-mx-md">
        <q-card class="table-bg no-shadow" bordered>
          <q-card-section>
            <div class="text-h5 text-weight-bold text-red">Deleted Task</div>
          </q-card-section>

         <q-card-section class="q-pa-none">
            <q-table
<<<<<<< HEAD
          class="no-shadow q-ml-md"
          :data="data"
          :hide-header="mode === 'grid'"
          :columns="columns"
          row-key="pic"
          :grid="mode == 'grid'"
          :filter="filter"
          :pagination.sync="pagination"
        >
=======
              class="no-shadow q-ml-md text-body1"
              :data="deleted_data"
              :hide-header="mode === 'grid'"
              :columns="columns"
              row-key="id"
              :grid="mode == 'grid'"
              :filter="filter"
              :pagination.sync="pagination"
              separator="none"
            >
>>>>>>> 4b347f5d15053186276a5dd608ccca913af1c8e0
              <template v-slot:body-cell-task_title="props">
                <q-tr
              :props="props"
              :class="
                props.row.status == 'Idle'
                  ? 'bg-yellow-3 text-black'
                  : 'bg-white text-black'
              "
            >
            <q-td key="id" :props="props">
                <div>{{ props.row.id }}</div>
              </q-td>

              <q-td key="task_title" :props="props">
                <div>{{ props.row.task_title }}</div>
              </q-td>

              <q-td key="pic" :props="props">
                <div>{{ props.row.pic }}</div>
              </q-td>

              <q-td key="pic_title" :props="props">
                <div>{{ props.row.pic_title }}</div>
              </q-td>

              <q-td key="start_date" :props="props">
                <div>{{ formatLocalTime(props.row.start_date) }}</div>
              </q-td>

              <q-td key="due_date" :props="props">
                <div>{{ formatLocalTime(props.row.due_date) }}</div>
              </q-td>

              <!-- priority -->

              <q-td key="priority" :props="props">
                <q-chip
                  :color="
                    props.row.priority == 'Important'
                      ? 'white text-red'
                      : props.row.priority == 'High'
                      ? 'white text-orange'
                      : props.row.priority == 'Normal'
                      ? 'white text-blue'
                      : 'secondary'
                  "
                  text-color="white"
                  dense
                  class="text-center under-title q-px-sm tex"
                  rounded
                  >{{ props.row.priority }}
                </q-chip>
              </q-td>

              <q-td key="status" :props="props">
                <q-chip
                  :color="
                    props.row.status == 'Close'
                      ? 'white text-deep-orange'
                      : props.row.status == 'Deleted'
                      ? 'white text-red'
                      : props.row.status == 'Idle'
                      ? 'white text-orange'
                      : props.row.status == 'Wait-app'
                      ? 'white text-blue'
                      : props.row.status == 'Completed'
                      ? 'white text-blue'
                      : props.row.status == 'In-progress'
                      ? 'white text-orange'
                      : props.row.status == 'Open'
                      ? 'white text-green'
                      : 'secondary'
                  "
                  dense
                  class="under-title q-px-sm tex"
                  rounded
                  >{{ props.row.status }}
                </q-chip>
              </q-td>

              <!-- priority -->
              <q-td key="Progress" :props="props">
                <q-linear-progress
                  grey
                  :color="getColor(props.row.progress)"
                  :value="props.row.progress / 100"
                  class="q-mt-md"
                />
              </q-td>

              <q-td key="progress" :props="props">
                <div>{{ props.row.progress }}</div>
              </q-td>

              <q-td key="detail" :props="props">
                <div class="q-gutter-sm">
                  <q-btn dense unelevated @click="Report(props.row.id)">
                    <q-icon name="img:/statics/reportc.svg" />
                  </q-btn>
                </div>
              </q-td>

              <q-td key="feed" :props="props">
                <div class="q-gutter-sm">
                  <q-btn
                    dense
                    class="under-title q-px-sm"
                    rounded
                    no-caps
                    unelevated
                    color="red-2"
                    text-color="red"
                    label="Revise"
                    @click="Revise(props.row.id)"
                  />
                  <q-btn
                    dense
                    unelevated
                    color="blue-2"
                    class="under-title q-px-sm"
                    rounded
                    text-color="blue"
                    label="OK"
                    @click="openEmployeeDialog(props.row)"
                  />
                </div>
              </q-td>

              <!-- action -->
              <q-td key="action" :props="props">
                <div class="q-gutter-sm">
                  <q-btn
                    dense
                    class="under-title q-px-sm text-green"
                    no-caps
                    unelevated
                    color="green-2"
                    rounded
                    label="Edit"
                    @click="Edit(props.row.id)"
                  />
                  <q-btn
                    dense
                    class="under-title q-px-sm text-red"
                    no-caps
                    unelevated
                    color="red-2"
                    rounded
                    label="Delete"
                    @click="Delete(props.row.id)"
                  />
                </div>
              </q-td>
              <!-- action -->
            </q-tr>
             
              
              </template>

              <template v-slot:body-cell-status="props">
                <q-td :props="props">
                  <div class="text-center" style="width: 100%">
                    <q-chip
                      :color="
                        props.row.status == 'Wait-app'
                          ? 'blue'
                          : props.row.status == 'Completed'
                          ? 'cyan  '
                          : props.row.status == 'In-progres'
                          ? 'orange'
                          : props.row.status == 'Open'
                          ? 'green'
                          : props.row.status == 'Overdue'
                          ? 'yellow'
                          : props.row.status == 'Close'
                          ? 'brown'
                          : 'secondary'
                      "
                      text-color="white"
                      dense
                      class="text-weight-bolder q-py-md q-px-lg"
                      text-center
                      round
                      style="width: 150px"
                      >{{ props.row.status }}
                    </q-chip>
                  </div>
                </q-td>
              </template>

              <template v-slot:body-cell-progress="props">
                <q-td :props="props">
                  <q-linear-progress
                    grey
                    color="purple"
                    rounded
                    size="15px"
                    :value="props.row.progress / 100"
                    class="q-mt-md"
                  />
                </q-td>
              </template>

              <template v-slot:body-cell-priority="props">
                <q-td
                  :props="props"
                  class="q-py-md no-shadow align-left bg-grey-1"
                  outlined
                  bordered
                >
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
                <q-td :props="props" class="no-shadow align-left bg-grey-3">
                  <div class="text-body1">
                    {{ props.row.date }}
                  </div>
                </q-td>
              </template>

              <template v-slot:body-cell-details="props">
                <q-td
                  :props="props"
                  class="q-py-md no-shadow align-left bg-grey-3"
                >
                  <div class="q-gutter-sm">
                    <q-btn
                      dense
                      unelevated
                      color="indigo-2"
                      text-color="indigo-7"
                      @click="Detail(props.row.id)"
                    >
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
import { defineComponent } from "vue";
import axios from "axios";
// import Status from "components/Status"
import { store } from "../../store/store.js";
import { ref } from "vue";

const stringOptions = [
  "Google",
  "Facebook",
  "Twitter",
  "Apple",
  "Apples1",
  "Apples2",
  "Oracle",
];

function wrapCsvValue(val, formatFn) {
  let formatted = formatFn !== void 0 ? formatFn(val) : val;

  formatted =
    formatted === void 0 || formatted === null ? "" : String(formatted);

  formatted = formatted.split('"').join('""');

  return `"${formatted}"`;
}

export default {
  name: "TaskMonitoring",
  data() {
    return {
      id: ref(null),
      statusFilter: "",
      filter: "",
      mode: "list",
      invoice: {},
      selected: [],
      search: "",
      deposit: {
        start:"",
        due:"",
      },
      options: stringOptions,
      employee_dialog: false,
      columns: [
        {
          name: "id",
          align: "left",
          label: "Task Id",
          field: "id",
          sortable: true,
        },
        {
          name: "task_title",
          align: "left",
          label: "Project",
          field: "task_title",
          sortable: true,
        },
        {
          name: "pic",
          align: "left",
          label: "PIC",
          field: "pic",
          sortable: true,
        },
        {
          name: "pic_title",
          align: "left",
          label: "Title",
          field: "pic_title",
          sortable: true,
        },
        {
          name: "start_date",
          align: "left",
          label: "Start Project",
          field: "start_date",
          sortable: true,
        },
        {
          name: "due_date",
          align: "left",
          label: "End Project",
          field: "due_date",
          sortable: true,
        },
        {
          name: "status",
          align: "center",
          label: "Stage saat ini",
          field: "status",
          sortable: true,
        },
        {
          name: "Progress",
          align: "left",
          label: "Progress bar",
          field: "Progress",
          sortable: true,
        },
        {
          name: "progress",
          align: "left",
          label: "%",
          field: "progress",
          sortable: true,
        },
        {
          name: "detail",
          align: "left",
          label: "Detail",
          field: "detail",
          sortable: true,
        },
   
     
      ],
      data: [],
      pagination: {
        rowsPerPage: 5,
      },
    };
  },
  setup() {
    return {
<<<<<<< HEAD
      onItemClick() {
        // console.log('Clicked on an Item')
      },
=======
      id: store.id,
>>>>>>> 4b347f5d15053186276a5dd608ccca913af1c8e0
    };
  },

  mounted() {
    this.fetchDeletedData();
    this.fetchData();
    this.fetchWaitedData();
  },
  watch: {
    search: {
      handler(value) {
        this.search = value != "" ? value : "";
        this.fetchData();
        this.fetchDeletedData();
        this.fetchWaitedData();
      },
    },
  },
  methods: {
    async fetchData() {
      try {
<<<<<<< HEAD
        console.log(store.count);
        const response = await this.$axios.get("/task/all/manager", {
          params: { search: this.search },
        });
        this.data = response.data.sort(
          (a, b) => new Date(b.update_at) - new Date(a.update_at)
        );
=======
        const statusFilter = this.$route.query.status;
        const username = localStorage.getItem('username');
        const response = await this.$axios.get("/task/all", {
          params: {
            status: statusFilter,
            search: this.search,
          },
          headers: {
            username: username
          }
        });
          this.data = response.data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
>>>>>>> 4b347f5d15053186276a5dd608ccca913af1c8e0
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },

    async fetchWaitedData() {
      try {
<<<<<<< HEAD
        const response = await this.$axios.get("/task/waited/manager", {
          params: { search: this.search },
=======
        const statusFilter = this.$route.query.status;
        const username = localStorage.getItem('username');
        const response = await this.$axios.get("/task/waited", {
          params: {
            status: statusFilter,
            search: this.search,
          },
          headers: {
            username: username
          }
>>>>>>> 4b347f5d15053186276a5dd608ccca913af1c8e0
        });
          this.waiting_data = response.data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },

    async fetchDeletedData() {
      try {
<<<<<<< HEAD
        const response = await this.$axios.get("/task/deleted/manager", {
          params: { search: this.search },
=======
        const statusFilter = this.$route.query.status;
        const username = localStorage.getItem('username');
        const response = await this.$axios.get("/task/deleted", {
          params: {
            status: statusFilter,
            search: this.search,
          },
          headers: {
            username: username
          }
>>>>>>> 4b347f5d15053186276a5dd608ccca913af1c8e0
        });
          this.deleted_data = response.data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },

    filterFn(val, update) {
      if (val === "") {
        update(() => {
          this.options = stringOptions;
        });
        return;
      }

      update(() => {
        const needle = val.toLowerCase();
        this.options = stringOptions.filter(
          (v) => v.toLowerCase().indexOf(needle) > -1
        );
      });
    },

    Detail(id) {
      store.id = id
      this.$router.push("task_detail/");
    },

    exportTable() {
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
    },

    getColor(val) {
      if (val > 70 && val <= 100) {
        return "green";
      } else if (val > 50 && val <= 70) {
        return "blue";
      }
      return "red";
    },
  },
};
</script>
<style scoped>
.my-card {
  width: 175px;
}

thead tr:first-child th {
  /* bg color is important for th; just specify one */
  background-color: #f8f9fa;
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
