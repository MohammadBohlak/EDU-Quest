import { Col } from "react-bootstrap";
import styled from "styled-components";

export const StyledAboutUs = styled.div`
  margin-top: 50px;
  @media (max-width: 768px) {
    text-align: center;
  }
`;

export const AboutRight = styled(Col)`
  display: flex;
  justify-content: flex-end;
  img {
    border-radius: 20px;
    max-width: 100%;
    object-fit: cover;
  }
  @media (max-width: 768px) {
    justify-content: center;
    margin-top: 50px;
  }
`;
