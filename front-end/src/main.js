import Vue from 'vue'
import App from './App.vue'
// import ElementUI from 'element-ui'
import { Button, Select, Main, Header, Container, Table, TableColumn, Form, Dialog, Input, FormItem } from 'element-ui';

Vue.config.productionTip = false
Vue.use(Button)
Vue.use(Select)
Vue.use(Main)
Vue.use(Header)
Vue.use(Container)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Form)
Vue.use(Dialog)
Vue.use(Input)
Vue.use(FormItem)
new Vue({
  render: h => h(App),
}).$mount('#app')
