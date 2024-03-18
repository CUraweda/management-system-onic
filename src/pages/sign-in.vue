<template>
  <q-layout view="hHh Lpr lFf">
    <q-page-container class="bg-grey-2">
      <q-page padding class="row items-center justify-center">
        <div class="row full-width">
          <div class="col-md-8 offset-md-2 col-xs-12 q-pl-md q-pr-md q-pt-sm">
            <q-card flat class="bg-white text-black fixed-full">
              <div class="row justify-end">
                <div class="col-md-4 col-xs-12">
                  <div class="q-pa-md text-center">
                    <!-- welcome section -->
                    <div class="col items-center q-mt-md">
                      <q-img
                        src="/statics/logo.jpg"
                        width="300px"
                        class="q-mx-md q-my-xl"
                      ></q-img>
                      <div class="text-h5">Welcome Back!</div>
                      <p class="">
                        Enter your credentials to access your account
                      </p>
                    </div>
                    <!-- welcome section -->

                    <!-- button section -->
                    <div class="row q-mb-xl">
                      <q-btn
                        unelevated
                        class="q-qy-md icon q-mr-md col bg-red-2"
                        ><q-img src="statics/Google1.svg" width="17px"></q-img
                      ></q-btn>
                      <q-btn
                        unelevated
                        class="q-qy-md icon q-mr-md col bg-blue-2"
                        ><q-img src="statics/facebook.svg" width="17px"></q-img
                      ></q-btn>
                      <q-btn unelevated class="q-qy-md icon col bg-grey-2"
                        ><q-img src="statics/Apple.svg" width="17px"></q-img
                      ></q-btn>
                    </div>
                    <!-- button section -->

                    <!-- form section -->
                    <q-form class="q-gutter-md" @submit="SignIn()">
                      <q-input
                        filled
                        v-model="email"
                        label="Email"
                        lazy-rules
                        :rules="[
                          (val) => (val !== null && val !== '') || 'Required',
                        ]"
                      />

                      <q-input
                        v-model="password"
                        filled
                        :type="isPwd ? 'password' : 'text'"
                        label="Password"
                        placeholder="Enter at least 8+ characters"
                        :dense="dense"
                        :rules="[
                          (val) => (val !== null && val !== '') || 'Required',
                        ]"
                      >
                        <template v-slot:append>
                          <q-icon
                            :name="isPwd ? 'visibility_off' : 'visibility'"
                            class="cursor-pointer"
                            @click="togglePwdVisibility"
                          />
                        </template>
                      </q-input>

                      <div class="items-center justify-center row">
                        <q-checkbox
                          v-model="right"
                          color="blue"
                          label="Keep me logged in"
                        />
                        <q-space></q-space>
                        <a href="" style="color: #00bdd6"> forgot password?</a>
                      </div>

                      <div>
                        <q-btn
                          class="full-width"
                          label="Sign In"
                          color="cyan"
                          type="submit"
                        />
                      </div>
                    </q-form>
                    <!-- form section -->
                  </div>
                </div>

                <q-section></q-section>

                <!-- gambar makanan -->
                <div class="col-md-6 col-xs-12 q-ml-xl desktop-only">
                  <q-img
                    src="statics/makanan.png"
                    class="makanan q-ml-xl"
                  ></q-img>
                </div>
                <!-- gambar makanan -->
              </div>
            </q-card>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import axios from "axios";

export default {
  name: "SignIn",

  data() {
    return {
      email: "",
      password: "",
    };
  },

  setup() {
    const right = ref(false);
    const isPwd = ref(true);
    const dense = ref(false);

    const togglePwdVisibility = function () {
      isPwd.value = !isPwd.value;
    };

    return {
      right,
      isPwd,
      dense,
      togglePwdVisibility,
    };
  },

  methods: {
    async SignIn() {
      const data = {
        email: this.email,
        password: this.password,
      };

      try {
        const response = await this.$axios.post("/user/login", data, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          const accessToken = response.data.data.accessToken;
          const email = response.data.data.email;
          const name = response.data.data.name;
          const title = response.data.data.title;
          const u_rate = response.data.data.u_rate;
          const total_task = response.data.data.total_task;

          const Avgrate = u_rate / total_task;

          // Simpan token di localStorage atau gunakan cara penyimpanan sesi yang sesuai
          localStorage.setItem("token", accessToken);
          localStorage.setItem("email", email);
          localStorage.setItem("username", name);
          localStorage.setItem("title", title);
          if (title === "director") {
            localStorage.setItem("rate", 5);
          } else {
            localStorage.setItem("rate", Avgrate);
          }

          this.redirectUser(title);

          this.$q.notify({
            color: "positive",
            message: "Login Successful.",
          });
        } else {
          throw new Error("Invalid email or password");
        }
      } catch (error) {
        console.error("Error signing in:", error);

        this.$q.notify({
          color: "negative",
          position: "top",
          message: "Invalid email or password",
        });
      }
    },

    redirectUser: function (title) {
      switch (title) {
        case "manager":
          this.$router.push("manager/dashboard");
          break;
        case "admin":
          this.$router.push("admin/dashboard");
          break;
        case "operator":
          this.$router.push("operator/dashboard");
          break;
        case "supervisor":
          this.$router.push("supervisor/dashboard");
          break;
        case "director":
          this.$router.push("director/dashboard");
          break;
        default:
          this.$q.notify({
            message: "Wrong Email or Password",
          });
      }
    },
  },
};
</script>

<style>
* {
  margin: 0px;
  padding: 0px;
}

.makanan {
  justify-items: end;
  border-radius: 45% 0% 0% 0%;
  height: 100%;
  left: 0;
  bottom: 0;
}

.icon {
  border-radius: 18px;
}
</style>
