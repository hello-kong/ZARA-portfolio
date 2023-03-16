import React, { memo, useCallback, useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

import classNames from "classnames";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import InlineEditor from "@ckeditor/ckeditor5-build-inline";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

// 검색, 내보내기, 추가하기, 삭제하기, 체크박스 전체 선택, 클릭 시 상세 페이지로 넘어가기, 메일 보내기 구현 예정

const Container = styled.div`
    width: 100%;
    height: 100%;
    position: relative;


	.hidden {
		display: none;
	}

    .overlay {
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 1;
        background-color: rgba(209, 209, 209);
        opacity: 0.5;
    }

    .mailBox {
        width: 500px;
        height: 550px;
        background-color: #fff;
        opacity: 1;
        position: fixed;
        top: 20%;
        left: 45%;
        z-index: 5;

        .titleBox {
            width: 100%;
            height: 50px;
            display: flex;
            justify-content: space-between;
            padding: 15px;
            box-sizing: border-box;
            border-bottom: 1px solid #eee;

            p {
                color: #777;
            }

            button {
                width: 20px;
                height: 20px;
                background-color: transparent;
                border: none;
            }
        }

        .contentBox {
            width: 100%;
            height: 450px;
            padding: 15px;
            box-sizing: border-box;

            form {
                width: 100%;
                height: 100%;
                padding: 0;
                flex-direction: column;

                .mail {
                    width: 100%;
                    height: 100%;
					margin-bottom: 20px;

					.ck {
						height: 100%;
					}
                }

                button {
                    width: 100px;
                    height: 30px;
                    background-color: #fff;
                    border: 1px solid #b2aeae;
                    transform: translateX(190%);
                }
            }
        }
    }

    .content {
        padding: 3%;
        box-sizing: border-box;
        .search {
            width: 100%;
            height: 50px;
            display: flex;
            justify-content: space-between;

            form {
                width: 80%;
                height: 100%;
                background-color: #fff;
                display: flex;

                button {
                    width: 50px;
                    height: 100%;
                    font-size: 30px;
                    background-color: #fff;
                    border: none;
                }

                input {
                    width: 90%;
                    border: none;
                    outline: none;
                    font-size: 16px;
                }
            }

            button {
                width: 10%;
                background-color: #fff;
                border: none;
            }
        }

        .userList {
            width: 100%;
            background-color: #fff;
            margin-top: 30px;
            padding: 30px;
            box-sizing: border-box;

            p {
                font-size: 18px;
                margin-bottom: 20px;
            }

            table {
                width: 100%;
                text-align: center;

                tr {
                    border-bottom: 1px solid #d5d5d5;

                    th,
                    td {
                        padding: 10px;
                        box-sizing: border-box;
                    }

                    th {
                        color: #999;
                    }

                    td {
                        font-size: 14px;
                        button {
                            background-color: #fff;
                            border: none;
                        }
                    }
                }
            }
        }
    }
`;

const adminUser = memo(() => {
    const [pop, setPop] = useState(true);

    const onMailPop = useCallback(
        (e) => {
            setPop(!pop);
        },
        [pop]
    );

    const onSubmit = useCallback((e) => {
        e.preventDefault();
		setPop(true);
    }, []);

    return (
        <Container>
            <div className={classNames("overlay", { hidden: pop })}></div>
            <div className={classNames("mailBox", { hidden: pop })}>
                <div className="titleBox">
                    <p>메일 보내기</p>
                    <button type="button" onClick={onMailPop}>
                        <FontAwesomeIcon icon={faX} />
                    </button>
                </div>
                <div className="contentBox">
                    <form method="post" onSubmit={onSubmit} >
                        <div className="mail">
                            <CKEditor
                                editor={InlineEditor}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                }}
								data = '메일 내용을 입력하세요.'
                            />
                        </div>
                        <button type="submit">전송</button>
                    </form>
                </div>
            </div>
            <div className="content">
                <div className="search">
                    <form>
                        <button type="submit">
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                        <input type="text" placeholder="검색" />
                    </form>
                    <button type="button" onClick={onMailPop}>메일 보내기</button>
                </div>
                <div className="userList">
                    <p>전체 사용자 n명</p>
                    <table>
                        <thead>
                            <tr>
                                <th>
                                    <input type="checkbox" />
                                </th>
                                <th>이름</th>
                                <th>아이디</th>
                                <th>가입일</th>
                                <th>메모</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <input type="checkbox" />
                                </td>
                                <td>
                                    <NavLink to="/admin/users_detail">
                                        관리자
                                    </NavLink>
                                </td>
                                <td>id111</td>
                                <td>2022.12.16</td>
                                <td>메모메모메모</td>
                                <td>
                                    <button type="button">삭제하기</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </Container>
    );
});

export default adminUser;
