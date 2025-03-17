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
    <nav className="bg-white p-4 shadow-md flex justify-center border-b">
      <img src="/logo.png" alt="SeatSearchPro Logo" className="h-14" />
    </nav>
  );
}

function SearchBar({ filters, setFilters }) {
  return (
    <div className="p-6 bg-white shadow-md rounded-lg flex flex-wrap justify-center gap-4 border border-gray-200">
      <input
        type="text"
        placeholder="Search by team..."
        className="p-3 border border-gray-300 rounded-lg w-64 shadow-sm"
        value={filters.team}
        onChange={(e) => setFilters({ ...filters, team: e.target.value })}
      />
      <input
        type="date"
        className="p-3 border border-gray-300 rounded-lg w-48 shadow-sm"
        value={filters.date}
        onChange={(e) => setFilters({ ...filters, date: e.target.value })}
      />
      <input
        type="text"
        placeholder="Search by location..."
        className="p-3 border border-gray-300 rounded-lg w-64 shadow-sm"
        value={filters.location}
        onChange={(e) => setFilters({ ...filters, location: e.target.value })}
      />
    </div>
  );
}

function EventCard({ event }) {
  return (
    <div className="bg-white shadow-lg p-6 rounded-lg border border-gray-300 flex flex-col space-y-4">
      <h2 className="text-xl font-bold text-gray-900">{event.name}</h2>
      <p className="text-gray-700 text-md">📅 {event.date} | 📍 {event.location}</p>
      <div className="w-full border-t pt-4">
        <h3 className="text-lg font-semibold text-gray-800">Available Tickets:</h3>
        <ul className="mt-2 space-y-2">
          {event.prices.map((price, index) => (
            <li key={index} className="text-blue-600 font-medium bg-gray-100 p-2 rounded-md shadow-sm">{price}</li>
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
      <div className="flex justify-center mt-8">
        <SearchBar filters={filters} setFilters={setFilters} />
      </div>
      <div className="p-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredEvents.length > 0 ? (
          filteredEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))
        ) : (
          <p className="text-gray-600 text-center col-span-full">No events match your search.</p>
        )}
      </div>
    </div>
  );
}
