<template>
<div class="container"> 
   <div class="common-layout">
        <el-container>
          <el-header>
            <h1>信安第四次作业-加密算法</h1>
          </el-header>
          <el-container>
            <el-container style="width: 760px">
            <el-main >
              <el-card >
                <el-tabs type="border-card" @tab-change="handleClick"  model-value='caesar'>
                    <!-- 1. 凯撒算法 -->
                    <el-tab-pane label="caesar" name="caesar">
                      <caesar ></caesar>
                    </el-tab-pane>
                    <!-- 2. playfair加密算法 -->
                    <el-tab-pane label="playfair" name="playfair">
                      <playfair  ></playfair>
                    </el-tab-pane>
                    <!-- 3. 希尔加密算法 -->
                    <el-tab-pane label="hill" name="hill">
                      <hill ></hill>
                    </el-tab-pane>
                </el-tabs>
              </el-card>
            </el-main>
            </el-container>
            <el-container>
              <el-main>
              <frequency-chat></frequency-chat>
              </el-main>
            </el-container>
          </el-container>
        </el-container>
      </div>


  </div>
</template>

<script setup>
import Caesar from './components/Caesar'
import Playfair from './components/Playfair'
import Hill from './components/Hill'
import FrequencyChat from './components/FrequencyChat'


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

let plaintext = ref('The wheel turns nothing is ever new');
let ciphertext = ref('');

provide('originText', {
  plaintext,
  ciphertext
})


const handleClick = () => {
  ciphertext.value = '';
}
</script>

<style scope>
    body,
      html {
        margin: 0;
        padding: 0;
      }

      h1 {
        margin: 0;
        padding: .8em 0;
        font-size: 30px;
        
        text-align: center;
        color: rgb(18, 42, 138);
      }
    .container {
      width: 100%;
      margin: 0 auto;
      background-color: rgba(203, 228, 253, 0.838);
    }
  
</style>