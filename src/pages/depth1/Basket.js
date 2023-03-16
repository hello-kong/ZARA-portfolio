import React, { memo, useCallback, useRef, useState } from "react";
import styled from "styled-components";
import { NavLink, Routes, Route } from "react-router-dom";

import Header from "../../common/Header";
import Wishlist from "./Wishlist";

//image
import img from "../../assets/img/modelsample.jpg";
import img1 from "../../assets/img/WomanBottom/1-darkBeige-1.jpg";
import img2 from "../../assets/img/WomanBottom/1-darkBeige-2.jpg";
import img3 from "../../assets/img/WomanBottom/1-darkBeige-3.jpg";
import img4 from "../../assets/img/WomanBottom/1-darkBeige-4.jpg";

const BasketWrap = styled.div`
  width: 1200px;
  height: 700px;
  margin: 200px 0 0 220px;
  .dsc {
    padding: 10px 2px;
    box-sizing: border-box;
    margin: 20px 0;
    width: 25%;
    background-color: rgba(0, 0, 0, 0.08);
    text-align: center;
    span {
      font-size: 10px;
    }
  }
  .itemCnt {
    margin-top: 50px;
    height: 600px;
    font-size: 11.5px;
    width: 1300px;
    overflow: auto;
    white-space: nowrap;
    display: flex;
    ::-webkit-scrollbar {
      width: 2px;
    }
    ::-webkit-scrollbar-thumb {
      background-color: black;
      border-radius: 10px;
      background-clip: padding-box;
      border: 7px solid transparent;
    }
    ::-webkit-scrollbar-track {
      background-color: white;
    }
    /* .itemWrap {
      height: 550px;
    } */
    .iName {
      /* margin-bottom: 10px; */
      font-weight: 500;
      font-size: 12px;
    }
    .infoWrap {
      width: 100%;
      display: flex;
      height: 600px;
      margin-top: 10px;

      .imgCnt {
        height: 70%;
        width: 420px;
        float: left;
        img {
          width: 100%;
        }
      }
      .infoCnt {
        margin-left: 20px;
        height: 90%;
        width: 35%;
        position: relative;
        line-height: 15px;
        span {
          margin-bottom: 10px;
          &:nth-child(5) {
            line-height: 400px;
          }
        }
        button {
          font-size: 12px;
          background-color: transparent;
          border: none;
          box-shadow: none;
          border-radius: 0;
          padding: 0;
          overflow: visible;
          cursor: pointer;
          margin: -10px 0 20px 0;
          &:hover {
            text-decoration: underline;
          }
        }
        button,
        span {
          display: block;
          font-weight: 200;
        }

        .counter {
          display: flex;
          width: 100px;
          button {
            vertical-align: text-bottom;
            margin: 0;
          }
          p {
            font-size: 10px;
            margin: 0 20px;
          }
          span {
            line-height: inherit;
          }
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

const Basket = memo(() => {
  const sampleData = [
    {
      src: img1,
      id: 1,
      name: "울 점퍼",
      size: "L",
      price: "340000",
      color: "black",
    },
    {
      src: img2,
      id: 2,
      name: "티셔츠",
      size: "XL",
      price: "687000",
      color: "white",
    },
    {
      src: img3,
      id: 3,
      name: "스커트",
      size: "M",
      price: "368000",
      color: "grey",
    },
    {
      src: img4,
      id: 4,
      name: "아우터",
      size: "XS",
      price: "12800",
      color: "navy",
    },
    {
      src: img,
      id: 5,
      name: "팬츠",
      size: "L",
      price: "780600",
      color: "blue",
    },
  ];
  // const countRef = useRef();
  const [counter, setCounter] = useState(1);
  //아이템 갯수 증가
  const itemCount = useCallback((e) => {
    e.preventDefault();
    e.currentTarget.value == "+"
      ? setCounter(counter + 1)
      : counter <= 1
      ? alert("한 개 이상부터 주문 가능합니다.")
      : setCounter(counter - 1);
  });
  return (
    <>
      <Header display="none" />
      <BasketWrap>
        <div className="nav">
          <MenuLink to="/basket">바스켓백</MenuLink>
          <MenuLink to="/wishlist">마음에 드는 제품</MenuLink>
        </div>
        <div className="dsc">
          <span>
            장바구니에 담긴 상품은 구매가 완료될 때까지 예약되지 않습니다.
          </span>
        </div>
        <div className="itemCnt">
          {sampleData.map((v, i) => {
            return (
              <div className="itemWrap">
                <p className="iName">{sampleData[i]["name"]}</p>
                <div className="infoWrap">
                  <div className="imgCnt">
                    <img src={sampleData[i]["src"]} />
                  </div>
                  <div className="infoCnt">
                    <span>item number</span>
                    <span>{sampleData[i]["color"]}</span>
                    <span>{sampleData[i]["size"]}</span>
                    <span>items</span>
                    <span>{sampleData[i]["price"]}원</span>
                    <button>나중을 위해 저장하기</button>
                    <button>삭제하기</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <Routes>
          <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
      </BasketWrap>
    </>
  );
});

export default Basket;
