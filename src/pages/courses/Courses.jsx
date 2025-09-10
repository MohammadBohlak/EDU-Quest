import { AiOutlineDelete } from "react-icons/ai";
import React, { use, useContext, useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import {
  MainHeading,
  MainHeadingPrimaryShared,
} from "../../components/common/texts/MainHeading";
import PrimaryButton, {
  PrimarySharedButton,
} from "../../components/common/buttons/PrimaryButton";
import { IoIosAddCircleOutline } from "react-icons/io";

import CoursesList from "./CoursesList";
import CategoriesButtonList from "./categoriesButtonList/CategoriesButtonList";

import {
  CircleImg,
  CourseBody,
  CourseCard,
  CourseFooter,
  CourseImage,
  CourseInfo,
  StyledCoursesList,
  CourseTitle,
  InformationAccount,
  InputContainer,
  SearchInput,
  StyledCourses,
  TopCourses,
  UserName,
} from "./courses.styles";
import {
  NormalText,
  NormalTextShared,
} from "../../components/common/texts/NormalText";
import { SmallTextShared } from "../../components/common/texts/SmallText";
import AddFieldModal from "../../components/coursesPageComponents/addFieldModal/AddFieldModal";
import { api } from "../../utils/api/api";
import AddCourseModal from "../../components/coursesPageComponents/AddCuorseModal";
import ConfirmModal from "../../components/ui/modals/confirmModal/ConfirmModal";
import ModalScientificFields from "../../components/ui/modals/modalScientificFields/ModalScientificFields";
import { DataContext } from "../../context/DataProvider";
import AddVideoModal from "../../components/coursesPageComponents/addVideoModal/AddVideoModal";
import VideoPlayer from "../../components/ui/videoPlayer/VideoPlayer";
import EditCourseModal from "../../components/coursesPageComponents/editCourseModal/EditCourseModal";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const CustomBtn = styled.button`
  width: 50px;
  height: 50px;
  background-color: ${({ $bg }) => $bg};
  color: #fff;
  font-size: var(--normal-text);
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
`;

const Courses = () => {
  const { t } = useTranslation();
  const { courses, setCourses, refresh, rawCourses } = useContext(DataContext);
  // const [rawCourses, setRawCourses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalCourseOpen, setIsModalCourseOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [srch, setSrch] = useState("");
  const [form, setForm] = useState({ name: "", description: "" });
  const [displayCourses, setDisplayCourses] = useState([]);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  // const [role, setRole] = useState("admin");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isPublisher, setIsPublisher] = useState(false);

  useEffect(() => {
    const userRole = JSON.parse(localStorage.getItem("user")).role;
    // setRole(userRole);
    setIsPublisher(userRole === "publisher");
    setIsAdmin(userRole === "admin");
  }, [courses]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    // getCourses();
    refresh();
  }, []);
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (isAdmin)
      setDisplayCourses(
        courses.filter((course) => course.title.includes(srch))
      );
    else if (isPublisher)
      setDisplayCourses(
        courses.filter(
          (course) =>
            course.title.includes(srch) &&
            course.publisher_name == userData.name
        )
      );
  }, [srch, courses, isAdmin, isPublisher]);
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (isAdmin) setDisplayCourses(courses);
    else if (isPublisher)
      setDisplayCourses(
        courses.filter((e) => e.publisher_name == userData.name)
      );
  }, [courses, isAdmin, isPublisher]);
  return (
    <StyledCourses>
      <TopCourses>
        <InputContainer>
          <SearchInput
            value={srch}
            onChange={(e) => setSrch(e.target.value)}
            placeholder={t("coursesPage.searchPlaceHolder")}
          />
        </InputContainer>
      </TopCourses>

      {isAdmin && <MainHeading>{t("coursesPage.title")}</MainHeading>}
      {isPublisher && (
        <MainHeading>{t("coursesPage.publishertitle")}</MainHeading>
      )}
      <div className="d-flex align-items-center gap-5 flex-wrap ">
        {isAdmin && (
          <PrimaryButton
            style={{
              width: "fit-content",
              height: "42px",
              padding: "9px 27px",
            }}
            onClick={openModal}
          >
            <IoIosAddCircleOutline /> {t("coursesPage.add.scientific")}
          </PrimaryButton>
        )}
        <PrimaryButton
          onClick={() => setIsModalCourseOpen(true)}
          style={{ width: "fit-content", height: "42px", padding: "9px 27px" }}
        >
          <IoIosAddCircleOutline /> {t("coursesPage.add.course")}
        </PrimaryButton>
        {isAdmin && (
          <div className="w-100">
            <PrimaryButton
              onClick={() => setIsModalDeleteOpen(true)}
              style={{
                width: "fit-content",
                height: "42px",
                padding: "9px 27px",
              }}
            >
              <AiOutlineDelete /> {t("coursesPage.removeScientific")}
            </PrimaryButton>
          </div>
        )}
      </div>

      <CategoriesButtonList
        rawCourses={rawCourses}
        courses={courses}
        setCourses={setCourses}
      />
      <CoursesList courses={displayCourses} />

      {/* extracted modal component */}
      <AddFieldModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        onClose={closeModal}
        form={form}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <AddCourseModal
        isOpen={isModalCourseOpen}
        setIsOpen={setIsModalCourseOpen}
        onClose={() => setIsModalCourseOpen(false)}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <ModalScientificFields
        isOpen={isModalDeleteOpen}
        onClose={() => setIsModalDeleteOpen(false)}
      />
      <Outlet />
    </StyledCourses>
  );
};

export default Courses;
