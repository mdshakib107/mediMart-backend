import httpStatus from 'http-status';
import config from '../../config/index';
import AppError from '../../errors/AppErrors';
import catchAsync from '../../utils/catchAsync';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';
import { sendResponse } from '../../utils/sendResponse';
import { OrderService } from './order.service';

// const createOrder = catchAsync(async (req, res) => {
// // console.log(req.body);
//   const result = await OrderService.createOrderIntoDB(req.body);

//   // console.log({result});
//   sendResponse.sendCreateDataResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Order is created succesfully',
//     data: result,
//   });
// });

const successOrder = catchAsync(async (req, res) => {
  const { transactionId } = req.params;
  const result = await OrderService.successOrderIntoDB(transactionId);

  if (result.modifiedCount === 0) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Order was not updated');
  }
  return res.redirect(`${config.frontendBaseUrl}/successfull-order`);
});
// fail order
const failOrder = catchAsync(async (req, res) => {
  const { transactionId } = req.params;
  const result = await OrderService.failOrderIntoDB(transactionId);

  if (result.deletedCount === 0) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete order');
  }
  return res.redirect(`${config.frontendBaseUrl}/failed-order`);
});

const getAllOrder = catchAsync(async (req, res) => {
  const result = await OrderService.getAllOrdersFromDB(req.query);
  sendResponse.sendCreateDataResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Got All Order succesfully',
    data: result,
  });
});

const updateSingleOrder = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await OrderService.updateOrderIntoDB(id, req.body);
  sendResponse.sendCreateDataResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order Updated succesfully',
    data: result,
  });
});

const deleteSingleOrder = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await OrderService.deleteOrderFromDB(id);
  sendResponse.sendCreateDataResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order Deleted succesfully',
    data: result,
  });
});

const prescriptionUpload = catchAsync(async (req, res) => {
  // Check if the file is uploaded
  if (!req.file) {
    throw new AppError(httpStatus.BAD_REQUEST, 'No file uploaded.');
  }

  // File info
  const file = req.file;
  // const filePath = file.path; // path where the file is stored locally
  const imageName = `prescription-${Date.now()}`; // Unique name for the uploaded file

  try {
    // Upload to Cloudinary
    // const result = await sendImageToCloudinary(imageName, filePath);

    // Upload to Cloudinary directly from memory (file.buffer)
    const result = await sendImageToCloudinary(imageName, file.buffer);

    // Type assertion for result
    const { secure_url } = result as { secure_url: string };

    // Get the URL of the uploaded image
    const prescriptionUrl = secure_url; // Cloudinary provides a secure URL to the uploaded image

    // Now, associate the uploaded prescription with the order
    const { orderId } = req.body; // Assuming the order ID is sent in the body of the request

    const order = await OrderService.updateOrderPrescription(
      orderId,
      prescriptionUrl
    );
    if (!order) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Order not found or update failed.'
      );
    }

    // Send success response
    sendResponse.sendCreateDataResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Prescription uploaded successfully!',
      data: { prescriptionUrl },
    });
  } catch (error) {
    console.error(error);
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to upload prescription.'
    );
  }
});

export const OrderControllers = {
  //   createOrder,
  getAllOrder,
  updateSingleOrder,
  deleteSingleOrder,
  successOrder,
  failOrder,
  prescriptionUpload,
};
