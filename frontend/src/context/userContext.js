import React, { createContext, useState } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const updateUser = (userData) => {
    setUser(userData);
  };

  const clearUser = (userData) => {
    setUser(null);
  };

  const updateUserField = (field, value) => {
    setUser((prevUser) => ({
      ...prevUser,
      [field]: value,
    }));
  };

  return (
    <UserContext.Provider
      value={{ user, updateUser, clearUser, updateUserField }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
