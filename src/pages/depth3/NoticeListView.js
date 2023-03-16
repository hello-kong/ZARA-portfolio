import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { NoticeList, NoticeItem } from "../../slice/NoticeSlice";
import Parser from "react-html-parser";

import Spinner from "../../components/Spinner";
import ErrorView from "../../components/ErrorView";
import mq from "../../MediaQuery";
import { isArray } from "lodash";
import dayjs from "dayjs";

const NoticeContainer = styled.div`
    width: 60%;
    margin: auto;
    margin-top: 200px;
    margin-bottom: 20px;

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
                    text-align: center;
                    vertical-align: middle;
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

    button {
        background-color: #eee;
        border: 0;
        font-size: 14px;
        padding: 10px 20px;
        margin-top: 10px;
        margin-bottom: 30px;
    }

    ${mq.maxWidth("sm")`
		width: 90%;
	`}
`;

const NoticeListView = memo(() => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state) => state.NoticeSlice);
    const [page, setPage] = useState({ pre: null, next: null });

    useEffect(() => {
        dispatch(NoticeItem({ id: id })).then((data) => {
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
        if (data && isArray(data.notice)) {
            const item = data.notice.find((v, i) => v.id == id);
            return item[0];
        } else if (!data) {
            dispatch(NoticeItem({ id: id }));
        } else {
            return data;
        }
    }, [data]);

    return (
        <NoticeContainer>
            <Spinner
                color={"#aaa"}
                secondaryColor={"#d5d5d5"}
                visible={loading}
            />
            <h1>공지사항</h1>
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
                                        <td>{result["notice"].title}</td>
                                    </tr>
                                    <tr>
                                        <th>작성자</th>
                                        <td>관리자</td>
                                    </tr>
                                    <tr>
                                        <th>작성일시</th>
                                        <td>
                                            {dayjs(
                                                result["notice"].reg_date
                                            ).format("YYYY-MM-DD")}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2}>
                                            {Parser(result["notice"].content)}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <NavLink to="/customerservice/list/notice">
                            <button type="button">목록으로</button>
                        </NavLink>

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
                                                    to={`/customerservice/listview/notice/${parseInt(
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
                                                    to={`/customerservice/listview/notice/${parseInt(
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
        </NoticeContainer>
    );
});

export default NoticeListView;
