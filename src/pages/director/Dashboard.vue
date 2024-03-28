<template>
  <q-page>
    <Card></Card>
    <div>
      <div class="text-h6 q-pl-md q-ma-md">PERFORMANCE MONITORING</div>
      <div class="row q-col-gutter-sm q-mt-xs">
        <apex-half-donut></apex-half-donut>
        <apex-column-charts-basic></apex-column-charts-basic>
      </div>
    </div>
  </q-page>
</template>

<script>
import Cookies from "js-cookie";
import Vue from "vue";
import { exportFile } from "quasar";
import CardBase from "components/CardBase";
import { ref } from "vue";

export default {
  name: "Dashboard",
  components: {
    Card: () => import("components/Card"),
    ApexHalfDonut: () => import("components/ApexHalfDonut"),
    ApexColumnChartsBasic: () => import("components/ApexColumnChartsBasic"),
  },
  data() {
    return {
    };
  },
  setup() {
    return {
    };
  },
};
</script>

<style scoped>
.card-icon {
  border-radius: 6px;
}

.my-card {
  width: 175px;
}

.title-card {
  border-radius: 20px;
}

.under-title {
  border-radius: 8px;
}

.bintang {
  border-radius: 18px;
}
</style>
