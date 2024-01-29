<template>
  <div class="q-px-lg q-py-md">
    {{ email }}
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import axios from 'axios'
import { ref, onMounted } from 'vue';

export default defineComponent({
  name: "profile",
  setup(props) {
    const email = ref('');

    onMounted(async () => {
      try {
        // Mendapatkan ID pengguna dari _route params_
        const userId = props.route.params.userId;

        // Permintaan ke server untuk mendapatkan informasi profil berdasarkan ID pengguna
        const response = await axios.get(`http://localhost:3000/api/user/${userId}`);

        // Mengisi data profil
        email.value = response.data.email;
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    });

    return {
      email: '',
    }
  }
})
</script>

<style scoped></style>
