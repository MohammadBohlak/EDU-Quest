import { Col } from "react-bootstrap";
import styled from "styled-components";

export const HeroSection = styled.section`
  padding-top: var(--padding-top);
  padding-bottom: 100px;
  background: ${({ theme }) => theme.colors.backgroundSections};
`;

export const LeftHero = styled(Col)`
  display: flex;
  flex-direction: column;
  /* align-items: baseline; */
  row-gap: 50px;
  @media (max-width: 1200px) {
    justify-content: center !important;
    align-items: center;
    text-align: center;
  }
`;
export const RighttHero = styled(Col)`
  max-width: 95%;
  display: flex;
  justify-content: flex-end;
  @media (max-width: 1200px){
    justify-content: center;
  }
  position: relative;
  img {
    max-width: 80%;
  }
`;
export const ConImg = styled.div`
  @media (max-width: 1200px) {
    margin-top: 100px;
  }
  width: 485px;
  height: 485px;
  @media (max-width: 768px) {
    width: 300px;
    height: 300px;
    --circle: 80px;
  }
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 0;
  &::before {
    position: absolute;
    content: "";
    height: 22px;
    width: 140%;
    background-color: inherit;
    rotate: -36.64deg;
    z-index: -1;
    transform: translateY(-20px);
  }
  &::after {
    position: absolute;
    content: "";
    height: 22px;
    width: 120%;
    background-color: inherit;
    rotate: -36.64deg;
    z-index: -1;
    transform: translateY(20px);
  }

  --circle: 120px;
  .c {
    width: var(--circle);
    aspect-ratio: 1 / 1;
    position: absolute;
    background-color: inherit;
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .c2 {
    right: 10px;
    bottom: -80px;
  }
  .c1 {
    left: 10px;
    top: -80px;
  }
`;
export const Buttons = styled.div`
  display: flex;
  gap: 20px;
`;