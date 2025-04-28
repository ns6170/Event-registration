import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function HelloUserPage() {
    const { user } = useContext(AuthContext);
    return (
        <div>
            <h1>Hello, {user.username}!</h1>
            <p>Ready to browse and register for events?</p>
        </div>
    );
}
