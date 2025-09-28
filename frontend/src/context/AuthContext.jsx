import { useContext, createContext, useState, useEffect } from "react";
import { handleSuccess, handleError } from "../utils";
import {
	loginUser,
	signupUser,
	logoutUser,
	getUser,
	forgotUserPassword,
	verifyUserEmail,
} from "../services/authService";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [userLoggedOut, setUserLoggedout] = useState(false);

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const res = await getUser();
				setUser(res.data.data);
				setUserLoggedout(false);
			} catch (error) {
				setUser(null);
			} finally {
				setLoading(false);
			}
		};
		fetchUser();
	}, []);

	const login = async (formData) => {
		const { email, password } = formData;
		try {
			const res = await loginUser(email, password);
			setUser(res.data.data);
			setUserLoggedout(false);
			handleSuccess(res.data.message);
		} catch (error) {
			const message =
				error?.response?.data?.message ||
				"Something went wrong";
			handleError(message);
		}
	};

	const signup = async (formData) => {
		try {
			if (formData.password !== formData.confirmPassword) {
				return handleError(
					"Password and Confirm Password does not match"
				);
			}
			const res = await signupUser(formData);
			setUser(res.data.data);
			handleSuccess(res.data.message);
		} catch (error) {
			const message =
				error?.response?.data?.message ||
				"Something went wrong";
			handleError(message);
		}
	};

	const logout = async () => {
		try {
			await logoutUser();
			setUser(null);
			setUserLoggedout(true);
			handleSuccess("User Logged Out Successfully");
		} catch (error) {
			const message =
				error?.response?.data?.message ||
				"Something went wrong";
			handleError(message);
		}
	};

	const forgotPassword = async (formData) => {
		try {
			if (formData.newPassword !== formData.confirmPassword) {
				return handleError(
					"Both Passwords doesn't match"
				);
			}
			await forgotUserPassword(
				formData.email,
				formData.newPassword
			);
			handleSuccess("New Password Created Successfully");
		} catch (error) {
			const message =
				error?.response?.data?.message ||
				"Something went wrong";
			handleError(message);
		}
	};

	const verifyUser = async (formData) => {
		try {
			const res = await verifyUserEmail(formData.email);
			handleSuccess(res.data.message);
			return true;
		} catch (error) {
			const message =
				error?.response?.data?.message ||
				"Something went wrong";
			handleError(message);
			return false;
		}
	};

	return (
		<AuthContext.Provider
			value={{
				login,
				user,
				signup,
				logout,
				loading,
				forgotPassword,
				verifyUser,
				userLoggedOut,
				setUserLoggedout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
