import { v2 as cloudinary } from "cloudinary";
import { asyncHandler } from "./AsyncHandler";
import fs from "fs";

const getCloudinary = () => {
	cloudinary.config({
		cloud_name: process.env.CLOUDINARY_NAME,
		api_key: process.env.CLOUDINARY_API_KEY,
		api_secret: process.env.CLOUDINARY_API_SECRET,
	});
};

const uploadOnCloudinary = asyncHandler(async (localFilePath) => {
	const cloud = getCloudinary();
	try {
		if (!localFilePath) {
			return null;
		}
		const response = await cloud.uploader.upload(localFilePath, {
			resource_type: "auto",
		});
		fs.unlinkSync(localFilePath);
		return response;
	} catch (err) {
		console.error("CLoudinary upload failed:", error);
		fs.unlinkSync(localFilePath);
		return null;
	}
});

export { uploadOnCloudinary };
