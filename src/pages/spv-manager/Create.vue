<template>
  <q-page>
  <div class="mencoba-col row ">
    <div class="boys">
      <q-card flat borderless>
        <q-card-section>
          <div class="text-h6">General information</div>
        </q-card-section>



        <q-card-section>
          <q-form>
            <q-list>
              <q-item class="des">
                  <q-item-section>
                    <q-item-label class="q-pb-xs">Description</q-item-label>
                    <q-input class="des1 bg-grey-3"
                      dense
                      borderless
                      v-model="deposit.description"
                      label=""
                    />
                  </q-item-section>
                </q-item>
              <div class="aku">
                <q-item class="acc">
                <q-item-section>
                  <q-item-label class="q-pb-xs">Account</q-item-label>
                  <q-select class="count1 bg-grey-3"
                    dense
                    label=""
                    borderless
                    v-model="deposit.account"
                    :options="options"
                    stack-label
                    options-dense
                    >
                  </q-select>
                </q-item-section>
              </q-item>


              <q-item class="acc">
                <q-item-section>
                  <q-item-label class="q-pb-xs">Account</q-item-label>
                  <q-select class="count2 bg-grey-3"
                    dense
                    label=""
                    borderless
                    v-model="deposit.account"
                    :options="options"
                    stack-label
                    options-dense>
                  </q-select>
                </q-item-section>
              </q-item>
              </div>

              <div class="tanggal">
              <q-item class="depo">
                <q-item-section>
                  <q-item-label class="q-pb-xs">Deposit Date</q-item-label>
                  <q-input class="dep1 bg-grey-3 "
                    dense
                    borderless
                    v-model="deposit.date"
                    mask="date"
                    label=""
                  >
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy
                          ref="depositDateProxy"
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-date
                            v-model="deposit.date"
                            @input="() => $refs.depositDateProxy.hide()"
                          />
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </q-item-section>
              </q-item>


              <q-item class="depo">
                <q-item-section>
                  <q-item-label class="q-pb-xs">Deposit Date</q-item-label>
                  <q-input class="dep2 bg-grey-3"
                    dense
                    borderless
                    v-model="deposit.date"
                    mask="date"
                    label=""
                  >
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy
                          ref="depositDateProxy"
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-date
                            v-model="deposit.date"
                            @input="() => $refs.depositDateProxy.hide()"
                          />
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </q-item-section>
              </q-item>
            </div>
            <q-item class="desi">
                  <q-item-section>
                    <q-item-label class="uuy">Description</q-item-label>
                    <q-input class="den bg-grey-3"
                      dense
                      borderless
                      v-model="deposit.description"
                      label=""
                    />
                  </q-item-section>
                </q-item>

            </q-list>

          </q-form>
        </q-card-section>
      </q-card>
    </div>

    <div class="recent">
      <q-card flat borderless>
        <q-card-section>
          <div class="text-h6">Recent Deposits</div>
        </q-card-section>

          <div class="upload1">

        <q-file filled bottom-slots v-model="model" label="Label" counter max-files="12">
      <template v-slot:before>

      </template>

      <template v-slot:append>
        <!-- <q-icon v-if="model !== null" name="close" @click.stop.prevent="model = null" class="cursor-pointer" />
        <q-icon name="create_new_folder" @click.stop.prevent /> -->
      </template>



      <template v-slot:after>
        <q-btn round dense flat icon="send" />
      </template>
    </q-file>
    </div>



          <div class="upload2">

    <q-file filled bottom-slots v-model="model" label="Label" counter max-files="12">
    <template v-slot:before>

    </template>

    <template v-slot:append>
    <!-- <q-icon v-if="model !== null" name="close" @click.stop.prevent="model = null" class="cursor-pointer" />
    <q-icon name="create_new_folder" @click.stop.prevent /> -->
    </template>



    <template v-slot:after>
    <q-btn round dense flat icon="send" />
    </template>

    </q-file>
    </div>





      </q-card>
    </div>


  </div>


</q-page>


</template>

<script>

import { exportFile } from "quasar";

function wrapCsvValue(val, formatFn) {
let formatted = formatFn !== void 0 ? formatFn(val) : val;

formatted =
  formatted === void 0 || formatted === null ? "" : String(formatted);

formatted = formatted.split('"').join('""');

return `"${formatted}"`;
}

export default {
setup () {
  return {
    model: ref(null)
  }
  },


data() {
  return {
    filter: "",
    mode: "list",
    deposit: {},
    pagination: {
      rowsPerPage: 10
    },
    options: [
      "National Bank",
      "Bank of Asia",
      "Corporate Bank",
      "Public Bank"
    ],
    columns: [
      {
        name: "description",
        align: "left",
        label: "Description",
        field: "description",
        sortable: true
      },
      {
        name: "amount",
        label: "Amount",
        align: "left",
        field: "amount",
        sortable: true
      }
    ],
    data: [
      {
        description: "Invoice 10 Payment",
        amount: "$ 200"
      },
      {
        description: "Pvt Ltd Invoice",
        amount: "$ 300"
      },
      {
        description: "Invoice 6 Payment",
        amount: "$ 250"
      },
      {
        description: "Invoice 18 Payment",
        amount: "$ 400"
      },
      {
        description: "John and company Payment",
        amount: "$ 500"
      }
    ]
  };
},
methods: {
  exportDepositsTable() {
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

    const status = exportFile("deposits.csv", content, "text/csv");

    if (status !== true) {
      this.$q.notify({
        message: "Browser denied file download...",
        color: "negative",
        icon: "warning"
      });
    }
  },
  showLoading() {
    this.$q.loading.show({
      message: '<b>Demo loading screen, replace your message here<b>'
    })

    // hiding in 2s
    this.timer = setTimeout(() => {
      this.$q.loading.hide();
      this.timer = void 0;
    }, 3000);
  },

  beforeDestroy() {
    if (this.timer !== void 0) {
      clearTimeout(this.timer);
      this.$q.loading.hide();
    }
  }
},
  beforeMount() {
  this.showLoading();
},
};

</script>

<style scoped>
*{
  padding: 0;
  margin: 0;
}

.text-h6{
  height: 50px;

}

.des{
  width: 900px;
}


.boys{
  width: 900px;
  margin-right: 20px;
  margin-left: 10px;
  margin-top: 10px;
}
.desi{
  height: 100px;
  width: 900px;
}


.aku{
  height: 100px;
  display: flex;
  align-items: center;
  flex-direction: row;

}

.acc{
  width: 500px;
}

.depo{
  width: 500px;

}

.recent{
  height: 100px;
  width: 400px;
  margin-top: 10px;
}

.upload1{
  height: 100px;

}

  .tanggal{
    height: 100px;
    display: flex;
    flex-direction: row;
    
  }

  .des1 bg-grey-3{
    border-radius: 15px;
  }

  





</style>
