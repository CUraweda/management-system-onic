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
                </q-list>
              </q-menu>
            </q-btn> -->

            <q-btn flat round dense icon="question_mark" color="black" size="15px" />

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
            <q-img clickable @click="miniState = true" class="q-mx-md q-mt-none" src="statics/logo.jpg"></q-img>
          </q-item>

          <q-item clickable v-ripple to="/director/dashboard">
            <q-item-section avatar>
              <q-icon name="dashboard" color="grey-7" size="30px" />
            </q-item-section>

            <q-item-section> Dashboard </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/director/create">
            <q-item-section avatar>
              <q-icon name="post_add" color="grey-7" class="flip-vertical" size="30px" />
            </q-item-section>

            <q-item-section> Create Task </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/director/task_monitoring">
            <q-item-section avatar>
              <q-icon name="view_list" color="grey-7" size="30px" />
            </q-item-section>

            <q-item-section> Task Monitoring </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/director/task_monitoring_2">
            <q-item-section avatar>
              <q-icon name="task" color="grey-7" size="30px" />
            </q-item-section>

            <q-item-section> Task Approval</q-item-section>
          </q-item>


          <q-item clickable v-ripple to="/director/task_monitoring_3">
            <q-item-section avatar>
              <q-icon name="recycling" color="grey-7" size="30px" />
            </q-item-section>

            <q-item-section> Deleted Task</q-item-section>
          </q-item>

          <q-item disable>
            <q-item-section avatar>
              <q-icon name="assignment" color="grey-7" size="30px" />
            </q-item-section>

            <q-item-section> Reports </q-item-section>

            <q-item-section>
              <q-avatar class="q-ml-md" color="red" text-color="white" size="22px">N</q-avatar>
            </q-item-section>
          </q-item>
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
import { ref } from "vue";
import notification from "./Notification.vue";
import profile from "./Profile.vue";
import { date } from "quasar";

export default {
  name: 'ManagerLayout',

  components: {
    // notification,
    profile,
  },

  data() {
    return {
      search: "",
    };
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

<style scoped>
.mini-slot {
  transition: background-color 0.28s;
}

.mini-slot:hover {
  background-color: rgba(0, 0, 0, 0.04);
}
</style>
