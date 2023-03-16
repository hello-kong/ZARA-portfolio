import React, { memo, useState, useCallback } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";

import { useSelector, useDispatch } from "react-redux";
import { NoticePost } from "../slice/NoticeSlice";

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

const adminNoticeAdd = memo(() => {
    const [content, setContent] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const OnSubmit = useCallback(
        (e) => {
            e.preventDefault();
            const current = e.target;

            const title = current.title.value;

            dispatch(
                NoticePost({
                    content: content,
                    title: title,
                })
            ).then((result) => {
                navigate(`/admin/noticeview/${result.payload.data.notice.id}`);
            });
        },
        [content]
    );

    return (
        <Container>
            <h2>Notice</h2>
            <form onSubmit={OnSubmit}>
                <table>
                    <tbody>
                        <tr>
                            <th>제목</th>
                            <td>
                                <input type="text" name="title" />
                            </td>
                        </tr>
                        <tr>
                            <th colSpan={2}>내용</th>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <div>
                                    <Editor setContent={setContent} />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="btn">
                    <button type="submit">저장하기</button>
                </div>
            </form>
        </Container>
    );
});

export default adminNoticeAdd;
