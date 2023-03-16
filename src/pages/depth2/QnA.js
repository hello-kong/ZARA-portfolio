import React, { memo, useState, useEffect, useCallback, useMemo } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { QnaList } from "../../slice/QnaSlice";

import dayjs from "dayjs";
import Spinner from "../../components/Spinner";
import Pagenation from "../../components/pagenation";
import { isArray } from "lodash";

const QnA = memo(() => {
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state) => state.QnaSlice);
    const [keyword, setKeyword] = useState({});

    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const nowpage = Object.fromEntries(params).page;

    const result = useMemo(() => {
        return { ...keyword, nowpage: nowpage };
    }, [nowpage, keyword]);

    useEffect(() => {
        dispatch(QnaList(result));
    }, [result]);

    const onClick = useCallback(
        (e) => {
            e.preventDefault();
            const current = e.target;

            const select = current.search.value;
            const text = current.searchText.value;

            let params = {};

            params[select] = text;

            setKeyword({ ...keyword, ...params });
        },
        [data]
    );

    return (
        <div>
            <Spinner visible={loading} />
            <div className="list">
                <table>
                    <thead>
                        <tr>
                            <th>답변여부</th>
                            <th>PRODUCT</th>
                            <th colSpan={2}>CONTENT</th>
                            <th>NAME</th>
                            <th>DATE</th>
                        </tr>
                    </thead>
                    {data &&
                        isArray(data["qna"]) &&
                        (!data["qna"] || data["qna"].length === 0 ? (
                            <tbody>
                                <tr>
                                    <td colSpan={7} rowSpan={5}>
                                        작성된 질문사항이 없습니다.
                                    </td>
                                </tr>
                            </tbody>
                        ) : (
                            data["qna"].map((v, i) => {
                                return (
                                    <tbody key={i}>
                                        <tr>
                                            <td>
                                                {v.answer != null
                                                    ? "완료"
                                                    : "미완료"}
                                            </td>
                                            <td>
                                                {v.img ? (
                                                    <img src={v.img} />
                                                ) : null}
                                            </td>
                                            <td colSpan={2}>
                                                <NavLink
                                                    to={`/customerservice/listview/qna/${v.id}`}
                                                >
                                                    {v.title}
                                                </NavLink>
                                            </td>
                                            <td>{v.name}</td>
                                            <td>
                                                {dayjs(v.edit_date).format(
                                                    "YYYY-MM-DD"
                                                )}
                                            </td>
                                        </tr>
                                    </tbody>
                                );
                            })
                        ))}
                </table>
                {data && <Pagenation pagenation={data["pagenation"]} />}
                <NavLink to="/customerservice/qna_add">
                    <button type="button">WRITE</button>
                </NavLink>
            </div>
            <div className="search">
                <form onSubmit={onClick}>
                    <input type="radio" name="search" id="name" value="name" />
                    <label htmlFor="name">이름</label>

                    <input
                        type="radio"
                        name="search"
                        id="title"
                        value="title"
                    />
                    <label htmlFor="title">제목</label>

                    <input
                        type="radio"
                        name="search"
                        id="content"
                        value="content"
                    />
                    <label htmlFor="content">내용</label>

                    <input type="text" name="searchText" defaultValue="" />
                    <button type="submit">FIND</button>
                </form>
            </div>
        </div>
    );
});

export default QnA;
