import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
		},
		password: {
			type: String,
			required: [true, "Password is required"],
		},
		role: {
			type: String,
			enum: [
				"customer",
				"admin",
				"deliveryAgent",
				"seller",
				"warehouseManager",
			],
		},
	},
	{ timestamps: true }
);
