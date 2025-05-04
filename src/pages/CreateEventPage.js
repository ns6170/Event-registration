import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CreateEventPage() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [venueId, setVenueId] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await axios.post('/api/events', {
                title,
                description,
                event_date: eventDate,
                venue_id: venueId
            });
            navigate('/hello');
        } catch (err) {
            console.error(err);
            alert('Error creating event');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create New Event</h2>
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
            <button type="submit">Create Event</button>
        </form>
    );
}
