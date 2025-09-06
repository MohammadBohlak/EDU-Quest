import React, { useContext, useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import {
  ButtonScrollContainer,
  StyledButton,
} from "./categoriesButtonList.styles";
import { api } from "../../../utils/api/api";
import { DataContext } from "../../../context/DataProvider";

// مصفوفة ثابتة للمجالات (يمكنك تخصيصها أو تعديلها لاحقاً)
// const categories = [
//   "All",
//   "UI/UX Design",
//   "Data Science",
//   "Development",
//   "Management",
// ];

const CategoriesButtonList = () => {
  // الحالة لتخزين المجال النشط
  const [activeCategory, setActiveCategory] = useState([]);
  const { categories, courses, setCourses, rawCourses } =
    useContext(DataContext);

  const hanldeSelectCategory = (category) => {
    setActiveCategory(category.name);
    console.log(category.id);
    if (category.name === "All") {
      setCourses(rawCourses);
    } else {
      /*
     هون لازم تفلتر الكورسات بناءاً على  
     category_id 
     */

      setCourses(
        rawCourses.filter((course) => {
          return course.category_id == category.id;
        })
      );
    }
  };
  return (
    <ButtonScrollContainer fluid>
      {categories.map((category, index) => (
        <StyledButton
          key={index}
          active={activeCategory === category.name}
          onClick={() => hanldeSelectCategory(category)}
        >
          {category.name}
        </StyledButton>
      ))}
    </ButtonScrollContainer>
  );
};

export default CategoriesButtonList;
