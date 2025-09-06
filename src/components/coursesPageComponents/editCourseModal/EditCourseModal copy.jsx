import { useContext, useState } from "react";
import React, { useEffect } from "react";
import * as Yup from "yup";
import ModalForm from "../../ui/modals/modalForm/ModalForm";
import { api } from "../../../utils/api/api";
import { DataContext } from "../../../context/DataProvider";
import { BiRefresh } from "react-icons/bi";

const EditCourseModal = ({ isOpen, setIsOpen, courseSelected }) => {
  const [initialValues, setInitialValues] = useState({
    title: "",
    description: "",
  });
  const { refresh } = useContext(DataContext);
  useEffect(() => {
    console.log(courseSelected);
    if (isOpen)
      setInitialValues({
        title: courseSelected.title,
        description: courseSelected.description,
      });
  }, [courseSelected]);
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
    description: Yup.string(),
  });

  const handleSubmit = (values) => {
    console.log(values);
    api.put(`courses/${courseSelected.id}`, values).then((res) => {
      console.log("OK Edit", res);
      setIsOpen(false);
      //   getCourses();
      refresh();
    });
  };

  return (
    <ModalForm
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title="Add New Course"
      fields={fields}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    />
  );
};

export default EditCourseModal;
