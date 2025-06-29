import React, { useState, useEffect } from "react";
import "./Video.css";
import PlayVideo from "../../Components/PlayVideo/PlayVideo.jsx";
import Recommended from "../../Components/Recommended/Recommended.jsx";
import { useParams } from "react-router-dom";

const Video = () => {
  const { videoId, categoryId } = useParams();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 900);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="play-container">
      <PlayVideo videoId={videoId} />
      {!isMobile && (
        <Recommended categoryId={categoryId} className="recommended" />
      )}
    </div>
  );
};

export default Video;
