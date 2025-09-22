import mongoose, { Schema } from "mongoose";

const inventorySchema = new Schema(
	{
		productId: {
			type: Schema.Types.ObjectId,
			ref: "Product",
			required: true,
			index: true,
		},
		quantityAvailable: {
			type: Number,
			required: true,
			min: 0,
		},
		warehouseId: {
			type: Schema.Types.ObjectId,
			ref: "Warehouse",
			required: true,
			index: true,
		},
		minStock: {
			type: Number,
			required: true,
		},
		isActive: {
			type: Boolean,
			default: true,
		},
		locationOfProductInWarehouse: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

export const Inventory = mongoose.model("Inventory", inventorySchema);
