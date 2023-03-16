import React, { memo, useEffect, useState, useCallback, useMemo } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { NoticeItem, NoticePut } from "../slice/NoticeSlice";

import Spinner from "../components/Spinner";
import Editor from "../components/Editor";

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

    form {
        width: 100%;
        margin-top: 50px;

        table {
            width: 70%;
            margin: auto;
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
                    input {
                        width: 100%;
                        height: 99%;
                        box-sizing: border-box;
                        border: none;
                        outline: none;
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
        }

        .btn {
            width: 70%;
            text-align: right;
            margin: 20px auto 0;

            button {
                width: 200px;
                height: 50px;
                background-color: #999;
                color: #fff;
                border: none;
            }
        }
    }
`;

const adminNoticeEdit = memo(() => {
    const [content, setContent] = useState(null);
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data, loading, error } = useSelector((state) => state.NoticeSlice);

    useEffect(() => {
        dispatch(NoticeItem({ id: id })).then((result) => {
            setContent(result.payload.data.notice.content);
        });
    }, []);

    const result = useMemo(() => {
        if (data) {
            return data;
        } else {
            dispatch(NoticeItem({ id: id }));
        }
    }, [data]);

    const OnSubmit = useCallback(
        (e) => {
            e.preventDefault();
            const current = e.target;

            const id = result["notice"].id;
            const title = current.title.value;

            if (window.confirm("수정하시겠습니까?")) {
                dispatch(
                    NoticePut({
                        id: id,
                        content: content,
                        title: title,
                    })
                ).then((result) => {
                    navigate(
                        `/admin/noticeview/${result.payload.data.notice.id}`
                    );
                });
            }
        },
        [result, content]
    );

    return (
        <Container>
            <h2>Notice</h2>
            <Spinner visible={loading} />
            {result && (
                <form onSubmit={OnSubmit}>
                    <table>
                        <tbody>
                            <tr>
                                <th>제목</th>
                                <td>
                                    <input
                                        type="text"
                                        name="title"
                                        defaultValue={result["notice"].title}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th colSpan={2}>내용</th>
                            </tr>
                            <tr>
                                <td colSpan={3}>
                                    <div>
										<Editor
                                        setContent={setContent}
                                        content={result["notice"].content}
                                    />
									</div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="btn">
                        <button type="submit">수정하기</button>
                    </div>
                </form>
            )}
        </Container>
    );
});

export default adminNoticeEdit;
