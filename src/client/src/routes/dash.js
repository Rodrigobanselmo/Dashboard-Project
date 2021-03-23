import { Team, Perfil,Companies,Excel } from '../containers';
import {TEAM,USER,DASHBOARD,COMPANY,DATA,TESTE} from './routesNames'

import Teste from '../Test/index.tsx';

const routes = [
  {
    path: DASHBOARD,
    component: Excel,
    exact:true,
  },
  {
    path: TEAM,
    component: Team,
    exact:true,
    isPrivate:true,
    privateRoute:DASHBOARD,
    infoUser:['access'],
    condition:[['admin','master']],
    Equal:[true],
  },
  {
    path: COMPANY,
    component: Companies,
    exact:true,
    isPrivate:true,
    privateRoute:DASHBOARD,
    infoUser:['access'],
    condition:[['admin','master']],
    Equal:[true],
  },
  {
    path: USER,
    component: Perfil,
    exact:true
  },
  {
    path: DATA,
    component: Excel,
    exact:true,
    isPrivate:true,
    privateRoute:DASHBOARD,
    infoUser:['access'],
    condition:[['admin','master']],
    Equal:[false],
  },

  {
    path: TESTE,
    component: Teste,
    exact:true,
  },
];


export default routes

