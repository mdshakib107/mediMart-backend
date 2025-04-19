import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route'
import { orderRoutes } from '../modules/order/order.route';
import { MedicineRoutes } from '../modules/medicine.route';
import authRouter from '../modules/auth/auth.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/medicines',
    route: MedicineRoutes,
  },
  {
    path: '/orders',
    route: orderRoutes,
  },
  
  {
    path: '/auth',
    route: authRouter,
  },
  
  
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
