import Vue from 'vue'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/ja'
import 'element-ui/lib/theme-chalk/index.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import App from './App.vue'
import JIconButton from '@/components/atoms/JIconButton'
import JTaskLine from '@/components/molecules/JTaskLine'

library.add(fas, far, fab)

Vue.config.productionTip = false
Vue.use(ElementUI, { locale })
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('j-icon-button', JIconButton)
Vue.component('j-task-line', JTaskLine)

new Vue({
  render: h => h(App),
}).$mount('#app')
