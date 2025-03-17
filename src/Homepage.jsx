import { useState } from "react";

const mockTeams = [
  { id: 1, name: "Los Angeles Lakers", league: "NBA" },
  { id: 2, name: "Los Angeles Clippers", league: "NBA" },
  { id: 3, name: "Los Angeles Rams", league: "NFL" },
  { id: 4, name: "Los Angeles Chargers", league: "NFL" },
  { id: 5, name: "Los Angeles Dodgers", league: "MLB" },
  { id: 6, name: "Los Angeles Angels", league: "MLB" },
];

const mockGames = [
  { id: 1, teams: ["Los Angeles Lakers", "Golden State Warriors"], date: "2025-03-25", location: "Crypto.com Arena, Los Angeles, CA", league: "NBA" },
  { id: 2, teams: ["Los Angeles Rams", "San Francisco 49ers"], date: "2025-10-12", location: "SoFi Stadium, Los Angeles, CA", league: "NFL" },
  { id: 3, teams: ["Los Angeles Dodgers", "San Diego Padres"], date: "2025-06-15", location: "Dodger Stadium, Los Angeles, CA", league: "MLB" },
  { id: 4, teams: ["Los Angeles Clippers", "Phoenix Suns"], date: "2025-04-05", location: "Crypto.com Arena, Los Angeles, CA", league: "NBA" },
  { id: 5, teams: ["Los Angeles Chargers", "Kansas City Chiefs"], date: "2025-11-20", location: "SoFi Stadium, Los Angeles, CA", league: "NFL" },
  { id: 6, teams: ["Los Angeles Angels", "New York Yankees"], date: "2025-07-22", location: "Angel Stadium, Anaheim, CA", league: "MLB" },
];

function Navbar() {
  return (
    <nav className="bg-white p-6 shadow-md flex items-center border-b">
      <img src="/logo.png" alt="SeatSearchPro Logo" className="h-16 ml-4" />
    </nav>
  );
}

function SearchBar({ filters, setFilters, onSearch }) {
  return (
    <div className="bg-white p-4 shadow-lg rounded-lg border border-gray-200 w-full max-w-5xl mx-auto mt-6 flex items-center gap-4">
      <input
        type="text"
        placeholder="Search by team..."
        className="p-3 border border-gray-300 rounded-lg w-1/4 shadow-sm focus:ring-2 focus:ring-blue-500"
        value={filters.team}
        onChange={(e) => setFilters({ ...filters, team: e.target.value })}
      />
      <input
        type="date"
        className="p-3 border border-gray-300 rounded-lg w-1/4 shadow-sm focus:ring-2 focus:ring-blue-500"
        value={filters.date}
        onChange={(e) => setFilters({ ...filters, date: e.target.value })}
      />
      <input
        type="text"
        placeholder="Search by location..."
        className="p-3 border border-gray-300 rounded-lg w-1/4 shadow-sm focus:ring-2 focus:ring-blue-500"
        value={filters.location}
        onChange={(e) => setFilters({ ...filters, location: e.target.value })}
      />
      <button onClick={onSearch} className="bg-blue-600 text-white p-3 rounded-lg w-1/6 font-semibold shadow-md hover:bg-blue-700 transition duration-200">
        Search
      </button>
    </div>
  );
}

function EventCard({ event }) {
  return (
    <div className="bg-white shadow-lg p-6 rounded-xl border border-gray-300 flex flex-col space-y-4 hover:shadow-2xl transition duration-300 transform hover:-translate-y-2">
      <h2 className="text-xl font-bold text-gray-900">{event.teams.join(" vs. ")}</h2>
      <p className="text-gray-600 text-md">📅 {event.date} | 📍 {event.location}</p>
    </div>
  );
}

export default function Homepage() {
  const [filters, setFilters] = useState({ team: "", date: "", location: "" });
  const [filteredEvents, setFilteredEvents] = useState([]);

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
        <SearchBar filters={filters} setFilters={setFilters} onSearch={handleSearch} />
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-10">
          {filteredEvents.length > 0 ? (
            filteredEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))
          ) : (
            <p className="text-gray-600 text-center col-span-full">No events found. Please search for a team or location.</p>
          )}
        </div>
      </div>
    </div>
  );
}