import mongoose, { Schema } from "mongoose";

const wishlistSchema = new Schema(
	{
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
				addedAt: {
					type: Date,
					default: Date.now,
				},
				note: String,
			},
		],
		status: {
			type: String,
			enum: ["active", "archived"],
			default: "active",
		},
	},
	{ timestamps: true }
);

export const Wishlist = mongoose.model("Wishlist", wishlistSchema);
