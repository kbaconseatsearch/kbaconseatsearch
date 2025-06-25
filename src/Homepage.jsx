import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import EventsSearch from './EventsSearch';


const Homepage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const today = new Date().toISOString().split('T')[0];
  const thirtyDaysLater = new Date();
  thirtyDaysLater.setDate(thirtyDaysLater.getDate() + 30);
  const defaultEndDate = thirtyDaysLater.toISOString().split('T')[0];

  const [teamQuery, setTeamQuery] = useState('');
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(defaultEndDate);
  const [submittedSearch, setSubmittedSearch] = useState(null);
  // 🧭 Handle query params like /search?team=...&start=...&end=...
useEffect(() => {
  const params = new URLSearchParams(location.search);
  const team = params.get('team');
  const start = params.get('start');
  const end = params.get('end');

  if (team && start && end) {
    setTeamQuery(team);
    setStartDate(start);
    setEndDate(end);
    setSubmittedSearch({ team, start, end });
  }
}, [location.search]);

  // 🔁 Restore previous search state if coming from EventDetails
  useEffect(() => {
    const { team, start, end } = location.state || {};
    if (team && start && end) {
      setTeamQuery(team);
      setStartDate(start);
      setEndDate(end);
      setSubmittedSearch({ team, start, end });
    }
  }, [location.state]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!teamQuery.trim()) return alert('Please enter a team name.');
    setSubmittedSearch({ team: teamQuery.trim(), start: startDate, end: endDate });
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <nav className="bg-white p-6 shadow-md flex items-center border-b">
        <img src="/logo.png" alt="SeatSearchPro Logo" className="h-16 ml-4" />
      </nav>

      <div className="container mx-auto px-4">
        <form
          onSubmit={handleSearch}
          className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-center"
        >
          <input
            type="text"
            placeholder="Search for a team"
            value={teamQuery}
            onChange={(e) => setTeamQuery(e.target.value)}
            className="p-3 w-full sm:w-80 border border-gray-300 rounded shadow-sm focus:outline-none"
          />
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="p-2 border border-gray-300 rounded shadow-sm"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="p-2 border border-gray-300 rounded shadow-sm"
          />
          <button
            type="submit"
            className="bg-[#fea709] text-white font-semibold px-6 py-3 rounded shadow hover:bg-[#e89c06]"
          >
            Search
          </button>
        </form>

        {submittedSearch && (
          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">
              Results for: {submittedSearch.team}
            </h2>
            <EventsSearch
              teamName={submittedSearch.team}
              startDate={submittedSearch.start}
              endDate={submittedSearch.end}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Homepage;