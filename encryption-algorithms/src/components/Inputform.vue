<template>
    <el-form >
        <el-form-item class="inputArea" label="明文" prop="plaintext">
           <el-input
           v-model="plaintext"
           :rows="3"
           type="textarea"
           placeholder="请输入明文"
           @input="plaintext = plaintext.replace(/[^\a-\z\A-\Z\s]/g,'')"
         />
        </el-form-item>
         <slot name="key-input"></slot>
         <el-form-item>
             <el-button type="primary" id="encryption" @click="encrypt">点击加密</el-button>
         </el-form-item>
         <slot name="matrix"></slot>
        <div class="inputArea">
            <span>输出密文：</span>
            <p id="ciphertext">{{ciphertext}}</p>
        </div>
    </el-form>
</template>

<script setup>
import { inject, defineEmits, computed } from 'vue'
    

    const { plaintext, ciphertext } = inject('originText')

    // 将原始输入的字符格式化为大写字母
    const str = computed(() => {
        return plaintext.value.toUpperCase().split(' ').join('');
    })
    // 父子组件通信
    const emit = defineEmits(['encrypt'])
    const encrypt = () => {
        emit('encrypt', str.value);
    }

</script>

<style scope>
    .inputArea {
        margin-bottom: 2em;
    }

    #ciphertext {
        width: 99%;
        min-height: 60px;
        border-radius: 5px;
        padding: .5em;
        margin: 0;
        /* overflow: scroll; */
        border: 1px solid skyblue;
        word-wrap: break-word;
        word-break: normal;

    }
    #encryption {
        margin-bottom: 2em;
       
    }
</style>