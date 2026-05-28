import { useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./styles/themes";
import CustomNavbar from "./components/ui/navbar/Navbar";
import { GlobalStyles } from "./styles/GlobalStyles";
import Hero from "./components/homePageComponents/heroSection/Hero";
import "./i18n";

import CoursesSection from "./components/homePageComponents/courseSectionComponents/CourseSection";
import FAQSection from "./components/homePageComponents/FAQSectionComponents/FAQSection";
import AboutUs from "./components/homePageComponents/aboutUsSection/AboutUs";
import Testimonial from "./components/homePageComponents/testimonialSection/Testimonial";
import Footer from "./components/ui/footer/Footer";
import SignUp from "./pages/singnUp/SignUp";

function App() {
  // مصدر الحقيقة الوحيد: Redux (متزامن مع i18n عبر listener middleware)
  const theme = useSelector((state) => state.theme);
  const language = useSelector((state) => state.lang.language);
  const direction = language === "ar" ? "rtl" : "ltr";

  const activeTheme =
    theme === "light"
      ? { ...lightTheme, lang: language }
      : { ...darkTheme, lang: language };

  return (
    <div dir={direction}>
      <ThemeProvider theme={activeTheme}>
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
