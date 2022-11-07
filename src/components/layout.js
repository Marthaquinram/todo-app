import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./header/header";
import AuthBoxy from "../context/auth/auth";
import { useGlobalContext } from "../context/globalContext";
import Dashboard from "./dashboard";

const Layout = () => {
  const { fetchingUser } = useGlobalContext();

  return fetchingUser ? (
    <div className="loading">
      <h1>Loading</h1>
    </div>
  ) : (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/" element={<AuthBoxy />} />
        <Route exact path="/register" element={<AuthBoxy register />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter >
  );

};
export default Layout;
