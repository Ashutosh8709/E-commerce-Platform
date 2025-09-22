import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		description: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);
