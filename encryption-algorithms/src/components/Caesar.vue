<template>
    Caesar
    <inputform @encrypt="encrypt">
       <template v-slot:key-input>
        <el-form-item class="inputArea" label="密钥（移动位数 0~25）：">
            <el-input 
                v-model="key" 
                placeholder="请输入密钥(0~25)" 
                @input="key = key.replace(/[^0-9]/g,'')"
                clearable
             />
        </el-form-item>
       </template>
    </inputform>
</template>

<script setup>
import inputform from './Inputform'
import { ref, inject} from 'vue' 
// Caesar密钥
const key = ref(0);
// 密文,全局变量
const { ciphertext } = inject("originText");

// Caesar加密算法
const useCaesar = (str, key) => {
    let ciphertextArr = new Array;
    let len = str.length;
    for (let i = 0; i < len; i++) {
        // 取得ASCII码,循环增加
        ciphertextArr.push(String.fromCharCode((str.charCodeAt(i) - 65 + key*1 + 26) % 26 + 65))
    }
    let ciphertext = ciphertextArr.join('');
    return ciphertext;
}

const encrypt = (str) => {
    ciphertext.value = useCaesar(str, key.value);
}
    
</script>