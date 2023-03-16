import React, { memo } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "../common/Header";
import Footer from "../common/Footer";

// pages/depth2
import ProductList from "./depth2/ProductList";

// pages/depth3
import ProductDetail from "./depth3/ProductDetail";

const Zara = memo(() => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="list" element={<ProductList />} />
        <Route
          path="women-toplist"
          element={<ProductList category="top" gender="women" />}
        />
        <Route
          path="women-bottomlist"
          element={<ProductList category="bottom" gender="women" />}
        />
        <Route
          path="women-shoeslist"
          element={<ProductList category="shoes" gender="women" />}
        />

        <Route
          path="men-toplist"
          element={<ProductList category="top" gender="men" />}
        />
        <Route
          path="men-bottomlist"
          element={<ProductList category="bottom" gender="men" />}
        />
        <Route
          path="men-shoeslist"
          element={<ProductList category="shoes" gender="men" />}
        />

        <Route
          path="boy-toplist"
          element={<ProductList category="top" gender="boy" />}
        />
        <Route
          path="boy-bottomlist"
          element={<ProductList category="bottom" gender="boy" />}
        />
        <Route
          path="boy-shoeslist"
          element={<ProductList category="shoes" gender="boy" />}
        />

        <Route
          path="girl-toplist"
          element={<ProductList category="top" gender="girl" />}
        />
        <Route
          path="girl-bottomlist"
          element={<ProductList category="bottom" gender="girl" />}
        />
        <Route
          path="girl-shoeslist"
          element={<ProductList category="shoes" gender="girl" />}
        />

        <Route path="/detail" element={<ProductDetail />} />
      </Routes>
      <Footer />
    </div>
  );
});

export default Zara;
