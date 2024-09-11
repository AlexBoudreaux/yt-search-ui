// src/RecipeDetails.js

import React from 'react';
import './RecipeDetails.css';
import ExpandedVideoCard from '../ExpandedVideoCard/ExpandedVideoCard';

const RecipeDetails = ({ video, onDelete }) => {
  return (
    <div className="recipe-details">
      <ExpandedVideoCard video={video} onDelete={onDelete} />
    </div>
  );
};

export default RecipeDetails;