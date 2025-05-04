// src/pages/HelloUserPage.js
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

export default function HelloUserPage() {
    const { user } = useContext(AuthContext);
    const [ownEvents, setOwnEvents] = useState([]);
    const [otherEvents, setOtherEvents] = useState([]);

    useEffect(() => {
        async function fetchEvents() {
            try {
                const { data } = await axios.get('/api/events');
                setOwnEvents(data.filter(evt => evt.organizer_id === user.id));
                setOtherEvents(data.filter(evt => evt.organizer_id !== user.id));
            } catch (err) {
                console.error(err);
            }
        }
        fetchEvents();
    }, [user]);

    return (
        <div>
            <h1>Hello, {user.username || user.name}!</h1>

            <h2>Your Events</h2>
            {ownEvents.length > 0 ? (
                <ul>
                    {ownEvents.map(evt => (
                        <li key={evt.id}>
                            {evt.title} – {new Date(evt.event_date).toLocaleDateString()}{' '}
                            <Link to={`/events/${evt.id}/edit`}>Edit</Link>
                            <Link to={`/events/${evt.id}/registrations`}>Registrations</Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>
                    You haven’t created any events yet.{' '}
                    <Link to="/events/new">Create one now</Link>.
                </p>
            )}

            <h2>All Events</h2>
            {otherEvents.length > 0 ? (
                <ul>
                    {otherEvents.map(evt => (
                        <li key={evt.id}>
                            <Link to={`/events/${evt.id}`}>{evt.title}</Link> –{' '}
                            {new Date(evt.event_date).toLocaleDateString()}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No other events available at the moment.</p>
            )}
        </div>
    );
}
