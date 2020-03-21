<template>
  <div class="title">
    关键词词云
    <div
      ref="canvas"
      :style="{height:height,width:'100%'}"
    />
  </div>
</template>

<script>
import echarts from 'echarts'
require('echarts-wordcloud')
import resize from './mixins/resize'
export default {
    mixins: [resize],
    props: {
        data: {
            type: Array,
            default: _ => {
                return []
            }
        },
        height: {
            type: String,
            default: '310px'
        },
        sizeRange: {
            type: Array,
            default: _ => [6, 26]
        }
    },
    mounted () {
        this.chart = echarts.init(this.$refs.canvas)
        this.initChart()
        
    },
    beforeDestroy () {
        if (!this.chart) return
        this.chart.dispose()
        this.chart = null
    },
    methods: {
        initChart () {
            const colors = ['#FF9966', '#FF6666', '#FFCCCC', '#CC0033', '#FFFF66', '#FFCC00', '#CCCC33', '#FFFFCC', '#99CC99', '#CCFF99', '#CCFFCC']
            const option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                series: [{
                    name: '关键词云',
                    type: 'wordCloud',
                    left: 'center',
                    top: 'middle',
                    width: '95%',
                    height: '85%',
                    sizeRange: this.sizeRange,
                    size: ['100%', '100%'],
                    rotationRange: [-90, 90],
                    rotationStep: 45,
                    textPadding: 0,
                    gridSize: 2,
                    drawOutOfBound: false,
                    autoSize: {
                        enable: true,
                        minSize: 6
                    },
                    textStyle: {
                        normal: {
                          color: function() {
                            return (
                              "rgb(" +
                              Math.round(Math.random() * 255) +
                              ", " +
                              Math.round(Math.random() * 255) +
                              ", " +
                              Math.round(Math.random() * 255) +
                              ")"
                            );
                          }
                            // color: function () {
                            //     const num = Math.floor(Math.random() * 10 + 1)
                            //     return colors[num]
                            // }
                        },
                        emphasis: {
                            shadowBlur: 10,
                            shadowColor: '#ccc'
                        }
                    },
                    data: this.data
                }]
            }
            this.chart.setOption(option)
        }
    },
}

</script>

<style lang="scss" scoped>
@import "@/styles/config.scss";
.title{
  padding-top:10px;
  font-weight: 900;
  font-size: 16px;
  color:$navColor;
}
</style>