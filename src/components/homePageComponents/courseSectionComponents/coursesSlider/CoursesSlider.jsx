import React, { useState, useEffect } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

import ui from "../../../../assets/images/ui.jpg";

import { CourseBody, CourseCard, CourseImage, StyledSwiperContainer } from './coursesSlider.styles';
import { NormalTextPrimaryShared, NormalTextShared } from '../../../common/texts/NormalText';
import { SmallTextShared } from '../../../common/texts/SmallText';
import { PrimarySharedButton } from '../../../common/buttons/PrimaryButton';

// مصفوفة ثابتة للكورسات، يمكن تعديلها لاحقاً لتصبح بيانات من السيرفر
const courses = [
  { id: 1, instructor: "د. أحمد السعيد", description: "مقدمة في تصميم واجهات المستخدم", image: ui, lang: "ar", videoCount: 12 },
  { id: 2, instructor: "Dr. John Smith", description: "Data Science Fundamentals", image: ui, lang: "en", videoCount: 15 },
  { id: 3, instructor: "د. ليلى عبد الرحمن", description: "تطوير التطبيقات باستخدام React", image: ui, lang: "ar", videoCount: 20 },
  { id: 4, instructor: "Prof. Emily Johnson", description: "Advanced Machine Learning Techniques", image: ui, lang: "en", videoCount: 18 },
  { id: 5, instructor: "د. سامي القحطاني", description: "إدارة المشاريع التقنية", image: ui, lang: "ar", videoCount: 10 },
  { id: 6, instructor: "Dr. Michael Brown", description: "Full-Stack Web Development", image: ui, lang: "en", videoCount: 25 },
  { id: 7, instructor: "د. هند الزهراني", description: "أساسيات تحليل البيانات بلغة Python", image: ui, lang: "ar", videoCount: 14 },
  { id: 8, instructor: "Prof. Robert Wilson", description: "Cyber Security Essentials", image: ui, lang: "en", videoCount: 16 }
];


// دالة لتقسيم المصفوفة إلى chunks
const chunkArray = (array, chunkSize) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
};

// مكون الـ CoursesSlider
const CoursesSlider = () => {
  // state لتتبع حجم الشاشة
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // تحديد حجم التجميع وعدد الأعمدة بناءً على حجم الشاشة
  let chunkSize, columns;
  if (windowWidth >= 1200) {
    chunkSize = 6;
    columns = 3;  // grid: 3 أعمدة، وبذلك سيكون لدينا 2 صف (6/3)
  } else if (windowWidth >= 768) {
    chunkSize = 4;
    columns = 2;  // grid: 2 أعمدة، وبالتالي صفان (4/2)
  } else {
    chunkSize = 1;
    columns = 1;
  }

  const groupedCourses = chunkArray(courses, chunkSize);
  // حساب عدد الصفوف (ثابتة حسب تجزئة الشريحة؛ إذا كانت الشريحة غير مكتملة سنظل نستخدم نفس grid-template)
  const rows = chunkSize / columns;

  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + '</span>';
    },
  };
  return (
    <StyledSwiperContainer>
      <Swiper
      pagination={pagination}
        modules={[Navigation, Pagination]}
        navigation={true}
        spaceBetween={20}
        slidesPerView={1} // كل شريحة تعرض مجموعة (chunk) واحدة
      >
        {groupedCourses.map((group, index) => (
          <SwiperSlide key={index}>
            <div
              style={{
                display: 'grid',
                gap: '50px',
                gridTemplateColumns: `repeat(${columns}, 1fr)`,
                // نحدد عدد الصفوف بشكل ثابت بحيث إذا كانت المجموعة غير مكتملة يتم خلق مساحة فارغة
                gridTemplateRows: `repeat(${rows}, auto)`, 
                padding: "20px 0" 
              }}
            >
              {group.map(course => (
                <CourseCard key={course.id}>
                  <CourseImage variant="top" src={course.image} alt={course.title} />
                  <CourseBody>

                      <CourseTitle $lang = {course.lang}>
                        <CourseInfo>
                         <CircleImg> </CircleImg>
                         <NormalTextPrimaryShared>
                         {course.instructor}
                         </NormalTextPrimaryShared>
                        </CourseInfo>
                        <CourseInfo>
                          <NormalTextPrimaryShared>
                            {course.videoCount}
                          </NormalTextPrimaryShared>
                          <NormalTextShared>
                            Videos
                          </NormalTextShared>
                        </CourseInfo>
                      </CourseTitle>
                      
                    <Card.Text>
                      <SmallTextShared>
                      {course.description}
                      </SmallTextShared>
                    </Card.Text>
                    <CourseFooter>
                    <NormalTextShared>150k</NormalTextShared>
                    <PrimarySharedButton variant="primary">Details</PrimarySharedButton>
                    </CourseFooter>
                  </CourseBody>
                </CourseCard>
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </StyledSwiperContainer>
  );
};

export const CircleImg = styled.div`
  width: 70px ; 
  height: 70px ; 
  border-radius : 50%; 
  display: inline-block;
  background-color: gray;
  @media (max-width: 768px){
    width: 50px ; 
    height: 50px ; 
}
` 
export const CourseTitle = styled(Card.Title)`
display: flex;
/* justify-content: space-between; */
/* align-items: center ; */
flex-wrap: wrap;
flex-direction: column;
row-gap: 10px; 

@media (max-width: 768px){
  justify-content: center;
}
`
export const CourseInfo = styled.div`
  display: flex;
/* justify-content: space-between; */
align-items: center ;
column-gap: 5px;
`

export const CourseFooter = styled.div`
  display: flex; 
  justify-content: space-between ; 
`
export default CoursesSlider;
