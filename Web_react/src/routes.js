import BasicLayout from '@/layouts/BasicLayout';
import Dashboard from '@/pages/Dashboard';
import HistoryList from '@/pages/History';
import UserLayout from './layouts/UserLayout';
import Login from '@/pages/Login';

const routerConfig = [
  {
    path:'/login',
    component:UserLayout,
    children:[
      {
        path:'/',
        component:Login,
      },
    ],
  },
  {
    path: '/',
    component: BasicLayout,
    children: [
      {
        path: '/history',
        component: HistoryList,
      },
      {
        path: '/home',
        component: Dashboard,
      },
    ],
  },
];
export default routerConfig;
