import { createContext, useState, useContext, useEffect } from 'react'
import { registerRequest, loginRequest } from "../api/auth.js";
import { verifyTokenRequest } from '../api/auth.js';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        console.log("error de context")
    }
    return context
};
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(true)

    const signup = async (user) => {
        try {
            const res = await registerRequest(user);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            console.log(error.response.data);
            setErrors(error.response.data);
        };
    };

    const logout = () => {
        Cookies.remove("token");
        setUser(null);
        setIsAuthenticated(false);
    };


    const signin = async (user) => {
        try {
            const res = await loginRequest(user);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            setErrors(error.response.data);
        };
    };

    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([]);
            }, 5000)
            return () => clearTimeout(timer);
        }
    }, [errors]);

    useEffect(() => {
        async function checkLogin() {
            const cookies = Cookies.get();

            if (!cookies.token) {
                setIsAuthenticated(false);
                setLoading(false);
                setUser(null);
            } {
                try {
                    const res = await verifyTokenRequest(cookies.token);
                    if (!res.data) {
                        setIsAuthenticated(false);
                        setLoading(false);
                        return;
                    }

                    setIsAuthenticated(true)
                    setUser(res.data)
                    setLoading(false);

                } catch (error) {
                    console.log(error)
                    setIsAuthenticated(false);
                    setUser(null);
                    setLoading(false);

                }
            }
        }
        checkLogin()
    }, []);

    return (
        <AuthContext.Provider value={{
            signup,
            user,
            isAuthenticated,
            errors,
            signin,
            loading,
            logout
        }} >
            {children}
        </AuthContext.Provider>
    );
};
