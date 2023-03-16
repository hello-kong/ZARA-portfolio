import React, { memo } from "react";
import styled from "styled-components";

import img from "../assets/img/22-creamWhite-1.jpg";

// 주문 데이터에 따라 데이터 넣기, 주문한 상품 목록 데이터 map으로 돌려 table 만들기, 데이터 수정 및 저장 기능, 선택한 상품 삭제 기능 구현 예정.

const Container = styled.div`
    width: 100%;
    height: 100%;
    padding: 1%;
    box-sizing: border-box;

    form {
        width: 100%;
        height: 100%;
        & > div {
            width: 100%;
            height: 300px;
            background-color: #fff;
            margin-bottom: 20px;

            &:last-child {
                margin-bottom: 0;
            }

            .deliveryTitle {
                width: 100%;
                height: 50px;
                padding: 15px;
                box-sizing: border-box;
                border-bottom: 1px solid #eee;
				display: flex;
				justify-content: space-between;

				button {
					width: 100px;
					margin: 0;
					padding: 0;
				}
            }

            .content {
                width: 100%;
                padding: 15px;
                box-sizing: border-box;
            }
        }

        .deliveryInfo {
            width: 300px;
            height: 120px;
        }

        .deliveryProduct {
            height: auto;
            table {
                width: 100%;
                height: 100%;

                tr {
                    border-bottom: 1px solid #eee;
                }

                th,
                td {
                    text-align: center;
                    padding: 10px;
                    box-sizing: border-box;
                    vertical-align: middle;
                    border-right: 1px solid #eee;

                    &:first-child {
                        width: 20px;
                        border-left: 1px solid #eee;
                    }

                    &:nth-of-type(3n) {
                        width: 30%;
                    }
                }

                th {
                    background-color: #888;
                    color: #fff;
                }

                td {
                    img {
                        width: 50px;
                        height: 50px;
                    }

                    input[type="number"] {
                        width: 30px;
                        border: none;
                        outline: none;
						text-align: center;

						&::-webkit-outer-spin-button, &::-webkit-inner-spin-button {
							-webkit-appearance: none;
							margin: 0;
						}
                    }
                }
            }
        }

        .info {
            background-color: transparent;
            display: flex;
            justify-content: space-between;

            .deliveryUser,
            .deliveryAddress {
                width: 49%;
                background-color: #fff;
            }

            .content {
                table {
                    width: 80%;

                    tr {
                        border-bottom: 1px solid #eee;
                    }

                    th,
                    td {
                        box-sizing: border-box;
                    }

                    th {
                        background-color: #888;
                        color: #fff;
                    }
                }
            }

            .deliveryUser {
                .content {
                    table {
                        margin-top: 20px;

                        th,
                        td {
                            padding: 20px;
                        }
                    }
                }
            }

            .deliveryAddress {
                .content {
                    table {
                        th {
                            width: 40%;
                            padding: 10px;
                            vertical-align: middle;
                        }

                        tr {
                            td {
                                height: 40px;
                                padding: 0;

                                input {
                                    width: 100%;
                                    height: 100%;
                                    border: none;
                                    border-bottom: 1px solid #000;
                                    outline: none;
                                    box-sizing: border-box;
                                }
                            }

                            &:nth-of-type(3) {
                                td {
                                    box-sizing: border-box;
                                    vertical-align: middle;
                                    label {
                                        font-size: 14px;
                                    }
                                    input {
                                        height: 30px;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        background-color: transparent;
        height: auto;

        button {
            padding: 10px 50px;
            background-color: #fff;
            border: none;
            margin: auto;
            display: block;
        }
    }
`;

const adminDeliveryDetail = memo(() => {
    return (
        <Container>
            <form>
                <div className="deliveryInfo">
                    <div className="deliveryTitle">
                        <p>기본 정보</p>
                    </div>
                    <div className="content">
                        <p>
                            주문번호: <span>000001</span>
                        </p>
                        <p>
                            주문일시: <span>2022.12.28</span>
                        </p>
                    </div>
                </div>
                <div className="deliveryProduct">
                    <div className="deliveryTitle">
                        <p>주문 상품 정보</p>
						<button type="button">상품 삭제하기</button>
                    </div>
                    <div className="content">
                        <table>
                            <thead>
                                <tr>
                                    <th>
                                        <input type="checkbox" />
                                    </th>
                                    <th>상품 이미지</th>
                                    <th>상품정보</th>
                                    <th>수량</th>
                                    <th>가격</th>
                                    <th>기타사항</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <input type="checkbox" />
                                    </td>
                                    <td>
                                        <img src={img} alt="상품" />
                                    </td>
                                    <td>신발</td>
                                    <td>
                                        <input type="number" min={0} />
                                    </td>
                                    <td>45000</td>
                                    <td>옵션</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="info">
                    <div className="deliveryUser">
                        <div className="deliveryTitle">
                            <p>주문자 정보</p>
                        </div>
                        <div className="content">
                            <table>
                                <tbody>
                                    <tr>
                                        <th>주문자명</th>
                                        <td>사람1</td>
                                    </tr>
                                    <tr>
                                        <th>이메일</th>
                                        <td>1111@naver.com</td>
                                    </tr>
                                    <tr>
                                        <th>연락처</th>
                                        <td>01011111111</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="deliveryAddress">
                        <div className="deliveryTitle">
                            <p>수령인 정보</p>
                        </div>
                        <div className="content">
                            <table>
                                <tbody>
                                    <tr>
                                        <th>수령인명</th>
                                        <td>
                                            <input type="text" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>연락처</th>
                                        <td>
                                            <input type="text" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>배송지 주소</th>
                                        <td>
                                            <label>
                                                우편번호
                                                <input type="text" />
                                            </label>
                                            <label>
                                                주소
                                                <input type="text" />
                                            </label>
                                            <label>
                                                상세주소
                                                <input type="text" />
                                            </label>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="deliveryEtc">
                    <div className="deliveryTitle">
                        <p>기타사항</p>
                    </div>
                    <div className="content"></div>
                </div>
                <button type="submit">저장하기</button>
            </form>
        </Container>
    );
});

export default adminDeliveryDetail;
