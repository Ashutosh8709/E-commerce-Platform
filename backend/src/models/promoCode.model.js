import mongoose, { Schema } from "mongoose";

const promoCode = new Schema({
	code: { type: String, unique: true, required: true },
	discountType: {
		type: String,
		enum: ["flat", "percent"],
		required: true,
	},
	value: { type: Number, required: true },
	minPurchase: { type: Number, default: 0 },
	maxDiscount: { type: Number }, // for % based
	expiresAt: { type: Date },
	isActive: { type: Boolean, default: true },
});

export const PromoCode = mongoose.model("PromoCode", promoCode);
