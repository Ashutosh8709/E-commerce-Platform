import mongoose, { Schema } from "mongoose";

const cartSchema = new Schema({
	owner: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
	products: [
		{
			productId: {
				type: Schema.Types.ObjectId,
				ref: "Product",
			},
			quantity: {
				type: Number,
				required: true,
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
		},
	],
	discount: Number,
	promoCode: String,
	status: {
		type: String,
		enum: ["active", "ordered", "abandoned"],
		default: "active",
	},
	savedForLater: {
		type: Schema.Types.ObjectId,
		ref: "Product",
	},
});

export const Cart = mongoose.model("Cart", cartSchema);
