import { model, Schema } from "mongoose";
import { paymentStatus, shippingStatus } from "./order.constant";
import { TOrder, TOrderedItem } from "./order.interface";

const orderItemSchema = new Schema<TOrderedItem>({
    product: { type: Schema.Types.ObjectId, ref: 'Medicine', required: [true, 'Product is required'] },
    quantity: {
        type: Number, required: [true, 'Quantity is required'],
        min: [1, 'Quantity must be at least 1']
    },
    price: { 
        type: Number, required: [true, 'Price is required'],
        min: [0, 'Price cannot be negative']
    }
})

const orderSchema = new Schema<TOrder>({
    products: [orderItemSchema],
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    totalPrice: { 
        type: Number,
        required: [true, 'Total price is required'],
        min: [0, 'Total price cannot be negative'] 
    },
    shippingStatus: {
        type: String,
        enum: shippingStatus,
        default: 'PENDING'
    },
    paymentStatus: {
        type: String,
        enum: paymentStatus,
        default: 'UNPAID'
    },
    transactionId: String,
    isDeleted: { type: Boolean, default: false },
},
    {
        timestamps: true
    }
)


export const Order = model<TOrder>('Order', orderSchema)