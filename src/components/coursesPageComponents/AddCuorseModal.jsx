import { useContext, useState } from "react";
import React, { useEffect } from "react";
import * as Yup from "yup";
import ModalForm from "../ui/modals/modalForm/ModalForm";
import { api } from "../../utils/api/api";
import { DataContext } from "../../context/DataProvider";
import { BiRefresh } from "react-icons/bi";
import { useTranslation } from "react-i18next";

const AddCourseModal = ({ isOpen, setIsOpen }) => {
  const { t } = useTranslation();
  const { categories, refresh } = useContext(DataContext);
  const [displayCategories, setDisplayCategories] = useState([]);
  useEffect(() => {
    setDisplayCategories(
      categories.map((e) => {
        return { value: e.id, label: e.name };
      })
    );
  }, [categories]);
  // const fields = [
  //   {
  //     name: "category_id",
  //     label: "Course Type",
  //     type: "select",
  //     options: displayCategories,
  //   },
  //   {
  //     name: "title",
  //     label: "Course Title",
  //     type: "text",
  //     placeholder: "Enter the course title",
  //   },
  //   {
  //     name: "description",
  //     label: "Course Description",
  //     type: "textarea",
  //     placeholder: "Enter a brief description",
  //   },
  // ];

  const fields = [
    {
      name: "category_id",
      label: t("addCourse.category"),
      type: "select",
      options: displayCategories,
    },
    {
      name: "title",
      label: t("addCourse.titleLabel"),
      type: "text",
      placeholder: t("addCourse.placeholderTitle"),
    },
    {
      name: "description",
      label: t("addCourse.description"),
      type: "textarea",
      placeholder: t("addCourse.placeholderDescription"),
    },
  ];
  const initialValues = {
    category_id: "",
    title: "",
    description: "",
  };

  // const validationSchema = Yup.object({
  //   category_id: Yup.string().required("Please select a course type"),
  //   title: Yup.string().required("Course title is required"),
  //   description: Yup.string().max(100),
  // });

  const validationSchema = Yup.object({
    category_id: Yup.string().required(t("addCourse.requiredCategory")),
    title: Yup.string().required(t("addCourse.requiredTitle")),
    description: Yup.string().max(100, t("addCourse.maxDescription")),
  });

  const handleSubmit = (values) => {
    const token = localStorage.getItem("token");
    console.log(values);
    api
      .post("courses", values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
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
      // title="Add New Course"
      title={t("addCourse.title")}
      fields={fields}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    />
  );
};

export default AddCourseModal;
