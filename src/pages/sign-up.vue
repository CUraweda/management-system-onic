<template>
  <q-layout>
    <q-page-container>

      <q-page class="flex flex-center ">

        <q-card
          class="login"
          v-bind:style="
            $q.platform.is.mobile ? { width: '80%' } : { width: '30%' }
          "
        >

        <q-img src="/statics/logo.jpg" class="icon"></q-img>

          <q-card-section>
            <div class="row items-center" style="margin: 0px 30%; margin-bottom: -7%;">
              <div class="col text-h5" style="font-size: 25px;">
                Welcome!
                <p style="font-size: 13px; color:#565E6C; margin-right: -100%; margin-left: -50%;">Enter your credentials to access your account</p>
              </div>
            </div>
          </q-card-section>

          <q-card-section class="">
            <div class="row">
                <q-btn style="background-color: #FEF1F1;" class="ikon col"><q-img src="statics/google1.svg" class="ikon-app"></q-img></q-btn>
                <q-btn style="background-color: #F3F6FB;" class="ikon col"><q-img src="statics/facebook.svg" class="ikon-app"></q-img></q-btn>
                <q-btn style="background-color: #F3F4F6;" class="ikon col"><q-img src="statics/Apple.svg" class="ikon-app"></q-img></q-btn>
              </div>
          </q-card-section>

          <q-card-section>
            <q-form class="q-gutter-md" style="margin-bottom: 5px;">
              <div class="row">
              <q-input class="col " style="margin-right: 12px;" v-model="firstname" filled :type="isPwd ? 'firstname' : 'text'" label="First Name" placeholder="Name" :dense="dense"></q-input>
              <q-input class="col" v-model="lastname" filled :type="isPwd ? 'lastname' : 'text'" label="Last Name" placeholder="Name" :dense="dense"></q-input>
              </div>
              <q-input filled v-model="Email" label="Email" lazy-rules />
              <q-input v-model="password" filled :type="isPwd ? 'password' : 'text'" label="Password" placeholder="Enter at least 8+ characters" :dense="dense">
              <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>

              <div class="row items-baseline">
                <q-checkbox v-model="right" color="blue" label="Keep me logged in" class="col" style="margin-left: -3%;" />
                <p class="col" style="margin: auto; text-align: right;"> <a href="" style=" color:#00BDD6;"> forgot password?</a> </p>
              </div>

              <div>
                <q-btn
                  class="full-width"
                  label="Sign Up"
                  to="/sign-in"
                  type="button"
                  color="cyan"
                  @click="loginNotify"
                />
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
import { ref } from 'vue'

    export default {
        data() {
            return {
                Email: 'example.email@gmail.com',
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
           loginNotify(){
             this.$q.notify({
        message: 'Login Successful',
      })
           }
         },
    }
</script>

<style>

.makanan{
  border-radius: 45% 0% 0% 0%;
  width:50%;
  height: 100%;
  position: absolute;
  top:0px;
  right:0px;
}

.login{
  position: relative;
  height: auto;
  box-shadow: none;
  margin-right:50%;
}

.icon{
  width:30%;
  margin-top:5%;
  margin-left: 35%;
  margin-right: 40%;
  margin-bottom:5%;
}

.ikon{
  margin-right: 5%;
  border-radius: 18px;
  width: 3px;
}

.ikon-app{
  width:25%;
  margin: 7px;
}

</style>
