import React from "react";
import { useTranslation } from "react-i18next";
import { Col, Row } from "react-bootstrap";
import {
  SearchIcon,
  SearchInput,
  SectionContainer,
} from "./courseSection.styles";
import { PrimaryTitle, SecondaryTitle } from "../../common/texts/Titles";
import CategoriesButtonList from "./categoriesButtonList/CategoriesButtonList";
import CoursesSlider from "./coursesSlider/CoursesSlider";

export default function CoursesSection() {
  const { t } = useTranslation();

  return (
    <section id="courses">
      <SectionContainer >
        <Row className="align-items-center">
          <Col xs={12} md={6} lg={7} className="mb-4">
            <SecondaryTitle>{t("courses.title1")} </SecondaryTitle>
            <PrimaryTitle>{t("courses.title2")} </PrimaryTitle>
            <SecondaryTitle>{t("courses.title3")}</SecondaryTitle>
          </Col>
          <Col style={{ position: "relative" }} xs={12} md={6} lg={5}>
            <SearchInput
              type="text"
              placeholder={t("courses.searchPlaceholder")}
            />
            <SearchIcon />
          </Col>
        </Row>
        <Row>
          <CategoriesButtonList />
        </Row>
        <Row>
          <CoursesSlider />
        </Row>
      </SectionContainer>
    </section>
  );
}
