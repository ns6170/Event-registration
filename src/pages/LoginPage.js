import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { logIn } = useContext(AuthContext);
    const navigate = useNavigate();

    /*const handleSubmit = e => {
        e.preventDefault();
        if (logIn({ email, password })) {
            navigate('/hello');
        } else {
            alert('Invalid credentials');
        }
    };*/

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            console.log("Hello yellow");
            await logIn({ email, password });
            console.log("hello red");
            navigate('/hello');
        } catch (err) {
            // you’ll now see the CORS or network error here
            alert(err.response?.data?.error || err.message);
        }
    };


    return (
        <form onSubmit={handleSubmit}>
            <h2>Log In</h2>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
            />
            <button type="submit">Log In</button>
        </form>
    );
}
