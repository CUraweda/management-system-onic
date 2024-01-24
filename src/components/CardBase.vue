<template>
  <q-card class="fit" :style="{backgroundColor: bgColor, border: '1px solid #BCC1CA', Height: 'auto', boxShadow: 'none', Width: 'auto'}">
    <q-card-section>
      <slot></slot>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'CardBase',
  props: {
    bgColor: {
      default: '#fff' // Mengubah warna default menjadi abu-abu
    }
  }
}
</script>

<style scoped>
/* Tambahkan CSS untuk menyesuaikan tampilan */
.q-card.fit {
  border-radius: 8px; /* Menambahkan sudut bulat pada card */
}
</style>
