import './style.css';
import 'ant-design-vue/dist/antd.css';
import App from './App.vue';
import { createApp } from 'vue';
import router from './router/router';
import plugins from './plugins';
const app = createApp(App);
import RunSvg from 'run-svg';
import 'run-svg/style.css';
import { setupGlobDirectives } from './directive/index' 
setupGlobDirectives(app);
app.use(router).use(plugins).use(RunSvg).mount('#app');
