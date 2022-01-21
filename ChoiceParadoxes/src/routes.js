import Home from './components/Home.vue';
import MontyHall from './components/MontyHall.vue';
import BertrandsBox from './components/BertrandsBox.vue';

const routes = [
    { path: '/', component: Home, name: 'home' },
    { path: '/mh', component: MontyHall },
    { path: '/bb', component: BertrandsBox },
];

export default routes;