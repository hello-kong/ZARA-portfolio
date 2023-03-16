import React, { memo, useCallback, useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { NavLink, Link } from "react-router-dom";

//이미지
import logo from "../assets/img/zaralogo.svg";

import { IconView, HbgBtn, Close, Basket } from "../components/IconView";

//Header
const HeaderBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  z-index: 100;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  background-color: transparent;
  .layoutL {
    margin-top: 12px;
    .hbg {
      border: none;
      box-shadow: none;
      border-radius: 0;
      padding: 0;
      overflow: visible;
      cursor: pointer;
      svg {
        width: 21px;
        position: fixed;
        top: 6px;
        left: 24px;
      }
    }
  }

  .layoutL > .logo > svg {
    width: 265px;
    margin-left: 210px;
  }
  .layoutR {
    margin-top: 22px;
    display: flex;
    justify-content: space-between;
    height: 15px;
    margin-right: 20px;
    .search {
      font-size: 12px;
      text-decoration: none;
      position: absolute;
      right: 22%;
      padding: 2px;
    }
    .remain {
      display: flex;
      position: relative;
      span {
        position: absolute;
        right: 9%;
        margin-top: 4px;
        font-size: 10px;
        font-weight: 100;
      }
    }
    button {
      background-color: transparent;
      border: none;
      box-shadow: none;
      border-radius: 0;
      padding: 0;
      overflow: visible;
      cursor: pointer;
      margin-right: 27px;
      font-weight: 100;
      font-size: 13px;
      letter-spacing: 1px;
      a {
        text-decoration: none;
        width: 55px;
      }
      &:first-child {
        display: block;
        box-sizing: border-box;
      }
      &:nth-child(3) {
        margin: 0 -100px;
      }
    }
    .cart > svg {
      width: 30px;
      height: 30px;
      margin-top: -8px;
      margin-right: 2px;
    }
  }
`;

//Category Menu
const Menu = styled.div`
  display: none;
  width: 530px;
  height: 1041px;
  color: black;
  position: relative;

  animation: slide 1s linear;

  @keyframes slide {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .clickOut {
    animation: exitMenu 0.8s linear;
    @keyframes exitMenu {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
      }
    }
  }

  .exit {
    border: none;
    box-shadow: none;
    border-radius: 0;
    padding: 0;
    overflow: visible;
    cursor: pointer;
    svg {
      width: 28px;
      position: fixed;
      top: 20px;
      left: 24px;
    }
  }
  .logo > svg {
    width: 265px;
    margin-top: 12px;
    margin-left: 210px;
  }
  ul {
    position: absolute;
    width: 400px;
    top: 25%;
    left: 10%;
    list-style: none;
    display: flex;
    justify-content: space-evenly;
    .menu {
      font-weight: 200;
    }
    .link {
      margin-bottom: 40px;
      display: block;
    }
    .menu-item {
      position: relative;
      .sub {
        position: absolute;
        max-height: 0;
        overflow: hidden;
        transition: max-height 400ms ease-out;
        font-size: 12px;
        width: 50px;
        display: flex;
        justify-content: inherit;
        li {
          margin-top: 40px;
          margin-left: 5px;
          .link {
            &:hover {
              font-weight: bold;
              box-sizing: border-box;
              transition: 0.1s ease-in;
            }
          }
        }
      }
    }
  }
`;
const Header = memo(({ color, display, logoColor }) => {
  //햄버거 버튼을 클릭했을 때 열리는 카테고리
  const ctgRef = useRef();
  const hbgRef = useRef();

  const hbgOnClick = useCallback((e) => {
    e.preventDefault();
    const current = e.currentTarget;
    ctgRef.current.style = "display: block; background-color: white;";
    hbgRef.current.style.display = "none";
  });
  const exitOnClick = useCallback((e) => {
    e.preventDefault();
    const current = e.currnetTarget;
    ctgRef.current.style = "display: none; background-color: transparent;";
    hbgRef.current.style.display = "block";
  });

  //카테고리별 메뉴
  const onOver = useCallback((e) => {
    const current = e.currentTarget;
    const sub = current.querySelector(".sub");

    //scrollHeight는 요소의 크기를 벗어난 만큼의 높이를 의미
    sub.style.maxHeight = sub.scrollHeight + "px";
  }, []);
  const onOut = useCallback((e) => {
    const current = e.currentTarget;
    const sub = current.querySelector(".sub");
    sub.style.maxHeight = null;
  });

  return (
    <div>
      <HeaderBar style={{ backgroundColor: color }}>
        <Menu ref={ctgRef}>
          <button className="exit" type="button" onClick={exitOnClick}>
            <Close />
          </button>
          <a className="logo" href="/">
            <IconView />
          </a>
          <ul className="MenuContainer">
            <li className="menu-item" onMouseOver={onOver} onMouseOut={onOut}>
              <Link to="#" className="link menu">
                WOMAN
              </Link>
              <ul className="sub">
                <li>
                  <Link to="#" className="link">
                    Top
                  </Link>
                  <Link to="#" className="link">
                    Bottom
                  </Link>
                  <Link to="#" className="link">
                    Shoes
                  </Link>
                </li>
              </ul>
            </li>
            <li className="menu-item" onMouseOver={onOver} onMouseOut={onOut}>
              <Link to="#" className="link menu">
                MAN
              </Link>
              <ul className="sub">
                <li>
                  <Link to="#" className="link">
                    Top
                  </Link>
                  <Link to="#" className="link">
                    Bottom
                  </Link>
                  <Link to="#" className="link">
                    Shoes
                  </Link>
                </li>
              </ul>
            </li>
            <li className="menu-item" onMouseOver={onOver} onMouseOut={onOut}>
              <Link to="#" className="link menu">
                KIDS
              </Link>
              <ul className="sub">
                <li>
                  <Link to="#" className="link">
                    Top
                  </Link>
                  <Link to="#" className="link">
                    Bottom
                  </Link>
                  <Link to="#" className="link">
                    Shoes
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </Menu>
        <div className="layoutL" ref={hbgRef}>
          <button
            className="hbg"
            type="button"
            onClick={hbgOnClick}
            style={{ display: display }}
          >
            <HbgBtn fill={logoColor} />
          </button>
          <a className="logo" href="/">
            <IconView fill={logoColor} />
          </a>
        </div>
        <div className="layoutR">
          <button
            className="search"
            style={{ display: display, borderBottom: `1px solid ${logoColor}` }}
          >
            <NavLink to="/search" style={{ color: logoColor }}>
              검색&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </NavLink>
          </button>
          <div className="remain">
            <button>
              <NavLink to="/login" style={{ color: logoColor }}>
                로그인
              </NavLink>
            </button>
            <button>
              <NavLink to="/customerservice" style={{ color: logoColor }}>
                도움말
              </NavLink>
            </button>
            <div>
              <a className="cart" href="/basket">
                <Basket fill={logoColor} />
              </a>
            </div>
            <div>
              <span style={{ color: logoColor }}>0</span>
            </div>
          </div>
        </div>
      </HeaderBar>
    </div>
  );
});

export default Header;

Header.defaultProps = {
  src: { logo },
};
