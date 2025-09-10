import React, { useState } from "react";
import UsersTable from "../../components/usersPageComponents/usersTable/UsersTable";
import PrimaryButton from "../../components/common/buttons/PrimaryButton";
import { IoIosAddCircleOutline } from "react-icons/io";
import AddCourseModal from "../../components/coursesPageComponents/AddCuorseModal";
import AddUserModal from "../../components/usersPageComponents/usersTable/AddUserModal";
// import ProfileModal from "../../components/ui/modals/profileModal/ProfileModal";

const Users = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [reloadUsers, setReloadUsers] = useState(false);
  const refreshUsers = () => {
    setReloadUsers((prev) => !prev);
  };
  return (
    <>
      <PrimaryButton
        onClick={() => setIsOpen(true)}
        style={{
          width: "fit-content",
          height: "42px",
          padding: "9px 27px",
          marginBottom: "20px",
        }}
      >
        <IoIosAddCircleOutline /> Add User
      </PrimaryButton>
      <UsersTable reloadUsers={reloadUsers} setReloadUsers={setReloadUsers} />
      <AddUserModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        setIsOpen={setIsOpen}
        refreshUsers={refreshUsers}
      />
    </>
  );
};

export default Users;
