import React, { useState } from "react";
import { Menu } from "antd";
import "./AppLayout.scss";
import { useNavigate } from "react-router-dom";
import LogoImage from "../assets/logo.png";

function AppLayout({ children, sidebar }) {
  const naveigate = useNavigate();

  const menuItems = [
    {
      key: "Home",
      label: "Home",
    },
    {
      key: "about",
      label: "About",
    },
    {
      key: "routine",
      label: "루틴",
    },
    {
      key: "accounts/login",
      label: "Login",
    },
    {
      key: "accounts/signup",
      label: "SignUp",
    },
  ];

  const onClick = (e) => {
    naveigate("/" + e.key);
  };
  return (
    <div className="app">
      <div className="header">
        <h1 className="page-title">
          <img src={LogoImage} alt="logo" style={{ width: 150 }} />
        </h1>
        <div className="topnav">
          <Menu
            mode="horizontal"
            items={menuItems}
            onClick={onClick}
            style={{}}
          />
        </div>
      </div>

      <div className="contents">{children}</div>
      <div className="sidebar">{sidebar}</div>
      <div className="footer">2024 JHN_153228</div>
    </div>
  );
}

export default AppLayout;