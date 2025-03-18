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

// Ticket brokers array
const ticketBrokers = [
  { name: "Ticketmaster", fee: 0.15 },
  { name: "StubHub", fee: 0.18 },
  { name: "SeatGeek", fee: 0.12 },
  { name: "Vivid Seats", fee: 0.17 },
  { name: "GameTime", fee: 0.10 },
  { name: "TickPick", fee: 0.09 },
  { name: "TicketCity", fee: 0.16 },
  { name: "TicketNetwork", fee: 0.14 },
  { name: "AXS", fee: 0.13 },
  { name: "Ticket Liquidator", fee: 0.15 }
];

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

// Modified to generate tickets in groups of 2-6 adjacent seats with broker information
function generateTickets(count = 30) {
  const tickets = [];
  const sections = ["100", "101", "102", "200", "201", "202", "300", "301", "302"];
  const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K"];
  
  // Generate tickets in groups of 2-6 adjacent seats
  let remainingCount = count;
  while (remainingCount > 0) {
    const section = getRandomElement(sections);
    const row = getRandomElement(rows);
    // Generate 2-6 adjacent seats in the same section and row
    const adjacentCount = Math.min(getRandomInt(2, 6), remainingCount);
    const price = getRandomInt(50, 500);
    const broker = getRandomElement(ticketBrokers);
    
    // Apply slight price variation based on broker (some brokers might be more expensive)
    const finalPrice = Math.round(price * (1 + broker.fee));
    
    for (let i = 0; i < adjacentCount; i++) {
      tickets.push({
        price: finalPrice,
        section: section,
        row: row,
        seat: i + 1, // Add seat number for better display
        broker: broker.name,
        brokerFee: broker.fee,
        groupId: `${section}-${row}-${Date.now()}` // To identify tickets in the same group
      });
    }
    
    remainingCount -= adjacentCount;
  }
  
  return tickets;
}

function generateMockGames(searchParams) {
  const { team, date, location } = searchParams;
  
  // Check if all search fields are empty
  if (!team && !date && !location) {
    return []; // Return empty array to indicate no events found
  }
  
  const results = [];
  const leagues = ["NBA", "NFL", "MLB", "NHL"];
  
  // Create a unique search ID to prevent ID collisions across searches
  const searchId = Date.now();
  
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
        id: `${searchId}-${league}-${i}`, // More unique ID using search timestamp + league + counter
        teams: teamPair,
        date: eventDate,
        location: venue,
        league: league,
        tickets: generateTickets(getRandomInt(20, 30)) // Increased to 20-30 tickets per event
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
    <div className="mt-4 mb-8">
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
      </div>
    </div>
  );
}

function EventCard({ event, onSelect }) {
  const lowestPrice = event.tickets && event.tickets.length > 0 ? Math.min(...event.tickets.map(ticket => ticket.price)) : null;
  const brokerCount = event.tickets && event.tickets.length > 0 
    ? new Set(event.tickets.map(ticket => ticket.broker)).size 
    : 0;
    
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
      <p className="text-gray-600 text-sm">{event.tickets.length} tickets available from {brokerCount} sellers</p>
    </div>
  );
}

function EventDetails({ event, onBack }) {
  const [sortOrder, setSortOrder] = useState("lowToHigh");
  const [filterSection, setFilterSection] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [minMaxPrices, setMinMaxPrices] = useState([0, 1000]);
  const [ticketQuantity, setTicketQuantity] = useState(2);

  useEffect(() => {
    if (event.tickets && event.tickets.length > 0) {
      const prices = event.tickets.map(ticket => ticket.price);
      const min = Math.min(...prices);
      const max = Math.max(...prices);
      setMinMaxPrices([min, max]);
      setPriceRange([min, max]);
    }
  }, [event]);

  // Group tickets by section, row, and broker
  const groupTickets = (tickets) => {
    const groups = {};
    tickets.forEach(ticket => {
      if (!groups[ticket.groupId]) {
        groups[ticket.groupId] = [];
      }
      groups[ticket.groupId].push(ticket);
    });
    return groups;
  };

  let filteredTickets = [...event.tickets];
  
  // Apply section filter (real-time)
  if (filterSection) {
    filteredTickets = filteredTickets.filter(ticket => 
      ticket.section.includes(filterSection)
    );
  }
  
  // Apply price range filter
  filteredTickets = filteredTickets.filter(
    ticket => ticket.price >= priceRange[0] && ticket.price <= priceRange[1]
  );

  // Group tickets
  const ticketGroups = groupTickets(filteredTickets);
  
  // Filter by quantity
  const filteredGroups = Object.entries(ticketGroups).filter(
    ([_, tickets]) => tickets.length >= ticketQuantity
  );

  // Sort groups based on sort order
  filteredGroups.sort((a, b) => {
    const ticketsA = a[1];
    const ticketsB = b[1];
    
    if (sortOrder === "lowToHigh") {
      return ticketsA[0].price - ticketsB[0].price;
    } else if (sortOrder === "highToLow") {
      return ticketsB[0].price - ticketsA[0].price;
    } else if (sortOrder === "sectionLowToHigh") {
      return parseInt(ticketsA[0].section) - parseInt(ticketsB[0].section);
    } else if (sortOrder === "sectionHighToLow") {
      return parseInt(ticketsB[0].section) - parseInt(ticketsA[0].section);
    }
    return 0;
  });

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
        
        {/* Real-time section filter */}
        <input 
          type="text" 
          placeholder="Filter by section" 
          className="border p-2 rounded" 
          value={filterSection} 
          onChange={(e) => setFilterSection(e.target.value)} 
        />
        
        {/* Ticket quantity filter */}
        <select 
          value={ticketQuantity} 
          onChange={(e) => setTicketQuantity(parseInt(e.target.value))} 
          className="border p-2 rounded"
        >
          <option value="1">1 Ticket</option>
          <option value="2">2 Tickets</option>
          <option value="3">3 Tickets</option>
          <option value="4">4 Tickets</option>
          <option value="5">5+ Tickets</option>
        </select>
      </div>
      
      {/* Price Range Slider */}
      <PriceRangeSlider 
        minPrice={minMaxPrices[0]} 
        maxPrice={minMaxPrices[1]} 
        priceRange={priceRange} 
        setPriceRange={setPriceRange} 
      />
      
      <div className="flex justify-between items-center mt-4">
        <h3 className="text-lg font-semibold">Available Tickets:</h3>
        <p className="text-sm text-gray-600">
          {filteredGroups.length} listings • {filteredTickets.length} tickets
        </p>
      </div>
      
      {filteredGroups.length > 0 ? (
        <div className="mt-2 space-y-4">
          {filteredGroups.map(([groupId, tickets]) => {
            const broker = tickets[0].broker;
            const brokerFee = tickets[0].brokerFee;
            
            // Calculate service fee display
            const serviceFee = Math.round(tickets[0].price * brokerFee);
            const totalPrice = tickets[0].price + serviceFee;
            
            return (
              <div key={groupId} className="bg-gray-100 p-4 rounded-md shadow-sm border border-gray-200">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-700">Section {tickets[0].section}, Row {tickets[0].row}</p>
                    <p className="text-gray-600 text-sm mt-1">
                      {tickets.length} tickets available • Seats {tickets[0].seat} - {tickets[tickets.length-1].seat}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">${tickets[0].price}/ea</p>
                    <p className="text-xs text-gray-500">+${serviceFee} fee</p>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-3">
                  <p className="text-blue-600 font-medium text-sm flex items-center">
                    <span className="bg-blue-100 text-blue-800 text-xs py-1 px-2 rounded-full mr-2">
                      {broker}
                    </span>
                  </p>
                  <button className="bg-green-500 text-white px-4 py-2 rounded-md text-sm hover:bg-green-600 transition">
                    Select {Math.min(ticketQuantity, tickets.length)} • ${totalPrice * Math.min(ticketQuantity, tickets.length)}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-red-500 mt-2">No tickets match your filters. Try adjusting your criteria.</p>
      )}
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
                    <p>0 events match your search. Please try different search criteria.</p>
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