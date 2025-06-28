import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const TeamPage = () => {
  const { league, teamName } = useParams();
  const navigate = useNavigate();

  const normalizedTeam = teamName
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase()); // "los-angeles-dodgers" → "Los Angeles Dodgers"

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`/api/events/search?team=${encodeURIComponent(normalizedTeam)}`);
        const data = await res.json();
        if (data?.results) {
          setEvents(data.results);
        } else {
          setError('No events found.');
        }
      } catch (err) {
        setError('Error fetching team schedule.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [normalizedTeam]);

  const getBackgroundImage = () => {
    switch (league?.toLowerCase()) {
      case 'mlb':
        return '/backgrounds/mlb-bg.png';
      case 'nba':
        return '/backgrounds/nba-bg.png';
      case 'nfl':
        return '/backgrounds/nfl-bg.png';
      case 'nhl':
        return '/backgrounds/nhl-bg.png';
      default:
        return '/backgrounds/mlb-bg.png';
    }
  };

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

  if (error) {
    return <div className="text-center mt-10 text-red-600">{error}</div>;
  }

  return (
    <>
      <Navbar />
      <div className="relative py-12">
        {/* Blurred Background */}
   <div
  className="absolute inset-0 bg-cover bg-center filter blur-md brightness-[1.5] contrast-[0.85] z-0"
  style={{ backgroundImage: `url(${getBackgroundImage()})` }}
/>
        {/* Foreground content */}
<div className="relative z-10 bg-white/30 backdrop-blur-md max-w-screen-xl mx-auto p-6 rounded shadow">          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Upcoming Games for {normalizedTeam}
          </h1>

          {events.length === 0 ? (
            <p className="text-gray-600">No games available.</p>
          ) : (
            <ul className="space-y-4">
              {events.map((event) => (
                <li
  key={event.event_id}
  className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white/40 backdrop-blur-sm border border-white/50 rounded p-4 shadow"
>
                  <div>
                    <div className="text-lg font-semibold text-gray-800">{event.name}</div>
                    <div className="text-sm text-gray-600">
                      {(() => {
                        const rawDate = event.date;
                        const tz = event.venue?.time_zone ?? 'America/New_York';
                        return new Date(rawDate).toLocaleString('en-US', {
                          weekday: 'short',
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: 'numeric',
                          minute: '2-digit',
                          timeZone: tz,
                          timeZoneName: 'short',
                        });
                      })()}
                    </div>
                    <div className="text-sm text-gray-500">
                      {event.venue?.name} • {event.venue?.location}
                    </div>
                  </div>
                  <div className="mt-3 md:mt-0">
                    <button
                      onClick={() => navigate(`/event/${event.event_id}`)}
                      className="bg-[#fea709] hover:bg-[#e89c06] text-white font-semibold px-4 py-2 rounded shadow text-sm"
                    >
                      View Tickets
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default TeamPage;