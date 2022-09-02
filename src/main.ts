import { createApp } from 'vue';
// pinia 代替 vuex  mian中引入 pinia
import pinia from '/@/stores/index';
import App from './App.vue';
import router from './router';
// 导入自定义指令
import { directive } from '/@/utils/directive';
// 导入多语言包
import { i18n } from '/@/i18n/index';
// 导入其他工具包
import other from '/@/utils/other';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
// 导入全局样式
import '/@/theme/index.scss';
// 类似 Vue2 中的 Eventbus
import mitt from 'mitt';
import VueGridLayout from 'vue-grid-layout';

const app = createApp(App);

// 全局注册自定义指令
directive(app);

other.elSvg(app);

app.use(pinia).use(router).use(ElementPlus, { i18n: i18n.global.t }).use(i18n).use(VueGridLayout).mount('#app');

// 将 mitt 挂载在全局属性上面
app.config.globalProperties.mittBus = mitt();
