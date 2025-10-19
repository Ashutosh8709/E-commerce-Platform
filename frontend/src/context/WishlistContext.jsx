import { useContext, createContext, useState } from "react";
import { handleError, handleSuccess } from "../utils";
import { add, get, remove, clear, addCart } from "../services/wishlistService";
import { useAuth } from "./AuthContext";
import { useEffect } from "react";

const WishListContext = createContext();

export const WishlistContextProvider = ({ children }) => {
	const [wishlist, setWishlist] = useState([]);
	const [loading, setLoading] = useState(true);
	const { user } = useAuth();

	useEffect(() => {
		const fetchWishlist = async () => {
			try {
				const res = await get();
				setWishlist(res.data?.data.products);
			} catch (error) {
				setWishlist([]);
			} finally {
				setLoading(false);
			}
		};
		if (user) {
			fetchWishlist();
		} else {
			setWishlist([]);
			setLoading(false);
		}
	}, [user]);

	const addToWishlist = async (wishlistData) => {
		const { productId, color, size } = wishlistData;
		try {
			const res = await add(productId, color, size);
			setWishlist(res.data?.data?.products);
			handleSuccess("Product added to wishlist");
		} catch (error) {
			const message =
				error?.response?.data?.message ||
				"Something went wrong";
			handleError(message);
		}
	};

	const removeFromWishlist = async (productId) => {
		try {
			const res = await remove(productId);
			setWishlist(res.data?.data?.products);
			handleSuccess("Product Removed From Wishlist");
		} catch (error) {
			const message =
				error?.response?.data?.message ||
				"Something went wrong";
			handleError(message);
		}
	};

	const clearWishlist = async () => {
		try {
			await clear();
			setWishlist([]);
			handleSuccess("Wishlist Cleared");
		} catch (error) {
			const message =
				error?.response?.data?.message ||
				"Something went wrong";
			handleError(message);
		}
	};

	const addToCart = async (productId) => {
		try {
			const res = await addCart(productId);

			handleSuccess("Product Added to Cart");
		} catch (error) {
			const message =
				error?.response?.data?.message ||
				"Something went wrong";
			handleError(message);
		}
	};
	return (
		<WishListContext.Provider
			value={{
				wishlist,
				loading,
				addToWishlist,
				removeFromWishlist,
				clearWishlist,
				addToCart,
			}}
		>
			{children}
		</WishListContext.Provider>
	);
};

export const useWishlist = () => useContext(WishListContext);
