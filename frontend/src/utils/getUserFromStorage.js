// src/utils/getUserFromStorage.js

export const getUserFromStorage = () => {
    try {
      const user = localStorage.getItem("user");
      const token = localStorage.getItem("token");
  
      if (!token || !user) return null;
  
      const parsedUser = JSON.parse(user);
  
      if (parsedUser.name && parsedUser.email && parsedUser.userId) {
        return parsedUser;
      }
  
      return null;
    } catch (error) {
      console.error("Error parsing user data:", error);
      return null;
    }
  };
  