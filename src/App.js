// src/App.js

import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import SearchBar from './SearchBar';
import VideoDisplay from './VideoDisplay';
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

const searchVideos = async (query, top_k = 99, namespace = "All") => {
  try {
    const params = { query, top_k, namespace };
    const response = await axios.get(`${apiUrl}search`, { params });
    console.log('API response:', response.data); // Log the response
    return response.data;
  } catch (error) {
    console.error('Error fetching search results:', error);
    return [];
  }
};

const App = () => {
  const [allVideos, setAllVideos] = useState([]);
  const [displayedVideos, setDisplayedVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchMade, setSearchMade] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentSearch, setCurrentSearch] = useState({ query: '', displayCount: 30 });
  const loadMoreButtonRef = useRef(null);

  const categories = [
    'All', 'Entree', 'Side Dish', 'Dessert', 'Beverage', 'Appetizer', 
    'Snack', 'Soup', 'Salad', 'Breakfast', 'Condiment', 'Dip', 'Cocktail'
  ];

  useEffect(() => {
    checkServerHealth();
  }, []);

  useEffect(() => {
    setDisplayedVideos(allVideos.slice(0, currentSearch.displayCount));
  }, [allVideos, currentSearch.displayCount]);

  const handleSearch = async (query) => {
    setIsLoading(true);
    setSearchMade(true);
    setSelectedVideo(null);
    setCurrentSearch({ query, displayCount: 30 });
    const results = await searchVideos(query, 99, selectedCategory);
    setAllVideos(results);
    setIsLoading(false);
  };

  const handleInputChange = (query) => {
    setCurrentSearch(prev => ({ ...prev, query }));
  };

  const handleLoadMore = () => {
    setCurrentSearch(prev => ({ 
      ...prev, 
      displayCount: Math.min(prev.displayCount + 6, allVideos.length)
    }));

    if (loadMoreButtonRef.current) {
      loadMoreButtonRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
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
      <div className="category-dropdown">
        <select value={selectedCategory} onChange={handleCategoryChange}>
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>
      {isLoading ? (
        <LoadingSpinner />
      ) : searchMade && displayedVideos.length === 0 ? (
        <div className="no-videos-message">
          No Videos Match
        </div>
      ) : (
        <>
          <VideoDisplay videos={displayedVideos} onVideoSelect={handleVideoSelect} />
          {displayedVideos.length > 0 && displayedVideos.length < allVideos.length && (
            <div className="load-more-container" ref={loadMoreButtonRef}>
              <button className="load-more-button" onClick={handleLoadMore}>
                Show More Videos
              </button>
            </div>
          )}
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