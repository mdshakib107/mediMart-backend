import { Router } from 'express';
import authRouter from '../modules/auth/auth.route';
import { MedicineRoutes } from '../modules/medicine/medicine.route';
import { UserRoutes } from '../modules/user/user.route';
import { OrderRoutes } from '../modules/order/order.route';

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
    route: OrderRoutes,
  },

  {
    path: '/auth',
    route: authRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
