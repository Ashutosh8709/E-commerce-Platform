import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
	productId: {
		type: Schema.Types.ObjectId,
		ref: "Product",
		required: true,
	},
	quantity: {
		type: Number,
		required: true,
		min: 1,
		default: 1,
	},
	priceAtAddition: {
		type: Number,
		required: true,
	},
	color: {
		type: String,
	},
	size: {
		type: String,
	},
});

const cartSchema = new Schema(
	{
		owner: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		products: [productSchema],
		discount: Number,
		promoCode: String,
		status: {
			type: String,
			enum: ["active", "ordered", "abandoned"],
			default: "active",
		},
		savedForLater: [
			{
				type: Schema.Types.ObjectId,
				ref: "Product",
			},
		],
		totalAmount: { type: Number, default: 0 },
	},
	{ timestamps: true }
);

export const Cart = mongoose.model("Cart", cartSchema);
