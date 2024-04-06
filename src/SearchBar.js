import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchBar = ({ onSearch, onInputChange, onHideDropdown }) => {
    const [query, setQuery] = useState('');
    
    const handleSubmit = (e) => {
      e.preventDefault();
      onSearch(query);
      onInputChange(''); // Hide the dropdown on submit
    };

    const handleInputChange = (e) => {
      setQuery(e.target.value);
      onInputChange(e.target.value); // Call the new prop function
    };
  
    return (
      <div className="search-bar-container">
        <form onSubmit={handleSubmit} className="search-bar">
          <FontAwesomeIcon icon={faSearch} className="search-icon" /> 
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Search for recipes..."
            className="search-input"
            autoFocus
          />
          <button type="submit" className="search-button">Search</button>
        </form>
      </div>
    );
};

export default SearchBar;
