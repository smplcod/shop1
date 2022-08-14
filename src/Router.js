import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
// import CrudPage from "./pages/CrudPage";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        {/* <Route path="/crud" element={<CrudPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
