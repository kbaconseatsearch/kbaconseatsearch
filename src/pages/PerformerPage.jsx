// src/pages/PerformerPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'; // ✅ added Link here
import Navbar from '../components/Navbar';
import performers from '../performers.json';

const PerformerPage = () => {
  const { slug } = useParams();
  const [performer, setPerformer] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const backgroundMap = {
    mlb: '/images/background-mlb.jpg',
    nba: '/images/background-nba.jpg',
    nfl: '/images/background-nfl.jpg',
    nhl: '/images/background-nhl.jpg',
  };

  useEffect(() => {
    const fetchPerformerAndEvents = async () => {
      try {
        setLoading(true);
        const pData = performers[slug];
        if (!pData) throw new Error("Performer not found in JSON");
        setPerformer(pData);

        const res = await fetch(`http://localhost:3001/api/events/search?team=${pData.slug}`);
        if (!res.ok) throw new Error("Events fetch failed");

        const eventData = await res.json();
        setEvents(eventData?.results || []);
      } catch (err) {
        console.error('❌ Error loading performer page:', err);
        setError(`Failed to load performer data: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchPerformerAndEvents();
  }, [slug]);

  if (loading) {
  return (
    <div className="flex justify-center items-center h-[60vh]">
      <img
        src="/logos/seatsearchpro-logo-no-writing.png"
        alt="Loading"
        className="w-40 h-40 animate-spin-slow"
      />
    </div>
  );
}
  if (error) return <div className="p-4 text-red-600">{error}</div>;

  const bgImage = backgroundMap[performer.sport] || '/images/background-default.jpg';

  return (
    <div
      className="min-h-screen bg-cover bg-center font-sans"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="bg-white bg-opacity-90 min-h-screen">
        <Navbar />
        <div className="max-w-3xl mx-auto p-6">
          <h1 className="text-3xl font-bold mb-2">{performer.name}</h1>

          <div className="mb-6 text-gray-700">
            <strong>Venue:</strong> {performer.venue || 'TBD'}<br />
            <strong>Address:</strong> {performer.address || 'TBD'}
          </div>

          <h2 className="text-2xl font-semibold mb-4">Upcoming Events</h2>

          {events.length === 0 ? (
            <p>No upcoming events for this team.</p>
          ) : (
            <ul className="space-y-4">
              {events.map(event => {
                const price = event.retailMin != null
  ? `$${parseFloat(event.retailMin).toFixed(2)}`
  : null;
                const date = new Date(event.occurs_at_local || event.occurs_at || event.date);
                const dateStr = date.toLocaleString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: true,
                  timeZoneName: 'short',
                });

                return (
                  <li key={event.event_id || event.id} className="border bg-white p-4 rounded shadow">
                    <div className="font-medium text-lg">{event.name}</div>
                    <div className="text-sm text-gray-600 mb-2">{dateStr}</div>
  <Link
  to={`/event/${event.event_id}`}
  className="inline-block bg-[#fea709] hover:bg-[#e89c06] text-white font-semibold px-4 py-2 rounded shadow text-sm"
>
  {event.lowestPrice !== null
    ? `Tickets as low as $${parseFloat(event.lowestPrice).toFixed(2)}`
    : 'View Tickets'}
</Link>
                    
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default PerformerPage;