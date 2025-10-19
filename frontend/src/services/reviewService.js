import api from "./api";

export const addReview = (productId, formData) => {
	const form = new FormData();
	form.append("rating", formData.rating);
	form.append("comment", formData.comment);
	form.append("title", formData.title);
	if (formData.reviewImage)
		form.append("reviewImage", formData.reviewImage);

	return api.post(`/review/${productId}`, form, {
		headers: { "Content-Type": "multipart/form-data" },
	});
};

export const getReviews = (productId) => {
	return api.get(`/review/${productId}`);
};

export const updateReview = (productId, formData) => {
	const form = new FormData();
	if (formData.rating) form.append("rating", formData.rating);
	if (formData.newTitle) form.append("newTitle", formData.newTitle);
	if (formData.newComment) form.append("newComment", formData.newComment);

	return api.patch(`/review/${productId}`, form);
};

export const deleteReview = (productId) => {
	return api.delete(`/review/${productId}`);
};

export const updateReviewImage = (productId, reviewImage) => {
	const form = new FormData();
	form.append("reviewImage", reviewImage);

	return api.patch(`/review/${productId}/image`, form, {
		headers: { "Content-Type": "multipart/form-data" },
	});
};
