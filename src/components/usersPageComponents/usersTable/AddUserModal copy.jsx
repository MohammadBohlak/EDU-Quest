// import React, { useState } from 'react'
import * as Yup from "yup";
import ModalForm from "../../ui/modals/modalForm/ModalForm";
import { api } from "../../../utils/api/api";
import { useContext, useState } from "react";
import { DataContext } from "../../../context/DataProvider";
import { useTranslation } from "react-i18next";
import Toast from "../../ui/toast/Toast";

const AddUserModal = ({ isOpen, setIsOpen, refreshUsers }) => {
  const { t } = useTranslation();
  const [message, setMessage] = useState();
  const [showToast, setShowToast] = useState(false);

  const fields = [
    {
      name: "user_name",
      label: "User Name",
      type: "text",
      placeholder: "Enter username",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Email",
    },
    {
      name: "password",
      label: "Password",
      type: "text",
      placeholder: "Password",
    },
    {
      name: "role",
      label: "Role",
      type: "select",
      options: [
        { value: "admin", label: "Admin" },
        { value: "publisher", label: "Publisher" },
        { value: "student", label: "Student" },
      ],
    },
  ];

  const initialValues = {
    user_name: "",
    email: "",
    password: "",
    role: "",
  };

  const validationSchema = Yup.object({
    user_name: Yup.string().required("User name is required"),
    email: Yup.string().email("email iconrect").required("Email is requred"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Please enter a password of at least 8 characters"),
    role: Yup.string().required("Please select a role for user"),
  });

  const handleSubmit = (values) => {
    api
      .post("register", values)
      .then((res) => {
        console.log(res);
        setIsOpen(false);
        refreshUsers();
      })
      .catch((err) => {
        setMessage(err.response.data.message);
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 5000);
      });
  };

  return (
    <>
      <ModalForm
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={"Create New User"}
        fields={fields}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      />
      <Toast $err={true} message={message} show={showToast} />
    </>
  );
};

export default AddUserModal;
