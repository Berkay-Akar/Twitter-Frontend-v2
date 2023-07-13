import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./Components/Authentication/LoginPage";
import RegisterPage from "./Components/Authentication/RegisterPage";
import HomePage from "./Components/Main/HomePage";
import React, { useEffect, useState } from "react";
import axios from "axios";
export const userContext = React.createContext();

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  return (
    <userContext.Provider
      value={{
        user,
        setUser: handleLogin,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </userContext.Provider>
  );
}

export default App;
