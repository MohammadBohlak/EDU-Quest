import { Row, Col } from "react-bootstrap";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { FaLinkedinIn, FaWhatsapp } from "react-icons/fa6";
import {
  BottomSection,
  FooterContainer,
  FooterLink,
  FooterLinkTitle,
  Input,
  Logo,
  SocialIcon,
  SocialIcons,
  StyledPrimaryButton,
  TopSection,
} from "./footer.styles";
import { useTranslation } from "react-i18next";
import logo from "../../../assets/images/logo1.png"
const Footer = () => {
  const { t } = useTranslation();
  return (
    <FooterContainer>
      <>
        <TopSection>
          <Row className="" style={{ rowGap: "20px", columnGap:"0px" }}>
            <Col md={12} lg={2}>
              <Logo>
                <img src={logo} alt="Logo"/>
              </Logo>
            </Col>
            <Col md={6} lg={2}>
              <FooterLinkTitle>{t("footer.quickLinksTitle")}</FooterLinkTitle>
              <FooterLink href="#hero">{t("footer.quickLinks.home")}</FooterLink>
              <FooterLink href="#courses">{t("footer.quickLinks.courses")}</FooterLink>
              <FooterLink href="#questions">
                {t("footer.quickLinks.questions")}
              </FooterLink>
              <FooterLink href="#about">{t("footer.quickLinks.about")}</FooterLink>
              <FooterLink href="#testimonial">
                {t("footer.quickLinks.testimonial")}
              </FooterLink>
            </Col>
            <Col md={6} lg={2}>
              <FooterLinkTitle>{t("footer.usefulLinksTitle")}</FooterLinkTitle>
              <FooterLink href="#">
                {t("footer.usefulLinks.privacyPolicy")}
              </FooterLink>
              <FooterLink href="#">
                {t("footer.usefulLinks.termsConditions")}
              </FooterLink>
              <FooterLink href="#">
                {t("footer.usefulLinks.support")}
              </FooterLink>
              <FooterLink href="#">{t("footer.usefulLinks.faq")}</FooterLink>
            </Col>
            <Col md={6} lg={2}>
              <FooterLinkTitle>{t("footer.contactTitle")}</FooterLinkTitle>
              <FooterLink href="tel:+963998026793">+963998026793</FooterLink>
              <FooterLink href="mailto:mohammad.bohlak5@gmail.com">
                mohammad.bohlak5@gmail.com
              </FooterLink>
            </Col>
            <Col md={6} lg={4} className="ml-3">
              <FooterLinkTitle>{t("footer.subscribeTitle")}</FooterLinkTitle>
              <div className="mb-3 d-flex gap-3">
                <Input
                  type="email"
                  placeholder={t("footer.subscribePlaceholder")}
                />
                <StyledPrimaryButton>
                  {t("footer.subscribeButton")}
                </StyledPrimaryButton>
              </div>
            </Col>
            <Col md={12} className="d-flex align-items-center flex-column">
              <FooterLinkTitle>{t("footer.socialMediaTitle")}</FooterLinkTitle>
              <SocialIcons>
                <SocialIcon target= "_blank" href="https://www.facebook.com">
                  <FaFacebookF />
                </SocialIcon>
                <SocialIcon target= "_blank" href="https://wa.me/998026793">
                  <FaWhatsapp />
                </SocialIcon>
                <SocialIcon target= "_blank" href="https://www.linkedin.com">
                  <FaLinkedinIn />
                </SocialIcon>
                <SocialIcon target= "_blank" href="https://www.instagram.com">
                  <FaInstagram />
                </SocialIcon>
              </SocialIcons>
            </Col>
          </Row>
        </TopSection>
        <BottomSection>{t("footer.copyright")}</BottomSection>
      </>
    </FooterContainer>
  );
};

export default Footer;
