<template>
  <q-layout view="lHh Lpr lff">
    <q-header bordered class="bg-white">
      <div class="">
        <q-toolbar>
          <q-toolbar-title class="row">
            <div
              class="text-h5 text-cyan q-my-sm text-weight-bold cursor-pointer"
            >
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
            <notification />

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
  </q-layout>
</template>

<script>
import Cookies from "js-cookie";
import { defineComponent, ref } from "vue";
import { date } from "quasar";
import profile from "./Profile.vue";
import notification from "./Notification.vue";

export default defineComponent({
  components: {
    notification,
    profile,
  },
  setup() {
    const timeStamp = Date.now();
    const formattedString = date.formatDate(
      timeStamp,
      "dddd, D MMM YYYY h:m A"
    );
    return {
      formattedString,
    };
  },
});
</script>

<style></style>
