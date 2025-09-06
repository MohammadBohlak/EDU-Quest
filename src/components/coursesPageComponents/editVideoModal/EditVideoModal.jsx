import React, { useState, useEffect, useContext } from "react";
import VideoModal from "../../ui/modals/videoModal/VideoModal";
import { api } from "../../../utils/api/api";
import * as Yup from "yup";
import { DataContext } from "../../../context/DataProvider";

export default function EditModalForm({
  courseSelected,
  videoToEditId,
  isOpen,
  setIsOpen,
  courseId,
  refreshVideosList,
}) {
  const [initialValues, setInitialValues] = useState({
    title: "",
    description: "",
    url: "",
    video_order: "",
    hour_duration: "",
    minute_duration: "",
    second_duration: "",
  });
  const [show, setShow] = useState(false);
  //   const { refresh } = useContext(DataContext);

  // جلب بيانات الفيديو من API وتهيئة الحقول
  useEffect(() => {
    if (isOpen && videoToEditId) {
      api.get(`videos/${videoToEditId}`).then((res) => {
        const { title, description, video_url, video_order, duration } =
          res.data;
        // duration بالنمط "hh:mm:ss"
        const [hour, minute, second] = duration.split(":");

        setInitialValues({
          title: title || "",
          description: description || "",
          url: video_url || "",
          video_order: String(video_order || ""),
          hour_duration: hour || "00",
          minute_duration: minute || "00",
          second_duration: second || "00",
        });
        setShow(true);
      });
    }
  }, [isOpen, videoToEditId]);

  // دالة تنسيق المدة
  const formatDuration = (h, m, s) => {
    const pad = (val) => String(val).padStart(2, "0");
    return `${pad(h)}:${pad(m)}:${pad(s)}`;
  };

  // مخطط التحقق
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

  // عند إرسال التعديل
  const handleSubmit = (values) => {
    const { hour_duration, minute_duration, second_duration, ...rest } = values;
    const formattedDuration = formatDuration(
      hour_duration,
      minute_duration,
      second_duration
    );

    const payload = {
      course_id: courseId,
      video_url: rest.url,
      title: rest.title,
      description: rest.description,
      duration: formattedDuration,
      video_order: rest.video_order,
    };

    console.log("Update payload:", payload);
    api
      .put(`videos/${videoToEditId}`, payload)
      .then((res) => {
        console.log("Edited successfully", res.data);
        setIsOpen(false);
        refreshVideosList();
        setShow(false);
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      {show && (
        <VideoModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          handleSubmit={handleSubmit}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onClose={() => {
            setIsOpen(false);
            setShow(false);
          }}
        />
      )}
    </>
  );
}
