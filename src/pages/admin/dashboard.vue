<template>
  <div>
    <div class="commission">
      <label for="commision-value">Commission Rate : </label>
      <b v-show="editable">%</b>
      <input type="text" class="commision-value" v-model="commissionValue" id="commission-value" v-show="editable" />
      <span v-show="!editable">%{{commissionValue}}</span>
      <div class="function-button">
        <div class="edit-button" v-show="!editable" @click="handleEditClick()">Edit</div>
        <div class="edit-button" v-show="editable" @click="handleSaveClick()">Save</div>
        <div class="remove-button" v-show="editable" @click="handleCancleClick()">Cancle</div>
      </div>
    </div>
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
      yAxis: [],
      editable: false,
      commissionValue: ''
    }
  },
  methods: {
    handleEditClick () {
      this.editable = true
    },
    handleSaveClick () {
      this.$http.get(`/mallConfig/update?value=${this.commissionValue}`)
      .then(res => res.json())
      .then(json => {
        if (json.status === 1) {
          this.editable = false
        } else {
          window.alert(json.message)
        }
      })
    },
    handleCancleClick () {
      this.editable = false
    },
    handleSpanClicked (type) {
      this.isIncome = type === 'income'
      this.dropDownMenu = 'Daily'
      let url = null
      if (type === 'income') {
        url = '/admin/income'
      } else {
        url = '/order/num'
      }
      this.$http.get(`${url}?cond=0`)
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
        url = '/admin/income'
        yItem = 'income'
      } else {
        url = '/order/num'
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
    }
  },
  created () {
    this.$http.get(`/mallConfig/get?key=1`)
    .then(res => res.json())
    .then(json => {
      this.commissionValue = json.value
    })
  },
  mounted () {
    // 获取坐标轴数据
    this.$http.get(`/admin/income?cond=0`)
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
            console.log('start')
            console.log(params)
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

.commission{
  min-width:800px;
  width: 80%;
  height:80px;
  margin-top: 10px;
  margin-left: 172px;
  line-height:80px;
  label{
    color: gray;
    font-size:20px;
  }
  span{
    color: red;
    width:200px;
    display:inline-block;
    text-align:center;
    font-size:20px;
  }
  b{
    margin-left:20px;
  }
  input{
    border-radius:3px;
    border:1px solid lightgray;
    vertical-align: middle;
    outline: none;
    width:160px;
    text-align:center;
    font-size:20px;
    height:30px;
  }
  .function-button {
    display: inline-block;
    margin-left:30px;
    div {
      width: 114px;
      height: 42px;
      display: inline-block;
      line-height: 42px;
      text-align: center;
      border-radius: 4px;
      box-sizing: border-box;
    }

    .edit-button {
      background-color: #0077D8;
      color: white;
      margin-right: 16px;
      cursor: pointer;
    }

    .remove-button {
      background-color: white;
      border: 1px solid #0077D8;
      color: #0077D8;
      cursor: pointer;
    }
  }
}


.owner-dashboard{
  width: 80%;
  position: absolute;
  margin: 10px 0px 28px 0px;
  left: 172px;
  right: 172px;
  border: 1px solid #E4E4E4;
  box-shadow: 0px 4px 14px rgba(121, 121, 121, 0.1);
  padding-bottom:20px;
  min-width:960px;
}

#line-chart{
  width: 940px;
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
