import React, { memo, useState, useCallback } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useParams } from "react-router-dom";

//commom
import BottomBar from "../../common/BottomBar";

//img
import creditcard from "../../assets/img/credit-card.svg";
import escrow from "../../assets/img/escrow.svg";
import In from "../../assets/img/in.svg";
import bank from "../../assets/img/bank-transfer.svg";
import sample from "../../assets/img/modelsample.jpg";
import img1 from "../../assets/img/WomanBottom/1-darkBeige-1.jpg";
import img2 from "../../assets/img/WomanBottom/1-darkBeige-2.jpg";
import img3 from "../../assets/img/WomanBottom/1-darkBeige-3.jpg";
import img4 from "../../assets/img/WomanBottom/1-darkBeige-4.jpg";

const LastPayment = styled.div`
  width: 1500px;
  height: 800px;
  margin: auto;
  display: flex;
  margin-top: 60px;
  .address {
    width: 35%;
    margin-left: 4%;
    margin-top: 9.7%;
    .orange {
      color: rgb(255, 147, 9);
      border: 1px solid rgb(255, 147, 9);
      padding: 15px 5px;
      width: 405px;
      text-align: center;
      margin-bottom: 20px;
      box-sizing: border-box;
      p {
        font-size: 12px;
      }
    }
    .shipping {
      h3 {
        padding: 20px 0;
        font-size: 15px;
      }
      p {
        padding: 10px 0;
        font-size: 11px;
      }
    }
    .userAddress {
      padding: 15px 0;
      p {
        font-size: 11px;
        font-weight: 200;
        &:first-child {
          padding: 15px 0;
        }
      }
    }
    .payment {
      h3 {
        margin-top: 40px;
      }
      .card {
        padding: 30px 0;
        img {
          height: 35px;
          float: left;
          margin-right: 20px;
        }
        p {
          font-weight: 200;
          font-size: 8px;
          &:first-of-type {
            font-weight: bold;
            margin-bottom: 5px;
            font-size: 10px;
          }
          span {
            font-weight: bold;
          }
          &::after {
            clear: both;
          }
        }
      }
    }
  }
  .itemImg {
    width: 100%;
    margin: auto;
    margin-left: 12%;
    overflow: auto;
    white-space: nowrap;

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

    .infoCnt {
      margin-top: 16%;
      h3 {
        padding: 8px 0;
      }
      p {
        font-size: 12px;
        margin-bottom: 15px;
      }
    }
    .imgCnt {
      display: flex;

      img {
        margin-right: 10px;
        width: 275px;
      }
    }
  }
  .nav {
    padding: 10px 0;
    text-decoration: underline;
    font-size: 8px;
    font-weight: 200;
  }
`;

const Payment_last = memo(() => {
  const params = useParams();
  const index = params.index;

  const boxCont = [
    {
      src: creditcard,
      cont: "CREDITCARD",
    },
    {
      src: In,
      cont: "IN CARD",
    },
    {
      src: escrow,
      cont: "에스크로",
    },
    {
      src: bank,
      cont: "계좌이체",
    },
  ];

  const sampleData = [
    { src: img1, id: 1 },
    { src: img2, id: 2 },
    { src: img3, id: 3 },
    { src: img4, id: 4 },
    { src: sample, id: 5 },
  ];

  return (
    <LastPayment>
      <div className="address">
        <div className="orange">
          <p>
            할인이 적용되지 않은 제품의 경우에만 49,000원 이상 구매 시 무료
            배송.
          </p>
        </div>
        <div className="shipping">
          <h3>배송</h3>
          <p>자택배송</p>
          <NavLink to="/shipping" className="nav">
            편집
          </NavLink>
        </div>
        <div className="userAddress">
          <p>김김김</p>
          <p>서울특별시 어쩌구 어쩌고</p>
          <p>강남 이젠아카데미 1403호</p>
          <p>12345</p>
          <p>대한민국</p>
          <p>+82 01029393941</p>
          <NavLink to="/shipping?sidebaropen=true" className="nav">
            편집
          </NavLink>
        </div>
        <div className="payment">
          <h3>결제</h3>
          <div className="card">
            <img
              src={boxCont[parseInt(index)]["src"]}
              alt={boxCont[parseInt(index)]["cont"]}
            />
            <p>{boxCont[parseInt(index)]["cont"]}</p>
            <p>
              <span>"결제승인"</span>을 클릭하시면 KCP 사이트로 이동 후 결제를
              완료하실 수 있습니다
            </p>
          </div>
          <NavLink to={`/payment/${index}`} className="nav">
            편집
          </NavLink>
        </div>
      </div>
      <div className="itemImg">
        <div className="infoCnt">
          <h3>배송 토요일</h3>
          <p>{sampleData.length} 상품</p>
        </div>

        <div className="imgCnt">
          {sampleData.map((v, i) => {
            return <img key={v.id} src={sampleData[i]["src"]} />;
          })}
        </div>
      </div>
      <BottomBar />
    </LastPayment>
  );
});

export default Payment_last;
