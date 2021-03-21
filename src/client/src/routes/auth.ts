import { NotFound } from '../pages';

const routes = [
  {
    path: '*',
    component: NotFound,
    isPrivate: true,
  },
];

export default routes;
