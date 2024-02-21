import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import CharacterList from './components/CharacterList';
import CharacterDetails from './components/CharacterDetails';
import './App.css';

const App = () => {
  return (
    <div style={{ background: 'url("/images/bg.jpg") no-repeat center center fixed', backgroundSize: 'cover', height: '100%' }}>
      <Routes>
        
          <>
            <Route path="/" element={<CharacterList />} />
            <Route path="/character/:id" element={<CharacterDetails />} />
          </>
        
      </Routes>
    </div>
  );
};

export default App;
