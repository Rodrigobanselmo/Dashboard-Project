import { Team, Perfil,Companies,Excel,CompaniesEdit,ImportExcel,Home } from '../containers';
import {TEAM,USER,DASHBOARD,COMPANY,DATA,TESTE,COMPANY_EDIT,IMPORT} from './routesNames'
import {risks} from './paths/risks'

import Teste from '../Test/index';

const routes = [
  {
    path: DASHBOARD,
    component: Home,
    exact:true,
  },
  {
    path: TEAM,
    component: Team,
    exact:true,
    //isPrivate:true,
    //privateRoute:DASHBOARD,
    //infoUser:['access'],
    //condition:[['admin','master']],
    //Equal:[true],
  },
  {
    path: COMPANY,
    component: Companies,
    exact:true,
    // isPrivate:true,
    // privateRoute:DASHBOARD,
    // infoUser:['access'],
    // condition:[['admin','master']],
    // Equal:[true],
  },
  {
    path: COMPANY_EDIT,
    component: CompaniesEdit,
    exact:true,
    // isPrivate:true,
    // privateRoute:DASHBOARD,
    // infoUser:['access'],
    // condition:[['admin','master']],
    // Equal:[true],
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
    // isPrivate:true,
    // privateRoute:DASHBOARD,
    // infoUser:['access'],
    // condition:[['admin','master']],
    // Equal:[false],
  },
  {
    path: IMPORT,
    component: ImportExcel,
    exact:true,
    // isPrivate:true,
    // privateRoute:DASHBOARD,
    // infoUser:['access'],
    // condition:[['admin','master']],
    // Equal:[false],
  },

  {
    path: TESTE,
    component: Teste,
    exact:true,
  },
  ...risks
];


export default routes

