import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
	get,
	add,
	updateQuan,
	remove,
	clear,
	save,
} from "../services/cartService";
import { handleError, handleSuccess } from "../utils";

export const useCart = () => {
	const queryClient = useQueryClient();

	// 1️⃣ Fetch cart
	const { data: cart, isLoading } = useQuery({
		queryKey: ["cart"],
		queryFn: async () => {
			const res = await get();

			return (
				res.data.data || {
					discount: 0,
					totalAmount: 0,
					promoCode: "",
					products: [],
				}
			);
		},
		staleTime: 1000 * 60 * 5,
		refetchOnWindowFocus: true,
	});

	// 2️⃣ Add to cart
	const addMutation = useMutation({
		mutationFn: async ({ productId, quantity, color, size }) => {
			const res = await add(productId, quantity, color, size);
			return res.data.data;
		},
		onSuccess: (data) => {
			queryClient.setQueryData(["cart"], data);
			handleSuccess("Product added to cart");
		},
		onError: (error) => {
			handleError(
				error?.response?.data?.message ||
					"Something went wrong"
			);
		},
	});

	// 3️⃣ Update quantity
	const updateMutation = useMutation({
		mutationFn: async ({ productId, quantity }) => {
			const res = await updateQuan(productId, quantity);
			return res.data.data;
		},
		onSuccess: (data) => queryClient.setQueryData(["cart"], data),
		onError: (error) =>
			handleError(
				error?.response?.data?.message ||
					"Something went wrong"
			),
	});

	// 4️⃣ Remove item
	const removeMutation = useMutation({
		mutationFn: async (productId) => {
			const res = await remove(productId);
			return res.data.data;
		},
		onSuccess: (data) => {
			queryClient.setQueryData(["cart"], data);
			handleSuccess("Item removed from cart");
		},
		onError: (error) =>
			handleError(
				error?.response?.data?.message ||
					"Something went wrong"
			),
	});

	// 5️⃣ Clear cart
	const clearMutation = useMutation({
		mutationFn: async () => {
			const res = await clear();
			return res.data.data;
		},
		onSuccess: () => {
			queryClient.setQueryData(["cart"], {
				discount: 0,
				totalAmount: 0,
				promoCode: "",
				products: [],
			});
			handleSuccess("Cart cleared");
		},
		onError: (error) =>
			handleError(
				error?.response?.data?.message ||
					"Something went wrong"
			),
	});

	// 6️⃣ Save for later
	const saveMutation = useMutation({
		mutationFn: async (productId) => {
			const res = await save(productId);
			return res.data.data;
		},
		onSuccess: (data) => {
			queryClient.setQueryData(["cart"], data);
			handleSuccess("Item saved for later");
		},
		onError: (error) =>
			handleError(
				error?.response?.data?.message ||
					"Something went wrong"
			),
	});

	return {
		cart,
		loading: isLoading,
		addToCart: addMutation.mutate,
		updateQuantity: updateMutation.mutate,
		removeItem: removeMutation.mutate,
		clearCart: clearMutation.mutate,
		saveForLater: saveMutation.mutate,
	};
};
