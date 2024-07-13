// src/components/VideoCard/VideoCard.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import './VideoCard.css';

const VideoCard = ({ video, onVideoSelect, isExpanded, onExpand }) => {
  const handleClick = (e) => {
    if (!e.target.closest('.icon-container')) {
      onVideoSelect(video);
    }
  };

  return (
    <div className={`video-card ${isExpanded ? 'active' : ''}`} onClick={handleClick}>
      <img
        src={`https://img.youtube.com/vi/${video.video_id}/0.jpg`}
        alt={video.video_name}
        className="video-thumbnail"
      />
      <div className='video-card-info'>
        <div className="video-title">{video.video_name}</div>
        <div className="video-card-footer">
          <div className="footer-left">
            <a 
              href={`https://www.youtube.com/watch?v=${video.video_id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="icon-container youtube-icon-container"
              onClick={(e) => e.stopPropagation()}
            >
              <FontAwesomeIcon icon={faYoutube} />
            </a>
            <div className='video-creator'>
              <FontAwesomeIcon icon={faUser} style={{ marginRight: '7px' }}/>
              {video.creator}
            </div>
          </div>
          <div className="icon-container dropdown-icon-container" onClick={onExpand}>
            <FontAwesomeIcon icon={isExpanded ? faChevronUp : faChevronDown} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;