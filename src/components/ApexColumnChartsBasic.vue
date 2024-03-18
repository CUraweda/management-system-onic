<template>
  <apexchart type="bar" height="321" :options="chartOptions" :series="series"></apexchart>
</template>

<script>
export default {
  name: 'TaskStatusChart',
  props: {
    taskStatusData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      series: [],
      chartOptions: {
        colors: ['#9C27B0', '#2196F3', '#FF9800', '#4CAF50', '#2816F3'],
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
              return  val + ' Task'
            }
          }
        }
      },
    }
  },
  watch: {
    taskStatusData: {
      handler(newData) {
        // Update the series with new data when taskStatusData changes
        this.updateSeries(newData);
        console.log(newData);
      },
      immediate: true // Trigger the handler immediately when the component is created
    }
  },
  
  methods: {
    updateSeries(newData) {
      this.series = [
        {
          name: 'Completed',
          data: [newData.completed]
        },
        {
          name: 'In-progress',
          data: [newData.inProgress]
        },
        {
          name: 'Overdue',
          data: [newData.overdue]
        },
        {
          name: 'Open',
          data: [newData.open]
        },
        {
          name: 'Total',
          data: [newData.total]
        }
      ];
    }
  }
}
</script>
