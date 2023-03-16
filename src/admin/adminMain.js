import React, { memo, useState, useCallback, useEffect } from "react";
import { NavLink, Route, Routes, useNavigate } from "react-router-dom";
import styled from "styled-components";
import classNames from "classnames";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChalkboard } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faBasketShopping } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faTruck } from "@fortawesome/free-solid-svg-icons";
import { faSignal } from "@fortawesome/free-solid-svg-icons";
import { faSortDown } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";

import logo from "../assets/img/zaralogoW.png";
import mq from "../MediaQuery";

import AdminDash from "./adminDash";
import AdminUser from "./adminUser";
import AdminUserDetail from "./adminUserDetail";
import AdminProduct from "./adminProduct";
import AdminProductDetail from "./adminProductDetail";
import AdminProductAdd from "./adminProductAdd";
import AdminDelivery from "./adminDelivery";
import AdminDeliveryDetail from "./adminDeliveryDetail";
import AdminContent from "./adminContent";
import AdminNoticeAdd from "./adminNoticeAdd";
import AdminNoticeView from "./adminNoticeView";
import AdminNoticeEdit from "./adminNoticeEdit";
import AdminQnaView from "./adminQnaView";
import AdminStats from "./adminStats";

const Container = styled.div`
    width: 100%;
    min-height: 100vh;

    .wrap {
		width: 100%;
		min-height: 100vh;
		display: flex;
		justify-content: flex-end;
        .header {
            display: none;
        }

        .side {
            width: 20%;
            height: 100%;
            background-color: #000;
            color: #fff;
            font-size: 20px;
            position: fixed;
            top: 0;
            left: 0;

            a {
                color: #fff;
            }

            .top {
                width: 100%;
                height: 20%;
                text-align: center;
                padding: 20px 0;
                box-sizing: border-box;

                .xbox {
                    display: none;
                }

                ul {
                    width: 100%;

                    li {
                        width: 100%;
                        margin-bottom: 20px;

                        img {
                            width: 70%;
                            height: 50%;
                        }

                        a {
                            font-size: 16px;
                        }
                    }
                }
            }

            .menu {
                border-top: 1px solid #fff;
                height: 80%;

                ul {
                    width: 100%;
                    height: 100%;
                    box-sizing: border-box;

                    li {
                        height: 7%;
                        color: #999;
                        font-size: 18px;
                        padding-left: 10px;
                        line-height: 60px;

                        svg {
                            margin-right: 10px;
                        }
                    }

                    a {
                        li {
                            width: 100%;
                            height: 10%;
                            line-height: 80px;
                            padding-left: 20px;
                            box-sizing: border-box;
                            color: #fff;

                            &:hover {
                                background-color: #fff;
                                color: #000;
                            }
                        }

                        &.active {
                            li {
                                background-color: #fff;
                                color: #000;
                            }
                        }
                    }
                }
            }
        }

        .main {
            width: 80%;
            min-height: 100%;
            background-color: #eee;
        }

        ${mq.maxWidth("sm")`
		flex-wrap: wrap;

		.header {
			display: block;
			background-color: #000;
			width: 100vw;
			height: 20vh;
			position: fixed;
			top: 0;
			left: 0;

			img {
				width: 50%;
				height: 60%;
				display: block;
				margin: auto;
				transform: translateY(-25%);
			}

			button {
				display: block;
				width: 50px;
				background-color: #000;
				border: none;
				color: #fff;
				font-size: 50px;
			}

			&.hide {
				display: none;
			}
		}

		.side {
			display: none;

			&.visible {
				display: block;
				width: 100%;

				.top {
					padding: 0;

					ul {
						margin-top: -35px;
						img {
							width: 50%;
						}
					}
					
					.xbox {
						display: block;
						width: 50px;
						font-size: 40px;
						background-color: #000;
						color: #fff;
						
					}
				}
			}
		}

		.main {
			width: 100%;
		}
	`}
    }
`;

const adminMain = memo(() => {
    const navigate = useNavigate();
    const [side, setSide] = useState(false);
    const [wheel, setWheel] = useState(false);
    const [login, setLogin] = useState(null);
    let lastScrollY = 0;

    useEffect(() => {
        window.addEventListener("scroll", topHide);

        (async () => {
            try {
                const response = await axios.get("/admin/login");
                setLogin(response.data.data);
            } catch (err) {
                window.alert(err.response.data.rtmsg);
            }
        })();

        return () => {
            window.removeEventListener("scroll", topHide);
        };
    }, []);

    useEffect(() => {
        if (login !== null && login == false) {
            window.alert("로그인 후 이용할 수 있는 페이지입니다.");
            navigate("/admin");
        }
    }, [login]);

    const topHide = useCallback(
        (e) => {
            const scrollY = window.scrollY;
            scrollY > lastScrollY ? setWheel(true) : setWheel(false);
            lastScrollY = scrollY;
        },
        [lastScrollY]
    );

    const onSide = useCallback(
        (e) => {
            e.preventDefault();
            setSide(!side);
        },
        [side]
    );

    return (
        <Container>
            {login && (
                <div className="wrap">
                    <div className={classNames("header", { hide: wheel })}>
                        <button type="button" onClick={onSide}>
                            <FontAwesomeIcon icon={faBars} />
                        </button>
                        <img src={logo} alt="logo" />
                    </div>
                    <div className={classNames("side", { visible: side })}>
                        <div className="top">
                            <button
                                type="button"
                                className="xbox"
                                onClick={onSide}
                            >
                                <FontAwesomeIcon icon={faX} />
                            </button>
                            <ul>
                                <li>
                                    <img src={logo} alt="logo" />
                                </li>
                                <li>
                                    <NavLink to="/">사이트 바로가기</NavLink>
                                </li>
                            </ul>
                        </div>
                        <div className="menu">
                            <ul>
                                <li>사이트 관리</li>
                                <NavLink to="main">
                                    <li>
                                        <FontAwesomeIcon icon={faChalkboard} />
                                        대시보드
                                    </li>
                                </NavLink>
                                <NavLink to="users">
                                    <li>
                                        <FontAwesomeIcon icon={faUser} />
                                        사용자 관리
                                    </li>
                                </NavLink>
                                <NavLink to="product">
                                    <li>
                                        <FontAwesomeIcon
                                            icon={faBasketShopping}
                                        />
                                        쇼핑
                                    </li>
                                </NavLink>
                                <NavLink to="delivery">
                                    <li>
                                        <FontAwesomeIcon icon={faTruck} />
                                        배송 관리
                                    </li>
                                </NavLink>
                                <NavLink to="content">
                                    <li>
                                        <FontAwesomeIcon icon={faPen} />
                                        컨텐츠 관리
                                    </li>
                                </NavLink>
                                <NavLink to="stats">
                                    <li>
                                        <FontAwesomeIcon icon={faSignal} />
                                        통계
                                    </li>
                                </NavLink>
                            </ul>
                        </div>
                    </div>
                    <div className="main">
                        <Routes>
                            <Route path="main" element={<AdminDash />} />
                            <Route path="users" element={<AdminUser />} />
                            <Route
                                path="users_detail/:id"
                                element={<AdminUserDetail />}
                            />
                            <Route path="product" element={<AdminProduct />} />
                            <Route
                                path="product_detail/:id"
                                element={<AdminProductDetail />}
                            />
                            <Route
                                path="product_add"
                                element={<AdminProductAdd />}
                            />
                            <Route
                                path="delivery"
                                element={<AdminDelivery />}
                            />
                            <Route
                                path="delivery_detail/:id"
                                element={<AdminDeliveryDetail />}
                            />
                            <Route path="content" element={<AdminContent />} />
                            <Route
                                path="noticeadd"
                                element={<AdminNoticeAdd />}
                            />
                            <Route
                                path="noticeview/:id"
                                element={<AdminNoticeView />}
                            />
                            <Route
                                path="noticeedit/:id"
                                element={<AdminNoticeEdit />}
                            />
                            <Route
                                path="qnaview/:id"
                                element={<AdminQnaView />}
                            />
                            <Route path="stats" element={<AdminStats />} />
                        </Routes>
                    </div>
                </div>
            )}
        </Container>
    );
});

export default adminMain;
