import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import AuthPage from "./pages/AuthPage";
import CrudPage from "./pages/CrudPage";
import AdminPage from "./pages/AdminPage";
import AdminAddPage from "./pages/AdminAddPage";
import Navbar from "./components/Navbar";

function Router() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/crud" element={<CrudPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/add" element={<AdminAddPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
