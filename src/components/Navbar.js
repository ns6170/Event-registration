import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
    const { user, logOut } = useContext(AuthContext);

    return (
        <header className="bg-blue-600 text-white">
            <nav className="container mx-auto flex items-center justify-between px-4 py-3">
                <Link to="/" className="text-2xl font-bold">EventReg</Link>
                <div className="space-x-4">
                    <Link to="/" className="hover:underline">Home</Link>
                    {user ? (
                        <>
                            <Link to="/hello" className="hover:underline">Dashboard</Link>
                            <Link to="/events/new" className="hover:underline">New Event</Link>
                            <Link to="/venues" className="hover:underline">Venues</Link>
                            <button
                                onClick={logOut}
                                className="ml-4 bg-red-500 px-3 py-1 rounded hover:bg-red-600"
                            >
                                Log Out
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="hover:underline">Log In</Link>
                            <Link to="/signup" className="hover:underline">Sign Up</Link>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
}
