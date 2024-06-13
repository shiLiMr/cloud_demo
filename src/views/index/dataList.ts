import * as echarts from 'echarts';
import type { fourDataType } from '@/api/types/indexType'
// 分类销售统计 
export const oneList = (refs: any, data: any) => {
  let myChart = echarts.init(refs);
  let option;

  option = {
    title: {
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    series: [

      {
        name: '单位 :元',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
  option.series[0].data = data;
  myChart.setOption(option);

  window.addEventListener("resize", function () {
    myChart.resize();
  })
}
// 近30 天销售趋势
export const towList = (refs: any, data: any) => {
  let myChart = echarts.init(refs);
  let option;
  option = {
    title: {
      text: '近30 天销售趋势'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['订单数', '销售额', '退款额', '充值额']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '订单数',
        type: 'line',
        stack: 'Total',
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: '销售额',
        type: 'line',
        stack: 'Total',
        data: [220, 182, 191, 234, 290, 330, 310]
      },
      {
        name: '退款额',
        type: 'line',
        stack: 'Total',
        data: [150, 232, 201, 154, 190, 330, 410]
      },
      {
        name: '充值额',
        type: 'line',
        stack: 'Total',
        data: [320, 332, 301, 334, 390, 330, 320]
      },
    ]
  };
  option.xAxis.data = data.last30Days;
  option.series[0].data = data.orderNumList;//订单数
  option.series[1].data = data.saleMoneyList;//销售额
  option.series[2].data = data.returnMoneyList;//退款额
  option.series[3].data = data.rechargeMoneyList;//充值额
  option && myChart.setOption(option);
  window.addEventListener("resize", function () {
    myChart.resize();
  })
}
// 会员消费 Top10
export const threeList = (refs: any, data: any) => {
  let myChart = echarts.init(refs);
  let option;
  option = {
    title: {
      text: '会员消费Top10',
      subtext: '单位 :元'
    },
    grid: {
      left: '1%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#83cff6' },
            { offset: 0.5, color: '#188df0' },
            { offset: 1, color: '#188df0' }
          ])
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#2378f7' },
              { offset: 0.7, color: '#2378f7' },
              { offset: 1, color: '#83bff6' }
            ])
          }
        },
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar'
      }
    ]
  };
  option.xAxis.data = data.map((item: fourDataType) => item.name)
  option.series[0].data = data.map((item: fourDataType) => item.consumeMoney)

  option && myChart.setOption(option);
  window.addEventListener("resize", function () {
    myChart.resize();
  })
}

// 温度表
export const temperature = (refs: any, data: any) => {
  var myChart = echarts.init(refs);
  var option;
  option = {
    series: [
      {
        type: 'gauge',
        center: ['50%', '60%'],
        startAngle: 200,
        endAngle: -20,
        min: 0,
        max: 60,
        splitNumber: 12,
        itemStyle: {
          color: '#FFAB91'
        },
        progress: {
          show: true,
          width: 50
        },

        pointer: {
          show: false
        },
        axisLine: {
          lineStyle: {
            width: 50
          }
        },
        axisTick: {
          distance: -60,
          splitNumber: 5,
          lineStyle: {
            width: 2,
            color: '#999'
          }
        },
        splitLine: {
          distance: -60,
          length: 14,
          lineStyle: {
            width: 3,
            color: '#999'
          }
        },
        axisLabel: {
          distance: -10,
          color: '#999',
          fontSize: 20
        },
        anchor: {
          show: false
        },
        title: {
          show: false
        },
        detail: {
          valueAnimation: true,
          width: '60%',
          lineHeight: 60,
          borderRadius: 8,
          offsetCenter: [0, '-10%'],
          fontSize: 30,
          fontWeight: 'bolder',
          formatter: '{value} °C',
          color: 'inherit'
        },
        data: [
          {
            value: 38,

          }
        ]
      },

      {
        type: 'gauge',
        center: ['50%', '60%'],
        startAngle: 200,
        endAngle: -20,
        min: 0,
        max: 60,
        itemStyle: {
          color: '#FD7347'
        },
        progress: {
          show: true,
          width: 9
        },

        pointer: {
          show: true
        },
        axisLine: {
          show: true
        },
        axisTick: {
          distance: 30,
          splitNumber: 5,
          show: true
        },
        splitLine: {
          distance: 30,
          length: 10,
          show: true
        },
        axisLabel: {
          show: true
        },
        detail: {
          show: false
        },
        data: [
          {
            value: 38
          }
        ]
      }
    ]
  };

  option && myChart.setOption(option);

  window.addEventListener('resize', () => {
    myChart.resize();
  })

}