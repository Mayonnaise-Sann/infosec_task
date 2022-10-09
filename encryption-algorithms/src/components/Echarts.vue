<template>
    <div ref="main" id="mainChart"></div>
</template>

<script setup>
import * as echarts from 'echarts';
import { ref, defineProps, watch, onMounted,  } from 'vue'



// 接受父组件参数
const props = defineProps({
     target: String,
    chartData: {
        type: Object,
        default() {
            return {
                title: '',
                xData: [],
                series: [],
            };
      },
    }
})


// 配置项
// const option = {
//     title: {
//       text: 'ECharts Default'
//     },
//     legend: {
//           // 图例文字颜色
//           textStyle: {
//             color: "#333",
//           },
//         },
//         grid: {
//           left: "20%",
//         },
//         // 提示框
//         tooltip: {
//           trigger: "axis",
//         },
//         xAxis: {
//           type: "category", // 类目轴
//           data: [],
//           axisLine: {
//             lineStyle: {
//               color: "#17b3a3",
//             },
//           },
//           axisLabel: {
//             interval: 0,
//             color: "#333",
//           },
//         },
//         yAxis: [
//           {
//             type: "value",
//             axisLine: {
//               lineStyle: {
//                 color: "#17b3a3",
//               },
//             },
//           },
//         ],
//         color: [
//           "#2ec7c9",
//           "#b6a2de",
//           "#5ab1ef",
//           "#ffb980",
//           "#d87a80",
//           "#8d98b3",
//         ],
//         series: [],
// }


// 0 指定图表的配置项和数据
var option = {
    title: {
      text: 'Default Title'
    },
    tooltip: {},
      xAxis: {
        name: '字母',
      data: []
    },
  yAxis: {
    name: '频率',
      
    },
    series: [
      {
        name: '频率',
        type: 'bar',
        data: []
      }
    ]
};
// 1. 使用ref创建虚拟DOM引用，使用时用main.value
const main = ref();
onMounted(
  () => {
    init() // 初始化
  }
)

// 1.1 初始化函数
var myChart = null;
function init() {
  // 基于准备好的dom，初始化echarts实例
    myChart = echarts.init(main.value);
    // 初始化数据并更新图表
    initChartData();
  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
}

// 1.2 初始化图表数据
const initChartData = () => {
    option.title.text = props.chartData.title;
    option.xAxis.data = props.chartData.xData;
    option.series = props.chartData.series;
}

// 2更新图表
const updateChart = () => {
    // 更新数据
    initChartData();
    if (myChart) {
        // 应用配置
        myChart.setOption(option);
      } else {
        // 若未初始化
        myChart = echarts.init(main.value);
        myChart.setOption(option);
      }
}

// 3. 监听图表数据变化
watch(
    () => props.target,
    () => {
    updateChart();
      // console.log('chartData change')
},{deep: true})

</script>

<style>
#mainChart {
  width: 600px;
  height: 160px;
}
</style>