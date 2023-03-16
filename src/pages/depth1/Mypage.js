import React, { memo, useCallback, useRef } from "react";
import styled from "styled-components";

import img from "../../assets/img/modelsample.jpg";
import img1 from "../../assets/img/WomanBottom/1-darkBeige-1.jpg";
import img2 from "../../assets/img/WomanBottom/1-darkBeige-2.jpg";
import img3 from "../../assets/img/WomanBottom/1-darkBeige-3.jpg";
import img4 from "../../assets/img/WomanBottom/1-darkBeige-4.jpg";

const MypageWrap = styled.div`
  margin-top: 100px;
  width: 1200px;
  height: 700px;
  margin: 320px 0 0 220px;

  .orderCnt {
    height: 85%;
    font-size: 11.5px;
    width: 100%;
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
    .orderWrap {
      height: 550px;
    }
    .iName {
      margin-bottom: 20px;
    }
    .infoWrap {
      display: flex;
      height: 500px;

      .imgCnt {
        height: 100%;
        width: 360px;
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
            line-height: 330px;
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
          display: inline-block;
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
      }
    }
  }
`;

const Mypage = memo(() => {
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

  //주문내역
  const orderRef = useRef();
  //주문내역 삭제버튼
  const onDelete = useCallback((e) => {
    e.preventDefault();
    const current = e.currnetTarget;
    console.log(orderRef.current);
  });
  return (
    <MypageWrap>
      <div className="orderCnt" ref={orderRef}>
        {sampleData.map((v, i) => {
          return (
            <div className="orderWrap">
              <div className="iName">{sampleData[i]["name"]}</div>
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
                  <button onClick={onDelete}>삭제하기</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </MypageWrap>
  );
});

export default Mypage;
