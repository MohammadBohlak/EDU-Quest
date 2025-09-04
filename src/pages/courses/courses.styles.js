import { Card } from "react-bootstrap";
import styled from "styled-components";

export const StyledCourses = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;
export const TopCourses = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
export const InputContainer = styled.div`
  width: 50%;
  height: 40px;
`;
export const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  border: 1px solid transparent;
  outline: none;
  padding: 0 10px;
  font-size: var(--min-text);
  &:focus {
    border: 1px solid #ccc;
  }
`;
export const InformationAccount = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-size: var(--normal-text);
`;
export const UserName = styled.div``;
// export const Filters = styled.div`

// `;
export const CourseCard = styled(Card)`
  width: 100%;
  max-width: 350px;
  border: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  background-color: ${({ theme }) =>
    theme.colors.backgroundMutedShared || "#f8f9fa"};
  border-radius: 25px;
  padding: 15px;
  &:hover {
    transform: scale(1.02);
  }
`;

export const CourseImage = styled(Card.Img)`
  /* height: 200px; */
  width: 100%;
  object-fit: cover;
  border-radius: 25px;
`;

export const CourseBody = styled(Card.Body)`
  padding: 10px 0px;
`;

export const CircleImg = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: inline-block;
  background-color: gray;
  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
  }
`;
export const CourseTitle = styled(Card.Title)`
  display: flex;
  /* justify-content: space-between; */
  /* align-items: center ; */
  flex-wrap: wrap;
  flex-direction: column;
  row-gap: 10px;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;
export const CourseInfo = styled.div`
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  column-gap: 5px;
`;

export const CourseFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const StyledCoursesList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
`;
