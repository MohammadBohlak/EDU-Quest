import React from "react";
import VideoModal from "../../ui/modals/videoModal/VideoModal";
import { api } from "../../../utils/api/api";
import * as Yup from "yup";

const AddVideoModal = ({ courseSelected, isOpen, setIsOpen }) => {
  // const [isOpen, setIsOpen] = React.useState(false);

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

    let data = {
      course_id: courseSelected.id,
      video_url: payload.url,
      title: payload.title,
      description: payload.description,
      duration: payload.duration,
      video_order: payload.video_order,
    };
    // console.log(data);
    const token = localStorage.getItem("token");
    api
      .post(`courses/${courseSelected.id}/videos`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);
        setIsOpen(false);
      })
      .catch((err) => {
        console.log(err);
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
    title: Yup.string().required("Video title is required"),
    description: Yup.string(),
    url: Yup.string().required("Video URL is required"),
    video_order: Yup.string().required("Video order is required"),
    hour_duration: Yup.number()
      .typeError("Must be a number")
      .required("Hour is required"),
    minute_duration: Yup.number()
      .typeError("Must be a number")
      .required("Minute is required"),
    second_duration: Yup.number()
      .typeError("Must be a number")
      .required("Second is required"),
  });
  return (
    <div>
      <VideoModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onClose={() => {
          setIsOpen(false);
        }}
      />
    </div>
  );
};

export default AddVideoModal;
