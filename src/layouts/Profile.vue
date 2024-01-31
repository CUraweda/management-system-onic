<!-- <template>
  <div class="q-px-lg q-py-md">
      <div class="row no-wrap q-pa-lg">
        <div class="column">
          <q-item-label class="text-h6">User</q-item-label>
          <q-linear-progress class="q-mb-lg" :value="100" color="grey-4" style="height: 2px"/>
          <div class="items-center">
            <div class="text-bold items-center">{{ dataUser.userName }}</div>
            <div>{{ dataUser.namaLengkap }}</div>
          </div>
        </div>

        <q-separator vertical inset class="q-mx-lg"></q-separator>

        <div class="column items-center">
          <q-btn flat round dense>
            <q-avatar size="72px">
              <img src="https://placeimg.com/500/300/nature">
            </q-avatar>
          </q-btn>

          <div class="text-subtitle1 q-mt-md q-mb-xs"></div>
          <div class="text-subtitle1 q-mt-md q-mb-xs"></div>
          <div class="text-subtitle1 q-mt-md q-mb-xs"></div>
          <q-btn
            color="teal"
            label="Keluar"
            unelevated
            @click="keluar()"
            size="sm"
            v-close-popup>
            <q-tooltip>Keluar disini..</q-tooltip>
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

  data () {
    return {
      left: false,
      dataUser: this.$q.localStorage.getItem('datauser')
    }
  },
  methods: {
    keluar () {
      this.$q.localStorage.clear()
      this.$router.push('auth/login')
    }
  }

  // setup(props) {
  //   const email = ref('');

  //   onMounted(async () => {
  //     try {
  //       // Mendapatkan ID pengguna dari _route params_
  //       const userId = props.route.params.userId;

  //       // Permintaan ke server untuk mendapatkan informasi profil berdasarkan ID pengguna
  //       const response = await axios.get(`http://localhost:3000/api/user/${userId}`);

  //       // Mengisi data profil
  //       email.value = response.data.email;
  //     } catch (error) {
  //       console.error('Error fetching user profile:', error);
  //     }
  //   });

  }
}
</script>

<style scoped></style> -->
