import { useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./styles/themes";
import CustomNavbar from "./components/ui/navbar/Navbar";
import { GlobalStyles } from "./styles/GlobalStyles";
import Hero from "./components/homePageComponents/heroSection/Hero";
import "./i18n";

import { useTranslation } from "react-i18next";
import CoursesSection from "./components/homePageComponents/courseSectionComponents/CourseSection";
import FAQSection from "./components/homePageComponents/FAQSectionComponents/FAQSection";
import AboutUs from "./components/homePageComponents/aboutUsSection/AboutUs";
import Testimonial from "./components/homePageComponents/testimonialSection/Testimonial";
import Footer from "./components/ui/footer/Footer";
import SignUp from "./pages/joinPages/SignUp";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/joinPages/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import axios from "axios";
import { useEffect } from "react";
import Courses from "./pages/courses/Courses";

function App() {
  // useEffect(() => {
  //   axios
  //     .post("https://edu-f.onrender.com/api/login", {
  //       email: "mohammed@gmail.com",
  //       password: 12345678,
  //     })
  //     .then((res) => {
  //       console.log(res.data);
  //     });
  // }, []);
  // const lang = useSelector((state) => state.lang.language)
  const { i18n } = useTranslation();
  const theme = useSelector((state) => state.theme);
  const direction = i18n.language === "ar" ? "rtl" : "ltr";

  return (
    <div dir={direction}>
      <ThemeProvider
        theme={
          theme === "light"
            ? { ...lightTheme, lang: i18n.language }
            : { ...darkTheme, lang: i18n.language }
        }
      >
        <GlobalStyles />

        {/* <SignUp /> */}
        <Routes>
          <Route
            // path="/"
            index
            element={
              <>
                <CustomNavbar />
                <Hero />
                <CoursesSection />
                <FAQSection />
                <AboutUs />
                <Testimonial />
                <Footer />
              </>
            }
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<div>dashboard</div>} />
            <Route path="users" element={<div>users</div>} />
            <Route path="courses" element={<Courses />} />
            <Route path="settings" element={<div>settings</div>} />
          </Route>
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
