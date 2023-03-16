import React, { memo, useEffect, useState, useCallback, useMemo } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { QnaItem, QnaPut } from "../../slice/QnaSlice";
import dayjs from "dayjs";
import Parser from "react-html-parser";

import ErrorView from "../../components/ErrorView";
import Spinner from "../../components/Spinner";
import mq from "../../MediaQuery";
import Editor from "../../components/Editor";

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

                &:last-child {
                    td {
                        div {
                            height: 600px;
                        }
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

const QnaEdit = memo(() => {
    const [content, setContent] = useState(null);
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data, loading, error } = useSelector((state) => state.QnaSlice);

    useEffect(() => {
        dispatch(QnaItem({ id: id })).then((result) => {
            setContent(result.payload.data.qna.content);
        });
    }, []);

    const result = useMemo(() => {
        if (data) {
            return data;
        } else {
            dispatch(QnaItem({ id: id }));
        }
    }, [data]);

    const OnSubmit = useCallback(
        (e) => {
            e.preventDefault();
            const current = e.target;

            const id = result["qna"].id;
            const type = current.type.value;
            const title = current.title.value;

            if (window.confirm("수정하시겠습니까?")) {
                dispatch(
                    QnaPut({
                        id: id,
                        type: type,
                        content: content,
                        title: title,
                    })
                ).then((result) => {
                    navigate(
                        `/customerservice/listview/qna/${result.payload.data.qna.id}`
                    );
                });
            }
        },
        [result, content]
    );

    return (
        <Container>
            <h1>QnA 수정</h1>
            <Spinner
                color={"#aaa"}
                secondaryColor={"#d5d5d5"}
                visible={loading}
            />
            {error ? (
                <ErrorView error={error} />
            ) : (
                result && (
                    <form onSubmit={OnSubmit}>
                        <div className="table">
                            <table>
                                <tbody>
                                    <tr>
                                        <th>이름</th>
                                        <td colSpan={3}>
                                            <input
                                                type="text"
                                                name="name"
                                                defaultValue={
                                                    result["qna"].name
                                                }
                                                readOnly
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>제목</th>
                                        <td colSpan={2}>
                                            <input
                                                type="text"
                                                name="title"
                                                defaultValue={
                                                    result["qna"].title
                                                }
                                                required
                                            />
                                        </td>
                                        <td>
                                            <select
                                                name="type"
                                                defaultValue={result.type}
                                            >
                                                <option
                                                    value={1}
                                                    hidden
                                                    disabled
                                                >
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
                                        <th>내용</th>
                                        <td colSpan={3}>
                                            <div>
                                                <Editor
                                                    setContent={setContent}
                                                    content={
                                                        result["qna"].content
                                                    }
                                                />
                                            </div>
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
                )
            )}
        </Container>
    );
});

export default QnaEdit;
