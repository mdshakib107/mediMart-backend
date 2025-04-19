import { Router } from 'express';
// import { UserRoutes } from '../modules/user/user.route'
// import   authRouter  from '../modules/auth/auth.router';
// import { MedicineRoutes } from '../modules/medicine.route';
import { OrderRoutes } from '../modules/order/order.route';

const router = Router();

const moduleRoutes = [
  // {
  //   path: '/users',
  //   route: UserRoutes,
  // },
  // {
  //   path: '/medicines',
  //   route: MedicineRoutes,
  // },
  {
    path: '/orders',
    route: OrderRoutes,
  },
  
  // {
  //   path: '/auth',
  //   route: authRouter,
  // },
  
  
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
