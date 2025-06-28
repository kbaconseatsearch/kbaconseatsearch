import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import SeatMap from '../seatmaps-client/packages/seatmaps-client/src/components/SeatMap.tsx';
import { mlbVenueTimezones } from '../tools/timezones';
import Navbar from './components/Navbar';

const EventDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState('priceLow');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minQuantity, setMinQuantity] = useState('1');
  const [selectedSections, setSelectedSections] = useState([]);
  const [brokerageNames, setBrokerageNames] = useState({});

  useEffect(() => {
    const fetchEventAndTickets = async () => {
      try {
        const brokerageRes = await fetch('/api/brokerages');
        const brokerageData = await brokerageRes.json();
        const nameMap = {};
        for (const brokerage of brokerageData.brokerages || []) {
          nameMap[brokerage.id] = brokerage.name;
        }
        setBrokerageNames(nameMap);

        const eventRes = await fetch(`/api/events/${id}`);
        const eventData = await eventRes.json();
        setEvent(eventData);

        const ticketRes = await fetch(`/api/events/${id}/listings`);
        const ticketData = await ticketRes.json();
        setTickets(ticketData.listings || []);
        setFilteredTickets(ticketData.listings || []);
      } catch (err) {
        console.error('Error fetching event or tickets:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEventAndTickets();
  }, [id]);

  const getBackgroundImage = () => {
    const sport = event?.category?.toLowerCase?.();
    switch (sport) {
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

  const applyFilters = () => {
    let filtered = [...tickets];

    const normalize = (str) =>
      (str ?? '')
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '')
        .replace(/^sec/, '')
        .replace(/^section/, '');

    if (selectedSections.length > 0) {
      const normalize = (str) => (str ?? '').toLowerCase().replace(/[^a-z0-9]/g, '');
      const normalizedSelected = selectedSections.map(normalize);

      filtered = filtered.filter((ticket) => {
        const section = ticket.section ?? '';
        const normalizedTicketSection = normalize(section);

        return normalizedSelected.some(
          (sel) =>
            normalizedTicketSection.includes(sel) ||
            sel.includes(normalizedTicketSection)
        );
      });
    }

    filtered = filtered.filter(
      (t) => Number(t.quantity ?? 1) >= parseInt(minQuantity)
    );

    const getPrice = (t) =>
      Number(t.retail_price_inclusive ?? t.retail_price ?? t.price ?? 0);

    if (minPrice) {
      filtered = filtered.filter((t) => getPrice(t) >= parseFloat(minPrice));
    }

    if (maxPrice) {
      filtered = filtered.filter((t) => getPrice(t) <= parseFloat(maxPrice));
    }

    setFilteredTickets(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [selectedSections, minPrice, maxPrice, minQuantity]);

  const sortedTickets = [...filteredTickets].sort((a, b) => {
    const priceA = Number(a.retail_price_inclusive ?? a.retail_price ?? a.price ?? 0);
    const priceB = Number(b.retail_price_inclusive ?? b.retail_price ?? b.price ?? 0);
    const sectionA = a.section ?? '';
    const sectionB = b.section ?? '';

    switch (sortOption) {
      case 'priceLow': return priceA - priceB;
      case 'priceHigh': return priceB - priceA;
      case 'sectionAZ': return sectionA.localeCompare(sectionB);
      case 'sectionZA': return sectionB.localeCompare(sectionA);
      default: return 0;
    }
  });

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

  if (!event) return <div className="text-center mt-10">Event not found.</div>;

  return (
    <>
      <Navbar />
      <div className="relative py-12">
        <div
          className="absolute inset-0 bg-cover bg-center filter blur-md brightness-[1.5] contrast-[0.85] z-0"
          style={{ backgroundImage: `url(${getBackgroundImage()})` }}
        />
        <div className="relative z-10 bg-white/30 backdrop-blur-md max-w-screen-xl mx-auto p-4 rounded shadow">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
            <button
              onClick={() => {
                const state = location.state;
                if (state?.team && state?.startDate && state?.endDate) {
                  navigate(
                    `/search?team=${encodeURIComponent(state.team)}&start=${state.startDate}&end=${state.endDate}`,
                    { state }
                  );
                } else {
                  navigate(-1);
                }
              }}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-4 py-2 rounded shadow text-sm w-fit"
            >
              ← Return to Search Results
            </button>

            <div className="mt-3 sm:mt-0 text-center sm:text-right">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{event.name}</h1>
              <p className="text-sm text-gray-600">
                {(() => {
                  const rawDate = event.occurs_at_local ?? event.occurs_at;
                  const tz = event.venue?.time_zone ?? 'America/New_York';
                  return new Date(rawDate).toLocaleString('en-US', {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                    timeZone: tz,
                    timeZoneName: 'short'
                  });
                })()} @ {event.venue?.name}, {event.venue?.location}
              </p>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-1/3 w-full border rounded shadow p-4 bg-white/40 backdrop-blur-sm">
              <h2 className="text-xl font-semibold mb-4">Available Tickets</h2>
              {/* Filters */}
              {/* ... (unchanged content) */}
              {sortedTickets.length === 0 ? (
                <p className="text-gray-500">No tickets match your filters.</p>
              ) : (
                <ul className="space-y-3 overflow-y-auto max-h-[650px] pr-1">
                  {sortedTickets.map((ticket, index) => {
                    const price = ticket.price ?? ticket.retail_price_inclusive ?? ticket.retail_price ?? 0;
                    return (
                      <li key={index} className="border rounded px-3 py-2 shadow-sm bg-white/30 backdrop-blur-sm">
                        <div className="text-sm font-semibold text-gray-800">
                          {ticket.section} • Row {ticket.row}
                        </div>
                        <div className="text-blue-600 font-bold">${Number(price).toFixed(2)}</div>
                        <div className="text-xs text-gray-400">
                          Broker: {ticket.office?.brokerage?.name ?? 'Unknown'}
                        </div>
                        <a
                          href={`https://checkout.seatsearchpro.com/listings/${ticket.id}/checkout`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block bg-[#fea709] hover:bg-[#e89c06] text-white font-semibold px-4 py-1 rounded shadow text-sm mt-2"
                        >
                          Buy Now
                        </a>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            <div className="lg:w-2/3 w-full border rounded shadow p-2 bg-white/30 backdrop-blur-sm">
              {event.configuration?.id && event.venue?.id ? (
                <div id="seat-map">
                  <SeatMap
                    configurationId={event.configuration.id}
                    venueId={event.venue.id}
                    ticketGroups={tickets}
                    selectedSections={selectedSections}
                    onSectionSelect={(sections) => setSelectedSections(sections)}
                    showControls
                    showLegend
                  />
                </div>
              ) : (
                <p className="text-gray-500">Seat map not available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventDetails;