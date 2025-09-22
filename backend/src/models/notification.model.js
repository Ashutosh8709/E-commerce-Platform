import mongoose, { Schema } from "mongoose";

const notificationSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		type: {
			type: String,
			enum: [
				"order",
				"promo",
				"system",
				"delivery",
				"general",
			],
			default: "general",
		},
		title: {
			type: String,
			required: true,
			trim: true,
		},
		message: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			enum: ["unread", "read", "archived"],
			default: "unread",
		},
		link: {
			type: String,
		},
		isActive: {
			type: Boolean,
			default: true,
		},
	},
	{ timestamps: true }
);

export const Notification = mongoose.model("Notification", notificationSchema);
