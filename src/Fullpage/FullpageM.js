// import ScrollHorizontal from "react-scroll-horizontal";
import React, { memo } from "react";
import styled from "styled-components";
import { Slide, FullPage } from "react-full-page/lib";

//img
import bgm1 from "../assets/img/bg_m1.jpg";
import bgm2 from "../assets/img/bg_m2.jpg";

import Footer from "../common/Footer.js";

const TestWrap = styled.div`
  height: 100vh;
  /* display: flex; */
  img {
    width: 100vw;
    height: 100vh;
    object-fit: cover;
  }
`;

const FullpageM = memo(() => {
  return (
    <TestWrap>
      <FullPage>
        <Slide>
          <img src={bgm1} />
        </Slide>
        <Slide>
          <img src={bgm2} />
        </Slide>
        <Slide>
          <Footer />
        </Slide>
      </FullPage>
    </TestWrap>
  );
});

export default FullpageM;
