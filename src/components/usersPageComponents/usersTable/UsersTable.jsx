import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { api } from "../../../utils/api/api";
import {
  SmallText,
  SmallTextSecondary,
  SmallTextShared,
} from "../../common/texts/SmallText";
import {
  NormalText,
  NormalTextPrimaryShared,
  NormalTextSecondary,
  NormalTextShared,
} from "../../common/texts/NormalText";
import { BiMessageSquareEdit } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";
import ConfirmModal from "../../ui/modals/confirmModal/ConfirmModal";
import { Table } from "react-bootstrap";
import PrimaryButton from "../../common/buttons/PrimaryButton";
import { AnimatePresence, motion } from "motion/react";

const Wrapper = styled.div`
  width: 100%;
  select,
  input {
    height: 40px;
    border: none;
    outline: none;
    font-size: var(--min-text);
    border: 1px solid transparent;

    &::placeholder {
      color: ${({ theme }) => theme.colors.textMuted};
    }
    &:focus {
      outline: none;
      box-shadow: none;
      border: 1px solid ${({ theme }) => theme.colors.primaryShared};
    }
  }
`;

const Controls = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  align-items: center;
  position: relative;
  overflow: hidden;
`;

const SearchInput = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  height: 40px;
  font-size: var(--min-text);
  border-radius: 8px;
`;

const FilterSelect = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  font-size: var(--min-text);
  border-radius: 8px;
  height: 40px;
`;

const StyledTable = styled(Table)`
  /* width: 100%; */
  /* border-collapse: collapse; */
  z-index: 1;
  position: relative;
  th,
  td {
    /* background-color: #f4f4f4ad; */
    background-color: #f4f4f48e;
    vertical-align: middle;
    /* text-align: center; */
  }
  td {
    position: relative;
    &:before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      /* background-color: ${({ theme }) => theme.colors.primary}; */
      background-color: blue;
      opacity: 0;
      transition: opacity 0.3s ease;

      pointer-events: none;
    }
  }
  .selected td {
    &:before {
      opacity: 0.2;
      z-index: 1;
      pointer-events: initial;
    }
  }
`;

const Th = styled.th`
  text-align: left;
  padding: 0.6rem;
`;

const CustomBtn = styled.button`
  background-color: ${({ $bg }) => $bg};
  color: #fff;
  height: 100%;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid transparent;
  border-radius: 8px;
  &:hover {
    background-color: transparent;
    color: ${({ $bg }) => $bg};
    border-color: ${({ $bg }) => $bg};
  }
  svg {
  }
`;
const InputCheck = styled.input`
  width: 20px;
  height: 20px;
  cursor: pointer;
  accent-color: ${({ theme }) => theme.colors.primaryShared};
  position: relative;
  z-index: 1;
`;
const DelBtn = styled(motion.div)`
  height: 40px;
  width: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.textTheme};
  transition: color 0.3s;
  font-size: var(--small-text);
  padding: 2px 15px;
  background-color: #ff5050;
  border-radius: 8px;
  position: absolute;
  right: ${({ theme }) => (theme.lang == "en" ? "0" : "auto")};
  left: ${({ theme }) => (theme.lang === "en" ? "auto" : "0")};
  @media (max-width: 768px) {
    height: 40px;
    padding: 2px 7px;
    width: 87px;
    font-size: var(--min-text);
  }
`;
export default function UsersTable() {
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [reloadUsers, setReloadUsers] = useState(false);
  // fetch users once
  useEffect(() => {
    api
      .get("/users")
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
    console.log("Delete user:", userIdToDelete);
    api
      .delete(`/users/${userIdToDelete}`)
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

  const allSelected =
    filtered.length > 0 && selectedUsers.length === filtered.length;

  return (
    <Wrapper>
      <Controls>
        <SearchInput
          type="text"
          placeholder="Search by username…"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <FilterSelect
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="">All roles</option>
          <option value="admin">Admin</option>
          <option value="publisher">Publisher</option>
          <option value="student">Student</option>
        </FilterSelect>
        <AnimatePresence>
          {selectedUsers.length > 0 && (
            <DelBtn
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "1%", opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              exit={{ y: "100%", opacity: 0 }}
            >
              Delete All ({selectedUsers.length})
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
              <NormalTextShared>Username</NormalTextShared>
            </Th>
            <Th>
              <NormalTextShared>Email</NormalTextShared>
            </Th>
            <Th>
              <NormalTextShared>Role</NormalTextShared>
            </Th>
            <Th>
              <NormalTextShared>Actions</NormalTextShared>
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
                      // setSelectedCourseId(course.id);
                      // setIsConfirmModalOpen(true);
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
        title={"Are you sure you want to delete this user?"}
        isOpen={showConfirmModal}
        onClose={() => {
          setShowConfirmModal(false);
        }}
        handleOk={handleDelete}
      />
    </Wrapper>
  );
}
