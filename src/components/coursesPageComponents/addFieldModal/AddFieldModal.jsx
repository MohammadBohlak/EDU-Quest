// import React, { useState } from 'react'
import * as Yup from "yup";
import ModalForm from "../../ui/modals/modalForm/ModalForm";
import { api } from "../../../utils/api/api";
import { useContext } from "react";
import { DataContext } from "../../../context/DataProvider";

const AddFieldModal = ({ isOpen, setIsOpen }) => {
  // const [isOpen, setIsOpen] = useState(false);
  const { refresh } = useContext(DataContext);
  const fields = [
    {
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "Enter the title",
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      placeholder: "Enter the description",
    },
  ];

  const initialValues = {
    name: "",
    description: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("The field is reaured"),
    description: Yup.string().max(100),
  });

  const handleSubmit = (values) => {
    // console.log("القيم المرسلة:", values);
    api.post("categories", values).then((res) => {
      console.log(res);
      refresh();
      setIsOpen(false);
    });
  };

  return (
    <ModalForm
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title="Add Scientific field"
      fields={fields}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    />
  );
};

export default AddFieldModal;
