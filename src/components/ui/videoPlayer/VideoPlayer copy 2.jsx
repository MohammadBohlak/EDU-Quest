import axios from "axios";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";
import { api } from "../../../utils/api/api";
import { useEffect, useState, useRef } from "react";
import styled from "styled-components";

function extractYouTubeVideoId(url) {
  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname;

    if (hostname.includes("youtube.com")) {
      return parsedUrl.searchParams.get("v");
    }

    if (hostname.includes("youtu.be")) {
      return parsedUrl.pathname.slice(1);
    }

    return null;
  } catch (error) {
    console.error("Invalid URL:", error);
    return null;
  }
}

const VideoPlayer = ({ url }) => {
  const { videoId } = useParams();
  const [vedioIdentifier, setVideoIdentifier] = useState("");
  const playerRef = useRef(null);
  const hasStoppedRef = useRef(false); // لمنع الطباعة أكثر من مرة

  useEffect(() => {
    api.get(`videos/${videoId}`).then((res) => {
      setVideoIdentifier(extractYouTubeVideoId(res.data.video_url));
    });
  }, []);

  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const onReady = (event) => {
    playerRef.current = event.target;

    const interval = setInterval(() => {
      if (playerRef.current && !hasStoppedRef.current) {
        const currentTime = playerRef.current.getCurrentTime();
        if (Math.floor(currentTime) >= 10) {
          console.log("stopped");
          hasStoppedRef.current = true;
          clearInterval(interval);
        }
      }
    }, 1000);
  };

  return (
    <VideoContainer>
      <YouTube videoId={vedioIdentifier} opts={opts} onReady={onReady} />
    </VideoContainer>
  );
};

export default VideoPlayer;

const VideoContainer = styled.div`
  max-width: 100%;
  height: 500px;
  position: relative;
  iframe {
    height: 500px !important;
  }
`;
