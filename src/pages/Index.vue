<template>
  <q-page class="flex flex-center">
    <div class="col-md-6 col-sm-12 col-xs-12">
        <card-base>
          <apex-column-with-data-labels></apex-column-with-data-labels>
        </card-base>
      </div>
  </q-page>
</template>

<script>
import CardBase from 'components/CardBase'

export default {
  name: 'PageIndex',
  components: {
    CardBase,
    ApexColumnWithDataLabels: () => import('components/ApexColumnWithDataLabels'),
  },

  data () {
    return {
      loading: true,
      dialog: true,
      colors: [
        'linear-gradient( 135deg, #ABDCFF 10%, #0396FF 100%)',
        'linear-gradient( 135deg, #2AFADF 10%, #4C83FF 100%)',
        'linear-gradient( 135deg, #FFD3A5 10%, #FD6585 100%)',
        'linear-gradient( 135deg, #EE9AE5 10%, #5961F9 100%)'
      ]
    }
  },
  created () {
    this.$q.loading.show({
      backgroundColor: 'purple-10',
      delay: 0
    })
    setTimeout(() => {
      this.$q.loading.hide()
    }, 1300)
  }
}
</script>
