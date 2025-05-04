import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

export default function EventDetailsPage() {
    const { id } = useParams();         // this is the event ID
    const { user } = useContext(AuthContext);

    const [event, setEvent] = useState(null);
    const [venue, setVenue] = useState(null);
    const [regs, setRegs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            try {
                // 1) Load the event itself
                const { data: evt } = await axios.get(`/api/events/${id}`);
                setEvent(evt);

                // 2) Load the venue using the event’s venue_id
                const { data: v } = await axios.get(`/api/venues/${evt.venue_id}`);
                setVenue(v);

                // 3) Load registrations
                const { data: allRegs } = await axios.get(
                    `/api/events/${id}/registrations`
                );
                setRegs(allRegs);
            } catch (err) {
                console.error(err);
                alert(err.response?.data || 'Could not load event details');
            } finally {
                setLoading(false);
            }
        }

        load();
    }, [id]);

    if (loading) return <p>Loading…</p>;
    if (!event) return <p>Event not found</p>;

    const isRegistered = regs.some(r => r.user_id === user.id);
    const regCount = regs.length;

    const handleRegister = async () => {
        try {
            const { data } = await axios.post(
                `/api/events/${id}/registrations`,
                { ticketType: 'general', price: 0 }
            );
            setRegs(prev => [...prev, { user_id: user.id }]);
        } catch (err) {
            alert(err.response?.data?.error || 'Error registering');
        }
    };

    const handleUnregister = async () => {
        try {
            await axios.delete(`/api/events/${id}/registrations`);
            setRegs(prev => prev.filter(r => r.user_id !== user.id));
        } catch (err) {
            alert(err.response?.data?.error || 'Error cancelling');
        }
    };

    return (
        <div>
            <h2>{event.title}</h2>
            <p><strong>Date:</strong> {new Date(event.event_date).toLocaleDateString()}</p>
            <p>{event.description}</p>

            {venue && (
                <>
                    <h3>Venue</h3>
                    <p>
                        <strong>{venue.name}</strong><br />
                        {venue.address}
                    </p>
                </>
            )}

            <div style={{ marginTop: 20 }}>
                {!isRegistered ? (
                    <button onClick={handleRegister}>Register</button>
                ) : (
                    <button onClick={handleUnregister}>Cancel Registration</button>
                )}
                <p>{regCount} user{regCount === 1 ? '' : 's'} registered.</p>
            </div>
        </div>
    );
}
