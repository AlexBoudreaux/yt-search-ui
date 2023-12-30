import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';



const VideoDisplay = ({ videos }) => {
    return (
      <div className="video-grid">
        {videos.map((video, index) => (
          <a 
            key={index} 
            href={`https://www.youtube.com/watch?v=${video.video_id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="video-card-link"
          >
            <div className="video-card">
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
                {/* Additional video details here */}
                <div className="youtube-icon-container">
                    <FontAwesomeIcon icon={faYoutube} />
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    );
  };  

  export default VideoDisplay;