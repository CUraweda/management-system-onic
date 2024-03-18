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
      <q-menu v-if="showBar">
        <q-item
          clickable
          v-ripple
          v-for="(item, index) in messages"
          :key="index"
          style="max-width: 490px"
        >
          <!-- <q-item-section avatar>
            <q-avatar>
              <img :src="msg.avatar" />
            </q-avatar>
          </q-item-section> -->

          <q-item-section>
            <q-item-label>{{ item.taskTitle }}</q-item-label>
            <q-item-label caption>{{ item.pic }}</q-item-label>
            <q-item-label caption lines="1">{{ item.message }}</q-item-label>
          </q-item-section>

          <q-item-section side>
            {{ item.time }}
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
      showBar: ref(false),
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await this.$axios.get(`/notif`, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });

        if (response.status != 200)
          throw Error("Error while Requesting Notification");
        const { notifs, unread } = response.data.data;
        if (notifs.length < 1) {
          this.showBar = false;
        } else this.showBar = true;
        this.messages = notifs;
        this.notifNumber = unread;
      } catch (err) {
        console.error(err);
        throw err;
      }
    },
    async readNotif() {
      try {
        this.notifNumber > 0 ? (this.notifNumber = 0) : "";
        const response = await this.$axios.post(`/notif/read`, null, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });
        if (response.status != 200)
          throw Error("Error while Reading Notification");
      } catch (err) {
        console.error(err);
        throw err;
      }
    },
  },
};
</script>

<style scoped></style>
