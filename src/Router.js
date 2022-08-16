import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import AdminProvider from "./contexts/AdminProvider";
import ClientProvider from "./contexts/ClientProvider";

import MainPage from "./pages/MainPage";
import AuthPage from "./pages/AuthPage";
import CrudPage from "./pages/CrudPage";
import AdminPage from "./pages/AdminPage";
import AdminAddPage from "./pages/AdminAddPage";
import AdminEditPage from "./pages/AdminEditPage";

import Navbar from "./components/Navbar";

function Router() {
  return (
    <ClientProvider>
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
    </ClientProvider>
  );
}

export default Router;
