import * as Yup from "yup";
import ModalForm from "../../ui/modals/modalForm/ModalForm";
import { api } from "../../../utils/api/api";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Toast from "../../ui/toast/Toast";

const AddUserModal = ({ isOpen, setIsOpen, refreshUsers }) => {
  const { t } = useTranslation();
  const [message, setMessage] = useState();
  const [showToast, setShowToast] = useState(false);

  const fields = [
    {
      name: "user_name",
      label: t("addUserModal.fields.user_name.label"),
      type: "text",
      placeholder: t("addUserModal.fields.user_name.placeholder"),
    },
    {
      name: "email",
      label: t("addUserModal.fields.email.label"),
      type: "email",
      placeholder: t("addUserModal.fields.email.placeholder"),
    },
    {
      name: "password",
      label: t("addUserModal.fields.password.label"),
      type: "text",
      placeholder: t("addUserModal.fields.password.placeholder"),
    },
    {
      name: "role",
      label: t("addUserModal.fields.role.label"),
      type: "select",
      options: [
        { value: "admin", label: t("addUserModal.fields.role.options.admin") },
        {
          value: "publisher",
          label: t("addUserModal.fields.role.options.publisher"),
        },
        {
          value: "student",
          label: t("addUserModal.fields.role.options.student"),
        },
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
    user_name: Yup.string().required(
      t("addUserModal.fields.user_name.required")
    ),
    email: Yup.string()
      .email(t("addUserModal.fields.email.invalid"))
      .required(t("addUserModal.fields.email.required")),
    password: Yup.string()
      .required(t("addUserModal.fields.password.required"))
      .min(8, t("addUserModal.fields.password.min")),
    role: Yup.string().required(t("addUserModal.fields.role.required")),
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
        setMessage(err.response?.data?.message || "Something went wrong");
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
        title={t("addUserModal.title")}
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
