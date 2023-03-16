import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import Meta from "./Meta";
import { Provider } from "react-redux";
import store from "./store";
import ScrollTop from "./components/ScrollTop";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Meta />
      <GlobalStyles />
      <App />
      <ScrollTop />
    </BrowserRouter>
    
  </Provider>
);
