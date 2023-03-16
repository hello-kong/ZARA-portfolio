import React, { memo } from "react";
import styled from "styled-components";

const AddressSetWrapper = styled.div`
  margin-top: 170px;
  padding-left: 12%;
  box-sizing: border-box;
  width: 1200px;

  h2 {
    font-weight: 300;
    font-size: 25px;
    padding: 8px 0;
    margin-bottom: 10px;
  }
  .not {
    font-weight: 300;
    padding: 10px 0 25px 0;
  }

  .direction {
    width: 730px;
    height: 16px;
    padding: 16px;
    border: 1px solid #aaa;
    margin-bottom: 15px;

    p {
      font-size: 10px;
      color: #aaa;
    }
  }

  .radio {
    width: 400px;
    font-size: 12px;
    margin-bottom: 25px;

    label {
      &:last-child {
        margin-left: 30px;
      }
    }
    input,
    radio {
      accent-color: #000;
      vertical-align: text-bottom;
    }
  }

  .addressEdit {
    margin-top: 10px;
    width: 1200px;
    display: grid;
    grid-template-columns: 380px 400px;
    grid-gap: 0 20px;

    .common {
      position: relative;
      margin-bottom: 20px;

      input {
        width: 380px;
        height: 27px;
        border: none;
        outline: none;
        border-bottom: 1px solid #aaa;
        margin-right: 20px;
      }

      .address {
        border-bottom: 0;
      }

      label {
        font-size: 9px;
      }

      .ani {
        position: absolute;
      }
    }

    .postNumContainer {
      display: grid;
      grid-template-columns: 380px 380px;

      .postNum {
        display: flex;
        input {
          width: 200px;
        }
        button {
          width: 200px;
          border: none;
          background-color: #000;
          color: #fff;
          font-size: 10px;
          height: 30px;
        }
      }
    }

    .region {
      width: 380px;
      border: none;
      outline: none;
      margin-right: 20px;

      p {
        font-size: 10px;

        &:last-child {
          font-size: 12px;
          color: #aaa;
        }
      }
    }

    .regionalNum {
      width: 380px;
    }

    .tel {
      input {
        width: 380px;
        outline: none;
        border: none;
        border-bottom: 1px solid #aaa;
        margin-top: 1px;
        margin-right: 20px;

        &:first-child {
          width: 20%;
        }

        &:last-child {
          width: calc(80% - 20px);
        }
      }
    }
  }

  .save {
    display: block;
    width: 380px;
    border: none;
    background-color: #000;
    color: #fff;
    padding: 10px;
    box-sizing: border-box;
  }
  .agreement {
    width: 400px;
    font-size: 12px;
    label {
      vertical-align: middle;
      input {
        accent-color: #000;
      }
      span {
        text-decoration: underline;
      }
    }
  }
`;

const AddressSet = memo(() => {
  return (
    <AddressSetWrapper>
      <div>
        <h2>영수증 주소 수정</h2>
        <p className="not">
          주문하기 위해 먼저 고객님의 계정 정보를 입력해야 합니다. 언제든지
          고객님의 계정에서 수정할 수 있습니다.
        </p>
        <div className="direction">
          <p>
            우편번호를 입력하여 주소를 검색하세요. 주소 필드는 검색을 기반으로
            자동 완성됩니다. 주소 2 필드에 필요한 정보를 입력하여 주소를 완성할
            수 있습니다.
          </p>
        </div>
      </div>
      <form className="radio">
        <label>
          <input type="radio" name="user" />
          일반회원
        </label>
        <label>
          <input type="radio" name="user" />
          법인회원
        </label>
      </form>
      <form className="addressEdit">
        <div className="common name first">
          <label className="ani">이름</label>
          <div>
            <input></input>
          </div>
        </div>
        <div className="common postNumContainer first">
          <label className="ani">우편번호</label>
          <div className="postNum">
            <input></input>
            <button>우편번호 찾기</button>
          </div>
        </div>
        <div className="common">
          <label>주소</label>
          <input className="address" readOnly="readOnly"></input>
        </div>
        <div className="common address2">
          <label>주소2</label>
          <input placeholder="선택 사항"></input>
        </div>
        <div className="common region">
          <p>지역</p>
          <p>대한민국</p>
        </div>
        <div className="common regionalNum">
          <label>지역번호</label>
          <div className="tel">
            <input placeholder="+82"></input>
            <input placeholder="전화" className="ani"></input>
          </div>
        </div>
      </form>
      <div className="agreement">
        <label>
          <input type="checkBox" />* <span>개인정보의 수집 및 이용</span>에 대한
          동의
        </label>
      </div>
    </AddressSetWrapper>
  );
});

export default AddressSet;
