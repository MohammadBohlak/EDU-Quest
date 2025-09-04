import { useContext, useState } from "react";
import React, { useEffect } from "react";
import * as Yup from "yup";
import ModalForm from "../ui/modals/modalForm/ModalForm";
import { api } from "../../utils/api/api";
import { DataContext } from "../../context/DataProvider";
import { BiRefresh } from "react-icons/bi";

const AddCourseModal = ({ isOpen, setIsOpen }) => {
  const { categories, refresh } = useContext(DataContext);
  const [displayCategories, setDisplayCategories] = useState([]);
  useEffect(() => {
    setDisplayCategories(
      categories.map((e) => {
        return { value: e.id, label: e.name };
      })
    );
  }, [categories]);
  const fields = [
    {
      name: "category_id",
      label: "Course Type",
      type: "select",
      options: displayCategories,
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
    category_id: "",
    title: "",
    description: "",
  };

  const validationSchema = Yup.object({
    category_id: Yup.string().required("Please select a course type"),
    title: Yup.string().required("Course title is required"),
    description: Yup.string(),
  });

  const handleSubmit = (values) => {
    console.log(values);
    api.post("courses", values).then((res) => {
      console.log(res);
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

export default AddCourseModal;
