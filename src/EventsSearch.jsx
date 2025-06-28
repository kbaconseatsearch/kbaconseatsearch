import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';

const getSportFromTeam = (team) => {
  const sportMap = {
    mlb: ['dodgers', 'giants', 'yankees', 'padres', 'phillies', 'red sox'],
    nba: ['lakers', 'warriors', 'celtics', 'suns'],
    nfl: ['rams', 'cowboys', 'packers', 'chargers', 'raiders'],
    nhl: ['kings', 'bruins', 'rangers', 'sharks'],
  };

  const t = team?.toLowerCase();
  for (const sport in sportMap) {
    if (sportMap[sport].includes(t)) return sport;
  }
  return 'default';
};

const EventsSearch = ({ teamName, startDate, endDate }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const fallbackZones = {
    'Los Angeles, CA': 'America/Los_Angeles',
    'Denver, CO': 'America/Denver',
    'Kansas City, MO': 'America/Chicago',
    'Chicago, IL': 'America/Chicago',
    'New York, NY': 'America/New_York',
    'San Diego, CA': 'America/Los_Angeles',
    'Phoenix, AZ': 'America/Phoenix',
    'Miami, FL': 'America/New_York',
  };

  const isValidIANAZone = (tz) => {
    try {
      Intl.DateTimeFormat(undefined, { timeZone: tz });
      return true;
    } catch {
      return false;
    }
  };

  const fetchEvents = async (pageToFetch = 1) => {
    try {
      const query = `?start=${startDate}&end=${endDate}&team=${encodeURIComponent(
        teamName
      )}&page=${pageToFetch}`;
      const response = await fetch(`/api/events/search${query}`);
      const data = await response.json();

      const formatted = (data.results || []).map((event) => {
        const rawDate = event.date;
        const locationKey = event.venue?.location;
        let timeZone = event.venue?.time_zone ?? fallbackZones[locationKey];

        if (!isValidIANAZone(timeZone)) {
          timeZone = 'America/New_York';
        }

        let formattedDate = 'TBD';
        if (rawDate && timeZone) {
          try {
            formattedDate = new Date(rawDate).toLocaleString('en-US', {
              weekday: 'short',
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
              timeZone,
              timeZoneName: 'short',
            });
          } catch (err) {
            console.error('🛑 Date formatting error:', err, rawDate, timeZone);
          }
        }

        return {
          id: event.event_id,
          name: event.name,
          date: formattedDate,
          venue: `${event.venue.name} — ${event.venue.location}`,
          lowestPrice: event.lowestPrice ?? null,
        };
      });

      if (pageToFetch === 1) {
        setEvents(formatted);
      } else {
        setEvents((prev) => [...prev, ...formatted]);
      }

      if (formatted.length < 10) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Failed to fetch events:', error);
    } finally {
      setLoading(false);
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    if (!startDate || !endDate) return;
    setLoading(true);
    setPage(1);
    setHasMore(true);
    fetchEvents(1);
  }, [teamName, startDate, endDate]);

  // 🔁 Infinite Scroll Hook
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 400 &&
        !isLoadingMore &&
        hasMore
      ) {
        const nextPage = page + 1;
        setIsLoadingMore(true);
        setPage(nextPage);
        fetchEvents(nextPage);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoadingMore, hasMore, page, teamName, startDate, endDate]);

  const sport = getSportFromTeam(teamName);
  const backgroundImage = sport !== 'default' ? `/backgrounds/${sport}-bg.png` : '';

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <img
          src="/logos/seatsearchpro-logo-no-writing.png"
          alt="Loading"
          className="w-32 h-32 animate-spin-slow"
        />
      </div>
    );
  }

  if (!events.length) {
    return <p className="text-center mt-4 text-gray-600">No events found.</p>;
  }

  return (
    <div
      className="mt-8 space-y-4 bg-cover bg-center bg-no-repeat rounded-xl p-4"
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backdropFilter: 'blur(6px)',
      }}
    >
      {events.map((event) => (
        <div
          key={event.id}
          className="bg-white border border-gray-200 rounded-lg p-4 shadow flex flex-col sm:flex-row sm:items-center sm:justify-between hover:shadow-md transition-shadow"
        >
          <div className="mb-2 sm:mb-0">
            <h3 className="text-lg font-semibold text-gray-900">{event.name}</h3>
            <p className="text-sm text-gray-600">
              {event.date} @ {event.venue}
            </p>
          </div>
          <Link
            to={`/event/${event.id}`}
            state={{
              event,
              team: teamName,
              startDate,
              endDate,
            }}
            className="inline-block mt-2 sm:mt-0 bg-[#fea709] hover:bg-[#e89c06] text-white text-sm font-semibold px-4 py-2 rounded shadow"
          >
            {event.lowestPrice
              ? `Buy Tickets from $${event.lowestPrice.toFixed(2)}`
              : 'Buy Tickets'}
          </Link>
        </div>
      ))}

      {isLoadingMore && (
  <div className="flex justify-center items-center mt-6">
    <img
      src="/logos/seatsearchpro-logo-no-writing.png"
      alt="Loading more"
      className="w-12 h-12 animate-spin-slow rounded-xl"
    />
  </div>
)}
    </div>
  );
};

export default EventsSearch;