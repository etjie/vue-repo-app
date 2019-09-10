import Home from './containers/Home.vue';
import Project from './containers/Project.vue';
import Detail from './containers/Detail.vue';

const routes = [
    {
        path: '/', 
        name: 'main', 
        component: Home,
    },
    {
        path: '/:username', 
        name: 'project', 
        component: Project,
    },
    {   path: '/:username/:repo', 
        name: 'detail', 
        component: Detail,
    },
]

export default routes;