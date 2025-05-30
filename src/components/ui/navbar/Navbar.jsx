import React, { useState, useRef, useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink, useLocation } from 'react-router-dom';
import MyContainer from '../myContainer/MyContainer';
import MyThemSwitch from '../../themSwitch/ThemSwitch';
import LangSwitch from '../../langSwitch/LangSwitch';
import { StyledNavbar, StyledNavLink } from './navbar.styles';
import { useTranslation } from 'react-i18next';


const CustomNavbar = () => {
  // حالة للتحكم بفتح وإغلاق القائمة
  const [expanded, setExpanded] = useState(false);
  // مرجع لتحديد المنطقة الخاصة بالنافبار
  const navRef = useRef(null);
  // للحصول على التغييرات في مسار التنقل (بذلك يتم إغلاق القائمة عند النقر على أحد الروابط)
  const location = useLocation();

  const {t} = useTranslation() ; 

  // دالة لإغلاق القائمة عند النقر خارجها
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setExpanded(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // إغلاق القائمة عند تغيير المسار (أي عند النقر على رابط)
  useEffect(() => {
    setExpanded(false);
  }, [location]);

  return (
    <div ref={navRef}>
      <StyledNavbar  expand="lg" expanded={expanded}>
        <MyContainer>
          <Navbar.Brand as={NavLink} to="/">
            {t("navbar.logo")}
          </Navbar.Brand>
         
          <Navbar.Collapse className="justify-content-center" id="basic-navbar-nav">
            <Nav >
              <StyledNavLink href= "#hero" className="nav-link">
                {t("navbar.navLinks.home")}
              </StyledNavLink>
              <StyledNavLink href="#courses" className="nav-link">
                {t("navbar.navLinks.courses")}
              </StyledNavLink>
              <StyledNavLink href="#questions" className="nav-link">
                {t("navbar.navLinks.questions")}
              </StyledNavLink>
              <StyledNavLink href="#about" className="nav-link">
                {t("navbar.navLinks.about")}
              </StyledNavLink>
              <StyledNavLink href='#testimonial' className="nav-link">
                {t("navbar.navLinks.testimonial")}
              </StyledNavLink>
            </Nav>
          </Navbar.Collapse>
         <div className='nav-buttons' style={{display: "flex", alignItems: "center", gap:"10px"}}>
         <LangSwitch/>
          <MyThemSwitch/>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={() => setExpanded(expanded ? false : true)}
          />
         </div>
        </MyContainer>
      </StyledNavbar>
    </div>
  );
};

export default CustomNavbar;
