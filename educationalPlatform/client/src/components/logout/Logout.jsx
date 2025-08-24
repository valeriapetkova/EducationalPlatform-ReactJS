import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import * as authService from '../../services/authService';
import AuthContext from '../../contexts/authContext';

export default function Logout() {
    const navigate = useNavigate();
    const { logoutHandler } = useContext(AuthContext);

    useEffect(() => {
        authService.logout()
        .then(() => {
            logoutHandler();
            navigate('/');
        })
        .catch((err) => {
            logoutHandler();
            navigate('/');
        });
    }, []);

    return null;
}