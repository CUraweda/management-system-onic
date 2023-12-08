<template>
  <q-layout view="lHh lpR fFf">
    <q-header bordered>
      <q-toolbar>
        <q-toolbar-title class="text">
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
          DASHBOARD
          <!-- <q-btn flat round dense icon="search" class="q-mr-xs" /> -->
        </q-toolbar-title>

        <div class="jam">
          <div class="text">TASK MANAGEMENT SYSTEM </div>
           <p style="color: black;"> {{ formattedString }} </p>
        </div>
        <input type="text" class="cari" placeholder="Search" flat round dense icon="search"/>
        <img src="statics/Bell.svg" style=" margin-right: 16px;">
        <img src="statics/Question.svg" style=" margin-right: 16px;">
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawer"
      show-if-above
      bordered
      :mini="!drawer || miniState"
      @click.capture="drawerClick"
      :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
    >
      <template v-slot:mini>
        <q-scroll-area class="fit mini-slot cursor-point">
          <div class="q-py-l">
            <div class="column items-start">
              <img src="statics/logo.jpg" class="mini-img" >
              <img src="statics/dashboard.svg" class="mini-icon" >
              <img src="statics/create-task.svg" class="mini-icon" >
              <img src="statics/task-monitoring.svg" class="mini-icon" >
              <img src="statics/task-list.svg" class="mini-icon" >
              <img src="statics/report.svg" class="mini-icon" >

            </div>
          </div>
        </q-scroll-area>
      </template>

      <q-scroll-area class="fit">
        <q-list padding>

          <img src="statics/logo.jpg" class="img" @click="miniState = true">

          <q-item clickable v-ripple class="menu-kiri" to="/Index">
            <img src="statics/dashboard.svg" class="icon">
            <q-item-section class="text">
              Dashboard
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple class="menu-kiri" to="/Create">
            <img src="statics/create-task.svg" class="icon">
            <q-item-section class="text">
              Create Task
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple class="menu-kiri" to="/Task">
            <img src="statics/task-monitoring.svg" class="icon">
            <q-item-section class="text">
              Task Monitoring
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple class="menu-kiri" to="/Task_list">
            <img src="statics/task-list.svg" class="icon">
            <q-item-section class="text">
              Task List
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple class="menu-kiri" to="/Report">
            <img src="statics/report.svg" class="icon">
            <q-item-section class="text">
              Reports
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
    <router-view />
  </q-page-container>
  </q-layout>
</template>

<script>
import { date } from "quasar";
import { defineComponent, ref } from "vue";

export default {
setup () {
  const miniState = ref(true);
  const timeStamp = Date.now();
    const formattedString = date.formatDate(
      timeStamp,
      "dddd, D MMM YYYY h:m A"
    );

  return {
    drawer: ref(false),
    miniState,
    formattedString,

    drawerClick (e) {
      // if in "mini" state and user
      // click on drawer, we switch it to "normal" mode
      if (miniState.value) {
        miniState.value = false

        // notice we have registered an event with capture flag;
        // we need to stop further propagation as this click is
        // intended for switching drawer to "normal" mode only
        e.stopPropagation()
      }
    }
  }
}
}
</script>

<style>

.sidebar{
  width: 270px;
  height: 910px;
  flex-shrink: 0;
  background: #FAFAFB;
}

.cari {
  margin-bottom: 0px;
  margin-left: 100px;
  margin-right: 17px;
  background: black url("../../public/statics/Search.svg") no-repeat 15px;
  display: flex;
  width: auto;
  padding: 7px 229px 6px 12px;
  align-items: center;
  gap: 6px;
  border-radius: 0px;
  background: #F3F4F6;
}

.jam{
  margin-top: 15px;
  margin-bottom: 0px;
}

.menu-kiri{
  display: flex;
  height: 40px;
  padding: 8px 115px 8px 16px;
  align-items: flex-start;
  gap: 8px;
  flex-shrink: 0;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.00);
}

.text{
  color: #565E6C;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 22px;
}

.mini-slot{
  transition: background-color .28s;
}
.mini-slot:hover{
  background-color: rgba(0, 0, 0, .04);
}

.icon{
  width: 24px;
  height: 24px;
  flex-shrink: 0;
}

.mini-icon{
  text-align:center;
  margin-top: 12px;
  font-size: 2em;
  padding: 5px 15px;
}

.img{
  height: 72px;
  margin-left:80px;
  border-radius: 4px;
}

.mini-img{
  height:37px;
  margin-top: 15px;
  margin-left: 5px;
}
</style>
