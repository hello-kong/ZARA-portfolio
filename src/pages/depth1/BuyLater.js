import React, { memo, useState } from "react";
import styled from "styled-components";
import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons'

const WishlistWrap = styled.div`
  width: 1200px;
  margin: 200px 0 0 220px;
`;

const BuyLaterItem = styled.div`
    width: 1000px;
    margin: auto;
    text-align: center;
    margin-top: 20px;
    p {
        margin-top: 10px;
        font-size: 13px;
    }
`;

const MenuLink = styled(NavLink)`
  display: inline-block;
  margin-right: 20px;
  font-size: 18px;
  font-weight: 200;
`;

const TabLink = styled(NavLink)`
    font-size: 13px;
    font-weight: 200;
    display: inline-block;
    margin: 50px 0;
    margin-right: 20px;

    &.active {
        font-weight: 500;
    }
  `;

const Wishlist = memo(() => {
    return (
        <div>
            <WishlistWrap>
                <div className="nav">
                <MenuLink to="/basket">바스켓백</MenuLink>
                <MenuLink to="/wishlist" element={<Wishlist/>}>마음에 드는 제품</MenuLink>
                </div>
                <div className="wishNav">
                    <TabLink to="/wishlist">주예은 목록</TabLink>
                    <TabLink to="/buy_later">나중을 위해 저장됨</TabLink>
                </div>
            </WishlistWrap>
            <BuyLaterItem>
                    <span><FontAwesomeIcon icon={faBriefcase}/></span>
                    <p>나중에 구매하기 위해 저장해 둔 제품이 없습니다.</p>
            </BuyLaterItem>
        </div>
      
    );
  });
  
  export default Wishlist;
  