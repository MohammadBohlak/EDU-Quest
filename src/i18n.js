// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// استيراد ملفات الترجمة الموحدة لكل لغة
import translationEn from "./locales/en/translation.json";
import translationAr from "./locales/ar/translation.json";

// قراءة اللغة المحفوظة (تتطابق مع languageSlice) لتفادي وميض اللغة عند التحميل
const savedLang =
  (typeof window !== "undefined" && window.localStorage.getItem("lang")) || "en";
const initialLang = savedLang === "ar" || savedLang === "en" ? savedLang : "en";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: translationEn },
      ar: { translation: translationAr },
    },
    lng: initialLang,    // تعيين اللغة الأولية من التفضيل المحفوظ
    fallbackLng: "en",   // في حال عدم توفر ترجمة للغة المطلوبة

    // لا داعي لتعريف الـ namespaces المتعددة الآن
    interpolation: {
      escapeValue: false, // React يتعامل مع الحماية بشكل أمثل
    },
  });

export default i18n;
