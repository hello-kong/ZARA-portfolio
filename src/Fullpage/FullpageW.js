import React, { memo } from "react";
import styled from "styled-components";
import { Slide, FullPage } from "react-full-page/lib";

//img
import bg1 from "../assets/img/bg_sample1.jpg";
import bg3 from "../assets/img/bg_sample3.jpg";

import Footer from "../common/Footer.js";

const Wrap = styled.div`
  height: 100vh;
  img {
    width: 100vw;
    height: 100vh;
    object-fit: cover;
  }
`;
const FullpageW = () => {
  return (
    <Wrap>
      <FullPage>
        <Slide>
          <img src={bg1} />
        </Slide>
        <Slide>
          <img src={bg3} />
        </Slide>
        <Slide>
          <Footer />
        </Slide>
      </FullPage>
    </Wrap>
  );
};

export default memo(FullpageW);
