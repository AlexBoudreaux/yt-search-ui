import React from 'react';

const VideoDisplay = ({ videos }) => {
    return (
      <div>
        {videos.map((video, index) => (
          <div key={index}>
            <h3>{video.video_name}</h3>
            <p>Created by: {video.creator}</p>
            {/* Additional video details here */}
          </div>
        ))}
      </div>
    );
  };

  export default VideoDisplay;