import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { QnaList, QnaItem, QnaDelete } from "../../slice/QnaSlice";
import Parser from "react-html-parser";

import Spinner from "../../components/Spinner";
import ErrorView from "../../components/ErrorView";
import mq from "../../MediaQuery";
import { isArray } from "lodash";
import dayjs from "dayjs";

const QnaContainer = styled.div`
    width: 60%;
    margin: auto;
    margin-top: 200px;
    margin-bottom: 20px;
    white-space: pre-wrap;

    h1 {
        text-align: center;
        font-size: 27px;
        font-weight: bold;
        margin-bottom: 50px;
    }

    table {
        border-collapse: collapse;
        width: 100%;
        margin: auto;
        text-align: center;
        font-size: 14px;

        tr {
            &:nth-of-type(4) {
                td {
                    height: 500px;
                    word-break: break-all;
                }
            }

            th,
            td {
                border-bottom: 1px solid #ccc;
                border-top: 1px solid #ccc;
                padding: 10px;
                text-overflow: ellipsis;
                overflow: hidden;
            }

            th {
                width: 100px;
                background-color: #eee;
            }

            td {
                text-align: left;
            }
        }
    }

    .answer {
        margin: 20px 0;
    }

    .buttonBox {
        width: 300px;
        margin: auto;

        button {
            background-color: #eee;
            border: 0;
            font-size: 14px;
            padding: 10px 15px;
            margin-top: 10px;
            margin-bottom: 30px;
            margin-right: 10px;
        }
    }

    .passwordBox {
        width: 400px;
        margin: auto;
        margin-top: 100px;
        text-align: center;

        input {
            margin-right: 10px;
            height: 25px;
        }
    }

    .hide {
        display: none;
    }

    ${mq.maxWidth("sm")`
		width: 90%;
	`}
`;

const QnaListView = memo(() => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data, loading, error } = useSelector((state) => state.QnaSlice);
    const [page, setPage] = useState({ pre: null, next: null });

    useEffect(() => {
        dispatch(QnaItem({ id: id })).then((data) => {
            const { num } = data["payload"]["data"];
            setPage({});
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
                navigate("/zara/customerservice/list/qna");
            }
        },
        [data]
    );

    return (
        <QnaContainer>
            <Spinner
                color={"#aaa"}
                secondaryColor={"#d5d5d5"}
                visible={loading}
            />
            <h1>QnA</h1>
            {error ? (
                <ErrorView error={error} />
            ) : (
                result && (
                    <div>
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
                                        <td>
                                            {dayjs(
                                                result["qna"].reg_date
                                            ).format("YYYY-MM-DD")}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2}>
                                            {Parser(result["qna"].content)}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="answer">
                            <table>
                                <tbody>
                                    <tr>
                                        <th>답변</th>
                                    </tr>
                                    <tr>
                                        {result["qna"].answer == null ? (
                                            <td>
                                                아직 작성된 답변이 없습니다.
                                            </td>
                                        ) : (
                                            <td>{Parser(result["qna"].answer)}</td>
                                        )}
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="buttonBox">
                            <NavLink to="/customerservice/list/qna">
                                <button type="button">목록으로</button>
                            </NavLink>
                            <NavLink
                                to={`/customerservice/qna_edit/${result["qna"].id}`}
                            >
                                <button type="button">수정하기</button>
                            </NavLink>
                            <button type="button" onClick={deleteData}>
                                삭제하기
                            </button>
                        </div>

                        <div>
                            <table>
                                <tbody>
                                    {!page["pre"] ? (
                                        <></>
                                    ) : (
                                        <tr>
                                            <th>▲이전글</th>
                                            <td>
                                                <NavLink
                                                    to={`/customerservice/listview/qna/${parseInt(
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
                                                    to={`/customerservice/listview/qna/${parseInt(
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
                )
            )}
        </QnaContainer>
    );
});

export default QnaListView;
