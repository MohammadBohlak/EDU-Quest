import { MdOutlineDelete } from "react-icons/md";
import { BiMessageSquareEdit } from "react-icons/bi";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { useContext, useEffect, useState } from "react";
import ui from "../../assets/images/ui.png";
import {
  CircleImg,
  CourseBody,
  CourseCard,
  CourseFooter,
  CourseImage,
  CourseInfo,
  CourseTitle,
  StyledCoursesList,
} from "./courses.styles";
import { NormalTextPrimaryShared } from "../../components/common/texts/NormalText";
import { PrimarySharedButton } from "../../components/common/buttons/PrimaryButton";
import { api } from "../../utils/api/api";
import styled from "styled-components";
import ConfirmModal from "../../components/ui/modals/confirmModal/ConfirmModal";
import { DataContext } from "../../context/DataProvider";
import AddVideoModal from "../../components/coursesPageComponents/addVideoModal/AddVideoModal";
import { title } from "motion/react-client";
import { Link } from "react-router-dom";

const CoursesList = () => {
  const { courses, setCourses, refresh } = useContext(DataContext);
  const [courseSelected, SetCourseSelected] = useState(null);
  const [isModalvideoOpen, setIsModalVideoOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  useEffect(() => {
    // refresh();
  }, [courses]);
  const handleDeleteCourse = (id) => {
    api
      .delete(`courses/${id}`)
      .then(() => {
        console.log("OK");
        setIsConfirmModalOpen(false);
        refresh();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const formatDuration = (h, m, s) => {
    const pad = (val) => String(val).padStart(2, "0");
    return `${pad(h)}:${pad(m)}:${pad(s)}`;
  };

  const handleSubmit = (values) => {
    const { hour_duration, minute_duration, second_duration, ...rest } = values;
    const formattedDuration = formatDuration(
      hour_duration,
      minute_duration,
      second_duration
    );

    const payload = {
      ...rest,
      duration: formattedDuration,
    };

    // console.log("Submitted video data:", payload);
    // console.log("course Selected is", courseSelected);
    let data = {
      course_id: courseSelected.id,
      video_url: payload.url,
      title: payload.title,
      description: payload.description,
      duration: payload.duration,
      video_order: payload.video_order,
    };
    console.log(data);
    api
      .post(`courses/${courseSelected.id}/videos`, data)
      .then((res) => {
        console.log(res.data);
        setIsModalVideoOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <StyledCoursesList>
        {courses.map((course) => (
          <CourseCard key={course.id}>
            <CourseImage src={ui} alt={course.title} />
            <CourseBody>
              <CourseTitle $lang={course.lang}>
                <CourseInfo>
                  {/* <CircleImg> </CircleImg> */}
                  <NormalTextPrimaryShared>
                    {/* {course.instructor} */}
                  </NormalTextPrimaryShared>
                  <NormalTextPrimaryShared>
                    {course.title}
                  </NormalTextPrimaryShared>
                  <NormalTextPrimaryShared>
                    {/* {course.description} */}
                  </NormalTextPrimaryShared>
                </CourseInfo>
                <CourseInfo>
                  <NormalTextPrimaryShared>
                    {/* {course.videoCount} */}
                  </NormalTextPrimaryShared>
                  {/* <NormalTextShared>Videos</NormalTextShared> */}
                </CourseInfo>
              </CourseTitle>

              <CourseFooter>
                <Link to={`/dashboard/courses/${course.id}`}>
                  <PrimarySharedButton
                    style={{ width: "fit-content", padding: "2px 8px" }}
                  >
                    Show Course
                  </PrimarySharedButton>
                </Link>
                <div className="d-flex align-items-center gap-3">
                  <CustomBtn
                    onClick={() => {
                      SetCourseSelected(course);
                      setIsModalVideoOpen(true);
                    }}
                    $bg="#3b80ff"
                  >
                    <AiOutlineAppstoreAdd />
                  </CustomBtn>
                  <CustomBtn $bg="#28b628">
                    <BiMessageSquareEdit />
                  </CustomBtn>
                  <CustomBtn
                    onClick={() => {
                      setSelectedCourseId(course.id);
                      setIsConfirmModalOpen(true);
                    }}
                    $bg="#ff5050"
                  >
                    <MdOutlineDelete />
                  </CustomBtn>
                </div>
              </CourseFooter>
            </CourseBody>
          </CourseCard>
        ))}
      </StyledCoursesList>
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        handleOk={() => handleDeleteCourse(selectedCourseId)}
        onClose={() => setIsConfirmModalOpen(false)}
      />
      <AddVideoModal
        isOpen={isModalvideoOpen}
        setIsOpen={setIsModalVideoOpen}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

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

export default CoursesList;
