import React, { memo } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

// 회원정보 데이터 가져와서 출력, 해당 회원 주문내역 데이터로 map 돌려서 주문내역 만들기, 날짜 간 주문내역 부분조회 예정.

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
    padding: 1% 0;
    box-sizing: border-box;

    .info,
    .delivery {
        background-color: #fff;
        width: 48%;
        height: 550px;

        .title {
            width: 100%;
            height: 50px;
            border-bottom: 1px solid #eee;
            padding: 15px 25px;
            box-sizing: border-box;

            p {
                font-size: 16px;
            }
        }

        .profile,
        .address,
        .list {
            width: 100%;
            padding: 20px;
            box-sizing: border-box;
        }
    }

    .profile,
    .address,
    .list {
        table {
            width: 100%;
            th {
                width: 40%;
                padding: 10px;
                vertical-align: middle;
                background-color: #888;
                border-bottom: 1px solid #eee;
                color: #fff;
            }

            tr {
                td {
                    height: 40px;
                    vertical-align: middle;

                    input {
                        width: 100%;
                        height: 100%;
                        border: none;
                        border-bottom: 1px solid #000;
                        outline: none;
                        padding: 0 5px;
                        box-sizing: border-box;
                    }
                }
            }
        }
    }

    .profile {
        margin-top: 80px;

        table {
            td {
                padding: 0 5px;
            }
        }
    }

    .address {
        table {
            tr {
                &:nth-of-type(2) {
                    td {
                        box-sizing: border-box;

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

    .list {
        
		.date {
			display: flex;
			align-items: center;

			.start, .end {
				width: 100px;
				height: 50px;
				margin-right: 40px;

				label {
					font-size: 12px;
				}

				input {
					border: none;
					outline: none;
				}
			}
		}

        table {
            tr {
                border-bottom: 1px solid #eee;
                th {
                    width: auto;
                    border: none;
                }

                td {
                    text-align: center;
                }
            }
        }
    }
`;

const adminUserDetail = memo(() => {
    return (
        <Container>
            <div className="info">
                <div className="title">
                    <p>회원 정보</p>
                </div>
                <div className="profile">
                    <table>
                        <tbody>
                            <tr>
                                <th>이름</th>
                                <td>이름들어갈예정</td>
                            </tr>
                            <tr>
                                <th>이메일</th>
                                <td>이메일들어갈예정</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="address">
                    <table>
                        <tbody>
                            <tr>
                                <th>연락처</th>
                                <td>
                                    <input type="text" readOnly />
                                </td>
                            </tr>
                            <tr>
                                <th>주소</th>
                                <td>
                                    <label>
                                        우편번호
                                        <input type="text" readOnly />
                                    </label>
                                    <label>
                                        주소
                                        <input type="text" readOnly />
                                    </label>
                                    <label>
                                        상세주소
                                        <input type="text" readOnly />
                                    </label>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="delivery">
                <div className="title">
                    <p>주문 내역</p>
                </div>
                <div className="list">
                    <div className="date">
                        <div className="start">
                            <label htmlFor="startdate">시작날짜</label>
                            <input type="date" id="startdate" />
                        </div>
                        <div className="end">
                            <label htmlFor="enddate">종료날짜</label>
                            <input type="date" id="enddate" />
                        </div>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>주문일시</th>
                                <th>주문번호</th>
                                <th>진행상태</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>2022.12.28</td>
                                <td>
                                    <NavLink to="/admin/delivery_detail">
                                        000001
                                    </NavLink>
                                </td>
                                <td>배송준비</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </Container>
    );
});

export default adminUserDetail;
