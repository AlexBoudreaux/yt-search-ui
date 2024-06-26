import './App.css';
import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import VideoDisplay from './VideoDisplay';
import SearchDropdown from './SearchDropdown'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import LoadingSpinner from './LoadingSpinner';
import axios from 'axios';

// API URL 
const apiUrl = "https://yt-search-api-d6kibk2c6q-ue.a.run.app/";

const checkServerHealth = async () => {
  try {
    const response = await axios.get(apiUrl);
    console.log('Server health check:', response.statusText);
  } catch (error) {
    console.error('Error during server health check:', error);
  }
};

const searchVideos = async (query, threshold) => {
  try {
    const params = {
      query: query,
      threshold: threshold
    };
    const response = await axios.get(apiUrl + 'search', { params });
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
  const [searchMade, setSearchMade] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  // Call checkServerHealth on component mount
  useEffect(() => {
    checkServerHealth();
  }, []);

  const handleSearch = async (query) => {
    setIsLoading(true);
    setSearchMade(true); // Set searchMade to true when a search is performed
    const results = await searchVideos(query, thresholdValues[selectedThreshold]);
    setVideos(results);
    setIsLoading(false);
  };

  const handleInputChange = (query) => {
    setSearchInput(query); // Update search input state
    setShowDropdown(query.length > 0); // Show or hide dropdown based on input
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
        <div className="user-icon-container">
          <a href="https://github.com/AlexBoudreaux" className="user-icon-link" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faUser} />
          </a>
        </div>  
      </header>
      <div className="divider"></div>
      <SearchBar 
        onSearch={handleSearch} 
        onInputChange={handleInputChange} // Make sure this is correctly passed
      />
      {/* <SearchDropdown isVisible={showDropdown} /> */}
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
      {isLoading ? (
        <LoadingSpinner />
      ) : searchMade && videos.length === 0 ? (
        <div className="no-videos-message">
          No Videos Match
        </div>
      ) : (
        <VideoDisplay videos={videos} />
      )}
      <footer className="footer">
        alexboudreaux.dev &copy; {new Date().getFullYear()} 
      </footer>
    </div>
  );
};

export default App;