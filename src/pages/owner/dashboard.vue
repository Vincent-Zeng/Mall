<template>
  <div class="owner-dashboard">
    <div class="info-header">
      <img src="./images/dashboard-logo.png" alt="">
      <span @click="handleSpanClicked('income')" class="income-span" v-bind:class="{ 'highlight-span': isIncome, 'normal-span': !isIncome }">Income</span>
      <span @click="handleSpanClicked('sales')" class="sales-span" v-bind:class="{ 'highlight-span': !isIncome, 'normal-span': isIncome }">Sales</span>
      <el-dropdown @command="handleCommand" class="dropDownMenu">
        <span class="el-dropdown-link" hide-on-click>
          {{dropDownMenu}} <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="Daily">Daily</el-dropdown-item>
          <el-dropdown-item command="Weekly">Weekly</el-dropdown-item>
          <el-dropdown-item command="Monthly">Monthly</el-dropdown-item>
          <el-dropdown-item command="Yearly">Yearly</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
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
      isIncome: true,
      dropDownMenu: 'Daily',
      xAxis: [],
      yAxis: []
    }
  },
  methods: {
    handleSpanClicked (type) {
      this.isIncome = type === 'income'
      this.dropDownMenu = 'Daily'
      let url = null
      let yItem = null
      if (type === 'income') {
        url = '/owner/income'
        yItem = 'income'
      } else {
        url = '/order/numO'
        yItem = 'num'
      }
      this.$http.get(`${url}?cond=0`)
      .then((res) => res.json())
      .then((json) => {
        let xAxis = []
        let yAxis = []
        for (let i = 0; i < json.length; i++) {
          let xItem = json[i].year + '/' + json[i].month + '/' + json[i].day
          xAxis.push(xItem)
          yAxis.push(json[i][yItem])
        }
        this.xAxis = xAxis
        this.yAxis = yAxis
        var myChart = echarts.getInstanceByDom(document.getElementById('line-chart'))
        myChart.setOption({
          title: {
            text: this.isIncome ? 'Income' : 'Sales',
            subtext: this.dropDownMenu
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              animation: false
            },
            formatter: function (params) {
              console.log('start')
              console.log(params)
              return params[0].name + '<br />' + params[0].value
            }
          },
          xAxis: {
            data: this.xAxis
          },
          yAxis: {
            axisLabel: {
              formatter: this.isIncome ? '$ {value}' : '{value}',
              textStyle: {
                color: '#5c6076'
              }
            }
          },
          series: {
            data: this.yAxis
          }
        })
      })
    },
    handleCommand (command) {
      // 下拉菜单名称更改
      this.dropDownMenu = command
      // 更新坐标轴数据
      let cond = 0
      switch (command) {
        case 'Daily':
          cond = 0
          break
        case 'Weekly':
          cond = 1
          break
        case 'Monthly':
          cond = 2
          break
        case 'Yearly':
          cond = 3
          break
        default:
          console.log(command)
          break
      }
      let url = null
      let yItem = null
      if (this.isIncome) {
        url = '/owner/income'
        yItem = 'income'
      } else {
        url = '/order/numO'
        yItem = 'num'
      }
      this.$http.get(`${url}?cond=${cond}`)
      .then((res) => res.json())
      .then((json) => {
        let xAxis = []
        let yAxis = []
        for (let i = 0; i < json.length; i++) {
          let xItem
          switch (cond) {
            case 0:
              xItem = json[i].year + '/' + json[i].month + '/' + json[i].day
              break
            case 1:
              xItem = json[i].year + 'w' + json[i].week
              break
            case 2:
              xItem = json[i].year + '/' + json[i].month
              break
            case 3:
              xItem = json[i].year
              break
            default:
              console.log(json[i])
          }
          xAxis.push(xItem)
          yAxis.push(json[i][yItem])
        }
        this.xAxis = xAxis
        this.yAxis = yAxis
        var myChart = echarts.getInstanceByDom(document.getElementById('line-chart'))
        myChart.setOption({
          title: {
            text: this.isIncome ? 'Income' : 'Sales',
            subtext: this.dropDownMenu
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              animation: false
            },
            formatter: function (params) {
              return params[0].name + '<br />' + params[0].value
            }
          },
          xAxis: {
            data: this.xAxis
          },
          yAxis: {
            axisLabel: {
              formatter: this.isIncome ? '$ {value}' : '{value}',
              textStyle: {
                color: '#5c6076'
              }
            }
          },
          series: {
            data: this.yAxis
          }
        })
      })
    }
  },
  mounted () {
    // 获取坐标轴数据
    this.$http.get(`/owner/income?cond=0`)
    .then((res) => res.json())
    .then((json) => {
      let xAxis = []
      let yAxis = []
      for (let i = 0; i < json.length; i++) {
        let xItem = json[i].year + '/' + json[i].month + '/' + json[i].day
        xAxis.push(xItem)
        yAxis.push(json[i].income)
      }
      this.xAxis = xAxis
      this.yAxis = yAxis
      // 绘制图表
      var myChart = echarts.init(document.getElementById('line-chart'))
      myChart.setOption({
        title: {
          text: this.isIncome ? 'Income' : 'Sales',
          subtext: this.dropDownMenu
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            animation: false
          },
          formatter: function (params) {
            return params[0].name + '<br />' + params[0].value
          }
        },
        xAxis: {
          axisLine: {
            lineStyle: {
              color: '#ccc'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: '#5c6076'
            }
          },
          type: 'category',
          boundaryGap: false,
          data: this.xAxis
        },
        yAxis: {
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#ccc'
            }
          },
          axisTick: {
            show: false
          },
          type: 'value',
          axisLabel: {
            formatter: '$ {value}',
            textStyle: {
              color: '#5c6076'
            }
          }
        },
        series: [
          {
            name: 'income',
            type: 'line',
            smooth: true,
            itemStyle: {
              normal: {
                color: '#258bde'
              }
            },
            data: this.yAxis
          }
        ]
      })
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
$color1:gray;
$color2:#f5f5f5;
$color3:#0077d8;
$color4:#258bde;
h1 {
  font-weight: normal;
}

.owner-dashboard{
  position: absolute;
  margin: 30px 0px 28px 0px;
  left: 172px;
  right: 172px;
  border: 1px solid #E4E4E4;
  box-shadow: 0px 4px 14px rgba(121, 121, 121, 0.1);
  padding-bottom:20px;
  min-width:700px;
}

#line-chart{
  width: 720px;
  height: 400px;
  margin-left:20px;
}

.info-header {
  position: relative;
  padding:20px;
  img {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  .dropDownMenu{
    float:right;
    .el-dropdown-link{
      cursor: pointer;
    }
  }

  .income-span {
    margin-left: 30px;
    cursor:pointer;
  }

  .sales-span {
    margin-left: 8px;
    cursor:pointer;
  }

  .highlight-span {
    color: #2B2B2B;
  }

  .normal-span {
    color: #ACACAC;
  }
}
</style>
