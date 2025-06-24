import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SeatMap from '../seatmaps-client/packages/seatmaps-client/src/components/SeatMap.tsx';
import { mlbVenueTimezones } from '../tools/timezones';

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState('priceLow');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minQuantity, setMinQuantity] = useState('1');
  const [selectedSections, setSelectedSections] = useState([]);

  useEffect(() => {
    const fetchEventAndTickets = async () => {
      try {
        const eventRes = await fetch(`/api/events/${id}`);
        const eventData = await eventRes.json();
        setEvent(eventData);
        console.log('📅 Raw occurs_at:', eventData.occurs_at);
        console.log('🕒 Parsed Date:', new Date(eventData.occurs_at));
        const ticketRes = await fetch(`/api/events/${id}/listings?include_tevo_section_mappings=true`);
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

  const applyFilters = () => {
  let filtered = [...tickets];

  const normalize = (str) => (str ?? '').toLowerCase().replace(/[^a-z0-9]/g, '');

  if (selectedSections.length > 0) {
   const normalizedSelected = selectedSections.map(normalize);

filtered = filtered.filter((ticket) => {
  const section = ticket.section ?? '';
  const normalizedSection = normalize(section);
  const match = normalizedSelected.some((sel) => sel.endsWith(normalizedSection));

      console.log(`🧪 Section: "${section}" → "${normalizedSection}"`);
      if (match) console.log(`✅ MATCH`);
      else console.log(`❌ NO MATCH`);

      return match;
    });
  }

  // Quantity filter
  filtered = filtered.filter(
    (t) => Number(t.quantity ?? 1) >= parseInt(minQuantity)
  );

  // Price range filter
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
    <div className="max-w-screen-xl mx-auto p-4">
      <div className="flex justify-between items-center mb-1">
        <h1 className="text-2xl font-bold">{event.name}</h1>
       
      </div>
     <p className="text-gray-600 mb-6">
  {(() => {
    const rawDate = event.occurs_at_local ?? event.occurs_at;
    const tz = event.venue?.time_zone ?? 'America/New_York';
    return new Date(rawDate).toLocaleString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      timeZone: tz,
      timeZoneName: 'short'
    });
  })()} @ {event.venue?.name}, {event.venue?.location}
</p>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* 🎟️ Ticket Filter and List */}
        <div className="lg:w-1/3 w-full border rounded shadow p-4">
          <h2 className="text-xl font-semibold mb-4">Available Tickets</h2>

          {/* Quantity */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Number of Tickets:
            </label>
            <select
              value={minQuantity}
              onChange={(e) => setMinQuantity(e.target.value)}
              className="w-full border border-gray-300 rounded px-2 py-1 shadow-sm"
            >
              {[...Array(18)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1} Ticket{i > 0 ? 's' : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Price */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Filter by price:</label>
            <div className="flex gap-2 mb-2">
              <input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-1/2 border border-gray-300 rounded px-2 py-1 shadow-sm"
              />
              <input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-1/2 border border-gray-300 rounded px-2 py-1 shadow-sm"
              />
            </div>
            <button
              onClick={applyFilters}
              className="bg-[#fea709] hover:bg-[#e89c06] text-white font-semibold px-4 py-2 rounded shadow w-full"
            >
              Apply Filters
            </button>
          </div>

          {/* Sort */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Sort by:</label>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="w-full border border-gray-300 rounded px-2 py-1 shadow-sm"
            >
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
              <option value="sectionAZ">Section: A–Z</option>
              <option value="sectionZA">Section: Z–A</option>
            </select>
          </div>

          {/* Clear Section Filter */}
          {selectedSections.length > 0 && (
            <button
              onClick={() => setSelectedSections([])}
              className="mt-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-4 py-2 rounded shadow w-full"
            >
              Clear Section Filter
            </button>
          )}

          {/* Tickets */}
          {sortedTickets.length === 0 ? (
            <p className="text-gray-500">No tickets match your filters.</p>
          ) : (
            <ul className="space-y-3 overflow-y-auto max-h-[650px] pr-1">
              {sortedTickets.map((ticket, index) => {
                const price = ticket.price ?? ticket.retail_price_inclusive ?? ticket.retail_price ?? 0;
                return (
                  <li key={index} className="border rounded px-3 py-2 shadow-sm">
                    <div className="text-sm font-semibold text-gray-800">
                      {ticket.section} • Row {ticket.row}
                    </div>
                    <div className="text-blue-600 font-bold">${Number(price).toFixed(2)}</div>
                    <div className="text-xs text-gray-500">
                      {ticket.delivery_type || 'Resale Ticket'} • {ticket.quantity} Ticket
                      {ticket.quantity > 1 ? 's' : ''}
                    </div>
                    <div className="text-xs text-gray-400">
                      Broker: {ticket.broker ?? 'Unknown'}
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

        {/* 🗺️ Seat Map */}
        <div className="lg:w-2/3 w-full border rounded shadow p-2">
          {event.configuration?.id && event.venue?.id ? (
            <div id="seat-map">
             <SeatMap
  configurationId={event.configuration.id}
  venueId={event.venue.id}
  ticketGroups={tickets}
  selectedSections={selectedSections}
  onSectionSelect={(sections) => {
    console.log('🧩 Section selected from map:', sections);
    setSelectedSections(sections);
  }}
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
  );
};

export default EventDetails;