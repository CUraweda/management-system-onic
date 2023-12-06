<template>
  <q-layout view="lHh lpR fFf">
    <q-header bordered>
      <q-toolbar>
        <q-toolbar-title class="text">
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
          BUBUR ONIC
          <q-btn flat round dense icon="search" class="q-mr-xs" />
        </q-toolbar-title>

        <div class="text">Quasar v{{ $q.version }}</div>
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

          <q-item clickable v-ripple class="menu-kiri">
            <img src="statics/dashboard.svg" class="icon">
            <q-item-section class="text">
              Dashboard
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple class="menu-kiri">
            <img src="statics/create-task.svg" class="icon">
            <q-item-section class="text">
              Create Task
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple class="menu-kiri">
            <img src="statics/task-monitoring.svg" class="icon">
            <q-item-section class="text">
              Task Monitoring
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple class="menu-kiri">
            <img src="statics/task-list.svg" class="icon">
            <q-item-section class="text">
              Task List
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple class="menu-kiri">
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
import { ref } from 'vue'

export default {
setup () {
  const miniState = ref(true)

  return {
    drawer: ref(false),
    miniState,

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
  font-weight: 400;
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
