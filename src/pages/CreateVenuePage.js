import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CreateVenuePage() {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [capacity, setCapacity] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await axios.post('/api/venues', {
                name,
                address: location,
                capacity: Number(capacity),
            });
            navigate('/venues');
        } catch (err) {
            console.error(err);
            alert('Error creating venue');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create New Venue</h2>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={e => setLocation(e.target.value)}
                required
            />
            <input
                type="number"
                placeholder="Capacity"
                value={capacity}
                onChange={e => setCapacity(e.target.value)}
                required
            />
            <button type="submit">Create Venue</button>
        </form>
    );
}
