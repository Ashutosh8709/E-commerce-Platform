import mongoose, { Schema } from "mongoose";

const addressSchema = new Schema({
	street: { type: String, required: true },
	city: { type: String, required: true },
	state: { type: String, required: true },
	country: { type: String, required: true },
	postalCode: { type: String, required: true },
});

const warehouseSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		address: addressSchema,
		capacity: {
			type: Number,
			default: 0,
			min: 0,
		},
		currentStock: {
			type: Number,
			default: 0,
			min: 0,
		},
		managerId: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		isActive: {
			type: String,
			enum: ["active", "inactive", "closed"],
			default: "active",
		},
	},
	{ timestamps: true }
);

export const Warehouse = mongoose.model("Warehouse", warehouseSchema);
