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
                    <div class="col items-center q-mt-md q-mb-xl">
                      <q-img src="/statics/logo.jpg" width="300px" class="q-mx-md q-my-xl"></q-img>
                      <div class="text-h5">Welcome!</div>
                      <p class="">
                        Create your account to access your credentials
                      </p>
                    </div>
                    <!-- welcome section -->

                    <!-- button section -->
                    <!-- <div class="row q-mb-xl">
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
                    </div> -->
                    <!-- button section -->

                    <!-- form section -->
                    <q-select filled label="Cabang" v-model="branch" name="Cabang" use-input input-debounce="0"
                      :options="branchDataList" behavior="menu" class="col-5" :rules="[
                      (val) => (val !== null && val !== '') || 'Required',
                    ]">
                      <template v-slot:no-option>
                        <q-item>
                          <q-item-section class="text-grey">
                            No results
                          </q-item-section>
                        </q-item>
                      </template>
                    </q-select>

                    <q-select filled label="Divisi" v-model="divisi" name="Divisi" use-input input-debounce="0"
                      :options="divisionDataList" behavior="menu" class="col-5" :rules="[
                      (val) => (val !== null && val !== '') || 'Required',
                    ]">
                      <template v-slot:no-option>
                        <q-item>
                          <q-item-section class="text-grey">
                            No results
                          </q-item-section>
                        </q-item>
                      </template>
                    </q-select>

                    <q-select filled label="Title" v-model="title" name="Title" use-input input-debounce="0"
                      :options="titleDataList" behavior="menu" class="col-5" :rules="[
                      (val) => (val !== null && val !== '') || 'Required',
                    ]">
                      <template v-slot:no-option>
                        <q-item>
                          <q-item-section class="text-grey">
                            No results
                          </q-item-section>
                        </q-item>
                      </template>
                    </q-select>

                    <q-input filled v-model="email" label="Email" :rules="[
                      (val) => (val !== null && val !== '') || 'Required',
                    ]" />

                    <q-input filled v-model="name" label="Full Name" lazy-rules :rules="[
                      (val) => (val !== null && val !== '') || 'Required',
                    ]" />

                    <q-input v-model="password" filled :type="isPwd ? 'password' : 'text'" label="Password"
                      placeholder="Enter at least 8+ characters" :dense="dense" :rules="[
                      (val) => (val !== null && val !== '') || 'Required',
                    ]">
                      <template v-slot:append>
                        <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                          @click="togglePwdVisibility" />
                      </template>
                    </q-input>

                    <div>
                      <q-btn class="full-width" label="Sign Up" color="cyan" type="submit" @click="SignUp()" />
                    </div>
                    <!-- form section -->
                  </div>
                </div>

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
import { ref } from "vue";
import axios from "axios";

export default {
  name: "SignIn",
  data() {
    return {
      email: ref(),
      name: ref(),
      password: ref(),
      title: ref(),
      branch: ref(),
      divisi: ref(),
      branchDataList: ref([]),
      divisionDataList: ref([]),
      titleDataList: [
        { label: 'Director', value: 'director' },
        { label: 'Manager', value: 'manager' },
        { label: 'Supervisor', value: 'supervisor' },
        { label: 'Operator', value: 'operator' },
      ]
    }
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

  mounted() {
    this.fetchData();
  },
  watch: {
    email: {
      handler(val) {
        if (val.split('@')[1]) {
          this.checkEmail()
          console.log('FUCK NDKASDJK')
        }
      }
    }
  },
  methods: {
    async checkEmail() {
      try {
        const response = await this.$axios.get(`/user/check-email/`, {
          headers: {
            "X-Email": this.email
          }
        })
        if (response.status != 200) {
          this.email = null
          return this.$q.notify({
            color: "negative",
            message: "Email Already in Used",
          })
        }
        return this.$q.notify({
          color: "positive",
          message: "Email Available To Use",
        })
      } catch (err) {
        console.log(err)
      }
    },
    async fetchData() {
      try {
        const response = await this.$axios.get('/user/helper-register')
        if (response.status != 200) throw Error('Something wrong, please try again')
        this.branchDataList = response.data.data.brances.map((branch) => ({
          label: branch.b_name, value: branch.id
        }))
        this.divisionDataList = response.data.data.division.map(divisi => ({
          label: divisi.d_name, value: divisi.id
        }))
      } catch (err) {
        console.log(err)
      }
    },
    async SignUp() {
      try {
        const data = {
          email: this.email,
          name: this.name,
          password: this.password,
          title: this.title.value,
          branch_id: this.branch.value,
          division_id: this.divisi.value
        };
        const response = await this.$axios.post('/user/register', data, {
          headers: {
            "Content-Type": "application/json",
          }
        })
        if (response.status != 200) throw Error('Something wrong, please try again')
        this.$router.replace('/')
        return this.$q.notify({
          color: "positive",
          message: "Please See Your Email for Confirmation.",
        });
      } catch (err) {
        console.log(err)
      }
    }
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
