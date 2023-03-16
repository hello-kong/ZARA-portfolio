import React, { memo } from "react";
import styled from "styled-components";
import { NavLink, Routes, Route } from "react-router-dom";

import Mypage from "./Mypage";
import Profile from "../depth2/Profile";
import MyQnAList from "../depth2/MyQnAList";

const MenuWrap = styled.div`
  position: relative;
  .menu {
    position: absolute;
    display: flex;
    left: 12%;
  }
`;

const MenuLink = styled(NavLink)`
  display: inline-block;
  margin: -95px 20px 35px 0;
  font-size: 18px;
  font-weight: 200;
  font-size: 12px;
  letter-spacing: 1px;
  color: #b4b4b4;
  &:hover {
    cursor: pointer;
  }
  &.active {
    font-weight: 400;
    color: black;
  }
`;

const MypageMenu = memo(() => {
  return (
    <MenuWrap>
      <div className="menu">
        <MenuLink to="order">구매 내역</MenuLink>
        <MenuLink to="profile">프로필</MenuLink>
        <MenuLink to="myqnalist">작성 글 목록</MenuLink>
      </div>
      <Routes>
        <Route path="order" element={<Mypage />} />
        <Route path="profile" element={<Profile />} />
        <Route path="myqnalist" element={<MyQnAList />} />
      </Routes>
    </MenuWrap>
  );
});

export default MypageMenu;
