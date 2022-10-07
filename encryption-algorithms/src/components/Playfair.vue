<template>
    Playfair
    <inputform>
    <el-form-item class="inputArea" label="密钥(只能是字母)：">
        <el-input 
        v-model="key" 
        placeholder="请输入密钥，只能是字母字符串" 
        @input="key = key.replace(/[^\a-\z]/g,'')"
        clearable 
        />
    </el-form-item>
    <div class="inputArea">
        <span>填充的字母[a-z]：</span>
        <el-input 
        v-model="fillChar" 
        placeholder="请输入填充字母[a-z]" 
        maxlength="1"
        @input="fillChar = fillChar.replace(/[^\a-\z]/g,'')"  
        clearable />
    </div>
    </inputform>
</template>

<script setup>
import inputform from './Inputform'
import { ref } from 'vue' 

const key = ref('a');
const fillChar = ref('k');



</script>