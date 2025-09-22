import mongoose, { Schema } from "mongoose";

const addressSchema = new Schema(
	{
		owner: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
			index: true,
		},
		name: {
			type: String,
			required: true,
			trim: true,
		},
		phone: {
			type: String,
			required: true,
			minLength: 10,
			maxLength: 15,
		},
		email: {
			type: String,
			required: true,
			lowercase: true,
		},
		street: {
			type: String,
			trim: true,
		},
		city: {
			type: String,
			trim: true,
		},
		state: {
			type: String,
			trim: true,
		},
		country: {
			type: String,
			trim: true,
		},
		postalCode: {
			type: String,
			trim: true,
		},
		isDefault: {
			type: Boolean,
			default: true,
		},
		label: {
			type: String,
			trim: true,
		},
		isActive: {
			type: Boolean,
			default: true,
		},
	},
	{ timestamps: true }
);

export const Address = mongoose.model("Address", addressSchema);
