import { Sign, Dashboard, NotFound, NoCompany, inputUserData } from '../pages';
import { SIGN, DASHBOARD, NO_AUTH, GET_USER_DATA } from './routesNames';

const routes = [
  {
    path: SIGN,
    component: Sign,
    routes: [],
    exact: true,
  },
  {
    path: DASHBOARD,
    component: Dashboard,
    // isPrivate: true,
    // privateRoute: GET_USER_DATA, // caso precise de mais rotas criar uma especifica pra isso e mandar um param
    // infoUser: ['name', 'status'],
    // condition: ['', 'Ativo'],
    // Equal: [false, true],
  },
  {
    path: NO_AUTH,
    component: NoCompany,
    // isPrivate: true,
    // privateRoute: SIGN,
  },
  {
    path: GET_USER_DATA,
    component: inputUserData,
    // isPrivate: true,
    // privateRoute: NO_AUTH,
    // infoUser: ['name', 'status'],
    // condition: ['', 'Ativo'],
    // Equal: [true, true],
  },

  {
    path: '*',
    component: NotFound,
  },
];

export default routes;
