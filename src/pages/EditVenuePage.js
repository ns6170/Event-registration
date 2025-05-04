import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function EditVenuePage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [capacity, setCapacity] = useState('');

    useEffect(() => {
        async function load() {
            try {
                const { data } = await axios.get(`/api/venues/${id}`);
                setName(data.name);
                setLocation(data.location);
                setCapacity(data.capacity);
            } catch (err) {
                console.error(err);
                alert('Could not load venue');
            }
        }
        load();
    }, [id]);

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await axios.put(`/api/venues/${id}`, {
                name,
                address: location,
                capacity: Number(capacity),
            });
            navigate('/venues');
        } catch (err) {
            console.error(err);
            alert('Error updating venue');
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this venue?')) return;
        try {
            await axios.delete(`/api/venues/${id}`);
            navigate('/venues');
        } catch (err) {
            console.error(err);
            alert('Error deleting venue');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Edit Venue</h2>

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

            <div style={{ marginTop: '1em' }}>
                <button type="submit">Save Changes</button>{' '}
                <button
                    type="button"
                    onClick={handleDelete}
                    style={{ color: 'red' }}
                >
                    Delete Venue
                </button>
            </div>
        </form>
    );
}
