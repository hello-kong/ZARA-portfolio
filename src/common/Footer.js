import React, { memo } from "react";
import styled from "styled-components";

const FooterWrap = styled.div`
  color: black;
  width: 100%;
  padding-bottom: 100px;

  h3 {
    text-align: center;
    position: absolute;
    top: 55%;
    font-size: 16px;
    font-weight: 100;
  }
  .SNSWrap {
    color: black;
    width: 700px;
    height: 650px;
    margin: auto;
    position: relative;
    margin-top: 8%;
    display: flex;
    justify-content: center;

    a {
      margin: 70% 10px;
      font-size: 8px;
    }
  }
  .Info {
    width: 710px;
    margin-left: 11.7%;
    margin-top: 5.2%;
    bottom: 3%;

    p {
      font-size: 1.1px;
      line-height: 1.2;
      letter-spacing: 0.1px;
      font-weight: 100;
      a {
        text-decoration: underline;
        cursor: pointer;
        font-weight: bold;
      }
    }
  }
`;

const Footer = memo(() => {
  return (
    <FooterWrap>
      <div className="SNSWrap">
        <h3>뉴스레터에 가입하세요</h3>
        <a href="https://www.tiktok.com/@zara">TIKTOK</a>
        <a href="https://www.instagram.com/zara/">INSTAGRAM</a>
        <a href="https://www.facebook.com/Zara">FACEBOOK</a>
        <a href="https://www.facebook.com/Zara">TWITTER</a>
        <a href="pinterest.es/zaraofficial/">PINTEREST</a>
        <a href="http://pf.kakao.com/_CxeIxjl">KAKAO</a>
        <a href="https://www.youtube.com/user/zara">YOUTUBE</a>
        <a href="https://open.spotify.com/user/r6ivwuv0ebk346hhxo446pbfv">
          SPOTIFY
        </a>
      </div>
      <div className="Info">
        <p>
          아이티엑스코리아 유한회사 ｜ 사업자등록번호: 120-88-14733 ｜ 대표자 :
          ROMAY DE LA COLINA JOSE MANUEL ｜ 서울시 강남구 영동대로 511 (삼성동,
          트레이드타워 33층) ｜ 대표번호: 080-479-0880 | 이메일:
          contact.kr@zara.com ｜ 호스팅 서비스 사업자: ITX Merken, B.V. ｜
          통신판매업신고 : 제2014-서울강남-02297 (<a>사업자정보확인</a>) ｜
          <a>개인정보처리방침</a> | <a>이용약관</a>
        </p>
      </div>
    </FooterWrap>
  );
});

export default Footer;
