import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { OrderValidation } from './order.validation'
import { OrderControllers } from './order.controller'
import auth from 'src/app/middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import { upload } from 'src/app/utils/sendImageToCloudinary';

const router = express.Router()

// router.post('/create-order',  auth( USER_ROLE.admin,USER_ROLE.customer),
//   upload.single('file'),
//   (req: Request, res: Response, next: NextFunction) => {
//     req.body = JSON.parse(req.body.data);
//     next();
//   }, validateRequest(OrderValidation.orderValidationSchema), OrderControllers.createOrder)

router.get('/', OrderControllers.getAllOrder)
router.patch('/:id',  validateRequest(OrderValidation.updateOrderValidationSchema), OrderControllers.updateSingleOrder)
router.delete('/:id',  OrderControllers.deleteSingleOrder)

router.post('/success/:transactionId', OrderControllers.successOrder)
router.post('/fail/:transactionId', OrderControllers.failOrder)

router.post('/upload-prescription', upload.single('prescription'), OrderControllers.prescriptionUpload);

export const OrderRoutes = router
