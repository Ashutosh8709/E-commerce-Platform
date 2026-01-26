import { v2 as cloudinary } from "cloudinary";
import fs from "node:fs";

const getCloudinary = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  return cloudinary;
};

const safeUnlink = (filePath) => {
  if (filePath && fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};

const uploadOnCloudinary = async (localFilePath, retries = 2) => {
  const cloud = getCloudinary();
  try {
    if (!localFilePath) {
      return null;
    }
    const response = await cloud.uploader.upload(localFilePath, {
      resource_type: "image",
      timeout: 15000,
    });
    safeUnlink(localFilePath);
    return response;
  } catch (err) {
    if (retries > 0) {
      console.warn("Retrying Cloudinary upload...");
      return uploadOnCloudinary(localFilePath, retries - 1);
    }
    console.error("CLoudinary upload failed:", err);
    safeUnlink(localFilePath);
    return null;
  }
};

export { uploadOnCloudinary };
