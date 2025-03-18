import { useState } from "react";

const mockGames = [
  { id: 1, teams: ["Los Angeles Lakers", "Golden State Warriors"], date: "2025-03-25", location: "Crypto.com Arena, Los Angeles, CA", league: "NBA", 
    tickets: [
      { price: 120, section: "101", row: "A" },
      { price: 110, section: "102", row: "B" },
      { price: 130, section: "201", row: "C" },
    ] },
  { id: 2, teams: ["Los Angeles Rams", "San Francisco 49ers"], date: "2025-10-12", location: "SoFi Stadium, Los Angeles, CA", league: "NFL", 
    tickets: [
      { price: 200, section: "301", row: "D" },
      { price: 180, section: "302", row: "E" },
      { price: 220, section: "101", row: "F" },
    ] },
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
  const lowestPrice = event.tickets && event.tickets.length > 0 ? Math.min(...event.tickets.map(ticket => ticket.price)) : null;
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
  const [sortOrder, setSortOrder] = useState("lowToHigh");
  const [filterSection, setFilterSection] = useState("");
  const [filterRow, setFilterRow] = useState("");

  let sortedTickets = [...event.tickets];

  if (filterSection) {
    sortedTickets = sortedTickets.filter(ticket => ticket.section === filterSection);
  }
  if (filterRow) {
    sortedTickets = sortedTickets.filter(ticket => ticket.row === filterRow);
  }

  sortedTickets.sort((a, b) => sortOrder === "lowToHigh" ? a.price - b.price : b.price - a.price);

  return (
    <div className="bg-white p-6 shadow-lg rounded-lg max-w-3xl mx-auto mt-10">
      <button className="text-blue-600 font-semibold mb-4" onClick={onBack}>&larr; Back to Events</button>
      <h2 className="text-2xl font-bold">{event.teams.join(" vs. ")}</h2>
      <p className="text-gray-600">📅 {event.date} | 📍 {event.location}</p>
      <div className="mt-4 flex gap-4">
        <select onChange={(e) => setSortOrder(e.target.value)} className="border p-2 rounded">
          <option value="lowToHigh">Sort: Low to High</option>
          <option value="highToLow">Sort: High to Low</option>
        </select>
        <input type="text" placeholder="Filter by section" className="border p-2 rounded" value={filterSection} onChange={(e) => setFilterSection(e.target.value)} />
        <input type="text" placeholder="Filter by row" className="border p-2 rounded" value={filterRow} onChange={(e) => setFilterRow(e.target.value)} />
      </div>
      <h3 className="text-lg font-semibold mt-4">Available Tickets:</h3>
      <ul className="mt-2 space-y-2">
        {sortedTickets.length > 0 ? (
          sortedTickets.map((ticket, index) => (
            <li key={index} className="text-blue-600 font-medium bg-gray-100 p-2 rounded-md shadow-sm">
              ${ticket.price} - Section {ticket.section}, Row {ticket.row}
            </li>
          ))
        ) : (
          <p className="text-red-500">No tickets match your filters.</p>
        )}
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
              {filteredEvents.map(event => (
                <EventCard key={event.id} event={event} onSelect={setSelectedEvent} />
              ))}
            </div>
          </>
        ) : (
          <EventDetails event={selectedEvent} onBack={() => setSelectedEvent(null)} />
        )}
      </div>
    </div>
  );
}
