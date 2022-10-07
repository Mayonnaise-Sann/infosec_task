<template>
    Playfair
    <inputform @encrypt="encrypt">
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
import { ref, computed, inject } from 'vue' 

const { ciphertext } = inject("originText");

// 密钥，字母字符
const key = ref('cshao');
// 填充字符，单个字母，默认为k
const fillChar = ref('k');

const keyStr = computed(() => {
        return key.value.toUpperCase();
    })
// Playfair加密算法

// 1. 生成字符集-加密矩阵
const createMatrix = (key) => {
    let Arr1 = Array.from(key);
    let Arr2 = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    return Array.from(new Set(Arr1.concat(Arr2)))
}


// 2. 预处理明文
const formatPlaintext = (str) => {
    const arrStr = Array.from(str);
    for (let i = 0; i < arrStr.length; i+=2){
        if (arrStr[i] == arrStr[i + 1]) {        // 两个相同字母相邻
            arrStr.splice(i+1,0,fillChar.value.toUpperCase()) //插入填充字符
        }
        if (arrStr[i] && !arrStr[i + 1]) {       // 字符个数为单数，最后一个补充填充字符
            arrStr.splice(i+1,0,fillChar.value.toUpperCase()) //插入填充字符
        }
    }
    const newStr = arrStr.join('');
    // console.log(newStr)
    return newStr;    //  返回处理过的明文  
}


// 3. Playfaie加密算法
const usePlayfair = (str, key) => {
    const formatText = formatPlaintext(str);
    const matrix = createMatrix(key);
    let s =[];

    for (let i = 0; i < matrix.length; i++){
        s.push(matrix[i]);
        if ((i + 1) % 5 == 0) {
            console.log(s);
            s = [];
        }
    }

    const ciphertextArr = new Array;
    const arrStr = formatText.split("");
    const lenPlain = arrStr.length;   // 处理后的明文长度
    const lenLetterMatrix = matrix.length; // 加密矩阵长度


    let x = '';
    let y = '';
    for (let i = 0; i < lenPlain; i += 2) {
       
        for (let j = 0; j < lenLetterMatrix; j++){
            if (arrStr[i] == matrix[j]) {
                x = j;
            }
            if (arrStr[i + 1] == matrix[j]) {
                y = j;
            }
        }
        if (x+1 != '' && y != '') {
            // 行 
            let row1 = Number.parseInt( x / 5); // 取整
            let row2 =Number.parseInt( y / 5);
            // 列 
            let column1 = x % 5;
            let column2 = y % 5;
            if (row1 == row2) { // 同行
                // 取加密矩阵的同一行下一个字符
                ciphertextArr.push(matrix[(column1 + 1) % 5 + (row1 * 5)])    // 列+1模5 得到新的列，再加上原来的行
                ciphertextArr.push(matrix[(column2 + 1) % 5 + (row2 * 5)])
            } else if (column1 == column2) { // 同列
                // 取加密矩阵的同一列下一个字符
                ciphertextArr.push(matrix[(row1 + 1) % 5 * 5 + column1]) // 行+1再模5 得到新的行，再加上原来的列
                ciphertextArr.push(matrix[(row2 + 1) % 5 * 5 + column2])
            } else { // 对角
                // 无论第一个数在前还是在后， 都先确定行，再确定列
                if (column1 < column2) {
                    // 第一个数在前,
                    ciphertextArr.push(matrix[(x + column2 - column1) % ((row1+1) * 5)])
                    ciphertextArr.push(matrix[(y - column2 + column1) % ((row2+1) * 5)])
                } else {
                    // 第一个数在后
                     ciphertextArr.push(matrix[(x - column1 + column2) % ((row1+1) * 5)])
                    ciphertextArr.push(matrix[(y + column1 - column2) % ((row2+1) * 5)])
                 }
            }
            // 重置当前两个一组的字符的索引
                x = '';
                y = '';
        }
   
    }
    // 密文字符串        
    let ciphertext = ciphertextArr.join('');
    return ciphertext;
}

// 调用加密算法，输出密文
const encrypt = (str) => {
    ciphertext.value = usePlayfair(str, keyStr.value);
}

</script>