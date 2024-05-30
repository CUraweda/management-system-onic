<template>
  <div class="q-pa-md">
    <div class="no-wrap">
      <div class="col-5">
        <div class="items-center text-center">
          <div class="text-bold items-center">{{ branch }}</div>
          <div>{{ division }}</div>
          <div>{{ position }}</div>
        </div>
      </div>

      <div class="col-5 items-center text-center q-mt-sm">
        <q-btn color="cyan" label="Log Out" unelevated @click="keluar()" size="sm" v-close-popup>
          <q-tooltip>Logging out</q-tooltip>
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie';
import { defineComponent } from 'vue'
import axios from 'axios'
import { ref, onMounted } from 'vue';

export default {
  name: "profile",

  data() {
    return {
    divisionId: sessionStorage.getItem("division_id")? sessionStorage.getItem("division_id") : Cookies.get("division_id"),
      branchId: sessionStorage.getItem("branch_id")? sessionStorage.getItem("branch_id") : Cookies.get("branch_id"),
      left: false,
      rating: 1,
      branch : sessionStorage.getItem("branch")? sessionStorage.getItem('branch') : Cookies.get("branch"),
      position : sessionStorage.getItem("position")? sessionStorage.getItem('position') : Cookies.get("position"),
      division : sessionStorage.getItem("division")? sessionStorage.getItem('division') : Cookies.get("division"),
      // userAccessToken: ''
    }
  },
  mounted() {
    // console.log("HUHUHU" + sessionStorage.getItem(""))

    // this.userAccessToken = sessionStorage.getItem('token') || '';
  },

    methods: {
    updateStartDate (val) {
      if (val) {
        const [year, month, day] = val.split('-')
        this.formattedStartDate = `${day}/${month}/${year}`
      }
      this.$refs.popupProxy.hide()
    },

    updateDueDate (val) {
      if (val) {
        const [year, month, day] = val.split('-')
        this.formattedDueDate = `${day}/${month}/${year}`
      }
      this.$refs.popupProxy.hide()
    },
    keluar() {
      sessionStorage.clear()
      const cookies = Cookies.get();

      for (const cookie in cookies) {
        Cookies.remove(cookie);
      }
      this.$router.push('/')
    }
  }

}
</script>

<style scoped></style>
