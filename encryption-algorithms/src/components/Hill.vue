<template>
    Hill
    <inputform @encrypt="encrypt">
    <el-form-item class="inputArea" label="密钥：">
        <el-input v-model="key" placeholder="请输入密钥，3*3的数字矩阵，数字用逗号隔开" 
        maxlength="17"
        @input="key = key.replace(/[^0-9\,\，]/g,'').replace(/[\，]/g,',')"
        clearable
         />
    </el-form-item>
    <el-form-item>
        <el-button type="primary" id="randomKey" @click="getRandomKey">生成随机密钥</el-button>
    </el-form-item>
    <el-form-item class="inputArea" label="填充的字母[a-z]：">
        <el-input v-model="fillChar" placeholder="请输入填充字母[a-z]" clearable />
    </el-form-item>
    </inputform>
</template>

<script setup>
import inputform from './Inputform'
import { ref, computed, inject } from 'vue' 
// 密文,全局变量
const { ciphertext } = inject("originText");
// 密钥，字母字符
const key = ref('1,2,3,4,5,6,7,8,9');
// 填充字符，单个字母，默认为k
const fillChar = ref('k');

 
// 将输出的密钥字符串转化为矩阵数组 keyArr
const keyArr = computed(() => key.value.split(','))

const getRandomKey = () => {
    let arr = [];
    for (let i = 0; i < 9; i++){
        const ranInt = parseInt(Math.random() * (255), 10);  // 随机 0 - 255 的整数
        key.value = arr.push(ranInt);
    }
    key.value = arr.join(',');
}
// Caesar加密算法
const useHill = (str, keyArr) => {
    let ciphertextArr = new Array;
    // let len = str.length;
    // str = str.split('');
    for (let i = 0; i < str.length; i += 3){
        if (!str[i + 1]) {
            str += fillChar.value.toUpperCase();
            // str.push(fillChar.value.toUpperCase()) ;
            console.log('i+1')
        }
        if (!str[i + 2]) {
            str += fillChar.value.toUpperCase();
            console.log('i+2' + str.charCodeAt(i + 2))

        }
        // k-10
        for (let j = 0; j < 7; j += 3){
            let k = (((str.charCodeAt(i) - 65) * keyArr[j]) + ((str.charCodeAt(i + 1) - 65) * keyArr[j + 1]) + ((str.charCodeAt(i + 2) - 65) * keyArr[j + 2])) % 26
            ciphertextArr.push(String.fromCharCode(k + 65));
        }
    }
    
    return ciphertextArr.join('');
}

const encrypt = (str) => {
    ciphertext.value = useHill(str, keyArr.value);
    
}
    

</script>