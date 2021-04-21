import { Risks, Periculosidade, RiskEdit } from '../../containers/index.js';
import {
  RISK_FACTORS,
  RISK_FACTORS_PER,
  RISK_FACTORS_EDIT,
  DASHBOARD,
} from '../routesNames';

export const risks = [
  {
    path: RISK_FACTORS_PER,
    component: Periculosidade,
    exact: true,
    strict: true,
    // isPrivate: true,
    // privateRoute: DASHBOARD,
    // infoUser: ['access'],
    // condition: [['admin', 'master']],
    // Equal: [true],
  },
  {
    path: RISK_FACTORS,
    component: Risks,
    exact: true,
    // isPrivate: true,
    // privateRoute: DASHBOARD,
    // infoUser: ['access'],
    // condition: [['admin', 'master']],
    // Equal: [true],
  },
  {
    path: RISK_FACTORS_EDIT,
    component: RiskEdit,
    exact: true,
    // isPrivate:true,
    // privateRoute:DASHBOARD,
    // infoUser:['access'],
    // condition:[['admin','master']],
    // Equal:[true],
  },
];
