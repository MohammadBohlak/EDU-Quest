import React, { useState } from "react";
import VideoModal from "../../ui/modals/videoModal/VideoModal";
import { api } from "../../../utils/api/api";
import * as Yup from "yup";
import { extractYouTubeVideoId } from "../../ui/videoPlayer/VideoPlayer";
import Toast from "../../ui/toast/Toast";
import { useTranslation } from "react-i18next";

const checkYouTubeVideo = async (videoId) => {
  try {
    await api.get(
      `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
    );
    return true;
  } catch (err) {
    if (err.response?.status === 404) return false;
    return false;
  }
};

const AddVideoModal = ({ courseSelected, isOpen, setIsOpen }) => {
  const { t } = useTranslation();
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");

  const formatDuration = (h, m, s) => {
    const pad = (val) => String(val).padStart(2, "0");
    return `${pad(h)}:${pad(m)}:${pad(s)}`;
  };

  const handleSubmit = (values) => {
    const { hour_duration, minute_duration, second_duration, ...rest } = values;
    const formattedDuration = formatDuration(
      hour_duration,
      minute_duration,
      second_duration
    );

    const payload = {
      ...rest,
      duration: formattedDuration,
    };

    const data = {
      course_id: courseSelected.id,
      video_url: payload.url,
      title: payload.title,
      description: payload.description,
      duration: payload.duration,
      video_order: payload.video_order,
    };

    const token = localStorage.getItem("token");
    const videoId = extractYouTubeVideoId(values.url);

    checkYouTubeVideo(videoId).then((res) => {
      if (res) {
        api
          .post(`courses/${courseSelected.id}/videos`, data, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then(() => {
            setIsOpen(false);
          })
          .catch((err) => {
            console.error(err);
          });
      } else {
        setMessage(t("addVideoModal.error.notFound"));
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 5000);
      }
    });
  };

  const initialValues = {
    title: "",
    description: "",
    url: "",
    video_order: "",
    hour_duration: "",
    minute_duration: "",
    second_duration: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required(t("addVideoModal.validation.title")),
    description: Yup.string(),
    url: Yup.string().required(t("addVideoModal.validation.url")),
    video_order: Yup.string().required(t("addVideoModal.validation.order")),
    hour_duration: Yup.number()
      .typeError(t("addVideoModal.validation.number"))
      .required(t("addVideoModal.validation.hour")),
    minute_duration: Yup.number()
      .typeError(t("addVideoModal.validation.number"))
      .required(t("addVideoModal.validation.minute")),
    second_duration: Yup.number()
      .typeError(t("addVideoModal.validation.number"))
      .required(t("addVideoModal.validation.second")),
  });

  return (
    <>
      <VideoModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onClose={() => setIsOpen(false)}
      />
      <Toast $err={true} message={message} show={showToast} />
    </>
  );
};

export default AddVideoModal;
