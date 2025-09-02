import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import {
  ButtonScrollContainer,
  StyledButton,
} from "./categoriesButtonList.styles";
import { api } from "../../../utils/api/api";

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
  const [categories, setCategories] = useState(["All"]);
  useEffect(() => {
    api
      .get("categories")
      .then((res) => {
        setCategories([{ name: "All" }, ...res.data.categories]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <ButtonScrollContainer fluid>
      {categories.map((category, index) => (
        <StyledButton
          key={index}
          active={activeCategory === category.name}
          onClick={() => setActiveCategory(category.name)}
          variant="outline-primary"
        >
          {category.name}
        </StyledButton>
      ))}
    </ButtonScrollContainer>
  );
};

export default CategoriesButtonList;
