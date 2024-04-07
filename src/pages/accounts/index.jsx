import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import Profile from "./Profile";
import Signup from "./Signup";

export default function AccountsRoutes() {
  return (
    <>
      <Routes>
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </>
  );
}
