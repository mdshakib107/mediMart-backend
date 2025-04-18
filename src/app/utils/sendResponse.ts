import { Response } from 'express';
import httpStatus from 'http-status';


type TResponse<T> = {
  status?: boolean
  statusCode: number;
  success: boolean;
  message: string;
  token?:string
  data: T | T[] | null
};
const sendDataResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data?.statusCode).json({
    success: data.success,
    message: data.message,
    statusCode: httpStatus.OK,
    data: data.data,
  });
};
const sendCreateDataResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data?.statusCode).json({
    success: data.success,
    message: data.message,
    statusCode: httpStatus.CREATED,
    token:data.token,
    data: data.data,
  });
};
const sendUpdateResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data.statusCode).json({
    success: data.success,
    message: data.message,
    statusCode: httpStatus.OK,
    data: data.data,
  });
};


export const sendResponse = {
 sendDataResponse,
 sendUpdateResponse,
 sendCreateDataResponse
};