import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { ButtonScrollContainer, StyledButton } from './categoriesButtonList.styles';

// مصفوفة ثابتة للمجالات (يمكنك تخصيصها أو تعديلها لاحقاً)
const categories = ['All', 'UI/UX Design', 'Data Science', 'Development', 'Management'];

const CategoriesButtonList = () => {
  // الحالة لتخزين المجال النشط
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  return (
    <ButtonScrollContainer fluid>
      {categories.map((category, index) => (
        <StyledButton
          key={index}
          active={activeCategory === category}
          onClick={() => setActiveCategory(category)}
          variant="outline-primary"
        >
          {category}
        </StyledButton>
      ))}
    </ButtonScrollContainer>
  );
};

export default CategoriesButtonList;
