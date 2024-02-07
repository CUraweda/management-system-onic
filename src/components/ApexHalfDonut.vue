<template>
  <apexchart type="donut" height="300" width="650" :options="chartOptions" :series="series"></apexchart>
</template>

<script>
export default {
  name: 'ApexHalfDonut',
  data() {
    return {

      series: [5, 10, 40, 30, 20],
      chartOptions: {
        legend: {
          show: true,
          position: "bottom",
          fontSize: '13px',
        },
        colors: ['#ECE9EA', '#F3C677', '#64C6C3', '#5876E0', '#2ED0A2'],
        labels: ['Bad', 'Poor', 'Average', 'Good', 'Excelent'],
        chart: {
          type: 'donut',
        },
        dataLabels: {
          enabled: false,
        },
        plotOptions: {
          pie: {
            startAngle: -90,
            endAngle: 90,
            customScale: 1,
          }
        },
        grid: {
          padding: {
            bottom: -80
          }
        },
        title: {
          text: 'Donut',
          align: 'left',
          style: {
            color: '#FFF'
          }
        },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 350
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      },
    }
  }
}
</script>
