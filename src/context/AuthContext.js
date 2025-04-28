import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// point all axios requests to your backend
axios.defaults.baseURL = 'http://localhost:8000';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    // On mount, restore user & token
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        const savedToken = localStorage.getItem('token');
        if (savedUser && savedToken) {
            setUser(JSON.parse(savedUser));
            setToken(savedToken);
            axios.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`;
        }
    }, []);

    // Sign up
    const signUp = async ({ name, email, password }) => {
        const { data } = await axios.post('/api/auth/signup', {
            username: name,
            email,
            password,
        });
        const { user: newUser, token: jwt } = data;

        setUser(newUser);
        setToken(jwt);
        localStorage.setItem('user', JSON.stringify(newUser));
        localStorage.setItem('token', jwt);
        axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;

        return newUser;
    };

    // Log in
    /*const logIn = async ({ email, password }) => {
        const { data } = await axios.post('/api/auth/login', {
            email,
            password,
        });
        const { user: existingUser, token: jwt } = data;

        setUser(existingUser);
        console.log(existingUser);
        console.log("Hello Orange");
        setToken(jwt);
        localStorage.setItem('user', JSON.stringify(existingUser));
        localStorage.setItem('token', jwt);
        axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;

        return true;
    };*/
    const logIn = async ({ email, password }) => {
        try {
            const { data } = await axios.post('/api/auth/login', { email, password });
            console.log('✅ login succeeded, data:', data);
            console.log(data.user);
            console.log("Hello Orange");

            const { user: existingUser, token: jwt } = data;

            setUser(existingUser);
            setToken(jwt);
            localStorage.setItem('user', JSON.stringify(existingUser));
            localStorage.setItem('token', jwt);
            axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
            return true;
        } catch (err) {
            console.error('🚨 logIn error:', err);
            throw err;      // re-throw so your component knows it failed
        }
    };


    // Log out
    const logOut = () => {
        setUser(null);
        setToken(null);
        delete axios.defaults.headers.common['Authorization'];
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ user, token, signUp, logIn, logOut }}>
            {children}
        </AuthContext.Provider>
    );
}
