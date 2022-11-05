import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./header/header";
import AuthBoxy from "../context/auth/auth";
import { useGlobalContext } from "../context/globalContext";

const Layout = () => {
  const { fetchingUser } = useGlobalContext();

  return fetchingUser ? (
    <div><h1>Loading</h1></div>
  ) : (
    <BrowserRouter>
      {/*Add header*/}
      <Header />
      <Routes>
        <Route exact path="/" element={<AuthBoxy />} />
        <Route exact path="/register" element={<AuthBoxy register />} />
      </Routes>
    </BrowserRouter >
  )

}
export default Layout;
