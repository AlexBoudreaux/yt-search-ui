// src/RecipeDetails.js

import React from 'react';
import './RecipeDetails.css';

const RecipeDetails = ({ video }) => {
  if (!video) return null;

  return (
    <div className="recipe-details">
      {/* <h2>{video.video_name}</h2>
      <p>Creator: {video.creator}</p>
      <p>Category: {video.food_category.join(', ')}</p>
      <h3>Description:</h3>
      <p>{video.personalized_description}</p>
      <h3>Recipe:</h3>
      <pre>{video.recipe}</pre>
      <a href={video.url} target="_blank" rel="noopener noreferrer">
        Watch on YouTube
      </a> */}
    </div>
  );
};

export default RecipeDetails;