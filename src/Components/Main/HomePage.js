import React from "react";
import Sidebar from "../SideBar/Sidebar";
import Main from "./Main";
import Layout from "../Layout/Layout";

function HomePage() {
  return (
    <div className="flex min-h-screen max-w-7xl mx-auto border">
      <Sidebar />
      <Main />
      <Layout />
    </div>
  );
}

export default HomePage;
