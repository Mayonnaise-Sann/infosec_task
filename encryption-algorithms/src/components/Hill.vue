<template>
    Hill
    <inputform>
    <div class="inputArea">
        <span>密钥：</span>
        <el-input v-model="key" placeholder="请输入密钥，3*3的数字矩阵，数字用逗号隔开" clearable />
    </div>
    <div class="inputArea">
        <span>填充的字母[a-z]：</span>
        <el-input v-model="fillChar" placeholder="请输入填充字母[a-z]" clearable />
    </div>
    </inputform>
</template>

<script setup>
import inputform from './Inputform'
import { ref } from 'vue' 

// 密钥，字母字符
const key = ref('cshao');
// 填充字符，单个字母，默认为k
const fillChar = ref('k');


</script>