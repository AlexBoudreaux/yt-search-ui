import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import SearchBar from './SearchBar';
import VideoDisplay from './VideoDisplay';

import axios from 'axios';

const searchVideos = async (query) => {
  try {
    const response = await axios.get('http://localhost:8000/search/', { params: { query } });
    return response.data;
  } catch (error) {
    console.error('Error fetching search results:', error);
    return [];
  }
};

const App = () => {
  const [videos, setVideos] = useState([]);

  const handleSearch = async (query) => {
    const results = await searchVideos(query);
    setVideos(results);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <VideoDisplay videos={videos} />
    </div>
  );
};

export default App;