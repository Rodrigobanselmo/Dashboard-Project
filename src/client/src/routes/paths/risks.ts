import { Risks } from '../../containers/index.js';
import { RISK_FACTORS, DASHBOARD } from '../routesNames';

export const risks = [
  {
    path: RISK_FACTORS,
    component: Risks,
    exact: true,
    isPrivate: true,
    privateRoute: DASHBOARD,
    infoUser: ['access'],
    condition: [['admin', 'master']],
    Equal: [true],
  },
];
