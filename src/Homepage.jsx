import { useState, useEffect } from "react";

// League team data
const leagueTeams = {
  NBA: [
    "Los Angeles Lakers", "Golden State Warriors", "Boston Celtics", "Miami Heat",
    "Chicago Bulls", "Brooklyn Nets", "Milwaukee Bucks", "Phoenix Suns",
    "Dallas Mavericks", "Denver Nuggets", "Atlanta Hawks", "New York Knicks",
    "Philadelphia 76ers", "Toronto Raptors", "Cleveland Cavaliers", "Memphis Grizzlies"
  ],
  NFL: [
    "Los Angeles Rams", "San Francisco 49ers", "Kansas City Chiefs", "Tampa Bay Buccaneers",
    "Buffalo Bills", "Green Bay Packers", "Dallas Cowboys", "New England Patriots",
    "Baltimore Ravens", "Cincinnati Bengals", "Tennessee Titans", "Las Vegas Raiders",
    "Seattle Seahawks", "Arizona Cardinals", "Pittsburgh Steelers", "New Orleans Saints"
  ],
  MLB: [
    "Los Angeles Dodgers", "New York Yankees", "Boston Red Sox", "Houston Astros",
    "Chicago Cubs", "San Francisco Giants", "Atlanta Braves", "St. Louis Cardinals",
    "Toronto Blue Jays", "Philadelphia Phillies", "San Diego Padres", "Miami Marlins",
    "Milwaukee Brewers", "New York Mets", "Cleveland Guardians", "Chicago White Sox"
  ],
  NHL: [
    "Tampa Bay Lightning", "Toronto Maple Leafs", "Boston Bruins", "Florida Panthers",
    "Carolina Hurricanes", "New York Rangers", "Colorado Avalanche", "Edmonton Oilers",
    "Pittsburgh Penguins", "Washington Capitals", "St. Louis Blues", "Calgary Flames",
    "Minnesota Wild", "Los Angeles Kings", "Vancouver Canucks", "Nashville Predators"
  ]
};

// Stadium data
const leagueVenues = {
  NBA: [
    "Crypto.com Arena, Los Angeles, CA", "Chase Center, San Francisco, CA", "TD Garden, Boston, MA",
    "FTX Arena, Miami, FL", "United Center, Chicago, IL", "Barclays Center, Brooklyn, NY",
    "Fiserv Forum, Milwaukee, WI", "Footprint Center, Phoenix, AZ", "American Airlines Center, Dallas, TX"
  ],
  NFL: [
    "SoFi Stadium, Los Angeles, CA", "Levi's Stadium, Santa Clara, CA", "Arrowhead Stadium, Kansas City, MO",
    "Raymond James Stadium, Tampa, FL", "Highmark Stadium, Orchard Park, NY", "Lambeau Field, Green Bay, WI",
    "AT&T Stadium, Arlington, TX", "Gillette Stadium, Foxborough, MA", "M&T Bank Stadium, Baltimore, MD"
  ],
  MLB: [
    "Dodger Stadium, Los Angeles, CA", "Yankee Stadium, Bronx, NY", "Fenway Park, Boston, MA",
    "Minute Maid Park, Houston, TX", "Wrigley Field, Chicago, IL", "Oracle Park, San Francisco, CA",
    "Truist Park, Atlanta, GA", "Busch Stadium, St. Louis, MO", "Rogers Centre, Toronto, ON"
  ],
  NHL: [
    "Amalie Arena, Tampa, FL", "Scotiabank Arena, Toronto, ON", "TD Garden, Boston, MA",
    "FLA Live Arena, Sunrise, FL", "PNC Arena, Raleigh, NC", "Madison Square Garden, New York, NY",
    "Ball Arena, Denver, CO", "Rogers Place, Edmonton, AB", "PPG Paints Arena, Pittsburgh, PA"
  ]
};

// Helper functions for generating mock data
function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomTeamPair(league) {
  const teams = leagueTeams[league];
  const homeTeamIndex = Math.floor(Math.random() * teams.length);
  let awayTeamIndex;
  
  do {
    awayTeamIndex = Math.floor(Math.random() * teams.length);
  } while (awayTeamIndex === homeTeamIndex);
  
  return [teams[homeTeamIndex], teams[awayTeamIndex]];
}

function generateFutureDate(minDays = 1, maxDays = 180) {
  const today = new Date();
  const futureDate = new Date(today);
  futureDate.setDate(today.getDate() + getRandomInt(minDays, maxDays));
  return futureDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
}

function generateTickets(count = 5) {
  const tickets = [];
  const sections = ["100", "101", "102", "200", "201", "202", "300", "301", "302"];
  const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K"];
  
  for (let i = 0; i < count; i++) {
    tickets.push({
      price: getRandomInt(50, 500),
      section: getRandomElement(sections),
      row: getRandomElement(rows)
    });
  }
  
  return tickets;
}

function generateMockGames(searchParams) {
  const { team, date, location } = searchParams;
  const results = [];
  const leagues = ["NBA", "NFL", "MLB", "NHL"];
  
  // Determine which leagues might contain the searched team
  let possibleLeagues = [...leagues];
  
  if (team) {
    possibleLeagues = leagues.filter(league => 
      leagueTeams[league].some(leagueTeam => 
        leagueTeam.toLowerCase().includes(team.toLowerCase())
      )
    );
    
    // If no matching leagues found, generate for all leagues
    if (possibleLeagues.length === 0) {
      possibleLeagues = [...leagues];
    }
  }
  
  // Generate 1-3 events for each applicable league
  possibleLeagues.forEach(league => {
    const eventCount = getRandomInt(1, 3);
    
    for (let i = 0; i < eventCount; i++) {
      let teamPair;
      let venue;
      
      // If team is specified, ensure it's included
      if (team) {
        const matchingTeams = leagueTeams[league].filter(leagueTeam => 
          leagueTeam.toLowerCase().includes(team.toLowerCase())
        );
        
        if (matchingTeams.length > 0) {
          const selectedTeam = getRandomElement(matchingTeams);
          const otherTeams = leagueTeams[league].filter(t => t !== selectedTeam);
          const opponent = getRandomElement(otherTeams);
          teamPair = [selectedTeam, opponent];
        } else {
          teamPair = getRandomTeamPair(league);
        }
      } else {
        teamPair = getRandomTeamPair(league);
      }
      
      // If location is specified, try to match it
      if (location) {
        const matchingVenues = leagueVenues[league].filter(v => 
          v.toLowerCase().includes(location.toLowerCase())
        );
        
        venue = matchingVenues.length > 0 
          ? getRandomElement(matchingVenues) 
          : getRandomElement(leagueVenues[league]);
      } else {
        venue = getRandomElement(leagueVenues[league]);
      }
      
      // Use the specified date or generate a random one
      const eventDate = date || generateFutureDate();
      
      results.push({
        id: Date.now() + i, // Unique ID
        teams: teamPair,
        date: eventDate,
        location: venue,
        league: league,
        tickets: generateTickets(getRandomInt(3, 8))
      });
    }
  });
  
  return results;
}

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

function PriceRangeSlider({ minPrice, maxPrice, priceRange, setPriceRange }) {
  return (
    <div className="mt-4 mb-6">
      <div className="mb-2 flex justify-between">
        <span className="font-medium text-gray-700">Price Range:</span>
        <span className="text-blue-600">${priceRange[0]} - ${priceRange[1]}</span>
      </div>
      <div className="px-2">
        <div className="relative">
          <div className="absolute rounded-md h-2 bg-gray-200 left-0 right-0 top-1/2 transform -translate-y-1/2"></div>
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            value={priceRange[0]}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              if (value <= priceRange[1]) {
                setPriceRange([value, priceRange[1]]);
              }
            }}
            className="absolute w-full top-1/2 transform -translate-y-1/2 appearance-none bg-transparent pointer-events-auto z-10"
            style={{ height: '20px' }}
          />
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            value={priceRange[1]}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              if (value >= priceRange[0]) {
                setPriceRange([priceRange[0], value]);
              }
            }}
            className="absolute w-full top-1/2 transform -translate-y-1/2 appearance-none bg-transparent pointer-events-auto z-20"
            style={{ height: '20px' }}
          />
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span>${minPrice}</span>
          <span>${maxPrice}</span>
        </div>
      </div>
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
      <p className="text-blue-600 text-sm">{event.league}</p>
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
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [minMaxPrices, setMinMaxPrices] = useState([0, 1000]);

  useEffect(() => {
    if (event.tickets && event.tickets.length > 0) {
      const prices = event.tickets.map(ticket => ticket.price);
      const min = Math.min(...prices);
      const max = Math.max(...prices);
      setMinMaxPrices([min, max]);
      setPriceRange([min, max]);
    }
  }, [event]);

  let sortedTickets = [...event.tickets];

  // Apply all filters
  if (filterSection) {
    sortedTickets = sortedTickets.filter(ticket => ticket.section === filterSection);
  }
  if (filterRow) {
    sortedTickets = sortedTickets.filter(ticket => ticket.row === filterRow);
  }
  
  // Apply price range filter
  sortedTickets = sortedTickets.filter(
    ticket => ticket.price >= priceRange[0] && ticket.price <= priceRange[1]
  );

  // Apply sorting
  if (sortOrder === "lowToHigh") {
    sortedTickets.sort((a, b) => a.price - b.price);
  } else if (sortOrder === "highToLow") {
    sortedTickets.sort((a, b) => b.price - a.price);
  } else if (sortOrder === "sectionLowToHigh") {
    sortedTickets.sort((a, b) => parseInt(a.section) - parseInt(b.section));
  } else if (sortOrder === "sectionHighToLow") {
    sortedTickets.sort((a, b) => parseInt(b.section) - parseInt(a.section));
  }

  return (
    <div className="bg-white p-6 shadow-lg rounded-lg max-w-3xl mx-auto mt-10">
      <button className="text-blue-600 font-semibold mb-4" onClick={onBack}>&larr; Back to Events</button>
      <h2 className="text-2xl font-bold">{event.teams.join(" vs. ")}</h2>
      <p className="text-gray-600">📅 {event.date} | 📍 {event.location}</p>
      <p className="text-blue-600 text-sm mt-1">{event.league}</p>
      
      <div className="mt-4 flex flex-wrap gap-4">
        <select onChange={(e) => setSortOrder(e.target.value)} className="border p-2 rounded">
          <option value="lowToHigh">Sort: Price Low to High</option>
          <option value="highToLow">Sort: Price High to Low</option>
          <option value="sectionLowToHigh">Sort: Section Low to High</option>
          <option value="sectionHighToLow">Sort: Section High to Low</option>
        </select>
        <input type="text" placeholder="Filter by section" className="border p-2 rounded" value={filterSection} onChange={(e) => setFilterSection(e.target.value)} />
        <input type="text" placeholder="Filter by row" className="border p-2 rounded" value={filterRow} onChange={(e) => setFilterRow(e.target.value)} />
      </div>
      
      {/* Price Range Slider */}
      <PriceRangeSlider 
        minPrice={minMaxPrices[0]} 
        maxPrice={minMaxPrices[1]} 
        priceRange={priceRange} 
        setPriceRange={setPriceRange} 
      />
      
      <h3 className="text-lg font-semibold mt-4">Available Tickets:</h3>
      <ul className="mt-2 space-y-2">
        {sortedTickets.length > 0 ? (
          sortedTickets.map((ticket, index) => (
            <li key={index} className="text-blue-600 font-medium bg-gray-100 p-2 rounded-md shadow-sm">
              ${ticket.price} - Section {ticket.section}, Row {ticket.row}
            </li>
          ))
        ) : (
          <p className="text-red-500">No tickets match your filters. Try adjusting your criteria.</p>
        )}
      </ul>
    </div>
  );
}

export default function Homepage() {
  const [filters, setFilters] = useState({ team: "", date: "", location: "" });
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showResults, setShowResults] = useState(false);

  function handleSearch() {
    console.log("Search initiated with filters:", filters);
    // Generate mock data based on search filters
    const results = generateMockGames(filters);
    console.log("Generated Events:", results);
    
    setFilteredEvents(results);
    setShowResults(true);
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4">
        {!selectedEvent ? (
          <>
            <SearchBar filters={filters} setFilters={setFilters} onSearch={handleSearch} />
            
            {showResults && (
              <>
                {filteredEvents.length > 0 ? (
                  <>
                    <p className="text-gray-600 mt-6 mb-2 ml-2">
                      Showing {filteredEvents.length} events matching your search
                    </p>
                    <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-4 pb-20">
                      {filteredEvents.map(event => (
                        <EventCard key={event.id} event={event} onSelect={setSelectedEvent} />
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="text-center mt-20 text-gray-500">
                    <p>No events found matching your criteria. Try broadening your search.</p>
                  </div>
                )}
              </>
            )}
            
            {!showResults && (
              <div className="text-center mt-20 text-gray-500">
                <p>Enter search criteria and click Search to find events</p>
              </div>
            )}
          </>
        ) : (
          <EventDetails event={selectedEvent} onBack={() => setSelectedEvent(null)} />
        )}
      </div>
    </div>
  );
}