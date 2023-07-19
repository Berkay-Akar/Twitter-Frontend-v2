import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./Components/Authentication/LoginPage";
import RegisterPage from "./Components/Authentication/RegisterPage";
import HomePage from "./Components/Main/HomePage";
import TweetDetail from "./Components/Tweet/TweetDetail";
import Profile from "./Components/Profile";

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
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
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
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
          <Route
            path="/"
            // element={
            //   user ? <HomePage handleLogout={handleLogout} /> : <LoginPage />
            // }
            element={<HomePage handleLogout={handleLogout} />}
          />
          <Route path={`/tweet/:username/:tweetId`} element={<TweetDetail />} />
          <Route
            path={`/${username}`}
            element={user ? <Profile /> : <LoginPage />}
          />
        </Routes>
      </BrowserRouter>
    </userContext.Provider>
  );
}

export default App;
