import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { NavLink, useParams, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { NoticeList, NoticeItem, NoticeDelete } from "../slice/NoticeSlice";
import Parser from "react-html-parser";

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
        }

        a:nth-of-type(2) {
            button {
                margin: 0 20px;
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

const adminNoticeView = memo(() => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
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

    const deleteData = useCallback(
        (e) => {
            e.preventDefault();

            const id = result["notice"].id;

            if (window.confirm("정말 삭제하시겠습니까?")) {
                dispatch(NoticeDelete({ id: id }));
                navigate("/admin/content");
            }
        },
        [data]
    );
    return (
        <Container>
            <h2>Notice</h2>
            <Spinner
                  color={"#aaa"}
                  secondaryColor={"#d5d5d5"}
                  visible={loading}
              />
              {result && (
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
                                      {dayjs(result["notice"].reg_date).format(
                                          "YYYY-MM-DD"
                                      )}
                                  </td>
                              </tr>
                              <tr>
                                  <th colSpan={2}>내용</th>
                              </tr>
                              <tr>
                                  <td colSpan={2}>
                                      {Parser(result["notice"].content)}
                                  </td>
                              </tr>
                          </tbody>
                      </table>
  
                      <div className="btn">
                          <NavLink to="/admin/content">
                              <button type="button">목록으로</button>
                          </NavLink>
                          <NavLink
                              to={`/admin/noticeedit/${result["notice"].id}`}
                          >
                              <button type="button">수정하기</button>
                          </NavLink>
                          <button type="button" onClick={deleteData}>삭제하기</button>
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
                                              <NavLink to={`/admin/noticeview/${page["pre"]}`}>
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
                                              <NavLink to={`/admin/noticeview/${page["next"]}`}>
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
export default adminNoticeView;
