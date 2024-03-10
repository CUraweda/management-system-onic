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
