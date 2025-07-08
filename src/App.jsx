import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './Homepage';
import EventDetails from './EventDetails';
import PerformerPage from './pages/PerformerPage';
import TeamPage from './pages/TeamPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/search" element={<Homepage />} />
        <Route path="/event/:id" element={<EventDetails />} />

        {/* ✅ Route for flattened performers like /performers/dodgers */}
        <Route path="/performers/:slug" element={<PerformerPage />} />

        {/* Existing route for /teams/dodgers etc */}
        <Route path="/teams/:slug" element={<PerformerPage />} />

        {/* Optional: legacy nested team pages */}
        <Route path="/teams/:league/:teamName" element={<TeamPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;