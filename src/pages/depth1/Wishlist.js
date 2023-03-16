import React, { memo, useState, useCallback, useRef, useEffect } from "react";
import styled from "styled-components";
import { Link, NavLink, Routes, Route } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons'

//image
import img from "../../assets/img/modelsample.jpg";

const WishlistWrap = styled.div`
  width: 1200px;
  margin: 200px 0 0 220px;
`;

const WishListItemWrap = styled.ul`
    width: 1300px;
    margin: auto;
    .itemCnt {
        .infoWrap {
            /* display: flex; */
            width: 300px;
            height: 600px;
            position: relative;
            .imgCnt {
                background-color: rgba(0, 0, 0, 0.2);
                /* height: 70%; */
                /* width: 30%; */
                img {
                width: 100%;
                }
            }

            .infoCnt {
                margin-top: 10px;
                display: flex;
                width: 300px;
                justify-content: space-between;
                a {
                    &:hover {text-decoration: underline;}
                }
                h2, h3 {
                    font-size: 13px;
                    color: rgba(0,0,0,.7);
                }
                h3 {padding-left: 140px;}
                span {
                    display: inline-block;
                    font-size: 12px;
                }
            }
            button {
                width: 140px;
                height: 30px;
                margin-top: 30px;
                border: 1px solid black;
                background-color: white;
                font-size: 12px;
            }

            .sizeSearch {
                position: absolute;
                z-index: 10000;
                bottom: 0;
                width: 300px;
                background-color: rgba(255,255,255,0.7);

                li {
                    button {
                        font-size: 12px;
                        width: 100%;
                        padding-left: 5px;
                        margin: 0;
                        border: 0;
                        text-align: left;
                    }
                }
                .hover:hover {
                    background-color: rgb(235, 235, 235) ;
                }
                .wishBtn {
                    margin-top: 0;
                    width: 100%;
                    color: gray;
                    text-align: left;
                    border: 0;
                    border-top: 1px solid rgba(0,0,0,.3);
                }
            }
        }
    }
`;

const MenuLink = styled(NavLink)`
  display: inline-block;
  margin-right: 20px;
  font-size: 18px;
  font-weight: 200;
  &.active {
    font-weight: 400;
  }
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
    const [open, setOpen] = useState(false);
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

            <WishListItemWrap>
                <li className="itemCnt">
                    <div className="infoWrap">
                        <div className="imgCnt">
                            <Link to="/product_detail"><img src={img}/></Link>
                        </div>
                        <div className="infoCnt">
                            <a href="#"><h2>100% 울 점퍼</h2></a>
                            <h3>59,000원</h3>
                            <span><FontAwesomeIcon icon={faBookmark}/></span>
                        </div>
                        <button type="button" onClick={() => setOpen(!open)} >장바구니에 추가하기</button>
                        {open &&
                            <div className="sizeSearch" >
                                <ul>
                                    <li>
                                        <button className="hover">XS (KR 44)</button>
                                    </li>
                                    <li>
                                        <button className="hover">S (KR 55)</button>
                                    </li>
                                    <li>
                                        <button className="hover">M (KR 66)</button>
                                    </li>
                                    <li>
                                        <button className="hover">L (KR 77)</button>
                                    </li>
                                    <li>
                                        <button className="hover">XL (KR 88)</button>
                                    </li>
                                </ul>
                                <button className="wishBtn" type="button" onClick={() =>{window.open("/sizeguide", '_blank', "toolbar=yes,scrollbars=yes,resizable=yes, top=0, left=0,width=900,height=600")}}>사이즈 가이드</button> 
                            </div>
                        }
                    </div>
                </li>
            </WishListItemWrap>
        </div> 
    );
  });
  
  export default Wishlist;
  