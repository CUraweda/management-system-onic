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
                      <q-img
                        src="/statics/logo.jpg"
                        width="300px"
                        class="q-mx-md q-my-xl"
                      ></q-img>
                      <div class="text-h5">Welcome Back!</div>
                      <p class="">Enter your credentials to access your account</p>
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
                    <q-form class="q-gutter-md" @submit="SignIn()">
                      <!-- <q-select
                        filled
                        label="Cabang"
                        v-model="branch"
                        name="Cabang"
                        use-input
                        input-debounce="0"
                        :options="optionsBranch"
                        behavior="menu"
                        class="col-5"
                        :rules="[(val) => (val !== null && val !== '') || 'Required']"
                      >
                        <template v-slot:no-option>
                          <q-item>
                            <q-item-section class="text-grey">
                              No results
                            </q-item-section>
                          </q-item>
                        </template>
                      </q-select> -->

                      <q-input
                        filled
                        v-model="email"
                        label="Email"
                        lazy-rules
                        :rules="[(val) => (val !== null && val !== '') || 'Required']"
                      />

                      <q-input
                        v-model="password"
                        filled
                        :type="isPwd ? 'password' : 'text'"
                        label="Password"
                        placeholder="Enter at least 8+ characters"
                        :dense="dense"
                        :rules="[(val) => (val !== null && val !== '') || 'Required']"
                      >
                        <template v-slot:append>
                          <q-icon
                            :name="isPwd ? 'visibility_off' : 'visibility'"
                            class="cursor-pointer"
                            @click="togglePwdVisibility"
                          />
                        </template>
                      </q-input>

                      <!-- <div class="items-center justify-center row">
                        <q-checkbox
                          v-model="right"
                          color="blue"
                          label="Keep me logged in"
                        /> -->
                        <q-space></q-space>
                        <!-- <a href="" style="color: #00bdd6"> forgot password?</a> -->
                      <!-- </div> -->

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
import Cookies from "js-cookie";
import { ref } from "vue";
import axios from "axios";

// axios.defaults.withCredentials = true;
export default {
  name: "SignIn",

  data() {
    return {
      divisionId: sessionStorage.getItem("division_id")
        ? sessionStorage.getItem("division_id")
        : Cookies.get("division_id"),
      branchId: sessionStorage.getItem("branch_id")
        ? sessionStorage.getItem("branch_id")
        : Cookies.get("branch_id"),
      branch: null,
      email: "",
      password: "",
      optionsBranch: [
        { label: "PT. RES", value: "PT. RES" },
        { label: "Produksi RES", value: "Produksi RES" },
        { label: "ONIC 1", value: "ONIC 1" },
        { label: "ONIC 2", value: "ONIC 2" },
        { label: "Sehatku", value: "Sehatku" },
        { label: "ONIC KLP", value: "ONIC KLP" },
      ],
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

  mounted() {
    this.created();
  },

  methods: {
    async refreshToken(oldToken) {
      try {
        // Lakukan permintaan ke server untuk memperbarui token
        const response = await this.$axios.post("/user/refreshToken", { oldToken });

        if (response.status === 200) {
          const newToken = response.data.newToken;

          // Simpan token baru di dalam cookie
          Cookies.set("token", newToken);

          // Lakukan apa pun yang perlu dilakukan setelah token diperbarui
          // Misalnya, navigasi ke halaman tertentu atau menampilkan notifikasi
          this.$q.notify({
            color: "positive",
            message: "Token refreshed.",
          });
        } else {
          throw new Error("Failed to refresh token");
        }
      } catch (error) {
        console.error("Error refreshing token:", error);

        // Handle error, misalnya dengan menampilkan pesan kepada pengguna
        this.$q.notify({
          color: "negative",
          position: "top",
          message: "Failed to refresh token",
        });
      }
    },

    created() {
      // Saat halaman dimuat, periksa apakah ada cookies yang berisi data pengguna
      const token = Cookies.get("token");
      // if (token) {
      //   // Lakukan permintaan ke server untuk memperbarui token
      //   this.refreshToken(token);
      // }
      const email = Cookies.get("email");
      const id = Cookies.get("id");
      // Dan seterusnya untuk data lainnya
      if (token && email && id) {
        // Jika ada, lakukan autentikasi pengguna secara otomatis atau atur status login sesuai kebutuhan aplikasi Anda
        this.SignIn(email);
      }
    },

    async SignIn() {
      const loginUrl = "https://office.onic.co.id/api/auth/login";

      // Define the data object containing the required parameters
      const data = {
        u_email: this.email,
        u_password: this.password,
      };

      // Make the POST request using fetch
      try {
        const response = await axios.post(loginUrl, data, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        const ResDat = await response.data || '';
        const ResponseData = await ResDat.data.data || '';
        const UserData = await ResponseData.user || '';
        const AucData = await ResponseData.active_user_company || '';
        const DivisionData = await AucData.division || '';
        const BranchData = await AucData.company || '';
        const PositionData = await AucData.position || '';
        // Handle Data based on the server's response

        // Mendapatkan role berdasarkan user ID
        const userId = UserData.u_id;
        const roleData = await this.$axios.get(`/role/get-by-id/${userId}`);

        // const accessToken = Data.accessToken;
        const email = UserData.u_email || '';
        const id = UserData? UserData.u_id : '';
        const name = UserData.u_name || '';
        const division = DivisionData.d_name || '';
        const role = roleData.data.data.role || '';
        const branch = BranchData.c_name || '';
        const branches = UserData.user_companies || '';
        const position = PositionData.p_name || '';
        const position_id = PositionData.p_id || '';
        const division_id = DivisionData.d_id || '';
        const branch_id = BranchData.c_id || '';
        const token = ResDat.data.credential || '';

        // const laravelSessionCookie = cookies.find((cookie) =>
        //   cookie.startsWith("laravel_session")
        // ) || '';
        // if (laravel SessionCookie) {
        //   // Simpan nilai cookie di variabel lokal
        //   laravelSession = laravelSessionCookie.split(";")[0].split("=")[1];
        // }

        // if (this.right) {
        //   Cookies.set("token", accessToken, { expires: 365 }); // Cookie berlaku selama 1 tahun
        //   Cookies.set("id", id, { expires: 365 });
        //   Cookies.set("email", email, { expires: 365 });
        //   Cookies.set("username", name, { expires: 365 });
        // Cookies.set("role", role, { expires: 365 });
        //   Cookies.set("division", division, { expires: 365 });
        //   Cookies.set("branch", branch, { expires: 365 });
        //   Cookies.set("position", position, { expires: 365 });
        //   Cookies.set("position_id", position_id, { expires: 365 });
        //   Cookies.set("division_id", division_id, { expires: 365 });
        //   Cookies.set("branch_id", branch_id, { expires: 365 });
        // } else {
        sessionStorage.setItem("password", this.password);
        sessionStorage.setItem("branches", JSON.stringify(branches));
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("id", id);
        sessionStorage.setItem("email", email);
        sessionStorage.setItem("username", name);
        sessionStorage.setItem("role", role);
        sessionStorage.setItem("division", division);
        sessionStorage.setItem("branch", branch);
        sessionStorage.setItem("position", position);
        sessionStorage.setItem("position_id", position_id);
        sessionStorage.setItem("division_id", division_id);
        sessionStorage.setItem("branch_id", branch_id);
        // }
        this.redirectUser(role);

        this.$q.notify({
          color: "positive",
          message: "Login Successful.",
        });

          this.checker(id, role);

      } catch (error) {
        if (error.response && error.response.status !== 200) {
          this.$q.notify({
          color: "negative",
          position: "top",
          message: error.response.data.message,
        });
        }
      }
    },

    redirectUser: function (role) {
      switch (role) {
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
