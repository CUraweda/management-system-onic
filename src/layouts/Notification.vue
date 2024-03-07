<template>
  <div>
    <q-btn
      round
      dense
      flat
      color="black"
      icon="notifications"
      @click="readNotif"
    >
      <q-badge color="red" text-color="white" v-if="notifNumber > 0" floating>
        {{ notifNumber }}
      </q-badge>
      <q-menu>
        <q-item style="max-width: 490px" clickable v-ripple>
          <!-- <q-item-section avatar>
            <q-avatar>
              <img :src="msg.avatar" />
            </q-avatar>
          </q-item-section> -->

          <q-item-section v-for="msg in messages" :key="msg">
            <q-item-label>{{ msg.taskTitle }}</q-item-label>
            <q-item-label caption>{{ msg.pic }}</q-item-label>
            <q-item-label caption lines="1">{{ msg.message }}</q-item-label>
          </q-item-section>

          <q-item-section side v-for="msg in messages" :key="msg">
            {{ msg.timeStamp }}
          </q-item-section>
        </q-item>
      </q-menu>
    </q-btn>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";

export default {
  name: "Notification",
  setup() {
    return {
      messages: ref(),
      notifNumber: ref(),
      token: ref(localStorage.getItem("token")),
    };
  },
  mounted() {
    this.fetchData();
    this.countNotif();
  },
  methods: {
    async fetchData() {
      try {
        console.log(this.token);
        const response = await this.$axios.get(`/notif/1`);

        if (response.status == 200) {
          this.messages = response.data.data;
          console.log(this.messages);
          console.log("hallo");
        }
      } catch (err) {
        console.error(err);
        throw err;
      }
    },
    async readNotif() {
      try {
        this.notifNumber > 0 ? (this.notifNumber = 0) : "";
        const response = await this.$axios.post(`/notif/read/1`, {}, () => {});

        if (response.status == 200) {
          console.log("success read notif");
        }
      } catch (err) {
        console.error(err);
        throw err;
      }
    },
    async countNotif() {
      try {
        const response = await this.$axios.get(`/notif/unread/1`);

        if (response.status == 200) {
          this.notifNumber = response.data.data;
        }
      } catch (err) {
        console.error(err);
        throw err;
      }
    },
  },
};
</script>

<style scoped></style>
