
 export const lightTheme =  {
    colors: {
      secondary: "#fbf1ff", 
      primaryShared: "#a45dbe" , 
      textPrimary: "#a45dbe",
      textSecondary: "#000",
      textTheme: "#fff",
      primary: "#a45dbe",
      textShared: "#000",
      backgroundMuted: "#ead3f2",
      backgroundMutedShared: "#fbf1ff",
      backgroundFooter: "#000",
      backgroundSections: "#fbf1ff",
      ////////////////
      // secondary: "#06B6D4",
      background: "#FFFFFF",
      textMuted: "#64748B", // نص ثانوي
      border: "#E2E8F0", // حدود
      success: "#10B981", // نجاح
      error: "#EF4444", // خطأ
      warning: "#F59E0B", // تحذير
      
    }
  }
 export const darkTheme= {
   colors: {
     ...lightTheme.colors,
     primary: "#fbf1ff",
     backgroundMuted: "#fbf1ff", 
     backgroundSections: "#a45dbe",
     textPrimary: "#FFFFFF",
     textSecondary: "#fff",
     textTheme: "#000",
     
      //////////////
      background: "#1E293B",
      textMuted: '#94A3B8',
      border: '#334155',
      success: '#10B981',
      error: '#EF4444',
      warning: '#F59E0B',
    }
  }