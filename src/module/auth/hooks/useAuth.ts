import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuth = (): AuthContext => {
	const context = useContext(AuthContext);
	if (!context) throw Error('useAuth should be used within <AuthProvider />');
	return context;
};