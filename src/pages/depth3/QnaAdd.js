import React, { memo, useEffect, useState, useCallback } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { QnaPost } from "../../slice/QnaSlice";
import dayjs from "dayjs";

import Editor from "../../components/Editor";
import mq from "../../MediaQuery";

const Container = styled.div`
    margin: auto;
    margin-top: 200px;
    margin-bottom: 20px;
    width: 60%;

    h1 {
        display: block;
        width: 140px;
        font-size: 30px;
        font-weight: bold;
        margin: auto;
        margin-bottom: 50px;
    }

    .table {
        width: 100%;
        margin: auto;

        table {
            width: 100%;
            margin: auto;
            border-collapse: collapse;
            font-size: 14px;

            tr {
                &:first-child {
                    th:nth-of-type(2) {
                        padding: 10px;
                    }
                }

                &:nth-of-type(3) {
                    td {
						border: 1px solid #eee;
					}
                }
            }

            th,
            td {
                border-top: 1px solid #eee;
                border-bottom: 1px solid #eee;
                vertical-align: middle;
            }

            th {
                padding: 30px;
                text-align: center;
                background-color: #eee;
                white-space: nowrap;
            }

            td {
                input {
                    width: 95%;
                    height: 30px;
                    border: none;

                    &:focus {
                        outline: none;
                    }
                }

                select {
                    margin-left: 20px;
                    width: 90%;
                    height: 35px;
                    border: none;
                }

                .ck {
                    height: 600px;
                }
            }
        }
    }

    .button {
        width: 220px;
        margin: auto;
        margin-top: 20px;

        button {
            padding: 10px 20px;
            margin-right: 10px;
            background-color: #000;
            color: #fff;
            border: 1px solid #000;
        }

        a {
            button {
                background-color: #fff;
                color: #000;
            }
        }
    }

    ${mq.maxWidth("sm")`
		width: 90%;
	`}
`;

const QnaAdd = memo(() => {
    const [content, setContent] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const OnSubmit = useCallback((e) => {
        e.preventDefault();
        const current = e.target;

        const type = current.type.value;
        const title = current.title.value;

        dispatch(
            QnaPost({
                type: type,
                content: content,
                title: title,
            })
        ).then((result) => {
            navigate(`/customerservice/listview/qna/${result.payload.data.qna.id}`);
        });
    }, [content]);

    return (
        <Container>
            <h1>QnA 작성</h1>
            <form onSubmit={OnSubmit}>
                <div className="table">
                    <table>
                        <tbody>
                            <tr>
                                <th>제목</th>
                                <td colSpan={2}>
                                    <input type="text" name="title" required />
                                </td>
                                <td>
                                    <select name="type" defaultValue={1}>
                                        <option value={1} hidden disabled>
                                            유형을 선택하세요.
                                        </option>
                                        <option value="상품문의">
                                            상품 문의
                                        </option>
                                        <option value="배송문의">
                                            배송 문의
                                        </option>
                                    </select>
                                </td>
                            </tr>
							<tr>
								<th colSpan={4}>내용</th>
							</tr>
                            <tr>
                                <td colSpan={4}>
                                    <Editor setContent={setContent} />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="button">
                    <button type="submit">등록하기</button>
                    <NavLink to="/customerservice/list/qna">
                        <button type="button">목록보기</button>
                    </NavLink>
                </div>
            </form>
        </Container>
    );
});

export default QnaAdd;
