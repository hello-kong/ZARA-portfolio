import React, {memo, useCallback, useState, useEffect, useMemo} from "react";
import styled from "styled-components";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {NoticeList} from '../slice/NoticeSlice';
import {QnaList} from '../slice/QnaSlice';

import dayjs from "dayjs";
import { isArray } from "lodash";
import classNames from "classnames";
import Spinner from "../components/Spinner";
import Pagenation from "../components/pagenation";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
    width: 100%;
    height: 100%;
    padding: 1%;
    box-sizing: border-box;

    .nav {
        width: 250px;
        height: 50px;
        margin: auto;

        button {
            width: 100px;
            height: 50px;
            margin-right: 20px;
            background-color: #fff;
            border: none;

            &:hover, &.active {
                background-color: #777;
                color: #fff;
            }

        }
    }

    .contentBox {
        width: 100%;

        .top {
            width: 100%;
            height: 50px;
            margin: 20px 0;
			display: flex;
			justify-content: center;

            form {
				width: 50%;
                display: flex;
                justify-content: center;

                input {
                    width: 100%;
                    height: 50px;
                    padding: 0 10px;
                    border: none;
                    outline: none;
                    box-sizing: border-box;
                }

                button {
                    width: 50px;
                    height: 50px;
                    border: none;
                    font-size: 25px;
                    padding: 0;
                    background-color: #fff;
                }
            }

			select {
				width: 10%;
				margin-left: 20px;
				border: none;
				outline: none;
				text-align: center;
			}
        }

        .contentList {
            div {
                width: 100%;

                table {
                    width: 100%;
					background-color: #fff;

                    tr {
                        border-bottom: 1px solid #eee;
                    }

                    th,
                    td {
                        text-align: center;
                        vertical-align: middle;
                        padding: 10px;
                        box-sizing: border-box;
                    }

                    th {
                        background-color: #777;
                        color: #fff;
                    }

					td {
						button {
							width: 100%;
							height: 100%;
							background-color: #fff;
							border: none;
						}
					}
                }

				&.notice {
					.addBtn {
						text-align: right;
						margin-top: 10px;

						button {
							width: 150px;
							height: 50px;
							background-color: #fff;
							border: none;
						}
					}
				}
            }
        }
    }
`;

const adminContent = memo(() => {
	const dispatch = useDispatch();
	const {data, loading, error} = useSelector(state => state.NoticeSlice);
	const {data: data2, loading: loading2, error: error2} = useSelector(state => state.QnaSlice);

    const [tab, setTab] = useState("notice");
	const [keyword, setKeyword] = useState({});
	
	const {search} = useLocation();
	const params = new URLSearchParams(search);
	const nowpage= Object.fromEntries(params).page;
	       
	const result = useMemo(() => {
		return {...keyword, nowpage: nowpage};
	}, [nowpage, keyword, tab]);

	useEffect(() => {
		if (tab == 'notice') {
			dispatch(NoticeList(result));
		} else {
			dispatch(QnaList(result));
		}
	}, [result]);

	const onSearch = useCallback((e) => {
		e.preventDefault();
		const current = e.target;

		const search = current.title.value;

		let params = {};
		params.title = search;
		params.content = search;
		params.name = search;

		setKeyword({...keyword, ...params});
		
	}, [data, data2]);

    const onClick = useCallback((e) => {
        setTab(e.currentTarget.dataset.tab);
		setKeyword({});
    }, []);

	const onChange = useCallback((e) => {
		e.preventDefault();
		const value = e.target.value;
		let params = {};
		
		switch (value) {
			case '완료':
				params.isNull = false;
				setKeyword({...keyword, ...params});
				return;
			case '미완료':
				params.isNull = true;
				setKeyword({...keyword, ...params});
				return;
			default:
				params.isNull = null;
				setKeyword({...keyword, ...params});
		}

	}, [data2, keyword]);

    return (
        <Container>
			<Spinner visible={loading || loading2} />
            <div className="nav">
                <button type="button" className={classNames({'active': tab == 'notice'})} data-tab='notice' onClick={onClick}>
                    Notice
                </button>
                <button type="button" className={classNames({'active': tab == 'qna'})} data-tab='qna' onClick={onClick}>
                    QnA
                </button>
            </div>
            <div className="contentBox">
                <div className="top">
                    <form onSubmit={onSearch}>
                        <input type="text" name="title" placeholder="검색" required />
                        <button type="submit">
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </form>
					{tab == "qna" ? (
						<select onChange={onChange}>
							<option>전체</option>
							<option value='완료'>완료</option>
							<option value='미완료'>미완료</option>
						</select>
					) : (
						<></>
					)}
                </div>
                <div className="contentList">
                    {tab == "notice" ? (
                        <div className="notice">
                            <table>
                                <thead>
                                    <tr>
                                        <th>CONTENT</th>
                                        <th>NAME</th>
                                        <th>DATE</th>
										<th></th>
                                    </tr>
                                </thead>
                                <tbody>
								{ (data && isArray(data['notice'])) && (data['notice'].length === 0 ? (
							<tr>
								<td colSpan={5} rowSpan={3}>작성된 공지사항이 없습니다.</td>
							</tr>
						) : (
							data['notice'].map((v, i) => {
									return (

										<tr key={i}>
											<td><NavLink to={`/admin/noticeview/${v.id}`}>{v.title}</NavLink></td>
											<td>관리자</td>
											<td>{dayjs(v.edit_date).format('YYYY-MM-DD')}</td>
										</tr>
									);
							})
						))}
                                </tbody>
                            </table>
							{data && (
				<Pagenation pagenation={data['pagenation']} />)}
							<div className="addBtn">
								<NavLink to="/admin/noticeadd"><button type="button">추가하기</button></NavLink>
							</div>
                        </div>
                    ) : (
                        <div className="qna">
                            <table>
                                <thead>
                                    <tr>
										<th>답변여부</th>
                                        <th>PRODUCT</th>
                                        <th>CONTENT</th>
                                        <th>NAME</th>
                                        <th>DATE</th>
										<th></th>
                                    </tr>
                                </thead>
                                <tbody>
								{ (data2 && isArray(data2['qna'])) && (data2['qna'].length === 0 ? (
							<tr>
								<td colSpan={5} rowSpan={3}>작성된 문의사항이 없습니다.</td>
							</tr>
						) : (
							data2['qna'].map((v, i) => {
									return (

										<tr key={i}>
											<td>{v.answer != null ? '완료' : '미완료'}</td>
											<td>{
												v.img ? (<img src={v.img} />) : (null)
												}</td>
											<td><NavLink to={`/admin/qnaview/${v.id}`}>{v.title}</NavLink></td>
											<td>{v.name}</td>
											<td>{dayjs(v.edit_date).format('YYYY-MM-DD')}</td>
										</tr>
									);
							})
						))}
                                </tbody>
                            </table>
							{data2 && (
				<Pagenation pagenation={data2['pagenation']} />)}
                        </div>
                    )}
                </div>
            </div>
        </Container>
    );
});

export default adminContent;
