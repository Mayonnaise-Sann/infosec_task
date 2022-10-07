<template>
<div class="container">
      <h1>信安第四次作业-加密算法</h1>
      <el-tabs type="border-card">
        <!-- 1. 凯撒算法 -->
        <el-tab-pane label="caesar">
          <caesar ></caesar>
        </el-tab-pane>
        <!-- 2. playfair加密算法 -->
        <el-tab-pane label="playfair">
          <playfair  ></playfair>
        </el-tab-pane>
        <!-- 3. 希尔加密算法 -->
        <el-tab-pane label="hill">
          <hill ></hill>
        </el-tab-pane>
      </el-tabs>

  </div>
</template>

<script setup>
import Caesar from './components/Caesar'
import Playfair from './components/Playfair'
import Hill from './components/Hill'


import { ref, provide } from 'vue'

/* 数据结构
@params
明文字符串 string
密文字符串 string
密钥1 number[1~25]
密钥2 char[a-z]
密钥3 number[3*3矩阵 | number | ','分隔]

填充字符 char[a=z]

明文字符出现频率
密文字符出现频率

*/

let plaintext = ref('Frailty thy name is woman');
let ciphertext = ref('');

provide('originText', {
  plaintext,
  ciphertext
})
</script>


<style scope>
    body,
      html {
        margin: 0;
        padding: 0;
      }

      h1 {
        margin: 0;
        padding: .5em;
        text-align: center;
        color: rgb(18, 42, 138);
      }
    .container {
      width: 860px;
      margin: 0 auto;
      background-color: rgba(87, 169, 252, 0.838);
    }
  
</style>