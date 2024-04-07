import React from "react";
import { Route, Routes } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import Home from "./Home";
import About from "./About";
import AccountsRoutes from "./accounts";
import Routine from "./Routine";

export default function Root() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/routine" element={<Routine />} />
        <Route path="/accounts/*" element={<AccountsRoutes />} />
      </Routes>
    </AppLayout>
  );
}
