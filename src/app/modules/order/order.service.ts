import { UserServices } from '../user/user.service';
import { TOrder } from './order.interface';
import { Order } from './order.model';
import SSLCommerzPayment from 'sslcommerz-lts';
import { v4 as uuidv4 } from 'uuid';
import AppError from '../../errors/AppErrors';
import httpStatus from 'http-status'
import mongoose, { Types } from 'mongoose';
import config from '../../config';  


// const createOrderIntoDB = async (payload: TOrder) => {
//     // console.log(payload);
//     const session = await mongoose.startSession();


//     try {
//         session.startTransaction();
//         const user_id = payload.user.toString();
//         const productId = payload.products[0].product;
//         const orderQuantity = payload.products[0].quantity;

//         const DBuser = await UserServices.getSingleUser(user_id);
//         const transactionId = `${uuidv4()}-${Date.now()}`;

//         const product = await Product.findById(productId);

//         if (!product) {
//             throw new AppError(httpStatus.NOT_FOUND, 'Product not found');
//         }

//         if (product.quantity === 0) {
//             throw new AppError(httpStatus.BAD_REQUEST, 'Product is out of stock');
//         }

//         if (product.quantity < orderQuantity) {
//             throw new AppError(httpStatus.BAD_REQUEST, 'Not enough stock available');
//         }

//         const data = {
//             total_amount: payload.totalPrice,
//             currency: 'BDT',
//             tran_id: transactionId,
//             success_url: `${process.env.API_BASE_URL}/api/orders/success/${transactionId}`,
//             fail_url: `${process.env.API_BASE_URL}/api/orders/fail/${transactionId}`,
//             cancel_url: `${process.env.API_BASE_URL}/api/orders/cancel/${transactionId}`,
//             ipn_url: 'http://localhost:3030/ipn',
//             shipping_method: 'NO',
//             product_name: product.name,
//             product_category: 'Physical Goods',
//             product_profile: 'general',
//             // cus_name: DBuser?.name,
//             // cus_email: DBuser?.email,
//             cus_add1: 'Dhaka',
//             cus_add2: 'Dhaka',
//             cus_city: 'Dhaka',
//             cus_state: 'Dhaka',
//             cus_postcode: '1000',
//             cus_country: 'Bangladesh',
//             cus_phone: '01711111111',
//             cus_fax: '01711111111',
//             ship_name: 'Customer Name',
//             ship_add1: 'Dhaka',
//             ship_add2: 'Dhaka',
//             ship_city: 'Dhaka',
//             ship_state: 'Dhaka',
//             ship_postcode: 1000,
//             ship_country: 'Bangladesh',
//         };

//         const sslcz = new SSLCommerzPayment(
//             config.store_id!,
//             config.store_pass!,
//             config.is_live
//         );

//         const apiResponse = await sslcz.init(data);
//         const GatewayPageURL = apiResponse.GatewayPageURL;

//         const orderData = { ...payload, transactionId };
//         const createdOrder = await Order.create([orderData], { session });

//         await Product.findByIdAndUpdate(
//             productId,
//             { $inc: { quantity: -orderQuantity } },
//             { session }
//         );

//         await session.commitTransaction();
//         session.endSession();

//         return {
//             GatewayPageURL,
//             order: createdOrder[0]
//         };

//     } catch (error) {
//         await session.abortTransaction();
//         session.endSession();
//         throw error;
//     }
// };

const successOrderIntoDB = async (transactionId: string) => {
    // Find the order with the given transactionId
    const order = await Order.findOne({ transactionId });

    if (!order) {
        throw new AppError(httpStatus.NOT_FOUND, 'No order found with this transaction ID');
    }

    // Update the order status to processing and payment status to paid
    const updatedRwsult = await Order.updateOne(
        { transactionId },
        {
            status: 'PROCESSING',
            paymentStatus: 'PAID'
        },
        { new: true }
    )

    if (updatedRwsult.modifiedCount === 0) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Order was not updated');
    }


    return updatedRwsult;
}

const failOrderIntoDB = async (transactionId: string) => {
    // delete the order with the given transactionId
    const deleteOrder = await Order.deleteOne({ transactionId });


    if (deleteOrder.deletedCount === 0) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete order');
    }


    return deleteOrder;
}




const getAllOrdersFromDB = async (query: Record<string, unknown>) => {
    let page = Number(query.page) || 1; // Default to page 1 if not provided
    let limit = Number(query.limit) || 10; // Default to 10 items per page if not provided
    const skip = (page - 1) * limit;
    const userId = query.id as string

    // filter object
    const filter: Record<string, unknown> = {
        isDeleted: { $ne: true }
    };
    if (userId) {
        filter.user = userId
    }
    // console.log(filter);
    // exclude the deleted orders



    const result = await Order.find(filter)
        .populate('user')
        .populate('products.product')
        .skip(skip)
        .limit(limit);

    const totalOrders = await Order.countDocuments(filter);
    return {
        data: result,
        totalOrders,
        totalPages: Math.ceil(totalOrders / limit),
        currentPage: page,
    };
};

const updateOrderIntoDB = async (id: string, payload: Partial<TOrder>) => {
    const shippingStatus = payload.shippingStatus;
    const result = await Order.findByIdAndUpdate(id, { shippingStatus }, { new: true });
    return result;
};
const deleteOrderFromDB = async (id: string) => {
    const result = await Order.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true },
    );
    return result;
};

const updateOrderPrescription = async (orderId: Types.ObjectId, prescriptionUrl: string) => {
  try {
    const order = await Order.findByIdAndUpdate(
      orderId,
      { prescriptionUrl }, // Update the prescriptionUrl
      { new: true } // Return the updated order
    );

    if (!order) {
      throw new AppError(httpStatus.NOT_FOUND, 'Order not found');
    }

    return order;
  } catch (error) {
    console.error(error);
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to update order');
  }
};

export const OrderService = {
    getAllOrdersFromDB,
    // createOrderIntoDB,
    updateOrderIntoDB,
    deleteOrderFromDB,
    successOrderIntoDB,
    failOrderIntoDB,
    updateOrderPrescription,
};
