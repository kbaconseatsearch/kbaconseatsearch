import React from 'react';
import { useSearchParams } from 'react-router-dom';
import EventsSearch from './EventsSearch';
import Navbar from './components/Navbar';

const SearchResults = () => {
  const [searchParams] = useSearchParams();

  const team = searchParams.get('team') ?? '';
  const start = searchParams.get('start') ?? '';
  const end = searchParams.get('end') ?? '';

  return (
    <EventsSearch
      teamName={team}
      startDate={start}
      endDate={end}
    />
  );
};

export default SearchResults;