// src/pages/PerformerPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PerformerPage = () => {
  const { slug } = useParams();
  const [performer, setPerformer] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPerformerAndEvents = async () => {
      try {
        setLoading(true);
        console.log("🔍 Fetching performer:", slug);

        // First: get performer info via your backend proxy
        const performerRes = await fetch(`http://localhost:3001/api/performers/${slug}`);
        if (!performerRes.ok) throw new Error("Performer fetch failed");

        const performerData = await performerRes.json();
        setPerformer(performerData);

        // Second: get events for that performer
        const eventsRes = await fetch(`http://localhost:3001/api/events?performer_id=${performerData.id}`);
        if (!eventsRes.ok) throw new Error("Events fetch failed");

        const eventsData = await eventsRes.json();
        setEvents(eventsData.events || []);
      } catch (err) {
        console.error('❌ Error loading performer page:', err);
        setError(`Failed to load performer data: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchPerformerAndEvents();
  }, [slug]);

  if (loading) return <div className="p-4">Loading performer info...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{performer.name}</h1>
      <p className="mb-6">{performer.short_bio || 'No bio available.'}</p>

      <h2 className="text-2xl font-semibold mb-2">Upcoming Events</h2>
      {events.length === 0 ? (
        <p>No upcoming events for this performer.</p>
      ) : (
        <ul className="space-y-4">
          {events.map(event => (
            <li key={event.id} className="border p-4 rounded shadow">
              <div className="font-medium text-lg">{event.name}</div>
              <div className="text-sm text-gray-600">
        {new Date(event.occurs_at).toLocaleString('en-US', {
             weekday: 'long',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
})}              </div>
              <a
                href={`https://www.ticketevolution.com/events/${event.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                View Tickets
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PerformerPage;