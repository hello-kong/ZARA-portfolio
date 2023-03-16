import React, { memo, useEffect, useState, useRef } from "react";
import styled from "styled-components";
import classNames from "classnames";

//Vid
import vid01 from "../../assets/video/video01.mp4";
import vid02 from "../../assets/video/video02.mp4";

//Fullpage
import FullpageW from "../../Fullpage/FullpageW";
import FullpageM from "../../Fullpage/FullpageM";
import FullpageK from "../../Fullpage/FullpageK";

//이미지
import { ArrowBack, ArrowForward } from "../../components/IconView";

//Header
import Header from "../../common/Header";

const Main = styled.div`
  width: 100%;
  color: black;
  font-weight: 100;
  font-size: 13px;

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .display {
    display: none;
  }
`;
const NavWrap = styled.div`
  width: 100%;
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 60px;
  font-size: 13px;

  nav {
    &:hover {
      cursor: pointer;
    }
    &.active {
      font-weight: 500;
    }
  }
  nav:nth-child(2) {
    margin: 0 -600px;
  }
`;
const SlideWrap = styled.div`
  display: flex;
  position: fixed;
  height: 100%;
  width: 100%;
  background: transparent;
  -ms-overflow-style: none;

  &:-webkit-scrollbar {
    display: none;
  }
  ul {
    display: flex;
    width: 100%;
    justify-content: space-between;

    li {
      height: 50px;
      display: block;
      cursor: pointer;
      line-height: 50px;
      &:first-of-type {
        position: fixed;
        top: 50%;
        /* left: 2.2%; */
        left: 3%;
        transform: translate(-50%, -50%);
      }
      &:nth-child(2) {
        position: fixed;
        top: 50%;
        right: 0%;
        transform: translate(-50%, -50%);
      }
      svg {
        width: 27px;
        vertical-align: middle;
        &:nth-child(1) {
          margin-right: -12px;
          margin-left: -24px;
          transition: all 0.5s;
          &:hover {
            margin-left: -34px;
          }
        }
        &:nth-child(2) {
          margin-left: 20px;
          transition: all 0.7s;
          &:hover {
            margin-right: -10px;
          }
        }
      }
      span {
        position: fixed;
        display: inline-block;
        vertical-align: middle;
        padding-top: 3px;
        font-size: 12px;
        &:first-of-type {
          position: fixed;
        }
        &:nth-child(2) {
          position: fixed;
        }
      }
    }
  }
`;

const Carousel = styled.div`
  width: 100%;
  height: 100%;

  @keyframes slide {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  .bg {
    width: 100%;
    height: 100%;

    & > div {
      animation: slide 1s;
    }

    .active {
      display: block;
    }
    .deactive {
      display: none;
    }
  }
`;

const Mainpage = memo(() => {
  //scroll
  const scrollRef = useRef();

  const [PageIndex, SetPageIndex] = useState(1);

  //페이지별 버튼 숨기기
  const [hiddenBtn, setHiddenBtn] = useState(false);
  const [hiddenBtn2, setHiddenBtn2] = useState(false);

  //logo컬러
  const [logoColor, setLogoColor] = useState("black");

  //스크롤 위치
  const [scrollY, setScrollY] = useState(0);

  //푸터 숨기기
  const [hiddenFooter, setHiddenFooter] = useState(false);

  //백그라운드 이동
  const Pages = [
    { id: 1, name: "WOMAN", component: <FullpageW /> },
    { id: 2, name: "MAN", component: <FullpageM /> },
    { id: 3, name: "KIDS", component: <FullpageK /> },
  ];

  //스크롤 감지
  const onScroll = () => {
    setScrollY(window.scrollY);
    scrollY + window.innerHeight > 2100
      ? // console.log("footer 숨기기");
        setHiddenFooter(true)
      : setHiddenFooter(false);
  };
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [scrollY]);

  // 스크롤바 숨기기
  useEffect(() => {
    document.body.style.cssText = `overflow: hidden;`;
    return () => {
      document.body.style.cssText = " ";
    };
  }, []);

  //인덱스에 따라 버튼 숨기기
  useEffect(() => {
    if (PageIndex === 1) {
      setHiddenBtn(true);
      setLogoColor("black");
    } else if (PageIndex === 3) {
      setHiddenBtn2(true);
      setHiddenBtn(false);
      setLogoColor("black");
    } else {
      setHiddenBtn(false);
      setHiddenBtn2(false);
      setLogoColor("blue");
    }
  }, [PageIndex]);

  return (
    <div>
      <Header logoColor={logoColor} />
      <Main style={{ color: logoColor }}>
        <SlideWrap className={classNames({ display: hiddenFooter })}>
          <ul>
            <li
              onClick={() => {
                if (PageIndex !== 1) {
                  SetPageIndex(PageIndex - 1);
                }
              }}
              className={classNames({ display: hiddenBtn })}
            >
              <ArrowBack fill={logoColor} />
              {Pages.map((v, i) => {
                if (PageIndex === 2 && i == 0) {
                  return <span key={v.id}>{Pages[i]["name"]}</span>;
                } else if (PageIndex === 3 && i == 1) {
                  return <span key={v.id}>{Pages[i]["name"]}</span>;
                }
              })}
            </li>
            <li
              onClick={() => {
                if (PageIndex !== Pages.length) {
                  SetPageIndex(PageIndex + 1);
                }
              }}
              className={classNames({ display: hiddenBtn2 })}
            >
              {Pages.map((v, i) => {
                if (PageIndex === 1 && i == 1) {
                  return <span key={v.id}>{Pages[i]["name"]}</span>;
                } else if (PageIndex === 2 && i == 2) {
                  return <span key={v.id}>{Pages[i]["name"]}</span>;
                }
              })}
              <ArrowForward fill={logoColor} />
            </li>
          </ul>
        </SlideWrap>
        <NavWrap className={classNames({ display: hiddenFooter })}>
          {Pages.map((v, i) => {
            return (
              <nav
                key={v.id}
                onClick={() => {
                  v.id === 1
                    ? SetPageIndex(1)
                    : v.id === 2
                    ? SetPageIndex(2)
                    : SetPageIndex(3);
                }}
                className={PageIndex === i + 1 ? "active" : " "}
              >
                {Pages[i]["name"]}
              </nav>
            );
          })}
        </NavWrap>
        <Carousel>
          <div className="bg" ref={scrollRef}>
            {Pages.map((v, i) => {
              return (
                <div
                  key={v.id}
                  className={PageIndex === i + 1 ? "active" : "deactive"}
                >
                  {Pages[i]["component"]}
                </div>
              );
            })}
          </div>
        </Carousel>
      </Main>
    </div>
  );
});

export default Mainpage;
