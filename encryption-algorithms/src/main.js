import { createApp } from 'vue'

// 引入组件
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
const app = createApp(App)

app.use(ElementPlus);
app.mount('#app');