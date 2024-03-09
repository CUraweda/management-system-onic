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
        data: [7, 5, 7, 6]
      }, {
        name: 'In-progress',
        data: [4, 8, 1, 8]
      }, {
        name: 'Overdue',
        data: [0, 4, 3, 6]
      },{
        name: 'Opened',
        data: [3, 4, 6, 6]
      },
      {
        name: 'Total',
        data: [14, 11, 12, 15]
      },
    ],
      chartOptions: {
        colors: ['#9C27B0', '#2196F3', '#FF9800', '#4CAF50', '#5196F3'],
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
