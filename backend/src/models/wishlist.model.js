import mongoose, { Schema } from "mongoose";

const wishlistProductSchema = new Schema({
	productId: {
		type: Schema.Types.ObjectId,
		ref: "Product",
		required: true,
	},
	addedAt: {
		type: Date,
		default: Date.now,
	},
	color: {
		type: String,
	},
	size: {
		type: String,
	},
	quantity: {
		type: Number,
		min: 1,
		default: 1,
	},
	note: String,
});

const wishlistSchema = new Schema(
	{
		owner: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
			index: true,
		},
		products: [wishlistProductSchema],
		status: {
			type: String,
			enum: ["active", "archived"],
			default: "active",
		},
	},
	{ timestamps: true }
);

export const Wishlist = mongoose.model("Wishlist", wishlistSchema);
