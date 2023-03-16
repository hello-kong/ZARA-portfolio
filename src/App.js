import React, { memo } from "react";
import { Routes, Route } from "react-router-dom";

// pages/depth1
import Mainpage from "./pages/depth1/index.js";

import Zara from "./pages/Zara";
import ZaraWhite from "./pages/ZaraWhite";
import SizeGuide from "./common/SizeGuide";

import Footer from "./common/Footer.js";

import Basket from "./pages/depth1/Basket.js";

// 관리자 페이지
import Admin from "./admin/adminLogin";
import AdminMain from "./admin/adminMain";

const App = memo(() => {
  return (
    <div>
      <Routes>
        <Route path="/" exact={true} element={<Mainpage />} />
        <Route path="/*" element={<ZaraWhite />} />
        <Route path="/product/*" element={<Zara />} />
        <Route path="/sizeguide" element={<SizeGuide />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/*" element={<AdminMain />} />
        <Route path="/basket" element={<Basket />} />
      </Routes>
    </div>
  );
});

export default App;
