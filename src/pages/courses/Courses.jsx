import React, { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { MainHeadingPrimaryShared } from "../../components/common/texts/MainHeading";
import { PrimarySharedButton } from "../../components/common/buttons/PrimaryButton";
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
import { NormalTextShared } from "../../components/common/texts/NormalText";
import { SmallTextShared } from "../../components/common/texts/SmallText";
import AddFieldModal from "../../components/coursesPageComponents/addFieldModal/AddFieldModal";
import { api } from "../../utils/api/api";
import AddCourseModal from "../../components/coursesPageComponents/AddCuorseModal";

const Courses = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalCourseOpen, setIsModalCourseOpen] = useState(false);
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
    console.log(form);
  };

  return (
    <StyledCourses>
      <TopCourses>
        <InputContainer>
          <SearchInput placeholder="Search for courses" />
        </InputContainer>
        <InformationAccount>
          <FaRegUserCircle />
          <UserName>Mohammad_Bohlak</UserName>
        </InformationAccount>
      </TopCourses>

      <MainHeadingPrimaryShared>Courses</MainHeadingPrimaryShared>

      <div className="d-flex align-items-center gap-5">
        <PrimarySharedButton
          style={{ width: "fit-content" }}
          onClick={openModal}
        >
          <IoIosAddCircleOutline /> Add Scientific Field
        </PrimarySharedButton>

        <PrimarySharedButton
          onClick={() => setIsModalCourseOpen(true)}
          style={{ width: "fit-content" }}
        >
          <IoIosAddCircleOutline /> Add Course
        </PrimarySharedButton>
      </div>

      <CategoriesButtonList />
      <CoursesList />

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
        onClose={() => setIsModalCourseOpen(flase)}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </StyledCourses>
  );
};

export default Courses;
