import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import * as authService from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({
    children,
}) => {
    const navigate = useNavigate();
    const [auth, setAuth] = useState({});

    useEffect(() => {
        authService.getUser()
                    .then(result => {
                        setAuth(result);
                    })
                    .catch(error => {
                        console.log(error); 
                    });
    }, [])

 const loginSubmitHandler = async (values) => {
            try {
                const result = await authService.login(values.email, values.password);
    
                setAuth(result);
    
                navigate('/');
            } catch (error) {
                console.log(error);
            }
        };

     const registerSubmitHandler = async (values) => {
                try {
                    const result = await authService.register(values.firstName, values.lastName, values.role, values.username, values.email, values.password, values.repeatPassword);
        
                    setAuth(result);
        
                    navigate('/');
                } catch (error) {
                    console.log(error);
                }
            };

         const logoutHandler = () => {
                    setAuth({});
                }

    const userValues = {
        registerSubmitHandler,
        loginSubmitHandler,
        logoutHandler,
        role: auth.user?.role,
        username: auth.user?.username,
        email: auth.user?.email,
        userId: auth.user?._id,
        isAuthenticated: !!auth.token,
    };

    return (
        <AuthContext.Provider value={userValues}>
            {children}
        </AuthContext.Provider>
    );
};

AuthContext.displayName = 'AuthContext';

export default AuthContext;
