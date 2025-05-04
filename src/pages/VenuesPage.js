import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function VenuesPage() {
    const [venues, setVenues] = useState([]);

    useEffect(() => {
        async function fetch() {
            try {
                const { data } = await axios.get('/api/venues');
                setVenues(data);
            } catch (err) {
                console.error(err);
            }
        }
        fetch();
    }, []);

    return (
        <div>
            <h2>Venues</h2>
            <Link to="/venues/new">Create New Venue</Link>
            {venues.length > 0 ? (
                <ul>
                    {venues.map(v => (
                        <li key={v.id} style={{ marginBottom: '0.5em' }}>
                            id:{v.id} - {v.name} ({v.location}){' '}
                            <Link to={`/venues/${v.id}/edit`}>Edit</Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No venues yet.</p>
            )}
        </div>
    );
}
