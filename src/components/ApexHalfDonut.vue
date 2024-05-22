<template>
  <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
    <q-card flat>
      <q-card-section>
        <div class="bg-grey-3 q-pa-md text-center title-card">Feedback Review</div>
      </q-card-section>

      <q-card-section class="row q-gutter-sm q-pt-none justify-between">
        <!-- <q-select
          dense
          filled
          label="Division"
          v-model="divisi"
          name="division"
          use-input
          input-debounce="0"
          :options="divisiOptions"
          behavior="menu"
          class="col-5"
          :rules="[(val) => (val !== null && val !== '') || 'Required']"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey"> No results </q-item-section>
            </q-item>
          </template>
        </q-select> -->

        <!-- <q-select
          dense
          filled
          v-model="person"
          name="person"
          label="Person"
          use-input
          input-debounce="0"
          :options="personOptions"
          behavior="menu"
          class="col-5"
          :rules="[(val) => (val !== null && val !== '') || 'Required']"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey"> No results </q-item-section>
            </q-item>
          </template>
        </q-select> -->
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
                  readonly
                />
                <div class="text-h5">SKOR {{ personName }} {{ Avgrate }}</div>
              </div>
            </div>
          </div>
        </card-base>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { eventBus } from '../event-bus.js';
import Cookies from "js-cookie";
import { ref, inject } from "vue";
import CardBase from "components/CardBase";

export default {
  name: "ApexHalfDonut",
  components: {
    CardBase,
  },
  data() {
    return {
      person: 0,
      divisionId: sessionStorage.getItem("division_id")
        ? sessionStorage.getItem("division_id")
        : Cookies.get("division_id"),
      branchId: sessionStorage.getItem("branch_id")
        ? sessionStorage.getItem("branch_id")
        : Cookies.get("branch_id"),
      branch: sessionStorage.getItem("branch")
        ? sessionStorage.getItem("branch")
        : Cookies.get("branch"),
      deposit: {
        start: "",
        due: "",
        start_1: "",
        due_1: "",
        start_2: "",
        due_2: "",
      },
      divisi: null,
      id: sessionStorage.getItem("id") ? sessionStorage.getItem("id") : Cookies.get("id"),
      left: false,
      token: ref(
        sessionStorage.getItem("token")
          ? sessionStorage.getItem("token")
          : Cookies.get("token")
      ),
      title: sessionStorage.getItem("title")
        ? sessionStorage.getItem("title")
        : Cookies.get("title"),
      username: sessionStorage.getItem("username")
        ? sessionStorage.getItem("username")
        : Cookies.get("username"),
      Avgrate: 0,
    };
  },

  setup() {
    return {
      personOptions: ref([]),
      divisiOptions: ref([]),
    };
  },

  mounted() {
    eventBus.$on('person-selected', person => {
      this.person = person;
      // console.log('Person yang dipilih:', this.person);
    });
    // this.fetchData();

    // this.fetchDivisionData();
    // console.log("wong: ", this.person);
  },

  watch: {
    person: {
      handler(val) {
        if (val) {
          this.fetchData();
        }
      },
    },

    // divisi: {
    //   handler(value) {
    //     console.log("Selected PIC changed. Updating SPV options...");
    //     console.log("PIC title:", value.label);

    //     if (value) {
    //       this.fetchPersonData();
    //     }
    //   },
    // },
  },

  computed: {
    personName() {
      return this.person ? this.person.label.toUpperCase() : "";
    },
  },

  methods: {
    async fetchDivisionData() {
      try {
        const { status, data } = await this.$axios.get("/divisi", {
          headers: {
            branch: this.branchId,
            division: this.divisionId,
            title: this.title.toLowerCase(),
            Authorization: `Bearer ${this.token}`,
          },
        });

        if (status !== 200) {
          throw Error("Error while fetching");
        }

        // console.log("DATA:", data.data);
        const listOfDivisi = data.data.map((data) => ({
          label: data.d_name,
          value: data.id,
        }));

        this.divisiOptions = listOfDivisi;
        this.divisi = this.divisiOptions[0];

        const divisi = this.divisiOptions.d_name;
        // console.log("Selected Divisi:", divisi);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },

    // async fetchPersonData() {
    //   try {
    //     console.log("🚀 ~ listOfDivisi ~ value:", this.divisi.value);
    //     const { status, data } = await this.$axios.get("/user/division", {
    //       params: {
    //         division: this.divisi.value,
    //         branch: this.branch,
    //       },
    //       headers: {
    //         branch: this.branchId,
    //         division: this.divisionId,
    //         Authorization: `Bearer ${this.token}`,
    //       },
    //     });

    //     if (status !== 200) {
    //       throw Error("Error while fetching");
    //     }

    //     let filteredData;
    //     if(this.title.toLowerCase() === "director" || "direktur") {
    //     filteredData = data.filter(
    //       (user) => user.title.toLowerCase()!== "director" || "direktur" && user.title.toLowerCase()!== "admin"
    //     );
    //     }else if (this.title.toLowerCase() === "manager") {
    //       filteredData = data.filter(
    //       (user) => user.title.toLowerCase()!== "director" || "direktur" && user.title.toLowerCase()!== "admin" && user.title.toLowerCase()!== "manager"
    //     );
    //     }else if (this.title.toLowerCase() === "supervisor") {
    //       filteredData = data.filter(
    //       (user) => user.title.toLowerCase()=== "operator"
    //     );
    //     }else if (this.title.toLowerCase() === "operator") {
    //       filteredData = data.filter(
    //       (user) => user.u_name === this.username
    //     );
    //     }

    //     const listOfPerson = filteredData.map((data) => ({
    //       label: data.u_name,
    //       value: data.u_id,
    //       title: data.title,
    //     }));

    //     this.personOptions = listOfPerson;
    //     this.person = this.personOptions[0];

    //     const person = this.personOptions.length > 0 ? this.personOptions[0] : null;
    //     console.log("Selected Person:", person);
    //     this.fetchData(person);
    //   } catch (error) {
    //     console.error("Error fetching users:", error);
    //   }
    // },

    async fetchData() {
      try {
        if (!this.person) {
          this.Avgrate = 0;
        } else {
          const id = this.person.value;
          // console.log("ini id " + id);

          const response = await this.$axios.get("/rating/get-by-id/" + id, {
            headers: {
              "Content-Type": "application/json",
            },
          });

          console.log("🚀 ~ fetchData ~ response:", response)

          if (!response.data.total_rating) {
            this.Avgrate = 0;
          } else {
            // console.log("hasil" + response.data.u_rate);
            const Avgrate = response.data.data.total_rating / response.data.data.total_task;
            console.log("🚀 ~ fetchData ~ Avgrate:", Avgrate)
            this.Avgrate = parseFloat(Avgrate.toFixed(2));
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
