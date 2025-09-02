import { useState } from "react";
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
import { useEffect } from "react";
import { api } from "../../utils/api/api";

const CoursesList = () => {
  const courses1 = [
    {
      id: 1,
      instructor: "د. أحمد السعيد",
      description: "مقدمة في تصميم واجهات المستخدم",
      image: ui,
      lang: "ar",
      videoCount: 12,
    },
    {
      id: 2,
      instructor: "Dr. John Smith",
      description: "Data Science Fundamentals",
      image: ui,
      lang: "en",
      videoCount: 15,
    },
    {
      id: 3,
      instructor: "د. ليلى عبد الرحمن",
      description: "تطوير التطبيقات باستخدام React",
      image: ui,
      lang: "ar",
      videoCount: 20,
    },
    {
      id: 4,
      instructor: "Prof. Emily Johnson",
      description: "Advanced Machine Learning Techniques",
      image: ui,
      lang: "en",
      videoCount: 18,
    },
    {
      id: 5,
      instructor: "د. سامي القحطاني",
      description: "إدارة المشاريع التقنية",
      image: ui,
      lang: "ar",
      videoCount: 10,
    },
    {
      id: 6,
      instructor: "Dr. Michael Brown",
      description: "Full-Stack Web Development",
      image: ui,
      lang: "en",
      videoCount: 25,
    },
    {
      id: 7,
      instructor: "د. هند الزهراني",
      description: "أساسيات تحليل البيانات بلغة Python",
      image: ui,
      lang: "ar",
      videoCount: 14,
    },
    {
      id: 8,
      instructor: "Prof. Robert Wilson",
      description: "Cyber Security Essentials",
      image: ui,
      lang: "en",
      videoCount: 16,
    },
  ];
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    api
      .get("courses")
      .then((res) => {
        console.log(res.data);
        setCourses(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
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
                </CourseInfo>
                <CourseInfo>
                  <NormalTextPrimaryShared>
                    {/* {course.videoCount} */}
                  </NormalTextPrimaryShared>
                  {/* <NormalTextShared>Videos</NormalTextShared> */}
                </CourseInfo>
              </CourseTitle>

              <CourseFooter>
                <PrimarySharedButton variant="primary">
                  Details
                </PrimarySharedButton>
              </CourseFooter>
            </CourseBody>
          </CourseCard>
        ))}
      </StyledCoursesList>
    </>
  );
};

export default CoursesList;
