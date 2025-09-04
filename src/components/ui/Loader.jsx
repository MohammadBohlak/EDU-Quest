import React from "react";
import styled from "styled-components";
const StyledLoader = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  pointer-events: none;
  .loader {
    width: 48px;
    height: 48px;
    border: 5px solid ${({ theme }) => theme.colors.primaryShared};
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
const Loader = () => {
  return (
    <StyledLoader>
      <div className="loader"></div>
    </StyledLoader>
  );
};

export default Loader;
