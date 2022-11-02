import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./header/header";
import AuthBoxy from "../context/auth/auth";

const Layout = () => {
  return (
    <BrowserRouter>
      {/*Add header*/}
      <Header />
      <Routes>
        <Route exact path="/" element={<AuthBoxy />} />
        <Route exact path="/register" element={<AuthBoxy register />} />
      </Routes>
    </BrowserRouter>
  )

}
export default Layout;
