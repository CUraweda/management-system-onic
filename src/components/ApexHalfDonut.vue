<template>
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
</template>

<script>
export default {
  name: "ApexHalfDonut",
  data() {
    return {
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

          console.log(response.data.u_rate);
          const Avgrate = response.data.u_rate / response.data.total_task;
          this.Avgrate = Avgrate;
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        return 0;
      }
    },
  },
};
</script>
