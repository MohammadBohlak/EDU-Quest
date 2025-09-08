import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import React, { useEffect } from "react";
import * as Yup from "yup";
import ModalForm from "../../ui/modals/modalForm/ModalForm";
import { api } from "../../../utils/api/api";
import { DataContext } from "../../../context/DataProvider";
import { BiRefresh } from "react-icons/bi";
import { useParams } from "react-router-dom";

const EditCourseModal = ({ setIsOpen, courseSelected, onClose }) => {
  const { id } = useParams();
  const [isShow, setIsShow] = useState(false);
  const [initialValues, setInitialValues] = useState({
    title: "",
    description: "",
  });
  const { refresh, rawCourses } = useContext(DataContext);
  const navigate = useNavigate();
  useEffect(() => {
    // console.log(id);
    // if (id) {
    //   const course = rawCourses.filter((e) => e.id == id)[0];
    //   console.log(course);
    //   setInitialValues({
    //     title: course.title,
    //     description: course.description,
    //   });
    // }
    const token = localStorage.getItem("token");
    api
      .get(`courses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setInitialValues({
          title: res.data.title,
          description: res.data.description,
        });
        setIsShow(true);
        // console.log(res.data);
      });
  }, [id]);
  // useEffect(() => {
  // console.log(courseSelected);
  // if (isOpen)
  // setInitialValues({
  // title: courseSelected.title,
  // description: courseSelected.description,
  // });
  // }, [courseSelected]);
  const fields = [
    {
      name: "title",
      label: "Course Title",
      type: "text",
      placeholder: "Enter the course title",
    },
    {
      name: "description",
      label: "Course Description",
      type: "textarea",
      placeholder: "Enter a brief description",
    },
  ];

  // const initialValues = {
  //   title: courseTitle,
  //   description: courseDescription,
  // };

  const validationSchema = Yup.object({
    title: Yup.string().required("Course title is required"),
    description: Yup.string().max(100),
  });

  const handleSubmit = (values) => {
    // console.log(values);
    api.put(`courses/${id}`, values).then((res) => {
      setIsShow(false);
      navigate("/dashboard/courses");
      refresh();
    });
    console.log(values);
  };

  return (
    <>
      {isShow && (
        <ModalForm
          key={id}
          isOpen={true}
          onClose={onClose}
          title="Edit Course"
          fields={fields}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          // إعادة تعيين النموذج عند الإغلاق
          enableReinitialize={true}
        />
      )}
    </>
  );
};

export default EditCourseModal;
