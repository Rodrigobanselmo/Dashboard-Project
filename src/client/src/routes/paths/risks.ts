import { Risks, Periculosidade } from '../../containers/index.js';
import { RISK_FACTORS, RISK_FACTORS_PER, DASHBOARD } from '../routesNames';

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
    // exact: true,
    // isPrivate: true,
    // privateRoute: DASHBOARD,
    // infoUser: ['access'],
    // condition: [['admin', 'master']],
    // Equal: [true],
  },
];
