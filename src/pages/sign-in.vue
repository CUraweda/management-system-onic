<template>
  <q-layout>
    <q-page-container>

      <q-page class="flex flex-center ">

        <q-card class="login" v-bind:style="$q.platform.is.mobile ? { width: '80%' } : { width: '30%' }
          ">

          <q-img src="/statics/logo.jpg" class="icon"></q-img>

          <q-card-section>
            <div class="row items-center" style="margin: 0px 22%; margin-bottom: -5%;">
              <div class="col text-h5" style="font-size: 25px;">
                Welcome Back!
                <p style="font-size: 13px; color:#565E6C; margin-right: -20%; margin-left: -20%;">Enter your credentials
                  to access your account</p>
              </div>
            </div>
          </q-card-section>

                    <!-- button section -->
                    <div class="row q-mb-xl">
                      <q-btn unelevated class="q-qy-md icon q-mr-md col bg-red-2"><q-img src="statics/Google1.svg"
                          width="17px"></q-img></q-btn>
                      <q-btn unelevated class="q-qy-md icon q-mr-md col bg-blue-2"><q-img src="statics/facebook.svg"
                          width="17px"></q-img></q-btn>
                      <q-btn unelevated class="q-qy-md icon col bg-grey-2"><q-img src="statics/Apple.svg"
                          width="17px"></q-img></q-btn>
                    </div>
                    <!-- button section -->

                    <!-- form section -->
                    <q-form class="q-gutter-md">

                      <q-input filled v-model="Email" label="Email" lazy-rules />

                      <q-input v-model="password" filled :type="isPwd ? 'password' : 'text'" label="Password"
                        placeholder="Enter at least 8+ characters" :dense="dense">
                        <template v-slot:append>
                          <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
                        </template>
                      </q-input>

                      <div class="items-center justify-center row">
                        <q-checkbox v-model="right" color="blue" label="Keep me logged in" />
                        <q-space></q-space>
                        <a href="" style=" color:#00BDD6;"> forgot password?</a>
                      </div>

                      <div>
                        <q-btn class="full-width" label="Sign In" to="/manager/Dashboard" type="button" color="cyan"
                          @click="loginNotify" />
                      </div>
                    </q-form>
                    <!-- form section -->
                  </div>
                </div>

                <q-section></q-section>

                <!-- gambar makanan -->
                <div class="col-md-6 col-xs-12 q-ml-xl desktop-only">
                  <q-img src="statics/makanan.png" class="makanan q-ml-xl"></q-img>
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
import { ref } from 'vue'

export default {
  data() {
    return {
      Email: '',
      password: '',
      firstname: '',
      lastname: '',
    }
  },

  setup() {
    return {
      right: ref(false),
      isPwd: ref(false),
      dense: ref(false),
    }
  },

  methods: {
    loginNotify() {
      this.$q.notify({
        message: 'Login Successful',
      })
    }
  },
}
</script>

<style >

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
