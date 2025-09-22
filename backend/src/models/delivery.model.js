import mongoose, { Schema } from "mongoose";

const deliverySchema = new Schema(
	{
		orderId: {
			type: Schema.Types.ObjectId,
			ref: "Order",
			required: true,
		},
		agentId: {
			type: Schema.Types.ObjectId,
			ref: "DeliveryAgent",
			required: true,
		},
		status: {
			type: String,
			enum: [
				"Delivered",
				"Cancelled",
				"Out For Delivery",
				"Pending",
				"In Transit",
				"Failed",
			],
			default: "Pending",
			required: true,
		},
		currentLocation: {
			type: String,
			required: true,
		},
		estimatedArrival: {
			type: Date,
			required: true,
		},
		actualDeliveryTime: {
			type: Date,
		},
	},
	{ timestamps: true }
);
