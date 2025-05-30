import React from "react";
import styled from "styled-components";
import { Form, Button } from "react-bootstrap";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

const SignUpContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

const LeftSection = styled.div`
  flex: 1;
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  @media (max-width: 768px) {
    display: none;
  }
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  background: #fff;
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 400px;
`;

const FormTitle = styled.h2`
  margin-bottom: 20px;
  text-align: center;
`;

const InputGroup = styled.div`
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px;
  &:focus-within {
    border-color: #6e8efb;
  }
`;

const IconWrapper = styled.span`
  margin-right: 10px;
  color: #6e8efb;
`;

const StyledInput = styled.input`
  border: none;
  outline: none;
  flex: 1;
`;

const StyledButton = styled(Button)`
  width: 100%;
  background-color: #6e8efb;
  border: none;
  &:hover {
    background-color: #5a7de0;
  }
`;

const SignUp = () => {
  return (
    <SignUpContainer>
      <LeftSection>{/* خلفية فقط */}</LeftSection>
      <RightSection>
        <FormContainer>
          <FormTitle>Create Account</FormTitle>
          <Form>
            <InputGroup>
              <IconWrapper>
                <FaUser />
              </IconWrapper>
              <StyledInput type="text" placeholder="Username" />
            </InputGroup>
            <InputGroup>
              <IconWrapper>
                <FaEnvelope />
              </IconWrapper>
              <StyledInput type="email" placeholder="Email" />
            </InputGroup>
            <InputGroup>
              <IconWrapper>
                <FaLock />
              </IconWrapper>
              <StyledInput type="password" placeholder="Password" />
            </InputGroup>
            <InputGroup>
              <IconWrapper>
                <FaLock />
              </IconWrapper>
              <StyledInput type="password" placeholder="Confirm Password" />
            </InputGroup>
            <StyledButton type="submit" variant="primary">
              Sign Up
            </StyledButton>
          </Form>
        </FormContainer>
      </RightSection>
    </SignUpContainer>
  );
};

export default SignUp;
