import axios from "axios";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";
import { api } from "../../../utils/api/api";
import { useEffect, useState } from "react";
import styled from "styled-components";
function extractYouTubeVideoId(url) {
  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname;

    if (hostname.includes("youtube.com")) {
      return parsedUrl.searchParams.get("v");
    }

    if (hostname.includes("youtu.be")) {
      return parsedUrl.pathname.slice(1); // يحذف أول "/"
    }

    return null; // إذا لم يكن الرابط من YouTube
  } catch (error) {
    console.error("Invalid URL:", error);
    return null;
  }
}

const VideoPlayer = ({ url }) => {
  const { videoId } = useParams();
  const [vedioIdentifier, setVideoIdentifier] = useState("");
  useEffect(() => {
    api.get(`videos/${videoId}`).then((res) => {
      console.log(res.data);
      setVideoIdentifier(extractYouTubeVideoId(res.data.video_url));
    });
  }, []);
  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };
  // const videoId = extractYouTubeVideoId(url);

  return (
    <VideoContainer>
      <YouTube videoId={vedioIdentifier} opts={opts} />
    </VideoContainer>
  );
};
export default VideoPlayer;

const VideoContainer = styled.div`
  max-width: 100%;
  height: 500px;
  iframe {
    height: 500px !important;
  }
`;
