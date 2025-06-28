import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './Homepage';
import EventDetails from './EventDetails';
import PerformerPage from './pages/PerformerPage';
import TeamPage from './pages/TeamPage'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/search" element={<Homepage />} /> {/* ✅ Handles query-based searches */}
        <Route path="/event/:id" element={<EventDetails />} />
        <Route path="/performers/:slug" element={<PerformerPage />} />
        <Route path="/teams/:league/:teamName" element={<TeamPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;