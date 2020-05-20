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
import JModal from '@/components/atoms/JModal'
import JSwitch from '@/components/atoms/JSwitch'
import JTableHeader from '@/components/molecules/JTableHeader'
import JTableLine from '@/components/molecules/JTableLine'

library.add(fas, far, fab)

Vue.config.productionTip = false
Vue.use(ElementUI, { locale })
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('j-icon-button', JIconButton)
Vue.component('j-modal', JModal)
Vue.component('j-switch', JSwitch)
Vue.component('j-table-header', JTableHeader)
Vue.component('j-table-line', JTableLine)

Vue.filter('truncate', (value, length, omission) => {
  const filterLength = length ? parseInt(length, 10) : 5
  const filterOmission = omission ? omission.toString() : '...'
  if (value.length <= filterLength) return value
  return value.substring(0, filterLength) + filterOmission
})

new Vue({
  render: h => h(App),
}).$mount('#app')
