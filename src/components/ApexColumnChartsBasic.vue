<template>
  <apexchart type="bar" height="321"   :options="chartOptions" :series="series"></apexchart>
</template>

<script>
export default {
  name: 'ApexColumnChartsBasic',
  data() {
    return {
      series: [{
        name: 'Completed',
        data: [90, 55, 57, 56]
      }, {
        name: 'In-progress',
        data: [76, 85, 101, 98]
      }, {
        name: 'Overdue',
        data: [35, 41, 36, 26]
      },{
        name: 'Opened',
        data: [35, 41, 36, 26]
      },
    ],
      chartOptions: {
        colors: ['#9C27B0', '#2196F3', '#FF9800', '#4CAF50'],
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 1000
        },
        title: {
          text: 'Column Charts Basic',
          align: 'left',
          style: {
            color: '#fff'
          }
        },
        legend: {
          position: "top",
          offsetY: -20,
          labels: {
            colors: '#000'
          }
        },
        chart: {
          type: 'bar',
          height: 450
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '40%',
            endingShape: 'rounded'
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        xaxis: {
          categories: ['Q1', 'Q2', 'Q3', 'Q4'],
          labels: {
            style: {
              colors: '#000'
            }
          }
        },
        yaxis: {
          labels: {
            style: {
              colors: '#000'
            }
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return '$ ' + val + ' thousands'
            }
          }
        }
      }
    }
  }
}
</script>
