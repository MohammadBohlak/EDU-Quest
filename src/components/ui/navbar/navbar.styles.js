import { Nav, Navbar } from "react-bootstrap";
// import { NavLink } from "react-router-dom";
import styled from "styled-components";


export const StyledNavbar = styled(Navbar)`
  background : #fff ; 
  height: 100px;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
  position: fixed ; 
  width: 100%;
  top: 33px ; 
  z-index: 10000000; 
  padding: 0%;;

  .navbar-collapse{
    background-color: #fff;
  }
  .show + .nav-buttons{
      justify-content: center;
      width: 100%;
      margin-top: 10px;
  }
  .show{
    background-color: #fff;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);

    .navbar-nav{
      align-items: center;
    background-color: #fff;

    }
  }
`

// إنشاء أنماط مخصصة للروابط باستخدام styled-components
export const StyledNavLink = styled(Nav.Link)`
  margin: 0 10px;
  text-decoration: none;
  color: inherit;
  position: relative ; 
  font-weight: bold;
  font-size: 2rem ; 
  &.active {
    color: ${({theme}) => theme.colors.primaryShared} !important;
  }
  &::before{
    content: "" ; 
    position: absolute ; 
    width: 0 ; 
    height: 1px;
    background: black ; 
    bottom: 6px;
    transition: all .3s;
  }
  &:not(.active):hover::before{
    width: calc(100% - 20px) ; 
  }
`;
