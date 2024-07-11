// src/App.js

import './App.css';
import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import VideoDisplay from './VideoDisplay';
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
  const [searchMade, setSearchMade] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    checkServerHealth();
  }, []);

  const handleSearch = async (query) => {
    setIsLoading(true);
    setSearchMade(true);
    const results = await searchVideos(query);
    setVideos(results);
    setIsLoading(false);
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
      <SearchBar onSearch={handleSearch} />
      {isLoading ? (
        <LoadingSpinner />
      ) : searchMade && videos.length === 0 ? (
        <div className="no-videos-message">No Videos Match</div>
      ) : (
        <VideoDisplay videos={videos} onVideoSelect={handleVideoSelect} />
      )}
      <footer className="footer">
        alexboudreaux.dev &copy; {new Date().getFullYear()} 
      </footer>
    </div>
  );
};

export default App;