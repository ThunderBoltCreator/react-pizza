import React from "react";
import { Header } from "../components/Header";
import { Outlet } from "react-router";

export const MainLayout: React.FC = () => {
  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
