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
    "State Farm Arena, Atlanta, Georgia",
    "TD Garden, Boston, Massachusetts",
    "Barclays Center, Brooklyn, New York",
    "Spectrum Center, Charlotte, North Carolina",
    "United Center, Chicago, Illinois",
    "Rocket Mortgage Fieldhouse, Cleveland, Ohio",
    "American Airlines Center, Dallas, Texas",
    "Ball Arena, Denver, Colorado",
    "Little Caesars Arena, Detroit, Michigan",
    "Chase Center, San Francisco, California",
    "Toyota Center, Houston, Texas",
    "Gainbridge Fieldhouse, Indianapolis, Indiana",
    "Crypto.com Arena, Los Angeles, California",
    "FedExForum, Memphis, Tennessee",
    "Kaseya Center, Miami, Florida",
    "Fiserv Forum, Milwaukee, Wisconsin",
    "Target Center, Minneapolis, Minnesota",
    "Smoothie King Center, New Orleans, Louisiana",
    "Madison Square Garden, New York City, New York",
    "Paycom Center, Oklahoma City, Oklahoma",
    "Kia Center, Orlando, Florida",
    "Wells Fargo Center, Philadelphia, Pennsylvania",
    "Footprint Center, Phoenix, Arizona",
    "Moda Center, Portland, Oregon",
    "Golden 1 Center, Sacramento, California",
    "Frost Bank Center, San Antonio, Texas",
    "Scotiabank Arena, Toronto, Ontario, Canada",
    "Delta Center, Salt Lake City, Utah",
    "Capital One Arena, Washington, D.C."
  ],
  NFL: [
    "State Farm Stadium, Glendale, Arizona",
    "Mercedes-Benz Stadium, Atlanta, Georgia",
    "M&T Bank Stadium, Baltimore, Maryland",
    "Highmark Stadium, Orchard Park, New York",
    "Bank of America Stadium, Charlotte, North Carolina",
    "Soldier Field, Chicago, Illinois",
    "Paycor Stadium, Cincinnati, Ohio",
    "Cleveland Browns Stadium, Cleveland, Ohio",
    "AT&T Stadium, Arlington, Texas",
    "Empower Field at Mile High, Denver, Colorado",
    "Ford Field, Detroit, Michigan",
    "Lambeau Field, Green Bay, Wisconsin",
    "NRG Stadium, Houston, Texas",
    "Lucas Oil Stadium, Indianapolis, Indiana",
    "TIAA Bank Field, Jacksonville, Florida",
    "GEHA Field at Arrowhead Stadium, Kansas City, Missouri",
    "Allegiant Stadium, Paradise, Nevada",
    "SoFi Stadium, Inglewood, California",
    "Hard Rock Stadium, Miami Gardens, Florida",
    "U.S. Bank Stadium, Minneapolis, Minnesota",
    "Gillette Stadium, Foxborough, Massachusetts",
    "Caesars Superdome, New Orleans, Louisiana",
    "MetLife Stadium, East Rutherford, New Jersey",
    "Lincoln Financial Field, Philadelphia, Pennsylvania",
    "Acrisure Stadium, Pittsburgh, Pennsylvania",
    "Levi's Stadium, Santa Clara, California",
    "Lumen Field, Seattle, Washington",
    "Raymond James Stadium, Tampa, Florida",
    "Nissan Stadium, Nashville, Tennessee",
    "Commanders Field, Landover, Maryland",
    "Intuit Dome, Ingliwood, Californoa"
  ],
  MLB: [
    "Chase Field, Phoenix, Arizona",
    "Truist Park, Cumberland, Georgia",
    "Oriole Park at Camden Yards, Baltimore, Maryland",
    "Fenway Park, Boston, Massachusetts",
    "Wrigley Field, Chicago, Illinois",
    "Guaranteed Rate Field, Chicago, Illinois",
    "Great American Ball Park, Cincinnati, Ohio",
    "Progressive Field, Cleveland, Ohio",
    "Coors Field, Denver, Colorado",
    "Comerica Park, Detroit, Michigan",
    "Minute Maid Park, Houston, Texas",
    "Kauffman Stadium, Kansas City, Missouri",
    "Angel Stadium, Anaheim, California",
    "Dodger Stadium, Los Angeles, California",
    "LoanDepot Park, Miami, Florida",
    "American Family Field, Milwaukee, Wisconsin",
    "Target Field, Minneapolis, Minnesota",
    "Citi Field, Queens, New York City, New York",
    "Yankee Stadium, Bronx, New York City, New York",
    "Oakland-Alameda County Coliseum, Oakland, California",
    "Citizens Bank Park, Philadelphia, Pennsylvania",
    "PNC Park, Pittsburgh, Pennsylvania",
    "Petco Park, San Diego, California",
    "Oracle Park, San Francisco, California",
    "T-Mobile Park, Seattle, Washington",
    "Busch Stadium, St. Louis, Missouri",
    "Tropicana Field, St. Petersburg, Florida",
    "Globe Life Field, Arlington, Texas",
    "Rogers Centre, Toronto, Ontario, Canada",
    "Nationals Park, Washington, D.C."
  ],
  NHL: [
    "Honda Center, Anaheim, California",
    "Mullett Arena, Tempe, Arizona",
    "TD Garden, Boston, Massachusetts",
    "KeyBank Center, Buffalo, New York",
    "Scotiabank Saddledome, Calgary, Alberta, Canada",
    "PNC Arena, Raleigh, North Carolina",
    "United Center, Chicago, Illinois",
    "Ball Arena, Denver, Colorado",
    "Nationwide Arena, Columbus, Ohio",
    "American Airlines Center, Dallas, Texas",
    "Little Caesars Arena, Detroit, Michigan",
    "Rogers Place, Edmonton, Alberta, Canada",
    "Amerant Bank Arena, Sunrise, Florida",
    "Crypto.com Arena, Los Angeles, California",
    "Xcel Energy Center, Saint Paul, Minnesota",
    "Bell Centre, Montreal, Quebec, Canada",
    "Bridgestone Arena, Nashville, Tennessee",
    "Prudential Center, Newark, New Jersey",
    "UBS Arena, Elmont, New York",
    "Madison Square Garden, New York City, New York",
    "Canadian Tire Centre, Ottawa, Ontario, Canada",
    "Wells Fargo Center, Philadelphia, Pennsylvania",
    "PPG Paints Arena, Pittsburgh, Pennsylvania",
    "SAP Center, San Jose, California",
    "Climate Pledge Arena, Seattle, Washington",
    "Enterprise Center, St. Louis, Missouri",
    "Amalie Arena, Tampa, Florida",
    "Scotiabank Arena, Toronto, Ontario, Canada",
    "Rogers Arena, Vancouver, British Columbia, Canada",
    "T-Mobile Arena, Paradise, Nevada",
    "Capital One Arena, Washington, D.C.",
    "Canada Life Centre, Winnipeg, Manitoba, Canada"
  ]
};

// Team to venue mapping - place this after your leagueVenues definition
const teamVenueMapping = {
  // NBA Teams
  
  "Atlanta Hawks": "State Farm Arena, Atlanta, Georgia",
  "Boston Celtics": "TD Garden, Boston, Massachusetts",
  "Brooklyn Nets": "Barclays Center, Brooklyn, New York",
  "Charlotte Hornets": "Spectrum Center, Charlotte, North Carolina",
  "Chicago Bulls": "United Center, Chicago, Illinois",
  "Cleveland Cavaliers": "Rocket Mortgage FieldHouse, Cleveland, Ohio",
  "Dallas Mavericks": "American Airlines Center, Dallas, Texas",
  "Denver Nuggets": "Ball Arena, Denver, Colorado",
  "Detroit Pistons": "Little Caesars Arena, Detroit, Michigan",
  "Golden State Warriors": "Chase Center, San Francisco, California",
  "Houston Rockets": "Toyota Center, Houston, Texas",
  "Indiana Pacers": "Gainbridge Fieldhouse, Indianapolis, Indiana",
  "Los Angeles Clippers": "Crypto.com Arena, Los Angeles, California",
  "Los Angeles Lakers": "Crypto.com Arena, Los Angeles, California",
  "Memphis Grizzlies": "FedExForum, Memphis, Tennessee",
  "Miami Heat": "Kaseya Center, Miami, Florida",
  "Milwaukee Bucks": "Fiserv Forum, Milwaukee, Wisconsin",
  "Minnesota Timberwolves": "Target Center, Minneapolis, Minnesota",
  "New Orleans Pelicans": "Smoothie King Center, New Orleans, Louisiana",
  "New York Knicks": "Madison Square Garden, New York, New York",
  "Oklahoma City Thunder": "Paycom Center, Oklahoma City, Oklahoma",
  "Orlando Magic": "Amway Center, Orlando, Florida",
  "Philadelphia 76ers": "Wells Fargo Center, Philadelphia, Pennsylvania",
  "Phoenix Suns": "Footprint Center, Phoenix, Arizona",
  "Portland Trail Blazers": "Moda Center, Portland, Oregon",
  "Sacramento Kings": "Golden 1 Center, Sacramento, California",
  "San Antonio Spurs": "Frost Bank Center, San Antonio, Texas",
  "Toronto Raptors": "Scotiabank Arena, Toronto, Ontario",
  "Utah Jazz": "Delta Center, Salt Lake City, Utah",
  "Washington Wizards": "Capital One Arena, Washington, D.C.",
  
  // NFL Teams
  "Arizona Cardinals": "State Farm Stadium, Glendale, Arizona",
  "Atlanta Falcons": "Mercedes-Benz Stadium, Atlanta, Georgia",
  "Baltimore Ravens": "M&T Bank Stadium, Baltimore, Maryland",
  "Buffalo Bills": "Highmark Stadium, Orchard Park, New York",
  "Carolina Panthers": "Bank of America Stadium, Charlotte, North Carolina",
  "Chicago Bears": "Soldier Field, Chicago, Illinois",
  "Cincinnati Bengals": "Paycor Stadium, Cincinnati, Ohio",
  "Cleveland Browns": "Cleveland Browns Stadium, Cleveland, Ohio",
  "Dallas Cowboys": "AT&T Stadium, Arlington, Texas",
  "Denver Broncos": "Empower Field at Mile High, Denver, Colorado",
  "Detroit Lions": "Ford Field, Detroit, Michigan",
  "Green Bay Packers": "Lambeau Field, Green Bay, Wisconsin",
  "Houston Texans": "NRG Stadium, Houston, Texas",
  "Indianapolis Colts": "Lucas Oil Stadium, Indianapolis, Indiana",
  "Jacksonville Jaguars": "TIAA Bank Field, Jacksonville, Florida",
  "Kansas City Chiefs": "GEHA Field at Arrowhead Stadium, Kansas City, Missouri",
  "Las Vegas Raiders": "Allegiant Stadium, Paradise, Nevada",
  "Los Angeles Chargers": "SoFi Stadium, Inglewood, California",
  "Los Angeles Rams": "SoFi Stadium, Inglewood, California",
  "Miami Dolphins": "Hard Rock Stadium, Miami Gardens, Florida",
  "Minnesota Vikings": "U.S. Bank Stadium, Minneapolis, Minnesota",
  "New England Patriots": "Gillette Stadium, Foxborough, Massachusetts",
  "New Orleans Saints": "Caesars Superdome, New Orleans, Louisiana",
  "New York Giants": "MetLife Stadium, East Rutherford, New Jersey",
  "New York Jets": "MetLife Stadium, East Rutherford, New Jersey",
  "Philadelphia Eagles": "Lincoln Financial Field, Philadelphia, Pennsylvania",
  "Pittsburgh Steelers": "Acrisure Stadium, Pittsburgh, Pennsylvania",
  "San Francisco 49ers": "Levi's Stadium, Santa Clara, California",
  "Seattle Seahawks": "Lumen Field, Seattle, Washington",
  "Tampa Bay Buccaneers": "Raymond James Stadium, Tampa, Florida",
  "Tennessee Titans": "Nissan Stadium, Nashville, Tennessee",
  "Washington Commanders": "Commanders Field, Landover, Maryland",
  
  // MLB Teams

    "Arizona Diamondbacks": "Chase Field, Phoenix, Arizona",
    "Atlanta Braves": "Truist Park, Cumberland, Georgia",
    "Baltimore Orioles": "Oriole Park at Camden Yards, Baltimore, Maryland",
    "Boston Red Sox": "Fenway Park, Boston, Massachusetts",
    "Chicago Cubs": "Wrigley Field, Chicago, Illinois",
    "Chicago White Sox": "Guaranteed Rate Field, Chicago, Illinois",
    "Cincinnati Reds": "Great American Ball Park, Cincinnati, Ohio",
    "Cleveland Guardians": "Progressive Field, Cleveland, Ohio",
    "Colorado Rockies": "Coors Field, Denver, Colorado",
    "Detroit Tigers": "Comerica Park, Detroit, Michigan",
    "Houston Astros": "Minute Maid Park, Houston, Texas",
    "Kansas City Royals": "Kauffman Stadium, Kansas City, Missouri",
    "Los Angeles Angels": "Angel Stadium, Anaheim, California",
    "Los Angeles Dodgers": "Dodger Stadium, Los Angeles, California",
    "Miami Marlins": "LoanDepot Park, Miami, Florida",
    "Milwaukee Brewers": "American Family Field, Milwaukee, Wisconsin",
    "Minnesota Twins": "Target Field, Minneapolis, Minnesota",
    "New York Mets": "Citi Field, Queens, New York City, New York",
    "New York Yankees": "Yankee Stadium, Bronx, New York City, New York",
    "Oakland Athletics": "Oakland-Alameda County Coliseum, Oakland, California",
    "Philadelphia Phillies": "Citizens Bank Park, Philadelphia, Pennsylvania",
    "Pittsburgh Pirates": "PNC Park, Pittsburgh, Pennsylvania",
    "San Diego Padres": "Petco Park, San Diego, California",
    "San Francisco Giants": "Oracle Park, San Francisco, California",
    "Seattle Mariners": "T-Mobile Park, Seattle, Washington",
    "St. Louis Cardinals": "Busch Stadium, St. Louis, Missouri",
    "Tampa Bay Rays": "Tropicana Field, St. Petersburg, Florida",
    "Texas Rangers": "Globe Life Field, Arlington, Texas",
    "Toronto Blue Jays": "Rogers Centre, Toronto, Ontario, Canada",
    "Washington Nationals": "Nationals Park, Washington, D.C.",
  
  
  // NHL Teams
  
  "Anaheim Ducks": "Honda Center, Anaheim, California",
  "Arizona Coyotes": "Mullett Arena, Tempe, Arizona",
  "Boston Bruins": "TD Garden, Boston, Massachusetts",
  "Buffalo Sabres": "KeyBank Center, Buffalo, New York",
  "Calgary Flames": "Scotiabank Saddledome, Calgary, Alberta, Canada",
  "Carolina Hurricanes": "PNC Arena, Raleigh, North Carolina",
  "Chicago Blackhawks": "United Center, Chicago, Illinois",
  "Colorado Avalanche": "Ball Arena, Denver, Colorado",
  "Columbus Blue Jackets": "Nationwide Arena, Columbus, Ohio",
  "Dallas Stars": "American Airlines Center, Dallas, Texas",
  "Detroit Red Wings": "Little Caesars Arena, Detroit, Michigan",
  "Edmonton Oilers": "Rogers Place, Edmonton, Alberta, Canada",
  "Florida Panthers": "Amerant Bank Arena, Sunrise, Florida",
  "Los Angeles Kings": "Crypto.com Arena, Los Angeles, California",
  "Minnesota Wild": "Xcel Energy Center, Saint Paul, Minnesota",
  "Montreal Canadiens": "Bell Centre, Montreal, Quebec, Canada",
  "Nashville Predators": "Bridgestone Arena, Nashville, Tennessee",
  "New Jersey Devils": "Prudential Center, Newark, New Jersey",
  "New York Islanders": "UBS Arena, Elmont, New York",
  "New York Rangers": "Madison Square Garden, New York City, New York",
  "Ottawa Senators": "Canadian Tire Centre, Ottawa, Ontario, Canada",
  "Philadelphia Flyers": "Wells Fargo Center, Philadelphia, Pennsylvania",
  "Pittsburgh Penguins": "PPG Paints Arena, Pittsburgh, Pennsylvania",
  "San Jose Sharks": "SAP Center, San Jose, California",
  "Seattle Kraken": "Climate Pledge Arena, Seattle, Washington",
  "St. Louis Blues": "Enterprise Center, St. Louis, Missouri",
  "Tampa Bay Lightning": "Amalie Arena, Tampa, Florida",
  "Toronto Maple Leafs": "Scotiabank Arena, Toronto, Ontario, Canada",
  "Vancouver Canucks": "Rogers Arena, Vancouver, British Columbia, Canada",
  "Vegas Golden Knights": "T-Mobile Arena, Paradise, Nevada",
  "Washington Capitals": "Capital One Arena, Washington, D.C.",
  "Winnipeg Jets": "Canada Life Centre, Winnipeg, Manitoba, Canada"

};

// Create reverse mapping from venue to teams
const venueTeamMapping = {};
Object.entries(teamVenueMapping).forEach(([team, venue]) => {
  if (!venueTeamMapping[venue]) {
    venueTeamMapping[venue] = [];
  }
  venueTeamMapping[venue].push(team);
});

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

// Modified generateMockGames function
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
      
      // If team is specified, ensure it's included and venue is correct
      if (team) {
        const matchingTeams = leagueTeams[league].filter(leagueTeam => 
          leagueTeam.toLowerCase().includes(team.toLowerCase())
        );
        
        if (matchingTeams.length > 0) {
          const selectedTeam = getRandomElement(matchingTeams);
          const otherTeams = leagueTeams[league].filter(t => t !== selectedTeam);
          const opponent = getRandomElement(otherTeams);
          teamPair = [selectedTeam, opponent];
          
          // Use the home venue of the selected team
          venue = teamVenueMapping[selectedTeam] || getRandomElement(leagueVenues[league]);
        } else {
          teamPair = getRandomTeamPair(league);
          venue = teamVenueMapping[teamPair[0]] || getRandomElement(leagueVenues[league]);
        }
      } 
      // If location is specified, find teams that play in that location
      else if (location) {
        const matchingVenues = leagueVenues[league].filter(v => 
          v.toLowerCase().includes(location.toLowerCase())
        );
        
        if (matchingVenues.length > 0) {
          venue = getRandomElement(matchingVenues);
          
          // Find teams that play in this venue in this league
          const possibleHomeTeams = [];
          for (const [venueTeam, venueLocation] of Object.entries(teamVenueMapping)) {
            if (venueLocation === venue && leagueTeams[league].includes(venueTeam)) {
              possibleHomeTeams.push(venueTeam);
            }
          }
          
          if (possibleHomeTeams.length > 0) {
            const homeTeam = getRandomElement(possibleHomeTeams);
            const otherTeams = leagueTeams[league].filter(t => t !== homeTeam);
            const opponent = getRandomElement(otherTeams);
            teamPair = [homeTeam, opponent];
          } else {
            // If no direct mapping, use a random team from the correct league
            teamPair = getRandomTeamPair(league);
          }
        } else {
          venue = getRandomElement(leagueVenues[league]);
          teamPair = getRandomTeamPair(league);
        }
      } 
      // If neither team nor location specified, select a random team and its home venue
      else {
        teamPair = getRandomTeamPair(league);
        venue = teamVenueMapping[teamPair[0]] || getRandomElement(leagueVenues[league]);
      }
      
      // Use the specified date or generate a random one
      const eventDate = date || generateFutureDate();
      
      results.push({
        id: `${searchId}-${league}-${i}`, // More unique ID using search timestamp + league + counter
        teams: teamPair,
        date: eventDate,
        location: venue,
        league: league,
        tickets: generateTickets(getRandomInt(20, 30)) // 20-30 tickets per event
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
      <button onClick={onSearch} className="bg-[#ffbd59] text-white p-3 rounded-lg w-1/6 font-semibold shadow-md hover:bg-[#e8ab4b] transition duration-200">
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