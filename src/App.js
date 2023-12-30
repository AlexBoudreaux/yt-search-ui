import './App.css';
import React, { useState } from 'react';
import SearchBar from './SearchBar';
import VideoDisplay from './VideoDisplay';

import axios from 'axios';

const searchVideos = async (query) => {
  try {
    const params = {
      query: query,
      threshold: 0.77  // Adding the threshold parameter
    };
    const response = await axios.get('http://localhost:8000/search/', { params });
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
    <div className="App">
      {/* <header className='header'>
        Cooking Videos
      </header> */}
      <SearchBar onSearch={handleSearch} />
      <VideoDisplay videos={videos} />
    </div>
  );
};

export default App;