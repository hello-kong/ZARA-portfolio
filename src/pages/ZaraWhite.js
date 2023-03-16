import React, { memo } from "react";
import { Routes, Route } from "react-router-dom";
import { useParams } from "react-router-dom";

import Header from "../common/Header";
import Footer from "../common/Footer";

import Search from "./depth1/Search";
import Login from "./depth1/Login";

// pages/depth1
import Mainpage from "./depth1/index.js";
import CustomerService from "./depth1/CustomerService";
import Basket from "./depth1/Basket";
import Wishlist from "./depth1/Wishlist";
import BuyLater from "./depth1/BuyLater";
import MypageMenu from "./depth1/MypageMenu";

// pages/depth2
import List from "./depth2/List";
import FindPassword from "./depth2/FindPassword";
import Signup from "./depth2/Signup";
import ProductList from "./depth2/ProductList";

import Test from "../Test";

// pages/depth3
import Address from "./depth3/Address";
import Account from "./depth3/Account";
import NoticeListView from "./depth3/NoticeListView";
import QnaListView from "./depth3/QnaListView";
import QnaAdd from "./depth3/QnaAdd";
import QnaEdit from "./depth3/QnaEdit";
import ProductDetail from "./depth3/ProductDetail";
import Shipping from "./depth3/Shipping";
import AddressSetting from "./depth3/AddressSetting";
import Payment_last from "./depth3/Payment_last";
import Payment from "./depth3/Payment";

// pages/depth4
import AddressAdd from "./depth4/AddressAdd";
import AddressEdit from "./depth4/AddressEdit";
import EditEmail from "./depth4/EditEmail";
import EditPassword from "./depth4/EditPassword";
import DeleteAccount from "./depth4/DeleteAccount";
import ImageScroll from "./depth4/ImageScroll";

// pages/depth5
import ConfirmDel from "./depth5/ConfirmDel";
import { useEffect } from "react";
import { useState } from "react";

const ZaraWhite = memo(() => {
  const params = useParams();
  const add = params["*"].split("/");
  const [display, setDisplay] = useState(null);

  useEffect(() => {
    if (
      add[0] === "basket" ||
      add[0] === "payment" ||
      add[0] === "payment_last" ||
      add[0] === "shipping" ||
      add[0] === "incard" ||
      add[0] === "wishlist"
    ) {
      setDisplay("none");
    } else {
      setDisplay("block");
    }
  }, []);

  return (
    <div>
      <Header color={"white"} display={display} />
      <Routes>
        <Route path="/test" element={<Test />} />
        <Route path="/mypage/*" element={<MypageMenu />} />
        {/* <Route path="/basket" element={<Basket />} /> */}
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/buy_later" element={<BuyLater />} />
        <Route path="/product_detail" element={<ProductDetail />} />
        <Route path="/image_scroll" element={<ImageScroll />} />
        <Route path="/address" element={<Address />} />
        <Route path="/address_add" element={<AddressAdd />} />
        <Route path="/address_edit" element={<AddressEdit />} />
        <Route path="/account" element={<Account />} />
        <Route path="/account/edit_email" element={<EditEmail />} />
        <Route path="/account/edit_password" element={<EditPassword />} />
        <Route path="/account/delete_account" element={<DeleteAccount />} />
        <Route
          path="/account/delete_account/confirm_del"
          element={<ConfirmDel />}
        />
        <Route path="/address_setting" element={<AddressSetting />} />
        <Route path="/payment_last/:index" element={<Payment_last />} />
        <Route path="/payment/*" element={<Payment />} />

        <Route path="/customerservice" element={<CustomerService />} />
        <Route path="/customerservice/list/*" element={<List />} />
        <Route
          path="/customerservice/listview/notice/:id"
          element={<NoticeListView />}
        />
        <Route
          path="/customerservice/listview/qna/:id"
          element={<QnaListView />}
        />
        <Route path="/customerservice/qna_add" element={<QnaAdd />} />
        <Route path="/customerservice/qna_edit/:id" element={<QnaEdit />} />

        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<Login />} />
        <Route path="/find_password" element={<FindPassword />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/shipping" element={<Shipping />} />
      </Routes>
      <Footer />
    </div>
  );
});

export default ZaraWhite;
