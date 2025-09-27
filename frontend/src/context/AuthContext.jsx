import { useContext, createContext, useState } from "react";
import { handleSuccess, handleError } from "../utils";
import { loginUser, signupUser } from "../services/authService";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
	const [user, setUser] = useState({});

	const login = async (formData) => {
		const { email, password } = formData;
		try {
			const res = await loginUser(email, password);
			setUser(res.data.data);
			handleSuccess(res.data.message);
		} catch (error) {
			const message =
				error?.response?.data?.message ||
				"Something went wrong";
			handleError(message);
		}
	};

	const signup = async (formData) => {
		const { name, email, password, confirmPassword, avatar } =
			formData;
		try {
			if (password !== confirmPassword) {
				return handleError(
					"Password and Confirm Password does not match"
				);
			}
			const res = await signupUser(formData);
			handleSuccess(res.data.message);
		} catch (error) {
			const message =
				error?.response?.data?.message ||
				"Something went wrong";
			handleError(message);
		}
	};

	return (
		<AuthContext.Provider value={{ login, user, signup }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
