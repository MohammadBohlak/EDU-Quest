import { useState } from "react";
import React, { useEffect } from "react";
import * as Yup from "yup";
import ModalForm from "../common/modalForm/ModalForm";
import { api } from "../../utils/api/api";

const AddCourseModal = ({ isOpen, setIsOpen }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api.get("categories").then((res) => {
      setCategories(
        res.data.categories.map((e) => {
          return { value: e.id, label: e.name };
        })
      );
    });
  }, []);
  const fields = [
    {
      name: "type",
      label: "Course Type",
      type: "select",
      options: categories,
    },
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

  const initialValues = {
    type: "",
    title: "",
    description: "",
  };

  const validationSchema = Yup.object({
    type: Yup.string().required("Please select a course type"),
    title: Yup.string().required("Course title is required"),
    description: Yup.string(),
  });

  const handleSubmit = (values) => {
    console.log("Submitted course data:", values);
    setIsOpen(false);
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

export default AddCourseModal;
