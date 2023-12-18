<template>
  <q-layout view="lHh Lpr lff">

    <!-- header -->
    <q-header bordered class="bg-white">
      <div class="q-gutter-y-md q-py-xs">
        <q-toolbar>
          <q-toolbar-title class="row">
            <div class="text-h5 text-cyan q-ma-sm text-weight-bold" @click="drawer = !drawer">
              DASHBOARD
            </div>
            <div class="col text-black q-ml-xl q-my-xs">
              <div class="text-weight-bold text-subtitle2">
                TASK MANAGEMENT SYSTEM
              </div>
              <div class="text-caption">{{ formattedString }}</div>
            </div>
          </q-toolbar-title>

          <q-input class="toolbar-input bg-grey-2" dense standout="bg-grey-2 no-shadow" v-model="search"
            placeholder="Search...">
            <template v-slot:prepend>
              <q-icon v-if="search === ''" name="search" />
              <q-icon v-else name="clear" class="cursor-pointer" @click="search = ''" />
            </template>
          </q-input>
          <q-btn flat round dense icon="notifications" class="q-ml-xl" color="black" size="15px" />
          <q-btn flat round dense icon="question_mark" class="q-mx-xs" color="black" size="15px" />
          <q-avatar color="cyan-3" size="30px" class="q-mx-xs">
            <img src="statics/propil.png" />
          </q-avatar>
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
            <q-img clickable @click="miniState = true" class="q-mx-md q-mt-none" src="statics/logo.jpg" ></q-img>
          </q-item>

          <q-item clickable v-ripple to="/index">
            <q-item-section avatar>
              <q-icon name="dashboard" color="grey-7" size="30px" />
            </q-item-section>

            <q-item-section> Dashboard </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/create">
            <q-item-section avatar>
              <q-icon name="post_add" color="grey-7" class="flip-vertical" size="30px" />
            </q-item-section>

            <q-item-section> Create Task </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/Task">
            <q-item-section avatar>
              <q-icon name="view_list" color="grey-7" size="30px" />
            </q-item-section>

            <q-item-section> Task Monitoring </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/Task_list">
            <q-item-section avatar>
              <q-icon name="list_alt" color="grey-7" size="30px" />
            </q-item-section>

            <q-item-section> Task List </q-item-section>
          </q-item>

          <q-item clickable v-ripple to="/Report">
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
      <router-view />
    </q-page-container>
    <!-- content -->

  </q-layout>
</template>

<script>
import { ref } from "vue";
import { date } from "quasar";

export default {
  data() {
    return {
      search: "",
    };
  },

  setup() {
    const miniState = ref(false);
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

<style>
.mini-slot {
  transition: background-color 0.28s;
}

.mini-slot:hover {
  background-color: rgba(0, 0, 0, 0.04);
}

</style>
