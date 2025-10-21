import { useContext, createContext, useState, useEffect } from "react";
import { handleError, handleSuccess } from "../utils";
import {
	add,
	get,
	updateQuan,
	remove,
	clear,
	save,
} from "../services/cartService";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
	const [cart, setCart] = useState({
		discount: 0,
		totalAmount: 0,
		promoCode: "",
		items: [],
	});
	const [loading, setLoading] = useState(true);
	const { user } = useAuth();

	useEffect(() => {
		const fetchCart = async () => {
			try {
				const res = await get();
				if (res?.data?.data) {
					setCart({
						discount:
							res.data.data
								.discount || 0,
						totalAmount:
							res.data.data
								.totalAmount ||
							0,
						promoCode:
							res.data.data
								.promoCode ||
							"",
						items:
							res.data.data
								.products || [],
					});
				} else {
					setCart({
						discount: 0,
						totalAmount: 0,
						promoCode: "",
						items: [],
					});
				}
			} catch (error) {
				console.error("Error fetching cart:", error);
				setCart({
					discount: 0,
					totalAmount: 0,
					promoCode: "",
					items: [],
				});
			} finally {
				setLoading(false);
			}
		};

		if (user) {
			fetchCart();
		} else {
			setCart({
				discount: 0,
				totalAmount: 0,
				promoCode: "",
				items: [],
			});
			setLoading(false);
		}
	}, [user]);

	const updateCartFromResponse = (res) => {
		if (res?.data?.data) {
			setCart({
				discount: res.data.data.discount || 0,
				totalAmount: res.data.data.totalAmount || 0,
				promoCode: res.data.data.promoCode || "",
				items: res.data.data.products || [],
			});
		}
	};

	const addToCart = async (productData) => {
		const { productId, quantity, color, size } = productData;
		try {
			const res = await add(productId, quantity, color, size);
			updateCartFromResponse(res);
			handleSuccess(res.data.message);
		} catch (error) {
			handleError(
				error?.response?.data?.message ||
					"Something went wrong"
			);
		}
	};

	const updateQuantity = async (productId, quantity) => {
		try {
			const res = await updateQuan(productId, quantity);
			updateCartFromResponse(res);
		} catch (error) {
			handleError(
				error?.response?.data?.message ||
					"Something went wrong"
			);
		}
	};

	const removeItem = async (productId) => {
		try {
			const res = await remove(productId);
			updateCartFromResponse(res);
			handleSuccess(res.data.message);
		} catch (error) {
			handleError(
				error?.response?.data?.message ||
					"Something went wrong"
			);
		}
	};

	const clearCart = async () => {
		try {
			let res = await clear();
			setCart({
				discount: 0,
				totalAmount: 0,
				promoCode: "",
				items: [],
			});
			handleSuccess(res.data.message);
		} catch (error) {
			handleError(
				error?.response?.data?.message ||
					"Something went wrong"
			);
		}
	};

	const saveForLater = async (productId) => {
		try {
			const res = await save(productId);
			updateCartFromResponse(res);
			handleSuccess(res.data.message);
		} catch (error) {
			handleError(
				error?.response?.data?.message ||
					"Something went wrong"
			);
		}
	};

	return (
		<CartContext.Provider
			value={{
				cart,
				loading,
				addToCart,
				setCart,
				updateQuantity,
				removeItem,
				clearCart,
				saveForLater,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

export const useCart = () => useContext(CartContext);
