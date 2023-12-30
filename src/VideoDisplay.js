import React from 'react';

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
              <div className="video-title">{video.video_name}</div>
              <div>Created by: {video.creator}</div>
              {/* Additional video details here */}
            </div>
          </a>
        ))}
      </div>
    );
  };  

  export default VideoDisplay;