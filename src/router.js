import Home from './containers/Home.vue';
import Project from './containers/Project.vue';
import About from './containers/About.vue';

const routes = [
    {path: '/', name: 'index', component: Home},
    {path: '/:username', name: 'project', component: Project},
    {path: '/about/', name: 'about', component: About},
]

export default routes;