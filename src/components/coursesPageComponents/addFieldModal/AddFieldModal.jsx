// import React, { useState } from 'react'
import * as Yup from "yup";
import ModalForm from "../../ui/modals/modalForm/ModalForm";
import { api } from "../../../utils/api/api";
import { useContext } from "react";
import { DataContext } from "../../../context/DataProvider";
import { useTranslation } from "react-i18next";

const AddFieldModal = ({ isOpen, setIsOpen }) => {
  // const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const { refresh } = useContext(DataContext);
  // const fields = [
  //   {
  //     name: "name",
  //     label: "Name",
  //     type: "text",
  //     placeholder: "Enter the title",
  //   },
  //   {
  //     name: "description",
  //     label: "Description",
  //     type: "textarea",
  //     placeholder: "Enter the description",
  //   },
  // ];
  const fields = [
    {
      name: "name",
      label: t("addField.name"),
      type: "text",
      placeholder: t("addField.placeholderName"),
    },
    {
      name: "description",
      label: t("addField.description"),
      type: "textarea",
      placeholder: t("addField.placeholderDescription"),
    },
  ];

  const initialValues = {
    name: "",
    description: "",
  };

  // const validationSchema = Yup.object({
  //   name: Yup.string().required("The field is reaured"),
  //   description: Yup.string().max(100),
  // });
  const validationSchema = Yup.object({
    name: Yup.string().required(t("addField.requiredName")),
    description: Yup.string().max(100, t("addField.maxDescription")),
  });

  const handleSubmit = (values) => {
    const token = localStorage.getItem("token");
    // console.log("القيم المرسلة:", values);

    api
      .post("categories", values, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res);
        refresh();
        setIsOpen(false);
      });
  };

  return (
    <ModalForm
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      // title="Add Scientific field"
      title={t("addField.title")}
      fields={fields}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    />
  );
};

export default AddFieldModal;
