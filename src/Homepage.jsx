import { useState } from "react";

const mockEvents = [
  {
    id: 1,
    name: "Los Angeles Lakers vs. Golden State Warriors",
    date: "2025-03-25",
    location: "Crypto.com Arena, Los Angeles, CA",
    prices: ["$120 - Ticketmaster", "$110 - SeatGeek", "$130 - StubHub"],
  },
  {
    id: 2,
    name: "New York Yankees vs. Boston Red Sox",
    date: "2025-04-10",
    location: "Yankee Stadium, New York, NY",
    prices: ["$75 - Ticketmaster", "$80 - StubHub", "$70 - SeatGeek"],
  },
  {
    id: 3,
    name: "Super Bowl LIX",
    date: "2025-02-09",
    location: "Caesars Superdome, New Orleans, LA",
    prices: ["$5,000 - Ticketmaster", "$4,800 - StubHub", "$5,200 - SeatGeek"],
  },
];

function Navbar() {
  return (
    <nav className="bg-white p-6 shadow-md flex items-center border-b">
      <img src="/logo.png" alt="SeatSearchPro Logo" className="h-16 ml-4" />
    </nav>
  );
}

function SearchBar({ filters, setFilters }) {
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
      <button className="bg-blue-600 text-white p-3 rounded-lg w-1/6 font-semibold shadow-md hover:bg-blue-700 transition duration-200">
        Search
      </button>
    </div>
  );
}

function EventCard({ event }) {
  return (
    <div className="bg-white shadow-lg p-6 rounded-xl border border-gray-300 flex flex-col space-y-4 hover:shadow-2xl transition duration-300 transform hover:-translate-y-2">
      <h2 className="text-xl font-bold text-gray-900">{event.name}</h2>
      <p className="text-gray-600 text-md">📅 {event.date} | 📍 {event.location}</p>
      <div className="w-full border-t pt-4">
        <h3 className="text-lg font-semibold text-gray-800">Available Tickets:</h3>
        <ul className="mt-2 space-y-2">
          {event.prices.map((price, index) => (
            <li key={index} className="text-blue-600 font-medium bg-gray-100 p-2 rounded-md shadow-sm">
              {price}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Homepage() {
  const [filters, setFilters] = useState({ team: "", date: "", location: "" });

  const filteredEvents = mockEvents.filter(event =>
    (filters.team === "" || event.name.toLowerCase().includes(filters.team.toLowerCase())) &&
    (filters.date === "" || event.date === filters.date) &&
    (filters.location === "" || event.location.toLowerCase().includes(filters.location.toLowerCase()))
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4">
        <SearchBar filters={filters} setFilters={setFilters} />
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-10">
          {filteredEvents.length > 0 ? (
            filteredEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))
          ) : (
            <p className="text-gray-600 text-center col-span-full">No events match your search.</p>
          )}
        </div>
      </div>
    </div>
  );
}