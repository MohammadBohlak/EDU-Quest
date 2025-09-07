// src/components/users/UsersTable.jsx

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { api } from "../../../utils/api/api";
import ConfirmModal from "../../ui/modals/confirmModal/ConfirmModal";
import { Table } from "react-bootstrap";

const Wrapper = styled.div`
  width: 100%;
`;

const Controls = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  align-items: center;
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

/* نستخدم accent-color لدعم لون الخلفية عند التحقق */
const InputCheck = styled.input.attrs({ type: "checkbox" })`
  width: 50%;
  height: 50%;
  cursor: pointer;
  accent-color: var(--primary-shared);
`;

const StyledTable = styled(Table)`
  tbody tr.selected {
    background-color: #e3f2fd;
  }
`;

const ActionBtn = styled.button`
  background: none;
  border: none;
  padding: 0.2rem;
  margin: 0 0.2rem;
  cursor: pointer;
  color: ${({ danger }) =>
    danger ? "var(--danger-shared)" : "var(--primary-shared)"};

  &:hover {
    opacity: 0.8;
  }
`;

const DeleteAllBtn = styled.button`
  background-color: var(--danger-shared);
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  margin-left: auto;

  &:hover {
    opacity: 0.9;
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

  useEffect(() => {
    api
      .get("/users")
      .then((res) => setUsers(res.data))
      .catch(console.error);
  }, [reloadUsers]);

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
    setSelectedUsers((prev) =>
      prev.filter((id) => list.some((u) => u.id === id))
    );
  }, [users, roleFilter, searchTerm]);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedUsers(filtered.map((u) => u.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelect = (id) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const allSelected =
    filtered.length > 0 && selectedUsers.length === filtered.length;

  const handleDelete = () => {
    api
      .delete(`/users/${userIdToDelete}`)
      .then(() => setReloadUsers((p) => !p))
      .catch(console.error);
    setShowConfirmModal(false);
  };

  const handleDeleteAll = () => {
    console.log("Deleting all:", selectedUsers);
    // مثال: إذا كان لديك API لحذف دفعة
    // api.post("/users/bulk-delete", { ids: selectedUsers }).then(...)
    setReloadUsers((p) => !p);
    setSelectedUsers([]);
  };

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

        {selectedUsers.length > 1 && (
          <DeleteAllBtn onClick={handleDeleteAll}>Delete All</DeleteAllBtn>
        )}
      </Controls>

      <StyledTable responsive hover>
        <thead>
          <tr>
            <th>
              <InputCheck checked={allSelected} onChange={handleSelectAll} />
            </th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((u) => {
            const isSelected = selectedUsers.includes(u.id);
            return (
              <tr key={u.id} className={isSelected ? "selected" : ""}>
                <td>
                  <InputCheck
                    checked={isSelected}
                    onChange={() => handleSelect(u.id)}
                  />
                </td>
                <td>{u.user_name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>
                  <ActionBtn
                    onClick={() => {
                      setUserIdToDelete(u.id);
                      setShowConfirmModal(true);
                    }}
                    danger
                  >
                    <FiTrash2 />
                  </ActionBtn>
                </td>
              </tr>
            );
          })}
        </tbody>
      </StyledTable>

      <ConfirmModal
        title="Are you sure you want to delete this user?"
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        handleOk={handleDelete}
      />
    </Wrapper>
  );
}
