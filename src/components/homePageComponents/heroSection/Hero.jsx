// src/components/Hero.js
import { Container, Row, Col } from "react-bootstrap";
import MyContainer from "../../ui/myContainer/MyContainer";
import PrimaryButton from "../../common/buttons/PrimaryButton";
import SecondaryButton from "../../common/buttons/SecondaryButton";
import { NormalText, NormalTextSecondary } from "../../common/texts/NormalText";
import { MainHeading } from "../../common/texts/MainHeading";
import { SmallTextTheme } from "../../common/texts/SmallText";
import {
  Buttons,
  ConImg,
  HeroSection,
  LeftHero,
  RighttHero,
} from "./hero.styles";
import man from "../../../assets/images/man.png";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "motion/react"; // ✅ استيراد مكتبة Motion

export default function Hero() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [user, setUser] = useState(localStorage.getItem("user"));
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  useEffect(() => {
    setUser(user);
  }, []);
  const faedAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 1.5 },
  };
  return (
    <HeroSection id="hero">
      <MyContainer>
        <Row style={{ justifyContent: "space-between" }}>
          <LeftHero
            {...faedAnimation}
            className="col-md-12 col-xl-6"
            md={12}
            xl={6}
          >
            <NormalTextSecondary>
              {t("hero.startFavouriteCourse")}
            </NormalTextSecondary>
            <MainHeading>{t("hero.educationJourney")}</MainHeading>
            <NormalTextSecondary>
              {t("hero.exploreLearnGrow")}
            </NormalTextSecondary>
            <Buttons>
              <PrimaryButton>{t("hero.startCourseButton")}</PrimaryButton>
              {!isAuthenticated && (
                <SecondaryButton
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  {t("hero.loginButton")}
                </SecondaryButton>
              )}
            </Buttons>
            {!isAuthenticated && (
              <NormalTextSecondary>
                {t("hero.notAccount")}
                <Link
                  to="/signup"
                  style={{ textDecoration: "underline", color: "#007BFF" }}
                >
                  {" "}
                  {t("hero.signUp")}
                </Link>
              </NormalTextSecondary>
            )}
          </LeftHero>

          <RighttHero
            {...faedAnimation}
            className="col-md-12 col-xl-6"
            md={12}
            xl={6}
          >
            <ConImg>
              <img src={man} />
              <div className="c c1">
                <SmallTextTheme>1200</SmallTextTheme>
                <SmallTextTheme>{t("hero.courseLabel")}</SmallTextTheme>
              </div>
              <div className="c c2">
                <SmallTextTheme>5000</SmallTextTheme>
                <SmallTextTheme>{t("hero.visitorLabel")}</SmallTextTheme>
              </div>
            </ConImg>
          </RighttHero>
        </Row>
      </MyContainer>
    </HeroSection>
  );
}
