import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route'
import { orderRoutes } from '../modules/order/order.route';
import  { MedicintRoutes } from '../modules/medicine/medicine.route';
import   authRouter  from '../modules/auth/auth.router';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/medicines',
    route: MedicinRoutes,
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
