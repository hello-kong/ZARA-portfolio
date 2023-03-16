import React, { memo, useCallback, useState, useEffect, useMemo } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { NoticeList } from "../../slice/NoticeSlice";

import dayjs from "dayjs";
import { isArray } from "lodash";
import Spinner from "../../components/Spinner";
import Pagenation from "../../components/pagenation";

const Notice = memo(() => {
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state) => state.NoticeSlice);
    const [keyword, setKeyword] = useState({});

    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const nowpage = Object.fromEntries(params).page;

    const result = useMemo(() => {
        return { ...keyword, nowpage: nowpage };
    }, [nowpage, keyword]);

    useEffect(() => {
        dispatch(NoticeList(result));
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

    const writeClick = useCallback((e) => {
        e.preventDefault();

        window.alert("공지사항은 관리자만 작성할 수 있습니다.");
    }, []);

    return (
        <div>
            <Spinner visible={loading} />
            <div className="list">
                <table>
                    <thead>
                        <tr>
                            <th>CONTENT</th>
                            <th>NAME</th>
                            <th>DATE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data &&
                            isArray(data["notice"]) &&
                            (data["notice"].length === 0 ? (
                                <tr>
                                    <td colSpan={7} rowSpan={5}>
                                        작성된 공지사항이 없습니다.
                                    </td>
                                </tr>
                            ) : (
                                data["notice"].map((v, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>
                                                <NavLink
                                                    to={`/customerservice/listview/notice/${v.id}`}
                                                >
                                                    {v.title}
                                                </NavLink>
                                            </td>
                                            <td>관리자</td>
                                            <td>
                                                {dayjs(v.edit_date).format(
                                                    "YYYY-MM-DD"
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })
                            ))}
                    </tbody>
                </table>
                {data && <Pagenation pagenation={data["pagenation"]} />}
                <NavLink>
                    <button type="button" onClick={writeClick}>
                        WRITE
                    </button>
                </NavLink>
            </div>

            <div className="search">
                <form onSubmit={onClick}>
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

export default Notice;
