import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Address } from "../models/address.model.js";

const getAddress = asyncHandler(async (req, res) => {
	// get userid from req.user
	// find user ids and return
});

const getDefaultAddress = asyncHandler(async (req, res) => {
	// get userid from req.user
	// find user ids and return where isDefault is true
});

const addAddress = asyncHandler(async (req, res) => {});

const updateAddress = asyncHandler(async (req, res) => {});

const removeAddress = asyncHandler(async (req, res) => {
	// get userid from req.user
	// get addressid from req.params
	// find and delete it
});

const markAsDefault = asyncHandler(async (req, res) => {
	// get user id from req.user
	// get addressid find the adress and mark is Default true
});

export { getAddress };
