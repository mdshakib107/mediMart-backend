import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { OrderValidation } from './order.validation'
import { OrderControllers } from './order.controller'

const router = express.Router()

// router.post('/create-order', validateRequest(OrderValidation.orderValidationSchema), OrderControllers.createOrder)
router.get('/', OrderControllers.getAllOrder)
router.patch('/:id',  validateRequest(OrderValidation.updateOrderValidationSchema), OrderControllers.updateSingleOrder)
router.delete('/:id',  OrderControllers.deleteSingleOrder)

router.post('/success/:transactionId', OrderControllers.successOrder)
router.post('/fail/:transactionId', OrderControllers.failOrder)

export const OrderRoutes = router