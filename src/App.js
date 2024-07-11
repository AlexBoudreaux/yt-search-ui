// src/App.js

import './App.css';
import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import VideoDisplay from './VideoDisplay';
import SearchDropdown from './SearchDropdown'; 
import RecipeDetails from './RecipeDetails';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import LoadingSpinner from './LoadingSpinner';
import axios from 'axios';

const apiUrl = "https://yt-search-api-rust.vercel.app/";

const checkServerHealth = async () => {
  try {
    const response = await axios.get(apiUrl);
    console.log('Server health check:', response.statusText);
  } catch (error) {
    console.error('Error during server health check:', error);
  }
};

const searchVideos = async (query, top_k = 30, namespace = "All") => {
  try {
    const params = { query, top_k, namespace };
    const response = await axios.get(`${apiUrl}search`, { params });
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
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    checkServerHealth();
  }, []);

  const handleSearch = async (query) => {
    setIsLoading(true);
    setSearchMade(true);
    setSelectedVideo(null);
    const results = await searchVideos(query, 30, "All");
    setVideos(results);
    setIsLoading(false);
  };

  const handleInputChange = (query) => {
    setSearchInput(query);
    setShowDropdown(query.length > 0);
  };

  const handleThresholdChange = (threshold) => {
    setSelectedThreshold(threshold);
  };  

  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
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
        onInputChange={handleInputChange}
      />
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
        <>
          <VideoDisplay videos={videos} onVideoSelect={handleVideoSelect} />
          {selectedVideo && <RecipeDetails video={selectedVideo} />}
        </>
      )}
      <footer className="footer">
        alexboudreaux.dev &copy; {new Date().getFullYear()} 
      </footer>
    </div>
  );
};

export default App;