import Home from './containers/Home.vue';
import Project from './containers/Project.vue';
import Detail from './containers/Detail.vue';

const routes = [
    {path: '/', name: 'main', component: Home, meta: {
        title: 'Homepage - Find Repos'
    }},
    {path: '/:username', name: 'project', component: Project, meta: {
        title: 'Project - View all projects'
    }},
    {path: '/:username/:repo', name: 'detail', component: Detail, meta: {
        title: 'Detail - View project README.md and contents.'
    }},
]

export default routes;