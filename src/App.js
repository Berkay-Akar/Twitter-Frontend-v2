import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./Components/Authentication/LoginPage";
import RegisterPage from "./Components/Authentication/RegisterPage";
import HomePage from "./Components/Main/HomePage";
import TweetDetail from "./Components/Tweet/TweetDetail";
export const userContext = React.createContext();

function App() {
  const [user, setUser] = useState();
  const username = user?.username;

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

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
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
          {username && (
            <Route
              path={`/tweet/${username}/:tweetId`}
              element={<TweetDetail />}
            />
          )}
        </Routes>
      </BrowserRouter>
    </userContext.Provider>
  );
}

export default App;
