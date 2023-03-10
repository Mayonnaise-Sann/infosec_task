<template>
  <div ref="main" id="mainChart"></div>
</template>

<script setup>
import * as echarts from "echarts";
import { ref, defineProps, watch, onMounted } from "vue";

// 接受父组件参数
const props = defineProps({
  target: String,
  chartData: {
    type: Object,
    default() {
      return {
        title: "",
        xData: [],
        series: [],
      };
    },
  },
});

// 0 指定图表的配置项和数据
var option = {
  // 标题
  title: {
    text: "Default Title",
  },
  // 鼠标图例提示
  tooltip: {},
  // 横坐标的名字
  xAxis: {
    name: "字母",
    data: [],
  },
  yAxis: {
    name: "频率",
  },
  // 表格类型和表格数据
  series: [
    {
      name: "频率",
      type: "bar",
      data: [],
    },
  ],
  color: ["#409EFF"],
};
// 1. 使用ref创建虚拟DOM引用，使用时用main.value
const main = ref();
onMounted(() => {
  init(); // 初始化
});

// 1.1 初始化函数
var myChart = null;
function init() {
  // 基于准备好的dom，初始化echarts实例
  myChart = echarts.init(main);
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
  option.color = props.chartData.color;
};

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
};

// 3. 监听图表数据变化
watch(
  () => props.target,
  () => {
    updateChart();
    // console.log('chartData change')
  },
  { deep: true }
);
</script>

<style>
#mainChart {
  width: 600px;
  height: 160px;
}
</style>
