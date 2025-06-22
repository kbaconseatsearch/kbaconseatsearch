import React from 'react';
import { useParams, useLocation } from 'react-router-dom';

const TicketsPage = () => {
  const { eventId } = useParams();
  const location = useLocation();
  const event = location.state?.event;

  if (!event) {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Loading event details...</h1>
        <p className="text-gray-600 text-lg">We were unable to load the full event information.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold text-gray-800 mb-2">{event.title}</h1>
      <p className="text-sm text-gray-600 mb-1">
        {event.date} — {event.time}<br />
        {event.venue}, {event.venueCity}
      </p>
      <div className="mt-4">
        <h2 className="text-lg font-semibold mb-2">Buy Tickets</h2>
        <a
          href={event.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded shadow hover:bg-blue-700 transition"
        >
          View on {event.source}
        </a>
      </div>
    </div>
  );
};

export default TicketsPage;
