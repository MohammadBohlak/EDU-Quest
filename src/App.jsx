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
import SignUp from "./pages/singnUp/SignUp";

function App() {
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
        <CustomNavbar />
        <Hero />
        <CoursesSection />
        <FAQSection />
        <AboutUs />
        <Testimonial />
        <Footer />
        {/* <SignUp/> */}
      </ThemeProvider>
    </div>
  );
}

export default App;
