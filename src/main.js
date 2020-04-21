import Vue from 'vue'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/ja'
import 'element-ui/lib/theme-chalk/index.css'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'

import App from './App.vue'

Vue.config.productionTip = false
Vue.use(ElementUI, { locale })
Vue.component('v-icon', Icon)

new Vue({
  render: h => h(App),
}).$mount('#app')
