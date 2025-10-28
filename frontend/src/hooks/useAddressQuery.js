import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
	get,
	getDefault,
	add,
	update,
	remove,
	markDefault,
} from "../services/addressService";
import { handleError, handleSuccess } from "../utils";

export const useAddress = () => {
	const queryClient = useQueryClient();

	const { data: addresses, isLoading } = useQuery({
		queryKey: ["addresses"],
		queryFn: async () => {
			const res = await get();

			return res.data.data || [];
		},
		staleTime: 1000 * 60 * 5,
		refetchOnWindowFocus: true,
	});

	const addMutation = useMutation({
		mutationFn: async (addressData) => {
			const res = await add(addressData);
			return res.data.data;
		},
		onSuccess: (data) => {
			queryClient.setQueryData(["addresses"], data);
			handleSuccess("Address added Successfully");
		},
		onError: (error) => {
			handleError(
				error?.response?.data?.message ||
					"Something went wrong"
			);
		},
	});

	// const updateMutation = useMutation({
	// 	mutationFn: async ({ productId, quantity }) => {
	// 		const res = await updateQuan(productId, quantity);
	// 		return res.data.data;
	// 	},
	// 	onSuccess: (data) => queryClient.setQueryData(["cart"], data),
	// 	onError: (error) =>
	// 		handleError(
	// 			error?.response?.data?.message ||
	// 				"Something went wrong"
	// 		),
	// });

	const removeMutation = useMutation({
		mutationFn: async (addressId) => {
			const res = await remove(addressId);
			return res.data.data;
		},
		onSuccess: (data) => {
			queryClient.setQueryData(["addresses"], data);
			handleSuccess("Address Removed Successfully");
		},
		onError: (error) =>
			handleError(
				error?.response?.data?.message ||
					"Something went wrong"
			),
	});

	return {
		addresses,
		loading: isLoading,
		addAddress: addMutation.mutate,
		// updateAddress: updateMutation.mutate,
		removeAddress: removeMutation.mutate,
	};
};
