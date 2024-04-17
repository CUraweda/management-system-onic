<template>
  <q-layout view="lHh Lpr lff">

    <!-- header -->
    <q-header bordered class="bg-white">
      <div class="">
        <q-toolbar>
          <q-toolbar-title class="row">
            <div class="text-h5 text-cyan q-my-sm text-weight-bold cursor-pointer" @click="drawer = !drawer">
              {{ $route.meta.title }}
            </div>

            <div class="text-black mobile-hide q-ml-lg">
              <div class="text-weight-bold text-subtitle2">
                TASK MANAGEMENT SYSTEM
              </div>
              <div class="text-caption">{{ formattedString }}</div>
            </div>
          </q-toolbar-title>
          <div class="row wrap items-center justify-end q-gutter-sm">
            <!-- <q-input class="bg-grey-3 col-lg-5 col-md-5 col-sm-4 col-xs-4 under-title" dense text-color="black"
              standout="bg-grey-3 no-shadow under-title" v-model="search" placeholder="Search...">
              <template v-slot:prepend>
                <q-icon v-if="search === ''" name="search" text-color="black" />
                <q-icon v-else name="clear" class="cursor-pointer col" @click="search = ''" />
              </template>
</q-input> -->
            <!-- <q-btn round dense flat color="black" icon="notifications">
              <q-badge color="red" text-color="white" floating>
                5
              </q-badge>
              <q-menu>
                <q-list style="min-width: 100px">
                  <notification></notification>
                  <q-card class="text-center no-shadow no-border">
                    <q-btn label="View All" style="max-width: 120px !important;" flat dense class="text-indigo-8"></q-btn>
                  </q-card>
                </q-list>
              </q-menu>
            </q-btn> -->
            <notification />

            <!-- <q-btn flat round dense icon="question_mark" color="black" size="15px" /> -->

            <q-btn round dense flat>
              <q-avatar color="cyan-3" size="30px">
                <img src="statics/propil.png" />
              </q-avatar>
              <q-menu>
                <q-list style="min-width: 100px">
                  <profile></profile>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
        </q-toolbar>
      </div>
    </q-header>
    <!-- header -->

    <!-- sidebar -->
    <q-drawer v-model="drawer" show-if-above :mini="!drawer || miniState" @click.capture="drawerClick" :width="200"
      :breakpoint="500" :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-1'">
      <q-scroll-area class="fit bg-grey-1" :horizontal-thumb-style="{ opacity: 0 }">
        <q-list padding>

          <q-item>
            <q-img class="q-mx-md q-mt-none" src="statics/logo.jpg"></q-img>
          </q-item>

          <q-item class="text-center items-center">
            <q-item-section avatar class="" clickable @click="miniState = true">
              <q-avatar color="white" size="50px">
                <img src="statics/Untitled.png" />
              </q-avatar>
            </q-item-section>
            <q-item-section class="text-center items-center">
              <div class="text-bold items-center">{{ username }}</div>
              <div>{{ title }}</div>
              <!-- <div class="">
                <q-rating v-model="rating" max="5" size="1.8em" color="yellow" icon="star_border" icon-selected="star"
                  icon-half="star_half" no-dimming hint="readonly" :dense="dense" readonly />
                {{ rating }}
              </div> -->
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/operator/dashboard">
            <q-item-section avatar>
              <q-icon name="dashboard" color="grey-7" size="30px" />
            </q-item-section>

            <q-item-section> Dashboard </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/operator/create">
            <q-item-section avatar>
              <q-icon name="post_add" color="grey-7" class="flip-vertical" size="30px" />
            </q-item-section>

            <q-item-section> Create Task </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/operator/task_list">
            <q-item-section avatar>
              <q-icon name="description" color="grey-7" size="30px" />
            </q-item-section>

            <q-item-section> Task List </q-item-section>
          </q-item>

          <!-- <q-item v-ripple to="/operator/task_detail" disable>
            <q-item-section avatar>
              <q-icon name="list_alt" color="grey-7" size="30px" />
            </q-item-section>

            <q-item-section> Task Detail </q-item-section>
          </q-item> -->

        </q-list>
      </q-scroll-area>
    </q-drawer>
    <!-- sidebar -->

    <!-- content -->
    <q-page-container>
      <q-card class="text-center mobile-only no-shadow">
        <div class="text-black self-end q-py-md">
          <div class="text-weight-bold text-subtitle2">
            TASK MANAGEMENT SYSTEM
          </div>
          <div class="text-caption">{{ formattedString }}</div>
        </div>
      </q-card>
      <router-view />
    </q-page-container>
    <!-- content -->

  </q-layout>
</template>

<script>
import Cookies from 'js-cookie';
import { ref } from "vue";
import { date } from "quasar";
import notification from "./Notification.vue";
import profile from "./Profile.vue";

export default {
  name: 'WorkerLayout',

  components: {
    notification,
    profile,
  },

  data() {
    return {
    divisionId: sessionStorage.getItem("division_id")? sessionStorage.getItem("division_id") : Cookies.get("division_id"),
      branchId: sessionStorage.getItem("branch_id")? sessionStorage.getItem("branch_id") : Cookies.get("branch_id"),
      search: "",
      left: false,
      username: '',
      title: '',
      rating: 0
    };
  },

  mounted() {
    const storedRating = parseFloat(sessionStorage.getItem('rate'));
    this.rating = !isNaN(storedRating) ? storedRating : 0;
    console.log(this.rating);
    this.username = sessionStorage.getItem('username')? sessionStorage.getItem('username') : Cookies.get("username");
    this.title = sessionStorage.getItem('title')? sessionStorage.getItem('title') : Cookies.get("title");
  },


  methods: {
    RatingAve() {

    },

    keluar() {
      sessionStorage.clear()
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

<style scooped>
.mini-slot {
  transition: background-color 0.28s;
}

.mini-slot:hover {
  background-color: rgba(0, 0, 0, 0.04);
}
</style>
