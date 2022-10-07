<template>
    Hill
    <inputform>
    <div class="inputArea">
        <span>密钥：</span>
        <el-input v-model="input" placeholder="请输入密钥，3*3的数字矩阵，数字用逗号隔开" clearable />
    </div>
    <div class="inputArea">
        <span>填充的字母[a-z]：</span>
        <el-input v-model="input" placeholder="请输入填充字母[a-z]" clearable />
    </div>
    </inputform>
</template>

<script setup>
import inputform from './Inputform'
import { ref } from 'vue' 
const input = ref('')
</script>