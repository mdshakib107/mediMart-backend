import express from 'express';

import { upload } from '../../utils/sendImageToCloudinary';
import validateRequest from '../../middlewares/validateRequest';

import { OrderControllers } from './order.controller';
import { OrderValidation } from './order.validation';

const router = express.Router();

// router.post('/create-order',  auth( USER_ROLE.admin,USER_ROLE.customer),
//   upload.single('file'),
//   (req: Request, res: Response, next: NextFunction) => {
//     req.body = JSON.parse(req.body.data);
//     next();
//   }, validateRequest(OrderValidation.orderValidationSchema), OrderControllers.createOrder)

router.get('/', OrderControllers.getAllOrder);
router.patch(
  '/:id',
  validateRequest(OrderValidation.updateOrderValidationSchema),
  OrderControllers.updateSingleOrder
);
router.delete('/:id', OrderControllers.deleteSingleOrder);

router.post('/success/:transactionId', OrderControllers.successOrder);
router.post('/fail/:transactionId', OrderControllers.failOrder);

router.post(
  '/upload-prescription',
  upload.single('prescription'),
  OrderControllers.prescriptionUpload
);

export const OrderRoutes = router;
