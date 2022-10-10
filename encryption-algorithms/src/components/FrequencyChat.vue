<template>
    <!-- <button @click="test">dada</button> -->
    <el-card class="box-card">
         <echarts
         :chartData="chartDataPlain"
         :target="p"
         style="height: 260px"
         ></echarts>
   
         <echarts
         :chartData="chartDataCipher"
         :target="c"
         style="height: 260px"
         ></echarts>
    </el-card>


</template>



<script setup>
import Echarts from './Echarts'
import { inject, computed, watch, } from 'vue';

/*
@params
*/
// 频率精度，默认为6
const precision = 6;


// 明文和密文字符串
const { plaintext, ciphertext } = inject("originText");
const p = computed(() => {
    return plaintext.value.toUpperCase().split(' ').join('');
}) 

const c = computed(()=> ciphertext.value) ;

// 明文图表配置项
let chartDataPlain = {
  title: '明文字符频率',
  xData:['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
  series: [
    {
      name: '频率',
      type: 'bar',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
  ],
  color: ['#99BBFF']
}
// 密文图表配置项
let chartDataCipher = {
  title: '密文字符频率',
  xData:['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
  series: [
    {
      name: '频率',
      type: 'bar',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
  ],
  color: ['#9F88FF']

}

// 监听数据变化，更新图表
// 监听明文数据
watch(p, () => {
  let { letterArr,frequencyArr } = getChartData(p.value);
  chartDataPlain.xData = letterArr;
  chartDataPlain.series[0].data = frequencyArr;
}) 
// 监听密文数据
watch(c, () => {
  let { letterArr,frequencyArr } = getChartData(c.value);
  chartDataCipher.xData = letterArr;
  chartDataCipher.series[0].data = frequencyArr;
}) 


// 获取横纵坐标数据
const getChartData = (str) => {
  // 利用Map数据结构和数组，构造26个字母的横坐标序列，同时根据字母的映射频率排序
    let arr = new Array;
    for (let i = 65; i < 91; i++){
        arr.push([String.fromCharCode(i), 0]);
    }
    const len = str.length;
    // const lenC = c.length;
    for (let i = 0; i < len; i++) {
        let index = str.charCodeAt(i) - 65;
        arr[index][1]++;
    }
    for (let i = 0; i < arr.length; i++) {
        arr[i][1] = (arr[i][1]/len).toFixed(precision)*1;  //频率精度
    }
    arr.sort(function (a, b) { return b[1] - a[1] });  // 降序排序
    const dateMap = new Map(arr);
    let letterArr= Array.from(dateMap.keys());
    let frequencyArr = Array.from(dateMap.values());
   
    return {
        letterArr,
        frequencyArr
    }

}

// 明文图表数据初始化
const init = () => {
  let { letterArr,frequencyArr } = getChartData(p.value);
  chartDataPlain.xData = letterArr;
  chartDataPlain.series[0].data = frequencyArr;
}
init() // 初始化

</script>
 