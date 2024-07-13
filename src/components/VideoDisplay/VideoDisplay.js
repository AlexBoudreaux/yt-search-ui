// src/components/VideoDisplay/VideoDisplay.js
import React, { useState } from 'react';
import './VideoDisplay.css';
import VideoCard from '../VideoCard/VideoCard';
import ExpandedVideoCard from '../ExpandedVideoCard/ExpandedVideoCard';

const VideoDisplay = ({ videos, onVideoSelect }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const getRowIndex = (index) => Math.floor(index / 3);

  return (
    <div className="video-grid">
      {videos.map((video, index) => (
        <VideoCard
          key={index}
          video={video}
          onVideoSelect={onVideoSelect}
          isExpanded={expandedIndex === index}
          onExpand={() => handleExpand(index)}
          className={expandedIndex === index ? 'active' : ''}
        />
      ))}
      {expandedIndex !== null && (
        <div 
          className="expanded-row" 
          style={{ 
            gridRow: getRowIndex(expandedIndex) + 2,
            '--active-index': expandedIndex
          }}
        >
          <ExpandedVideoCard video={videos[expandedIndex]} />
        </div>
      )}
    </div>
  );
};

export default VideoDisplay;