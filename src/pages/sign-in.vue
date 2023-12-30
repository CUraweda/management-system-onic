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

          <q-card-section class="">
            <div class="row">
              <q-btn style="background-color: #FEF1F1;" class="ikon col"><q-img src="statics/google1.svg"
                  class="ikon-app"></q-img></q-btn>
              <q-btn style="background-color: #F3F6FB;" class="ikon col"><q-img src="statics/facebook.svg"
                  class="ikon-app"></q-img></q-btn>
              <q-btn style="background-color: #F3F4F6;" class="ikon col"><q-img src="statics/Apple.svg"
                  class="ikon-app"></q-img></q-btn>
            </div>
          </q-card-section>

          <q-card-section>
            <q-form class="q-gutter-md ">
              <q-input filled v-model="Email" label="Email" lazy-rules class="" />

              <q-input v-model="password" filled :type="isPwd ? 'password' : 'text'" label="Password"
                placeholder="Enter at least 8+ characters" :dense="dense">
                <template v-slot:append>
                  <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                    @click="isPwd = !isPwd" />
                </template>
              </q-input>

              <div class="row items-baseline">
                <q-checkbox v-model="right" color="blue" label="Keep me logged in" class="col"
                  style="margin-left: -3%;" />
                <p class="col" style="margin: auto; text-align: right;"> <a style=" color:#00BDD6;"> forgot password?</a>
                </p>
              </div>

              <div>
                <q-btn class="full-width" label="Sign In" type="button" color="cyan" @click="loginNotify" />
              </div>

              <!-- <div class="column flex flex-center">
                <p style="background-color: #F3F4F6; color: #323842; border-radius: 4px;">powered by</p>
                <img src="statics/IPS.png">
              </div> -->

            </q-form>
          </q-card-section>
        </q-card>

      </q-page>
      <q-img src="statics/makanan.png" class="makanan mobile-hide"></q-img>
    </q-page-container>
  </q-layout>
</template>

<script type="text/javascript"></script>
<script>
import { ref } from 'vue';
import { Notify } from 'quasar'

    export default {
        data() {
            return {
                Email: '',
                password: '',
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
    // Memeriksa jika email kosong
    if (!this.Email.trim() && !this.password.trim()) {
      this.$q.notify({
        message: "Both fields are required",
        color: 'negative',
      })
      return; // Menghentikan proses login jika email kosong
    } else if (!this.password.trim()){
        this.$q.notify({
          message: 'please enter your password',
          color: 'negative',
        })
        return;
    }

    // Memeriksa jenis pengguna berdasarkan alamat email
    if (this.Email.includes('@manager.com')) {
      // Jika alamat email adalah manager atau spv, redirect ke halaman manager
      this.$router.push('/manager/dashboard')
      this.$q.notify({
        message: 'Login Successful as Manager',
      })
    } else if (this.Email.includes('@spv.com')) {
      // Jika alamat email adalah pekerja, redirect ke halaman worker
      this.$router.push('/manager/dashboard')
      this.$q.notify({
        message: 'Login Successful as Supervisor',
      })
    } else if (this.Email.includes('@worker.com')) {
      // Jika alamat email adalah pekerja, redirect ke halaman worker
      this.$router.push('/worker/dashboard')
      this.$q.notify({
        message: 'Login Successful as Worker',
      })
    }else if(!this.Email.trim()) {
      this.$q.notify({
        message: "Please enter your Email",
        color: 'negative'
      })
    } else {
      // Jika alamat email tidak dikenali, tampilkan pesan kesalahan
      this.$q.notify({
        message: 'Invalid Email Address',
        color: 'negative',
      })
    }
  }
}
   }
</script>

<style>
.makanan {
  border-radius: 45% 0% 0% 0%;
  width: 50%;
  height: 100%;
  position: absolute;
  top: 0px;
  right: 0px;
}

.login {
  position: relative;
  height: auto;
  box-shadow: none;
  margin-right: 50%;
}

.icon {
  width: 30%;
  margin-top: 5%;
  margin-left: 35%;
  margin-right: 40%;
  margin-bottom: 5%;
}

.ikon {
  margin-right: 5%;
  border-radius: 18px;
  width: 3px;
}

.ikon-app {
  width: 25%;
  margin: 7px;
}
</style>
