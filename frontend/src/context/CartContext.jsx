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

export const CartProvider = ({ children }) => {
	const [cart, setCart] = useState([]);
	const [loading, setLoading] = useState(true);
	const { user } = useAuth();

	useEffect(() => {
		const fetchCart = async () => {
			try {
				const res = await get();
				console.log(res.data);
			} catch (error) {
				setCart([]);
			} finally {
				setLoading(false);
			}
		};
		if (user) {
			fetchCart();
		} else setCart([]);
	}, []);

	const addToCart = async (productData) => {
		const { productId, quantity, color, size } = productData;
		try {
			const res = await add(productId, quantity, color, size);
			console.log(res.data);
			handleSuccess("Product Added To Cart");
		} catch (error) {
			const message =
				error?.response?.data?.message ||
				"Something went wrong";
			handleError(message);
		}
	};

	const updateQuantity = async (productId, quantity) => {
		try {
			const res = await updateQuan(productId, quantity);
		} catch (error) {
			const message =
				error?.response?.data?.message ||
				"Something went wrong";
			handleError(message);
		}
	};

	const removeItem = async (productId) => {
		try {
			const res = await remove(productId);
			console.log("Item Removed Successfully");
		} catch (error) {
			const message =
				error?.response?.data?.message ||
				"Something went wrong";
			handleError(message);
		}
	};

	const clearCart = async () => {
		try {
			await clear();
			setCart([]);
			handleSuccess("Cart cleared");
		} catch (error) {
			const message =
				error?.response?.data?.message ||
				"Something went wrong";
			handleError(message);
		}
	};

	const saveForLater = async (productId) => {
		try {
			const res = await save(productId);
			handleSuccess("Item saved for later");
		} catch (error) {
			const message =
				error?.response?.data?.message ||
				"Something went wrong";
			handleError(message);
		}
	};

	return (
		<CartContext.Provider
			value={{
				cart,
				loading,
				addToCart,
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
