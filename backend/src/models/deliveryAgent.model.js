import mongoose, { Schema } from "mongoose";

const deliveryAgentSchema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
			unique: true,
		},
		vehicleType: { type: String, enum: ["bike", "van"] },
		vehicleNumber: { type: String },
		licenseNumber: { type: String },
		status: {
			type: String,
			enum: ["online", "offline", "on-duty"],
			default: "offline",
		},
		totalDeliveries: { type: Number, default: 0 },
	},
	{ timestamps: true }
);

export const DeliveryAgent = mongoose.model(
	"DeliveryAgent",
	deliveryAgentSchema
);
