import * as request from '../lib/request';

const baseUrl = 'http://localhost:5000/users';

export const register = async (firstName, lastName, role, username, email, password, repeatPassword) => {
    const result = await request.post(`${baseUrl}/register`, {
        firstName, 
        lastName,
        role,
        username,
        email,
        password,
        repeatPassword,
    });

    return result;
};

export const login = async (email, password) => {
    const result = await request.post(`${baseUrl}/login`, {
        email,
        password,
    });

    return result;
};

export const logout = () => request.get(`${baseUrl}/logout`);

export const getUser = async () => {

    const result = await request.get(`${baseUrl}/profile`);

    return result;
};

export const getUserEditInfo = async () => {

    const result = await request.get(`${baseUrl}/edit-profile`);

    return result;
};

export const updateUser = async (userData) => { 
    
    const editUserData = await request.patch(`${baseUrl}/profile`, userData);

    return editUserData;
}