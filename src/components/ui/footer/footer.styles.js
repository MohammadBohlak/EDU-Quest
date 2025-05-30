import styled from "styled-components";
import PrimaryButton from "../../common/buttons/PrimaryButton";
import { Form } from "react-bootstrap";

export const FooterContainer = styled.footer`
  background: #222;
  color: #f1f1f1;
  padding: 74px 40px;
`;

export const TopSection = styled.div`
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 30px;
  margin-bottom: 30px;
  @media (max-width: 768px) {
    text-align: center;
  }
`;

export const Logo = styled.div`
  /* width: 150px ;  */
  @media (max-width: 992px){
    width: 50%;
    margin: auto;
  }
  @media (max-width: 500px){
    width: 70%;
  }
  img{
    max-width: 100%;
  }
`;

export const Description = styled.p`
  font-size: 14px;
  line-height: 1.6;
`;

export const FooterLinkTitle = styled.h5`
  font-size: 24px;
  margin-bottom: 20px;
`;

export const FooterLink = styled.a`
  color: #f1f1f1;
  font-size: 14px;
  display: block;
  margin-bottom: 10px;
  text-decoration: none;
  &:hover {
    color: ${({theme})=> theme.colors.primaryShared};
  }
`;

export const SocialIcons = styled.div`
  display: flex;
  gap: 15px;
`;

export const SocialIcon = styled.a`
  color: ${({theme}) => theme.colors.primaryShared};
  font-size: 20px;
  width:50px ; 
  height:50px ; 
  text-align: center;
  border: 4px solid ${({theme}) => theme.colors.primaryShared};
  border-radius: 50%;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    color: white;
  }
`;

export const BottomSection = styled.div`
  text-align: center;
  font-size: 13px;
`;

export const Input = styled(Form.Control)`
  border-radius: 15px;
  padding: 16px 20px;
  font-size: var(--small-text);
`
export const StyledPrimaryButton = styled(PrimaryButton)`
  background-color: ${({theme}) => theme.colors.primaryShared};
  border-radius: 15px;
  border: 1px solid white; 

`
