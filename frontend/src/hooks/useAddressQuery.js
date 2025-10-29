import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
	get,
	add,
	update,
	remove,
	markDefault,
} from "../services/addressService";
import { handleError, handleSuccess } from "../utils";

export const useAddress = () => {
	const queryClient = useQueryClient();

	const { data: addresses = [], isLoading } = useQuery({
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
		onSuccess: (newAddress) => {
			queryClient.setQueryData(["addresses"], (old = []) => [
				...old,
				newAddress,
			]);
			handleSuccess("Address added successfully");
		},
		onError: (error) =>
			handleError(error?.message || "Failed to Add Address"),
	});

	const updateMutation = useMutation({
		mutationFn: async ({ addressId, data }) => {
			const res = await update(addressId, data);
			return res.data.data;
		},
		onSuccess: (updatedAddress) => {
			queryClient.setQueryData(["addresses"], (old = []) =>
				old.map((addr) =>
					addr._id === updatedAddress._id
						? updatedAddress
						: addr
				)
			);
			handleSuccess("Address updated successfully");
		},
		onError: (error) =>
			handleError(
				error?.message || "Failed to update address"
			),
	});

	const removeMutation = useMutation({
		mutationFn: async (addressId) => {
			await remove(addressId);
			return { addressId };
		},
		onSuccess: ({ addressId }) => {
			queryClient.setQueryData(["addresses"], (old = []) =>
				old.filter((addr) => addr._id !== addressId)
			);
			handleSuccess("Address removed successfully");
		},
		onError: (error) =>
			handleError(
				error?.message || "Failed to remove address"
			),
	});

	const markDefaultMutation = useMutation({
		mutationFn: async (addressId) => {
			const res = await markDefault(addressId);
			return res.data.data;
		},
		onSuccess: () => {
			queryClient.invalidateQueries(["addresses"]);
			handleSuccess("Default address updated successfully");
		},
		onError: (error) =>
			handleError(error?.message || "Failed to mark default"),
	});

	return {
		addresses,
		loading: isLoading,
		addAddress: addMutation.mutate,
		updateAddress: updateMutation.mutate,
		removeAddress: removeMutation.mutate,
		markAsDefault: markDefaultMutation.mutate,
	};
};
