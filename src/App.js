// App.js
import React from "react";
import { Routes, Route } from "react-router-dom";

import Sendinfo from "./server/sendinf";
import LoginPage from "./server/login";
import Main from "./server/main";
import "./App.scss";
import Certified from "./container/Certified/Certified";
// import { Navbar } from "./components";
import { Footer } from "./container";
const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/auth" element={<Sendinfo />} />
        <Route path="/Certified" element={<Certified />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
