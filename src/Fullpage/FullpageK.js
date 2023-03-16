// import ScrollHorizontal from "react-scroll-horizontal";
import React, { memo } from "react";
import styled from "styled-components";
import { Slide, FullPage } from "react-full-page/lib";

//img
import bgk1 from "../assets/img/bg_k1.jpg";
import bgk2 from "../assets/img/bg_k2.jpg";

import Footer from "../common/Footer.js";

const TestWrap = styled.div`
  height: 100vh;
  display: flex;
  img {
    width: 100vw;
    height: 100vh;
    object-fit: cover;
  }
`;

const FullpageK = memo(() => {
  return (
    <TestWrap>
      <FullPage>
        <Slide>
          <img src={bgk1} />
        </Slide>
        <Slide>
          <img src={bgk2} />
        </Slide>
        <Slide>
          <Footer />
        </Slide>
      </FullPage>
    </TestWrap>
  );
});

export default FullpageK;
