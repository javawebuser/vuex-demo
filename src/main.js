import Vue from 'vue'
import App from './App.vue'
import store from './store'

// 1.导入 ant-design-vue
import Antd from 'ant-design-vue'
// 2.导入 ant-design-vue 样式表
import 'ant-design-vue/dist/antd.css'

Vue.config.productionTip = false

Vue.use(Antd)

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
