<template>
  <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
    <q-card flat>
      <q-card-section>
        <div class="bg-grey-3 q-pa-md text-center title-card">Feedback Review</div>
      </q-card-section>

      <q-card-section class="row q-gutter-sm q-pt-none justify-between">
        <q-select
          dense
          filled
          label="Division"
          v-model="selectedpic"
          name="pic"
          use-input
          input-debounce="0"
          :options="picOptions"
          behavior="menu"
          class="col-5"
          :rules="[(val) => (val !== null && val !== '') || 'Required']"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey"> No results </q-item-section>
            </q-item>
          </template>
        </q-select>

        <q-select
          :multiple="isMultitask"
          dense
          filled
          v-model="selectedpic"
          name="pic"
          label="Person"
          use-input
          input-debounce="0"
          :options="picOptions"
          behavior="menu"
          class="col-5"
          :rules="[(val) => (val !== null && val !== '') || 'Required']"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey"> No results </q-item-section>
            </q-item>
          </template>
        </q-select>
      </q-card-section>

      <q-card-section>
        <card-base class="">
          <div class="q-mb-xl">Employee Performance Monitoring</div>
          <div class="row justify-center">
            <div class="col-12">
              <div style="margin: 85px" class="q-ml-md q-mt-sm text-center">
                <q-rating
                  v-model="Avgrate"
                  class="q-ml-md"
                  max="5"
                  size="5em"
                  color="yellow"
                  icon="star_border"
                  icon-selected="star"
                  icon-half="star_half"
                  no-dimming
                  hint="readonly"
                  :dense="dense"
                  readonly
                />
                <div class="text-h5">SKOR ANDA {{ Avgrate }}</div>
              </div>
            </div>
          </div>
        </card-base>
      </q-card-section>
    </q-card>
  </div>

</template>

<script>
import CardBase from "components/CardBase";
export default {
  name: "ApexHalfDonut",
  components: {
    CardBase,
  },
  data() {
    return {
      deposit: {
        start: "",
        due: "",
        start_1: "",
        due_1: "",
        start_2: "",
        due_2: "",
      },
      id: localStorage.getItem("id"),
      left: false,
      username: "",
      title: localStorage.getItem("title"),
      Avgrate: 0,
    };
  },

  mounted() {
    this.fetchData();
  },

  methods: {
    async fetchData() {
      try {
        if (this.title === "director") {
          this.Avgrate = 5;
        } else {
          const response = await this.$axios.get("/user/get-by-id/" + this.id, {
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (response.data.total_task === 0) {
            this.Avgrate = 0;
          } else {
          console.log(response.data.u_rate);
          const Avgrate = response.data.u_rate / response.data.total_task;
          this.Avgrate = Avgrate;
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        return 0;
      }
    },
  },
};
</script>

<style scoped>
.card-icon {
  border-radius: 6px;
}

.my-card {
  width: 175px;
}

.title-card {
  border-radius: 20px;
}

.under-title {
  border-radius: 8px;
}

.bintang {
  border-radius: 18px;
}
</style>
