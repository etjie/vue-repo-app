import Home from './containers/Home.vue';
import About from './containers/About.vue';

const routes = [
    {path: '/', name: 'index', component: Home},
    {path: '/about/', name: 'about', component: About},
]

export default routes;