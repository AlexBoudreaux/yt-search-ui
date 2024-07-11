// src/VideoDisplay.js

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';

const VideoDisplay = ({ videos, onVideoSelect }) => {
  return (
    <div className="video-grid">
      {videos.map((video, index) => (
        <div 
          key={index} 
          className="video-card"
          onClick={() => onVideoSelect(video)}
        >
          <img
            src={`https://img.youtube.com/vi/${video.video_id}/0.jpg`}
            alt={video.video_name}
            className="video-thumbnail"
          />
          <div className='video-card-info'>
            <div className="video-title">{video.video_name}</div>
            <div className='video-creator'>
              <FontAwesomeIcon icon={faUser} style={{ marginRight: '7px' }}/>
              {video.creator}
            </div>
            {video.food_category && (
              <div className="video-category">
                {Array.isArray(video.food_category) 
                  ? video.food_category.join(', ') 
                  : video.food_category}
              </div>
            )}
            <div className="youtube-icon-container">
              <FontAwesomeIcon icon={faYoutube} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoDisplay;