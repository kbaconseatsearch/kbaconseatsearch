import { useState } from "react";

const mockGames = [
  { id: 1, teams: ["Los Angeles Lakers", "Golden State Warriors"], date: "2025-03-25", location: "Crypto.com Arena, Los Angeles, CA", league: "NBA", prices: [120, 110, 130] },
  { id: 2, teams: ["Los Angeles Rams", "San Francisco 49ers"], date: "2025-10-12", location: "SoFi Stadium, Los Angeles, CA", league: "NFL", prices: [200, 180, 220] },
  { id: 3, teams: ["Los Angeles Dodgers", "San Diego Padres"], date: "2025-06-15", location: "Dodger Stadium, Los Angeles, CA", league: "MLB", prices: [45, 50, 55] },
  { id: 4, teams: ["Los Angeles Clippers", "Phoenix Suns"], date: "2025-04-05", location: "Crypto.com Arena, Los Angeles, CA", league: "NBA", prices: [90, 85, 100] },
  { id: 5, teams: ["Los Angeles Chargers", "Kansas City Chiefs"], date: "2025-11-20", location: "SoFi Stadium, Los Angeles, CA", league: "NFL", prices: [150, 140, 160] },
  { id: 6, teams: ["Los Angeles Angels", "New York Yankees"], date: "2025-07-22", location: "Angel Stadium, Anaheim, CA", league: "MLB", prices: [30, 35, 40] },
];

function Navbar() {
  return (
    <nav className="bg-white p-6 shadow-md flex items-center border-b">
      <img src="/logo.png" alt="SeatSearchPro Logo" className="h-16 ml-4" />
    </nav>
  );
}

function SearchBar({ filters, setFilters, onSearch }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div className="bg-white p-4 shadow-lg rounded-lg border border-gray-200 w-full max-w-5xl mx-auto mt-6 flex items-center gap-4">
      <input
        type="text"
        placeholder="Search by team..."
        className="p-3 border border-gray-300 rounded-lg w-1/4 shadow-sm focus:ring-2 focus:ring-blue-500"
        value={filters.team}
        onChange={(e) => setFilters({ ...filters, team: e.target.value })}
        onKeyDown={handleKeyDown}
      />
      <input
        type="date"
        className="p-3 border border-gray-300 rounded-lg w-1/4 shadow-sm focus:ring-2 focus:ring-blue-500"
        value={filters.date}
        onChange={(e) => setFilters({ ...filters, date: e.target.value })}
        onKeyDown={handleKeyDown}
      />
      <input
        type="text"
        placeholder="Search by location..."
        className="p-3 border border-gray-300 rounded-lg w-1/4 shadow-sm focus:ring-2 focus:ring-blue-500"
        value={filters.location}
        onChange={(e) => setFilters({ ...filters, location: e.target.value })}
        onKeyDown={handleKeyDown}
      />
      <button onClick={onSearch} className="bg-blue-600 text-white p-3 rounded-lg w-1/6 font-semibold shadow-md hover:bg-blue-700 transition duration-200">
        Search
      </button>
    </div>
  );
}

function EventCard({ event, onSelect }) {
  const lowestPrice = event.prices && event.prices.length > 0 ? Math.min(...event.prices) : null;
  return (
    <div 
      className="bg-white shadow-lg p-6 rounded-xl border border-gray-300 flex flex-col space-y-4 hover:shadow-2xl transition duration-300 transform hover:-translate-y-2 cursor-pointer"
      onClick={() => onSelect(event)}
    >
      <h2 className="text-xl font-bold text-gray-900">{event.teams.join(" vs. ")}</h2>
      <p className="text-gray-600 text-md">📅 {event.date} | 📍 {event.location}</p>
      {lowestPrice !== null && (
        <p className="text-green-600 text-lg font-semibold">Tickets from ${lowestPrice}</p>
      )}
    </div>
  );
}

function EventDetails({ event, onBack }) {
  return (
    <div className="bg-white p-6 shadow-lg rounded-lg max-w-3xl mx-auto mt-10">
      <button className="text-blue-600 font-semibold mb-4" onClick={onBack}>&larr; Back to Events</button>
      <h2 className="text-2xl font-bold">{event.teams.join(" vs. ")}</h2>
      <p className="text-gray-600">📅 {event.date} | 📍 {event.location}</p>
      <h3 className="text-lg font-semibold mt-4">Available Tickets:</h3>
      <ul className="mt-2 space-y-2">
        {event.prices.map((price, index) => (
          <li key={index} className="text-blue-600 font-medium bg-gray-100 p-2 rounded-md shadow-sm">
            ${price} per ticket
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Homepage() {
  const [filters, setFilters] = useState({ team: "", date: "", location: "" });
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  function handleSearch() {
    console.log("Search initiated with filters:", filters);
    const results = mockGames.filter(event =>
      (filters.team === "" || event.teams.some(team => team.toLowerCase().includes(filters.team.toLowerCase()))) &&
      (filters.location === "" || event.location.toLowerCase().includes(filters.location.toLowerCase())) &&
      (filters.date === "" || event.date === filters.date)
    );
    console.log("Filtered Events:", results);
    setFilteredEvents(results);
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4">
        {!selectedEvent ? (
          <>
            <SearchBar filters={filters} setFilters={setFilters} onSearch={handleSearch} />
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-10 pb-20">
              {filteredEvents.length > 0 ? (
                filteredEvents.map(event => (
                  <EventCard key={event.id} event={event} onSelect={setSelectedEvent} />
                ))
              ) : (
                <p className="text-gray-600 text-center col-span-full">No events found. Please search for a team or location.</p>
              )}
            </div>
          </>
        ) : (
          <EventDetails event={selectedEvent} onBack={() => setSelectedEvent(null)} />
        )}
      </div>
    </div>
  );
}
