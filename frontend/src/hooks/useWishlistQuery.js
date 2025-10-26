import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { get, add, remove, clear, addCart } from "../services/wishlistService";
import { handleError, handleSuccess } from "../utils";

export const useWishlist = () => {
	const queryClient = useQueryClient();

	const prefetchWishlist = async () => {
		await queryClient.prefetchQuery({
			queryKey: ["wishlist"],
			queryFn: async () => {
				const res = await get();
				return res.data?.data[0]?.products || [];
			},
			staleTime: 1000 * 60 * 5,
		});
	};

	// 1️⃣ Fetch wishlist
	const { data: wishlist, isLoading } = useQuery({
		queryKey: ["wishlist"],
		queryFn: async () => {
			const res = await get();
			return res.data?.data[0]?.products || [];
		},
		staleTime: 1000 * 60 * 5,
		refetchOnWindowFocus: true,
	});

	// 2️⃣ Add to wishlist
	const addMutation = useMutation({
		mutationFn: async ({ productId, color, size }) => {
			const res = await add(productId, color, size);
			return res.data?.data[0]?.products;
		},
		onSuccess: (data) => {
			queryClient.setQueryData(["wishlist"], data);
			handleSuccess("Product added to wishlist");
		},
		onError: (error) => {
			handleError(
				error?.response?.data?.message ||
					"Something went wrong"
			);
		},
	});

	// 3️⃣ Remove from wishlist
	const removeMutation = useMutation({
		mutationFn: async (productId) => {
			await remove(productId);
			return productId;
		},
		onSuccess: (productId) => {
			queryClient.setQueryData(["wishlist"], (old) =>
				old.filter(
					(item) => item.productId !== productId
				)
			);
			handleSuccess("Product removed from wishlist");
		},
		onError: (error) => {
			handleError(
				error?.response?.data?.message ||
					"Something went wrong"
			);
		},
	});

	// 4️⃣ Clear wishlist
	const clearMutation = useMutation({
		mutationFn: async () => {
			await clear();
			return [];
		},
		onSuccess: () => {
			queryClient.setQueryData(["wishlist"], []);
			handleSuccess("Wishlist cleared");
		},
		onError: (error) => {
			handleError(
				error?.response?.data?.message ||
					"Something went wrong"
			);
		},
	});

	// 5️⃣ Add wishlist item to cart
	const addToCartMutation = useMutation({
		mutationFn: async (productId) => {
			const res = await addCart(productId);
			return { productId, cart: res.data.data.cart };
		},
		onSuccess: ({ productId, cart }) => {
			queryClient.setQueryData(["wishlist"], (old) =>
				old.filter(
					(item) => item.productId !== productId
				)
			);

			queryClient.setQueryData(["cart"], {
				discount: cart.discount || 0,
				totalAmount: cart.totalAmount || 0,
				promoCode: cart.promoCode || "",
				products: cart.products || [],
			});

			handleSuccess("Product added to cart");
		},
		onError: (error) => {
			handleError(
				error?.response?.data?.message ||
					"Something went wrong"
			);
		},
	});

	return {
		prefetchWishlist,
		wishlist,
		loading: isLoading,
		addToWishlist: addMutation.mutate,
		removeFromWishlist: removeMutation.mutate,
		clearWishlist: clearMutation.mutate,
		addToCart: addToCartMutation.mutate,
	};
};
