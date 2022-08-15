import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import AuthPage from "./pages/AuthPage";
import CrudPage from "./pages/CrudPage";
import AdminPage from "./pages/AdminPage";
import AdminAddPage from "./pages/AdminAddPage";
import Navbar from "./components/Navbar";
import AdminProvider from "./contexts/AdminProvider";
import AdminEditPage from "./pages/AdminEditPage";

function Router() {
  return (
    <AdminProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/crud" element={<CrudPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/add" element={<AdminAddPage />} />
          <Route path="/admin/edit/:id" element={<AdminEditPage />} />
        </Routes>
      </BrowserRouter>
    </AdminProvider>
  );
}

export default Router;
