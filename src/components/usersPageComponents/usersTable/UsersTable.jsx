import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { api } from "../../../utils/api/api";
import { SmallTextShared } from "../../common/texts/SmallText";
import { NormalTextShared } from "../../common/texts/NormalText";
import { MdOutlineDelete } from "react-icons/md";
import ConfirmModal from "../../ui/modals/confirmModal/ConfirmModal";
import { AnimatePresence } from "motion/react";
import {
  Controls,
  CustomBtn,
  DelBtn,
  FilterSelect,
  InputCheck,
  SearchInput,
  StyledTable,
  Th,
  Wrapper,
} from "./usersTable.styles";

export default function UsersTable({ reloadUsers, setReloadUsers }) {
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  // const [reloadUsers, setReloadUsers] = useState(false);
  const { t } = useTranslation();
  // fetch users once
  useEffect(() => {
    const token = localStorage.getItem("token");
    // console.log("reloadUsers", reloadUsers);
    api
      .get("/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // assume res.data is array of user objects
        setUsers(res.data);
      })
      .catch(console.error);
  }, [reloadUsers]);

  // update filtered list whenever users, searchTerm or roleFilter change
  useEffect(() => {
    let list = [...users];

    if (roleFilter) {
      list = list.filter((u) => u.role === roleFilter);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      list = list.filter((u) => u.user_name.toLowerCase().includes(term));
    }

    setFiltered(list);
    // clear selections not in filtered
    setSelectedUsers((prev) =>
      prev.filter((id) => list.some((u) => u.id === id))
    );
  }, [users, roleFilter, searchTerm]);

  // toggle select all visible
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedUsers(filtered.map((u) => u.id));
    } else {
      setSelectedUsers([]);
    }
  };
  useEffect(() => {
    console.log(selectedUsers.length);
  }, [selectedUsers]);

  // toggle one row
  const handleSelect = (id) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleDelete = () => {
    const token = localStorage.getItem("token");

    api
      .delete(`/users/${userIdToDelete}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // assume res.data is array of user objects
        // setUsers(res.data);
        console.log(res);
        setUserIdToDelete(null);
        setShowConfirmModal(false);
        setReloadUsers((p) => !p);
      })
      .catch(console.error);
    setReloadUsers((p) => !p);
  };

  const deleteAll = async () => {
    const token = localStorage.getItem("token");

    try {
      await Promise.all(
        selectedUsers.map((userId) =>
          api.delete(`/users/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        )
      );

      // بعد الحذف، نقوم بتحديث القائمة
      setSelectedUsers([]);
      setReloadUsers((prev) => !prev);
      // console.log("All selected users deleted successfully.");
    } catch (error) {
      console.error("Error deleting users:", error);
    }
  };

  const allSelected =
    filtered.length > 0 && selectedUsers.length === filtered.length;

  return (
    <Wrapper>
      <Controls>
        <SearchInput
          type="text"
          placeholder={t("usersTable.searchPlaceholder")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <FilterSelect
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="">{t("usersTable.filterAll")}</option>
          <option value="admin">{t("usersTable.filterAdmin")}</option>
          <option value="publisher">{t("usersTable.filterPublisher")}</option>
          <option value="student">{t("usersTable.filterStudent")}</option>
        </FilterSelect>
        <AnimatePresence>
          {selectedUsers.length > 0 && (
            <DelBtn
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "1%", opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              exit={{ y: "100%", opacity: 0 }}
              onClick={deleteAll}
            >
              {t("usersTable.deleteAll")} ({selectedUsers.length})
            </DelBtn>
          )}
        </AnimatePresence>
      </Controls>

      <StyledTable responsive hover>
        <thead>
          <tr>
            <Th style={{ textAlign: "center", verticalAlign: "middle" }}>
              <InputCheck
                type="checkbox"
                checked={allSelected}
                onChange={handleSelectAll}
              />
            </Th>
            <Th>
              <NormalTextShared>{t("usersTable.username")}</NormalTextShared>
            </Th>
            <Th>
              <NormalTextShared>{t("usersTable.email")}</NormalTextShared>
            </Th>
            <Th>
              <NormalTextShared>{t("usersTable.role")}</NormalTextShared>
            </Th>
            <Th>
              <NormalTextShared>{t("usersTable.actions")}</NormalTextShared>
            </Th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((u) => {
            const isSelected = selectedUsers.includes(u.id);
            return (
              <tr className={isSelected ? "selected" : ""} key={u.id}>
                <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                  <InputCheck
                    type="checkbox"
                    checked={selectedUsers.includes(u.id)}
                    onChange={() => handleSelect(u.id)}
                  />
                </td>
                <td>
                  <SmallTextShared>{u.user_name}</SmallTextShared>
                </td>
                <td>
                  <SmallTextShared>{u.email}</SmallTextShared>
                </td>
                <td>
                  <SmallTextShared>{u.role}</SmallTextShared>
                </td>
                <td className="">
                  <CustomBtn
                    onClick={() => {
                      setUserIdToDelete(u.id);
                      setShowConfirmModal(true);
                    }}
                    $bg="#ff5050"
                  >
                    <MdOutlineDelete />
                  </CustomBtn>
                </td>
              </tr>
            );
          })}
        </tbody>
      </StyledTable>
      <ConfirmModal
        title={t("usersTable.confirmDelete")}
        isOpen={showConfirmModal}
        onClose={() => {
          setShowConfirmModal(false);
        }}
        handleOk={handleDelete}
      />
    </Wrapper>
  );
}
