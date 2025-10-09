import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema(
	{
		productId: {
			type: Schema.Types.ObjectId,
			ref: "Product",
			index: true,
		},
		owner: {
			type: Schema.Types.ObjectId,
			ref: "User",
			index: true,
		},
		rating: {
			type: Number,
			min: 1,
			max: 5,
			default: 1,
		},
		title: {
			type: String,
			required: true,
		},
		comment: {
			type: String,
			required: true,
		},
		image: { type: String },
	},
	{ timestamps: true }
);

reviewSchema.index({ productId: 1, owner: 1 }, { unique: true });

export const Review = mongoose.model("Review", reviewSchema);
