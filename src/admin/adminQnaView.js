import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { QnaItem, QnaDelete, QnaPut } from "../slice/QnaSlice";
import Parser from "react-html-parser";

import Editor from "../components/Editor";
import Spinner from "../components/Spinner";
import { isArray } from "lodash";
import dayjs from "dayjs";

const Container = styled.div`
    width: 100%;
    height: 100%;
    padding: 1%;
    box-sizing: border-box;

    h2 {
        text-align: center;
        font-size: 25px;
        margin-top: 30px;
        color: #aaa;
    }

    table {
        width: 70%;
        margin: 50px auto 0;
        background-color: #fff;

        tr {
            border-bottom: 1px solid #eee;

            th {
                padding: 10px;
                background-color: #999;
                color: #fff;
            }

            td {
                height: 30px;
                vertical-align: middle;
                padding: 5px;
                box-sizing: border-box;
                input {
                    width: 100%;
                    height: 99%;
                    box-sizing: border-box;
                    border: none;
                    outline: none;
                }
            }

            &:nth-of-type(5) {
                td {
                    height: 600px;
                    padding: 20px;
                }
            }
        }
    }

    .answer {
        table {
            margin-top: 20px;
        }
    }

    .btn {
        width: 70%;
        margin: 20px auto;
        display: flex;
        justify-content: center;

        button {
            width: 100px;
            height: 50px;
            background-color: #999;
            color: #fff;
            border: none;
            margin-right: 20px;

            &:nth-of-type(2) {
                margin: 0;
            }
        }
    }

    .list {
        table {
            margin-top: 0;
            th {
                width: 30%;
            }
        }
    }
`;

const adminQnaView = memo(() => {
    const [content, setContent] = useState(null);

    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data, loading, error } = useSelector((state) => state.QnaSlice);
    const [page, setPage] = useState({ pre: null, next: null });

    useEffect(() => {
        dispatch(QnaItem({ id: id })).then((data) => {
            const { num } = data["payload"]["data"];
            setPage({});
            setContent(null);
            num.forEach((v, i) => {
                if (v.id < id) {
                    setPage((page) => {
                        return { ...page, pre: v.id };
                    });
                } else if (v.id > id) {
                    setPage((page) => {
                        return { ...page, next: v.id };
                    });
                }
            });
        });
    }, [id]);

    const result = useMemo(() => {
        if (data && isArray(data.qna)) {
            const item = data.qna.find((v, i) => v.id == id);
            return item[0];
        } else if (!data) {
            dispatch(QnaItem({ id: id }));
        } else {
            return data;
        }
    }, [data]);

    const deleteData = useCallback(
        (e) => {
            e.preventDefault();

            const id = result["qna"].id;

            if (window.confirm("정말 삭제하시겠습니까?")) {
                dispatch(QnaDelete({ id: id }));
                navigate("/admin/content");
            }
        },
        [data]
    );

    const OnAnswer = useCallback(
        (e) => {
            const id = result["qna"].id;
            dispatch(
                QnaPut({
                    id: id,
                    answer: content,
                })
            ).then((result) => {
                navigate("/admin/content");
            });
        },
        [content]
    );
    return (
        <Container>
            <Spinner visible={loading} />
            <h2>QnA</h2>
            {result && (
                <div>
                    <table>
                        <tbody>
                            <tr>
                                <th>제목</th>
                                <td>{result["qna"].title}</td>
                            </tr>
                            <tr>
                                <th>작성자</th>
                                <td>{result["qna"].name}</td>
                            </tr>
                            <tr>
                                <th>작성일시</th>
                                <td>{dayjs(result['qna'].edit_date).format('YYYY-MM-DD')}</td>
                            </tr>
                            <tr>
                                <th colSpan={2}>내용</th>
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    {Parser(result["qna"].content)}
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="answer">
                        <table>
                            <tbody>
                                <tr>
                                    <th>답변</th>
                                </tr>
                                <tr>
                                    <td>
                                        <form>
                                            <Editor
                                                setContent={setContent}
                                                content={
                                                    result["qna"].answer
                                                        ? result["qna"].answer
                                                        : "작성된 답변이 없습니다."
                                                }
                                            />
                                        </form>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="btn">
                        <NavLink to="/admin/content">
                            <button type="button">목록으로</button>
                        </NavLink>
                        <button type="button" onClick={OnAnswer}>
                            답변 저장하기
                        </button>
                        <button type="button" onClick={deleteData}>
                            삭제하기
                        </button>
                    </div>

                    <div className="list">
                        <table>
                            <tbody>
                                {!page["pre"] ? (
                                    <></>
                                ) : (
                                    <tr>
                                        <th>▲이전글</th>
                                        <td>
                                            <NavLink
                                                to={`/admin/qnaview/${parseInt(
                                                    page["pre"]
                                                )}`}
                                            >
                                                이전글제목
                                            </NavLink>
                                        </td>
                                    </tr>
                                )}
                                {!page["next"] ? (
                                    <></>
                                ) : (
                                    <tr>
                                        <th>▼다음글</th>
                                        <td>
                                            <NavLink
                                                to={`/admin/qnaview/${parseInt(
                                                    page["next"]
                                                )}`}
                                            >
                                                다음글제목
                                            </NavLink>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </Container>
    );
});

export default adminQnaView;
