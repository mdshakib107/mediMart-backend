import { Types } from "mongoose"
import { paymentStatus, shippingStatus } from "./order.constant"

export type TShippingStatus = typeof shippingStatus[number]
export type TPaymentStatus = typeof paymentStatus[number]

export type TOrderedItem = {
    product: Types.ObjectId,
    quantity: number, 
    price: number
}
 
export type TOrder = {
    products: TOrderedItem[];
    user: Types.ObjectId; 
    totalPrice: number;
    shippingStatus: TShippingStatus;
    paymentStatus: TPaymentStatus
    transactionId?: string; 
    isDeleted?: boolean;
    city?: string;
    shippingAddress?: string;
    createdAt?: Date;
    updatedAt?: Date;
}