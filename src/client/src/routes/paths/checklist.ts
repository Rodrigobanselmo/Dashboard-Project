import { ChecklistManager } from '../../containers/index.js';
import { CHECKLIST_MANAGER } from '../routesNames';

export const checklist = [
  {
    path: CHECKLIST_MANAGER,
    component: ChecklistManager,
    exact: true,
    strict: true,
    // isPrivate: true,
    // privateRoute: DASHBOARD,
    // infoUser: ['access'],
    // condition: [['admin', 'master']],
    // Equal: [true],
  },
];
