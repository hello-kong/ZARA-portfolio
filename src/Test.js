import React, { memo } from "react";
import { contextType } from "react-modal";
import styled from "styled-components";
import img1 from "./assets/img/bg_m1.jpg";

const Testdiv = styled.div`
  width: 100%;
  /* background-color: black; */
  canvas {
    width: 100%;
    background-color: black;
    img {
      width: 100%;
      justify-content: center;
      margin: auto;
    }
  }
`;
const Test = memo(() => {
  //   const TestCanvas = document.getElementsByTagName("canvas");
  //   const cvs = TestCanvas.gextContext(contextType);
  //   console.log(contextType);
  const canvas = document.getElementsByTagName("canvas");
  const ctx = canvas.getContext(contextType);
  console.log(contextType);
  return (
    <Testdiv>
      <canvas>
        <img src={img1} />
      </canvas>
    </Testdiv>
  );
});

export default Test;
