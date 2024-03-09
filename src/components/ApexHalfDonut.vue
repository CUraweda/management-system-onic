<template>
  <div style="margin: 85px;" class="q-ml-md q-mt-sm text-center">
    <q-rating v-model="rating" class="q-ml-md" max="5" size="5em" color="yellow" icon="star_border" icon-selected="star"
      icon-half="star_half" no-dimming hint="readonly" :dense="dense" readonly />
    <div class="text-h5">
      SKOR ANDA {{ rating }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'ApexHalfDonut',
  data() {
    return {
      search: "",
      left: false,
      username: '',
      title: '',
      rating: 0
    };
  },

  mounted() {
    const storedRating = parseFloat(localStorage.getItem('rate'));
    this.rating = !isNaN(storedRating) ? storedRating : 0;
    this.username = localStorage.getItem('username') || '';
    this.title = localStorage.getItem('title') || '';
  },


  methods: {
    RatingAve() {

    },

    keluar() {
      localStorage.clear()
      this.$router.push('/')
    }
  },

  setup() {
    const miniState = ref(true);
    const timeStamp = Date.now();
    const formattedString = date.formatDate(
      timeStamp,
      "dddd, D MMM YYYY h:m A"
    );

    return {
      // search: ref(""),
      filter: "",
      drawer: ref(false),
      miniState,
      formattedString,

      drawerClick(e) {
        // if in "mini" state and user
        // click on drawer, we switch it to "normal" mode
        if (miniState.value) {
          miniState.value = false;

          // notice we have registered an event with capture flag;
          // we need to stop further propagation as this click is
          // intended for switching drawer to "normal" mode only
          e.stopPropagation();
        }
      },
    };
  },
};
</script>
