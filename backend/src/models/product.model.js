import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
	{
		sellerId: {
			type: Schema.Types.ObjectId,
			ref: "Seller",
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		originalPrice: {
			type: Number,
			required: true,
		},
		offeredPrice: {
			type: Number,
			required: true,
		},
		stock: {
			type: Number,
			required: true,
			min: 0,
		},
		colors: [{ type: String }],
		categoryId: {
			type: Schema.Types.ObjectId,
			ref: "Category",
			required: true,
		},
		productImages: [
			{
				type: String,
				required: true,
			},
		],
	},
	{ timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
