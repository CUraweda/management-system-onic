<template>
  <div class="q-pa-md">
    <div class="no-wrap">
      <div class="col-5">
        <div class="items-center text-center">
          <div class="text-bold items-center">{{ username }}</div>
          <div>{{ title }}</div>
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
import { defineComponent } from 'vue'
import axios from 'axios'
import { ref, onMounted } from 'vue';

export default {
  name: "profile",

  data() {
    return {
      left: false,
      username: '',
      title: '',
      rating: 1
      // userAccessToken: ''
    }
  },
  mounted() {
    this.username = localStorage.getItem('username') || '';
    this.title = localStorage.getItem('title') || '';
    // this.userAccessToken = localStorage.getItem('token') || '';
  },

  methods: {
    keluar() {
      localStorage.clear()
      this.$router.push('/')
    }
  }

}
</script>

<style scoped></style>
