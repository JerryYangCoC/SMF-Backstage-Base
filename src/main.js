import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import components from '@/components/index'

import '@vuepic/vue-datepicker/dist/main.css'
import 'normalize.css/normalize.css'

import PrimeVue from "primevue/config";
import { SetupCalendar, Calendar, DatePicker } from "v-calendar";
import axios from 'axios'
import VueAxios from 'vue-axios'
import Datepicker from '@vuepic/vue-datepicker';
import { dragscrollNext } from "vue-dragscroll";
import VueClipboard from 'vue3-clipboard'
import Tooltip from 'primevue/tooltip';
import { MonthPicker } from 'vue-month-picker'
import { MonthPickerInput } from 'vue-month-picker'
import Highcharts from 'highcharts'
import HighchartsVue from 'highcharts-vue'

// import './index.css'

require('highcharts/highcharts-more.js')(Highcharts);

router.beforeEach(async (to, from, next) => {
  
  const token = sessionStorage.getItem('token')
  // const access = sessionStorage.getItem('access_token')
  // const id = sessionStorage.getItem('id_token')

  let config = {
    headers: {
        'access-token': token,
    },
  };
  let data = ''


 await axios
  .post('https://ssp.retailing-data.net/api/auth/verifytoken', data, config)
  .then((res) =>{
    console.log("檢驗token", res);
    sessionStorage.setItem("tokenVerify", "ImLogin");
    sessionStorage.setItem("name", res.data.username);
  })
  .catch((err) => {
    sessionStorage.setItem("tokenVerify", "ImNotLogin");
    console.log("檢驗token有誤,過期");
    console.log(err);
  });

  const isLogin = sessionStorage.getItem('tokenVerify') == 'ImLogin';
  if (isLogin) {
    if (to.path === '/Login' || to.path === '/') {
      next('/Overview')
    } else {
      next();
    }
  } else {
    console.log(to.path)
    if (to.path === '/Login') {
      console.log(from)
      next()
    // } else if (to.path === '/ForgotPassword') {
    //   console.log(from)
    //   next()
    // } else if (to.path === '/ResetPassword') {
    //   console.log(from)
    //   next()
    } else if (to.path != '/ForgotPassword' || to.path != '/Login' || to.path != '/ResetPassword') {
      console.log(from)
      next('/Login')
    } else {
      next()

    }
  }




});


createApp(App).use(store).use(router).use(PrimeVue, { zIndex: { tooltip: 5000 } })
  .use(SetupCalendar, {})
  .use(VueAxios, axios)
  .use(MonthPicker)
  .use(MonthPickerInput)
  .use(VueClipboard, {
    autoSetContainer: true,
    appendToBody: true,
  })
  .use(HighchartsVue, {
    highcharts: Highcharts
  })
  .use(components)
  .component('Calendar', Calendar)
  .component('DatePicker', DatePicker)
  .component('Datepicker', Datepicker)
  .directive('dragscroll', dragscrollNext)
  .directive('tooltip', Tooltip)
  .mount('#app')
