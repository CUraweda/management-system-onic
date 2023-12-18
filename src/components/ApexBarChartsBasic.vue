<template>
  <div id="chart">
    <apexchart
      type="bar"
      height="350"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script>
export default {
  name: "ApexBarChartsGrouped",
  data() {
    return {
      series: [
        {
          data: [400, 430, 448, 470, 540, 580],
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
};
</script>
