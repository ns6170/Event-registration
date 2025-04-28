import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
    const { user, logOut } = useContext(AuthContext);

    return (
        <nav>
            <Link to="/">Home</Link>
            {user ? (
                <>
                    <Link to="/hello">Hello</Link>
                    <button onClick={logOut}>Log Out</button>
                </>
            ) : (
                <>
                    <Link to="/login">Log In</Link>
                    <Link to="/signup">Sign Up</Link>
                </>
            )}
        </nav>
    );
}
