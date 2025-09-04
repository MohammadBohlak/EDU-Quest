import { AiOutlineDelete } from "react-icons/ai";
import React, { useContext, useEffect, useState } from "react";
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
import ConfirmModal from "../../components/ui/modals/confirmModal/ConfirmModal";
import ModalScientificFields from "../../components/ui/modals/modalScientificFields/ModalScientificFields";
import { DataContext } from "../../context/DataProvider";
import AddVideoModal from "../../components/coursesPageComponents/addVideoModal/AddVideoModal";
import VideoPlayer from "../../components/ui/videoPlayer/VideoPlayer";

const Courses = () => {
  const { courses, setCourses, refresh } = useContext(DataContext);
  const [rawCourses, setRawCourses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalCourseOpen, setIsModalCourseOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [form, setForm] = useState({ name: "", description: "" });
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  // const getCourses = () => {
  //   api
  //     .get("courses")
  //     .then((res) => {
  //       console.log(res.data);
  //       setCourses(res.data);
  //       setRawCourses(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
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

      <div className="d-flex align-items-center gap-5 flex-wrap ">
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
        <div className="w-100">
          <PrimarySharedButton
            onClick={() => setIsModalDeleteOpen(true)}
            style={{ width: "fit-content" }}
          >
            <AiOutlineDelete /> Remove Scientific Field
          </PrimarySharedButton>
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
    </StyledCourses>
  );
};

export default Courses;
