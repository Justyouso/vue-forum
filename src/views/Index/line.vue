<template>
  <div
    ref="canvas"
    :style="{height:height,width:'100%'}"
  />
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'
export default {
    mixins: [resize],
    props: {
        data: {
            type: Object,
            default: _ => {
                return {}
            }
        },
        height: {
            type: String,
            default: '310px'
        },
        colors: {
            type: Array,
            default: _ => ['#58b948', '#fcc00e', '#e25c52', '#8e5cff', '#FFCCCC', '#0099CC', '#FF9966', '#99CC99', '#CC6699', '#999966', '#FFFFCC']
        }
    },
    computed: {
        end: function () {
            return (30 / this.data.xData.length) * 100
        }
    },
    mounted () {
        this.chart = echarts.init(this.$refs.canvas)
        this.initData()
    },
    beforeDestroy () {
        if (!this.chart) return
        this.chart.dispose()
        this.chart = null
    },
    methods: {
        initData () {
            this.initChart()
        },
        initChart () {
            const option = {
                color: this.colors,
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                grid: {
                    left: '2%',
                    right: '4%',
                    bottom: '14%',
                    top: '16%',
                    containLabel: true
                },
                legend: {
                    icon: 'circle',
                    left: '20',
                    top: 'top',
                    itemWidth: 20,
                    itemHeight: 10,
                    itemGap: 10,
                    data: this.data.legend
                },
                yAxis: {
                    type: 'value',
                    nameTextStyle: {
                        color: '#76869B',
                        fontSize: 12
                    },
                    axisLabel: {
                        color: '#A0A4AA',
                        formatter: function (val) {
                            return val
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            type: 'solid',
                            color: '#f1f1f1'
                        }
                    },
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    }
                },
                xAxis: {
                    type: 'category',
                    nameTextStyle: {
                        color: '#76869B',
                        fontSize: 12
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            type: 'solid',
                            color: '#f1f1f1'
                        }
                    },
                    axisLabel: {
                        color: '#A0A4AA'
                    },
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    data: this.data.xData
                },
                dataZoom: [{
                    show: true,
                    height: 16,
                    xAxisIndex: [0],
                    bottom: '6%',
                    start: 0,
                    end: this.end,
                    handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
                    handleSize: '110%',
                    handleStyle: {
                        color: '#cecece'
                    },
                    textStyle: {
                        color: 'transparent'
                    },
                    borderColor: '#ddd'
                }],
                series: this.data.seriesData
            }
            this.chart.setOption(option)
        }
    }
}

</script>
