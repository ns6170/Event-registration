import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export default function EventRegistrationsPage() {
    const { eventId } = useParams();
    const [regs, setRegs] = useState([]);

    useEffect(() => {
        async function load() {
            try {
                console.log(eventId);
                const { data } = await axios.get(
                    `/api/events/${eventId}/registrations`
                );
                setRegs(data);
            } catch (err) {
                console.error(err);
                alert('Could not load registrations');
            }
        }
        load();
    }, [eventId]);

    return (
        <div>
            <h2>Registrations for Event #{eventId}</h2>
            {regs.length ? (
                <table>
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Ticket</th>
                        </tr>
                    </thead>
                    <tbody>
                        {regs.map(r => (
                            <tr key={r.registration_id}>
                                <td>
                                    <Link to={`/users/${r.user_id}`}>{r.username}</Link>
                                </td>
                                <td>{r.email}</td>
                                <td>{r.status}</td>
                                <td>
                                    {r.ticket_id
                                        ? `${r.ticket_type} ($${r.price})`
                                        : '—'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No one has registered yet.</p>
            )}
            <Link to="/hello">← Back to Dashboard</Link>
        </div>
    );
}
