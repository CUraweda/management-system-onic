<template>
  <q-layout view="hHh Lpr lFf">
    <q-page-container class="bg-grey-2">
      <q-page padding class="row items-center justify-center">
        <div class="row full-width">
          <div class="col-md-8 offset-md-2 col-xs-12 q-pl-md q-pr-md q-pt-sm">
            <q-card flat class="bg-white text-black fixed-full">
              <div class="row justify-end">

                <div class="col-md-4 col-xs-12 q-my-xl">
                  <div class="q-pa-md text-center">
                    <!-- welcome section -->
                    <div class="col items-center q-mt-md">
                      <q-img src="/statics/logo.jpg" width="300px" class="q-mx-md q-my-xl"></q-img>
                      <div class=" text-h5">
                        Welcome!
                      </div>
                      <p class="">Enter your credentials to access your account</p>
                    </div>
                    <!-- welcome section -->

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
                      <div class="row q-mb-md">
                        <q-input class="col q-mr-md" v-model="firstname" filled :type="isPwd ? 'firstname' : 'text'"
                          label="First Name" placeholder="Name" :dense="dense" :rules="[ val => val !== null && val !== '' || 'Required']"></q-input>

                        <q-input class="col" v-model="lastname" filled :type="isPwd ? 'lastname' : 'text'"
                          label="Last Name" placeholder="Name" :dense="dense" :rules="[ val => val !== null && val !== '' || 'Required']"></q-input>
                      </div>

                      <q-input filled v-model="Email" label="Email" lazy-rules  :rules="[ val => val !== null && val !== '' || 'Required']"/>

                      <q-input v-model="password" filled :type="isPwd ? 'password' : 'text'" label="Password"
                        placeholder="Enter at least 8+ characters" :dense="dense" :rules="[ val => val !== null && val !== '' || 'Required']">
                        <template v-slot:append>
                          <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                            @click="togglePwdVisibility" />
                        </template>
                      </q-input>

                      <div class="items-center justify-center row">
                        <q-checkbox v-model="right" color="blue" label="Keep me logged in" />
                        <q-space></q-space>
                        <a href="" style=" color:#00BDD6;"> forgot password?</a>
                      </div>

                      <div>
                        <q-btn class="full-width" label="Sign Up" type="button" color="cyan" @click="signUp" />
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
import { ref } from 'vue';
import axios from 'axios';

export default {
  name: 'SignUp',
  data() {
    return {
      Email: '',
      password: '',
      firstname: '',
      lastname: '',
    };
  },

  setup() {
    return {
      right: ref(false),
      isPwd: ref(false),
      dense: ref(false),
    };
  },

  methods: {
    togglePwdVisibility() {
      this.isPwd = !this.isPwd;
    },
    async signUp() {
      try {
        const response = await axios.post('http://localhost:3000/api/signup', {
          firstname: this.firstname,
          lastname: this.lastname,
          u_email: this.Email,
          u_password: this.password,
          // Tambahkan properti lain sesuai kebutuhan
        });

        // Dapatkan token dari respons
        const token = response.data.token;

        // Simpan token di localStorage atau gunakan cara penyimpanan sesi yang sesuai
        localStorage.setItem('token', token);

        // Redirect ke halaman lain jika sign-up berhasil
        this.$router.push('/');

        this.$q.notify({
          message: 'Sign Up Successful',
        });
      } catch (error) {
        console.error('Error signing up:', error);

        this.$q.notify({
          color: 'negative',
          position: 'top',
          message: 'Error signing up',
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
