import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
	productId: {
		type: Schema.Types.ObjectId,
		ref: "Product",
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	image: {
		type: String,
		required: true,
	},
	quantity: {
		type: Number,
		required: true,
		min: 1,
		default: 1,
	},
	priceAtAddition: {
		type: Number,
		required: true,
	},
	color: {
		type: String,
	},
	size: {
		type: String,
	},
});

const cartSchema = new Schema(
	{
		owner: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		products: [productSchema],
		discount: Number,
		promoCode: String,
		status: {
			type: String,
			enum: ["active", "ordered", "abandoned"],
			default: "active",
		},
		savedForLater: [
			{
				type: Schema.Types.ObjectId,
				ref: "Product",
			},
		],
		totalAmount: { type: Number, default: 0 },
	},
	{ timestamps: true }
);

cartSchema.pre("save", function (next) {
	if (this.products && this.products.length > 0) {
		this.totalAmount = this.products.reduce(
			(sum, p) => sum + p.quantity * p.priceAtAddition,
			0
		);
	} else {
		this.totalAmount = 0;
	}
	next();
});

cartSchema.pre("findOneAndUpdate", function (next) {
	const update = this.getUpdate();

	if (update.products) {
		const products = update.products;
		const totalAmount = products.reduce(
			(sum, p) => sum + p.quantity * p.priceAtAddition,
			0
		);
		this.set({ totalAmount });
	}
	next();
});

export const Cart = mongoose.model("Cart", cartSchema);
