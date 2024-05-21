import * as echarts from 'echarts';

export const oneList = (refs:any,data:any) => {
    var myChart = echarts.init(refs);
    var option;

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
}