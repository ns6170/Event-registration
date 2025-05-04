// src/pages/EditEventPage.js
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function EditEventPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    // form state
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [venueId, setVenueId] = useState('');

    // load existing event
    useEffect(() => {
        async function load() {
            try {
                const { data } = await axios.get(`/api/events/${id}`);
                setTitle(data.title);
                setDescription(data.description);
                setEventDate(data.event_date.split('T')[0]); // yyyy-mm-dd
                setVenueId(data.venue_id);
            } catch (err) {
                console.error(err);
                alert('Could not load event');
            }
        }
        load();
    }, [id]);

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await axios.put(`/api/events/${id}`, {
                title,
                description,
                event_date: eventDate,
                venue_id: venueId,
            });
            navigate('/hello');
        } catch (err) {
            console.error(err);
            alert('Error updating event');
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this event?')) return;
        try {
            await axios.delete(`/api/events/${id}`);
            navigate('/hello');
        } catch (err) {
            console.error(err);
            alert('Error deleting event');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Edit Event</h2>

                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    required
                />

                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    required
                />

                <input
                    type="date"
                    value={eventDate}
                    onChange={e => setEventDate(e.target.value)}
                    required
                />

                <input
                    type="number"
                    placeholder="Venue ID"
                    value={venueId}
                    onChange={e => setVenueId(e.target.value)}
                    required
                />

                <div style={{ marginTop: '1em' }}>
                    <button type="submit">Save Changes</button>{' '}
                    <button type="button" onClick={handleDelete} style={{ color: 'red' }}>
                        Delete Event
                    </button>
                </div>
            </form>
        </div>
    );
}
