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
import {
  NormalTextPrimaryShared,
  NormalTextShared,
} from "../../components/common/texts/NormalText";
import { PrimarySharedButton } from "../../components/common/buttons/PrimaryButton";
import { api } from "../../utils/api/api";
import styled from "styled-components";
import ConfirmModal from "../../components/ui/modals/confirmModal/ConfirmModal";
import { DataContext } from "../../context/DataProvider";
import AddVideoModal from "../../components/coursesPageComponents/addVideoModal/AddVideoModal";
import { title } from "motion/react-client";
import { Link } from "react-router-dom";
import EditCourseModal from "../../components/coursesPageComponents/editCourseModal/EditCourseModal";
import { SmallTextShared } from "../../components/common/texts/SmallText";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const CoursesList = ({ courses }) => {
  const { setCourses, refresh } = useContext(DataContext);
  const [courseSelected, SetCourseSelected] = useState(null);
  const [isModalvideoOpen, setIsModalVideoOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [isModalEditCourseOpen, setIsModalEditCourseOpen] = useState(false);

  const [user, setUser] = useState({});
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);
  }, [courses]);
  useEffect(() => {}, []);
  const handleDeleteCourse = (id) => {
    const token = localStorage.getItem("token");
    api
      .delete(`courses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
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
  const { t } = useTranslation();
  return (
    <>
      <StyledCoursesList>
        {courses.map((course) => (
          <CourseCard key={course.id}>
            <CourseImage src={ui} alt={course.title} />
            <CourseBody>
              <CourseTitle $lang={course.lang}>
                <CourseInfo className="flex-column align-items-start  gap-3">
                  <NormalTextPrimaryShared>
                    {course.publisher_name}
                  </NormalTextPrimaryShared>
                  <NormalTextPrimaryShared style={{}}>
                    {course.title}
                  </NormalTextPrimaryShared>
                </CourseInfo>
                <CourseInfo>
                  <SmallTextShared
                    style={{
                      width: "100%",
                      whiteSpace: "normal",
                      wordBreak: "break-word",
                      fontWeight: "normal",
                    }}
                  >
                    {course.description}
                  </SmallTextShared>
                </CourseInfo>
              </CourseTitle>

              <CourseFooter>
                <Link to={`/dashboard/courses/${course.id}`}>
                  <PrimarySharedButton
                    style={{ width: "fit-content", padding: "2px 8px" }}
                  >
                    {t("coursesList.showCourse")}
                  </PrimarySharedButton>
                </Link>
                {console.log(user.user_name == course.publisher_name)}
                {(user.user_name == course.publisher_name ||
                  user.role == "admin") && (
                  <div className="d-flex align-items-center gap-3">
                    {user.user_name == course.publisher_name && (
                      <CustomBtn
                        onClick={() => {
                          SetCourseSelected(course);
                          setIsModalVideoOpen(true);
                        }}
                        $bg="#3b80ff"
                      >
                        <AiOutlineAppstoreAdd />
                      </CustomBtn>
                    )}
                    <Link to={`edit/${course.id}`}>
                      <CustomBtn
                        onClick={() => {
                          SetCourseSelected(course);
                          setIsModalEditCourseOpen(true);
                        }}
                        $bg="#28b628"
                      >
                        <BiMessageSquareEdit />
                      </CustomBtn>
                    </Link>
                    {user.role == "admin" && (
                      <CustomBtn
                        onClick={() => {
                          setSelectedCourseId(course.id);
                          setIsConfirmModalOpen(true);
                        }}
                        $bg="#ff5050"
                      >
                        <MdOutlineDelete />
                      </CustomBtn>
                    )}
                  </div>
                )}
              </CourseFooter>
            </CourseBody>
          </CourseCard>
        ))}
      </StyledCoursesList>
      <ConfirmModal
        title={t("coursesList.confirmMessage")}
        isOpen={isConfirmModalOpen}
        handleOk={() => handleDeleteCourse(selectedCourseId)}
        onClose={() => setIsConfirmModalOpen(false)}
      />

      <AddVideoModal
        isOpen={isModalvideoOpen}
        setIsOpen={setIsModalVideoOpen}
        handleSubmit={handleSubmit}
        courseSelected={courseSelected}
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
