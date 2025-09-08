import { Button } from "react-bootstrap";
import styled from "styled-components";
import img from "../../assets/images/ui.png";

export const CustomBtn = styled.button`
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

export const StyledVideos = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  width: 100%;
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;
export const CardImage = styled.div`
  height: 200px;
  background-image: url(${img});
  background-size: 100% 100%;
  position: relative;
  overflow: hidden;
  span {
    position: absolute;
    width: 200px;
    height: 50px;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--normal-text);
    color: var(--primary-shared);
    font-weight: bold;
    rotate: -45deg;
    top: 00%;
    left: 0%;
    transform: translate(-29%, -69%);
  }
`;
export const ShowBtn = styled(Button)`
  background-color: var(--primary-shared);
  border-color: var(--primary-shared);
  font-size: var(--small-text);
  border-width: 2px;
  height: 50px;
  &:hover {
    background-color: white;
    color: var(--primary-shared);
    border-color: var(--primary-shared);
  }
`;
