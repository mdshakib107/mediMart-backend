import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { OrderValidation } from './order.validation'
import { OrderControllers } from './order.controller'
import { upload } from 'src/app/utils/sendImageToCloudinary'

const router = express.Router()

// router.post('/create-order', validateRequest(OrderValidation.orderValidationSchema), OrderControllers.createOrder)
router.get('/', OrderControllers.getAllOrder)
router.patch('/:id',  validateRequest(OrderValidation.updateOrderValidationSchema), OrderControllers.updateSingleOrder)
router.delete('/:id',  OrderControllers.deleteSingleOrder)

router.post('/success/:transactionId', OrderControllers.successOrder)
router.post('/fail/:transactionId', OrderControllers.failOrder)

router.post('/upload-prescription', upload.single('prescription'), OrderControllers.prescriptionUpload);

export const OrderRoutes = router