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
  const [minQuantity, setMinQuantity] = useState('2');
  const [selectedSections, setSelectedSections] = useState([]);
  const [inventoryType, setInventoryType] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 1000]);

  useEffect(() => {
    const fetchEventAndTickets = async () => {
      try {
        const eventRes = await fetch(`/api/events/${id}`);
        const eventData = await eventRes.json();
        setEvent(eventData);

        const ticketRes = await fetch(`/api/events/${id}/listings`);
        const ticketData = await ticketRes.json();

        const all = ticketData.listings || [];
        const prices = all
          .map((t) => Number(t.retail_price_inclusive ?? t.retail_price ?? t.price ?? 0))
          .filter(p => !isNaN(p));
        const low = Math.min(...prices);
        const high = Math.max(...prices);

        setPriceRange([low, high]);
        setMinPrice(String(low));
        setMaxPrice(String(high));

        setTickets(all);
        setFilteredTickets(all);
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
      case 'mlb': return '/backgrounds/mlb-bg.png';
      case 'nba': return '/backgrounds/nba-bg.png';
      case 'nfl': return '/backgrounds/nfl-bg.png';
      case 'nhl': return '/backgrounds/nhl-bg.png';
      default: return '/backgrounds/mlb-bg.png';
    }
  };

  const applyFilters = () => {
    let filtered = [...tickets];

    if (inventoryType === 'ticket') {
      filtered = filtered.filter(
        (t) =>
          t.inventory_type !== 'parking' &&
          t.type !== 'parking' &&
          !(t.section?.toLowerCase?.().includes('parking') ?? false)
      );
    } else if (inventoryType === 'parking') {
      filtered = filtered.filter(
        (t) =>
          t.inventory_type === 'parking' ||
          t.type === 'parking' ||
          (t.section?.toLowerCase?.().includes('parking') ?? false)
      );
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
  }, [minPrice, maxPrice, minQuantity, inventoryType, selectedSections]);

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
        <img src="/logos/seatsearchpro-logo-no-writing.png" alt="Loading" className="w-40 h-40 animate-spin-slow" />
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
                  navigate(`/search?team=${encodeURIComponent(state.team)}&start=${state.startDate}&end=${state.endDate}`, { state });
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

              <div className="mb-4 space-y-2 text-sm text-gray-700">
                <div>
                  <label>🎫 Number of Tickets</label>
                  <select
                    value={minQuantity}
                    onChange={(e) => setMinQuantity(e.target.value)}
                    className="w-full border rounded p-1 mt-1"
                  >
                    {Array.from({ length: 20 }, (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} Ticket{i > 0 && 's'}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block mb-1 font-medium text-sm">
                    💰 Max Price: <span className="text-blue-700 font-semibold">${maxPrice}</span>
                  </label>
                  <div className="flex justify-between items-center text-xs text-gray-600 mb-1">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                  <input
                    type="range"
                    min={priceRange[0]}
                    max={priceRange[1]}
                    step={1}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-full appearance-none h-2 bg-gray-300 rounded"
                  />
                </div>

                <div>
                  <label>🚗 Inventory Type</label>
                  <select
                    value={inventoryType}
                    onChange={(e) => setInventoryType(e.target.value)}
                    className="w-full border rounded p-1 mt-1"
                  >
                    <option value="all">All</option>
                    <option value="ticket">Tickets Only</option>
                    <option value="parking">Parking Only</option>
                  </select>
                </div>

                <div>
                  <label>🧭 Sort By</label>
                  <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="w-full border rounded p-1 mt-1"
                  >
                    <option value="priceLow">Price: Low to High</option>
                    <option value="priceHigh">Price: High to Low</option>
                    <option value="sectionAZ">Section: A to Z</option>
                    <option value="sectionZA">Section: Z to A</option>
                  </select>
                </div>
              </div>

              {sortedTickets.length === 0 ? (
                <p className="text-gray-500">No tickets match your filters.</p>
              ) : (
                <ul className="space-y-3 overflow-y-auto max-h-[650px] pr-1">
                  {sortedTickets.map((ticket, index) => {
                    const isParking = ticket.inventory_type === 'parking' || ticket.type === 'parking';
                    const price = ticket.price ?? ticket.retail_price_inclusive ?? ticket.retail_price ?? 0;

                    return (
                      <li key={index} className="border rounded px-3 py-2 shadow-sm bg-white/30 backdrop-blur-sm">
                        <div className="flex justify-between items-center">
                          <div className="text-sm font-semibold text-gray-800">
                            {isParking ? (
                              <>
                                🅿️ {ticket.section || 'Parking'}
                                <span className="ml-2 text-xs font-bold text-white bg-gray-800 px-2 py-0.5 rounded">
                                  Parking Only
                                </span>
                              </>
                            ) : (
                              <>
                                {ticket.section ?? 'Section TBD'} • Row {ticket.row ?? '—'}
                              </>
                            )}
                          </div>
                          <div className="text-blue-600 font-bold text-right">
                            ${Number(price).toFixed(2)}
                          </div>
                        </div>

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