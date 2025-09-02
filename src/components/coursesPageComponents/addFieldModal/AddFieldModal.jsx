// import React, { useState } from 'react'
import * as Yup from "yup";
import ModalForm from "../../common/modalForm/ModalForm";
import { api } from "../../../utils/api/api";

const AddFieldModal = ({ isOpen, setIsOpen }) => {
  // const [isOpen, setIsOpen] = useState(false);

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
    description: Yup.string().min(
      10,
      "Description must be longer than 10 characters."
    ),
  });

  const handleSubmit = (values) => {
    // console.log("القيم المرسلة:", values);
    api.post("categories", values).then((res) => {
      console.log(res);
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
