import axios from "axios";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";
import { api } from "../../../utils/api/api";
import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import PracticeModal from "../../coursesPageComponents/practiceModal/PracticeModal";
import Toast from "../toast/Toast";

export const extractYouTubeVideoId = (url) => {
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
};

const parseDurationToSeconds = (duration) => {
  const [hh, mm, ss] = duration.split(":").map(Number);
  return hh * 3600 + mm * 60 + ss;
};

const VideoPlayer = ({ url }) => {
  const { videoId } = useParams();
  const [vedioIdentifier, setVideoIdentifier] = useState("");
  const playerRef = useRef(null);
  const hasStoppedRef = useRef(false);
  const [isOpen, setIsOpen] = useState(false);
  const [stopTime, setStopTime] = useState(10); // default fallback

  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");
  const [isErr, setIsErr] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    api
      .get(`videos/${videoId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setVideoIdentifier(extractYouTubeVideoId(res.data.video_url));
        const durationInSeconds = parseDurationToSeconds(res.data.duration);
        setStopTime(durationInSeconds);
      });
  }, []);

  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const practice = {
    content: "what is 5 * 5",
    options: ["10", "15", "25"],
    answer_correct: "25",
  };

  const handleSubmit = (selectedAnswer) => {
    if (selectedAnswer === practice.answer_correct) {
      setIsErr(false);
      setMessage("Correct Answer");
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } else {
      setIsErr(true);
      setMessage("Incorrect Answer");
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }

    setIsOpen(false);
    setTimeout(() => {
      playerRef.current?.playVideo();
    }, 500);
  };

  const onReady = (event) => {
    playerRef.current = event.target;

    const interval = setInterval(() => {
      if (playerRef.current && !hasStoppedRef.current) {
        const currentTime = playerRef.current.getCurrentTime();
        if (Math.floor(currentTime) >= stopTime) {
          hasStoppedRef.current = true;
          playerRef.current.pauseVideo();

          // ✅ الخروج من fullscreen قبل عرض المودل
          if (document.fullscreenElement) {
            document.exitFullscreen().then(() => {
              setIsOpen(true);
            });
          } else {
            setIsOpen(true);
          }

          clearInterval(interval);
        }
      }
    }, 1000);
  };

  return (
    <VideoContainer>
      <PracticeModal
        // isOpen={true}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        practice={practice}
        handleSubmit={handleSubmit}
      />
      <YouTube videoId={vedioIdentifier} opts={opts} onReady={onReady} />
      <Toast $err={isErr} message={message} show={showToast} />
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
