import { AiOutlineDelete } from "react-icons/ai";
import React, { useContext, useEffect, useState } from "react";
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
  const { courses, setCourses, refresh, rawCourses } = useContext(DataContext);
  // const [rawCourses, setRawCourses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalCourseOpen, setIsModalCourseOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [srch, setSrch] = useState("");
  const [form, setForm] = useState({ name: "", description: "" });
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // api.post("categories").then((res) => {
    //   console.log(res.data);
    // });
    // console.log(form);
  };
  useEffect(() => {
    // getCourses();
    refresh();
  }, []);
  useEffect(() => {
    setCourses(rawCourses.filter((course) => course.title.includes(srch)));
  }, [srch]);
  return (
    <StyledCourses>
      <TopCourses>
        <InputContainer>
          <SearchInput
            value={srch}
            onChange={(e) => setSrch(e.target.value)}
            placeholder="Search for courses"
          />
        </InputContainer>
        <NormalText>
          <InformationAccount>
            <FaRegUserCircle />
            <NormalText>Mohammad_Bohlak</NormalText>
          </InformationAccount>
        </NormalText>
      </TopCourses>

      <MainHeading>Courses</MainHeading>

      <div className="d-flex align-items-center gap-5 flex-wrap ">
        <PrimaryButton
          style={{ width: "fit-content", height: "42px", padding: "9px 27px" }}
          onClick={openModal}
        >
          <IoIosAddCircleOutline /> Add Scientific Field
        </PrimaryButton>

        <PrimaryButton
          onClick={() => setIsModalCourseOpen(true)}
          style={{ width: "fit-content", height: "42px", padding: "9px 27px" }}
        >
          <IoIosAddCircleOutline /> Add Course
        </PrimaryButton>
        <div className="w-100">
          <PrimaryButton
            onClick={() => setIsModalDeleteOpen(true)}
            style={{
              width: "fit-content",
              height: "42px",
              padding: "9px 27px",
            }}
          >
            <AiOutlineDelete /> Remove Scientific Field
          </PrimaryButton>
        </div>
      </div>

      <CategoriesButtonList
        rawCourses={rawCourses}
        courses={courses}
        setCourses={setCourses}
      />
      <CoursesList
        //  getCourses={getCourses}
        courses={courses}
      />

      {/* extracted modal component */}
      <AddFieldModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        onClose={closeModal}
        form={form}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        // getCourses={getCourses}
      />
      <AddCourseModal
        isOpen={isModalCourseOpen}
        setIsOpen={setIsModalCourseOpen}
        onClose={() => setIsModalCourseOpen(false)}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        // getCourses={getCourses}
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
