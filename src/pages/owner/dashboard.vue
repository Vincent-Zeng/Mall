<template>
  <div class="owner-dashboard">
    <div id="line-chart">

    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'owner-dashboard',
  data () {
    return {

    }
  },
  mounted () {
    var myChart = echarts.init(document.getElementById('line-chart'))
    // 绘制图表
    myChart.setOption({
      title: {
        text: 'Income',
        subtext: 'Daily'
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00']
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: '$ {value} k'
        }
      },
      series: [
        {
          name: 'income',
          type: 'line',
          smooth: true,
          data: [300, 280, 250, 260, 270, 300, 550, 500, 400, 390, 380, 390, 400, 500, 600, 750, 800, 700, 600, 400]
        }
      ]
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
h1 {
  font-weight: normal;
}
#line-chart{
  width: 600px;
  height: 400px;
  margin-left:172px;
}
</style>
