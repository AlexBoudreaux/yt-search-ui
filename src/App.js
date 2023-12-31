import './App.css';
import React, { useState } from 'react';
import SearchBar from './SearchBar';
import VideoDisplay from './VideoDisplay';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import LoadingSpinner from './LoadingSpinner';
import axios from 'axios';

const searchVideos = async (query, threshold) => {
  try {
    const params = {
      query: query,
      threshold: threshold  // Adding the threshold parameter
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
  const [isLoading, setIsLoading] = useState(false);
  const [selectedThreshold, setSelectedThreshold] = useState('medium');
  const [currentQuery, setCurrentQuery] = useState('');

  const handleSearch = async (query) => {
    setIsLoading(true);
    const results = await searchVideos(query, thresholdValues[selectedThreshold]);
    setVideos(results);
    setIsLoading(false);
  };  

  const handleThresholdChange = (threshold) => {
    setSelectedThreshold(threshold);
  };  

  const thresholdValues = {
    low: 0.75,   // Adjust these values as needed
    medium: 0.77,
    high: 0.80
  };

  return (
    <div className="App">
      <header className="app-header">
        <div className="youtube-icon-header">
          <FontAwesomeIcon icon={faYoutube} />
        </div>
        YT Recipe Search
      </header>
      <div className="divider"></div>
      <SearchBar onSearch={(query) => {
        setCurrentQuery(query); // Update the current query state
        handleSearch(query); // Perform search with the new query
      }} />
      <div className="threshold-buttons">
        <button 
          className={`threshold-button ${selectedThreshold === 'low' ? 'selected' : ''}`}
          onClick={() => handleThresholdChange('low')}
        >
          Low Sensitivity
        </button>
        <button 
          className={`threshold-button ${selectedThreshold === 'medium' ? 'selected' : ''}`}
          onClick={() => handleThresholdChange('medium')}
        >
          Medium Sensitivity
        </button>
        <button 
          className={`threshold-button ${selectedThreshold === 'high' ? 'selected' : ''}`}
          onClick={() => handleThresholdChange('high')}
        >
          High Sensitivity
        </button>
      </div>
      {isLoading ? <LoadingSpinner /> : <VideoDisplay videos={videos} />}
    </div>
  );
};

export default App;