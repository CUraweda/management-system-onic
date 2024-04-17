<template>
  <div id="chart">
    <apexchart
      type="bar"
      height="250"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script>
import Cookies from 'js-cookie';
export default {
  name: "ApexBarChartsGrouped",
  props: {
    TotalTotal: {
      type: Number, // Adjust the type accordingly
      required: true,
    },
  },
  data() {
    return {
    divisionId: sessionStorage.getItem("division_id")? sessionStorage.getItem("division_id") : Cookies.get("division_id"),
      branchId: sessionStorage.getItem("branch_id")? sessionStorage.getItem("branch_id") : Cookies.get("branch_id"),
      series: [
        {
          data: [this.TotalTotal],
        },
      ],
      chartOptions: {
        columnWidth: '70%',
        chart: {
          type: "bar",
          height: 350,
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: true,
          },
        },
        dataLabels: {
          enabled: true
        },
        xaxis: {
          categories: [
            "Dec",
            "Nov",
            "Oct",
            "Sep",
            "Aug",
            "Jully",
          ],
        },
      },
    };
  },
  watch: {
    TotalTotal(newTotalTotal) {
      this.series[0].data = [newTotalTotal];
    },
  },
};
</script>
