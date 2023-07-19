import React from "react";
import Sidebar from "../SideBar/Sidebar";
import Main from ".";
import Layout from "../Layout/Layout";

function HomePage({ handleLogout }) {
  return (
    <div className="flex min-h-screen max-w-7xl mx-auto border">
      <Sidebar handleLogout={handleLogout} />
      <Main />
      <Layout />
    </div>
  );
}

export default HomePage;
