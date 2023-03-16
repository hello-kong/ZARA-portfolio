import React, {memo, useState, useEffect, useCallback} from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import mq from '../../MediaQuery';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFeather } from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";

const MyListContainer = styled.div`
	width: 80%;
	height: 50vh;
	margin: auto;
	margin-top: 320px;

	h1 {
		text-align: center;
		font-size: 25px;
		margin-bottom: 70px;
	}

	.list {
		width: 100%;
		text-align: right;

		table {
			border-collapse: collapse;
			width: 100%;
			margin: auto;
			text-align: center;	
		}
		
		th, td {
			border-bottom: 1px solid #ccc;
			padding: 10px;
			text-overflow: ellipsis;
			white-space: nowrap;
			overflow: hidden;
			vertical-align: middle;
		}

		th {
			width: 20px;
		}

		td {
			img {
				width: 100%;
				height: 70px;
				object-fit: cover;
			}
			a {
				&:hover {
					text-decoration: underline;
				}
			}
		}

		button {
			background-color: #000;
			padding: 10px 40px;
			margin-top: 10px;
			color: #fff;

			&:hover {
				cursor: pointer;
			}
			
		}

	}

	.search {
		width: 100%;
		text-align: center;
		margin-top: 100px;

		label {
			margin-right: 5px;
		}

		input:nth-last-child(2) {
			height: 20px;
			border: 1px solid #000;
			margin: 0 5px;
		}

		button {
			font-size: 16px;
			background-color: #fff;
			border: 0;

			&:hover {
				cursor: pointer;
			}
		}
	}

	${mq.maxWidth('sm')`
		.list {
			text-align: center;
		}

		.search {
			width: 70%;
			margin: auto;
			margin-top: 100px;

			input:nth-last-child(2) {
				margin-top: 10px;
			}
		}
	`}
`;

const MyQnAList = memo(({data}) => {

	const [result, setResult] = useState(data);
	
	useEffect(() => {
		setResult(result => data);
	}, [data]);

	const onClick = useCallback((e) => {
		e.preventDefault();
		const current = e.target;

		const select = current.search.value;
		const text = current.searchText.value;

		setResult(data.filter((v, i) => v[`${select}`] === text));
		
	}, [result]);


	return (
		<MyListContainer>
			<h1>My QnA List</h1>
			<div className="list">
				<table>
					<thead>
						<tr>
							<th>NO.</th>
							<th></th>
							<th>STATE</th>
							<th colSpan={2}>CONTENT</th>
							<th>NAME</th>
							<th>DATE</th>
						</tr>
					</thead>
						{ !result || result.length === 0 ? (
							<tbody>
								<tr>
									<td colSpan={7} rowSpan={5}>작성된 질문사항이 없습니다.</td>
								</tr>
							</tbody>
						) : (
							
							result.map((v, i) => {
								if (i < 6) {
									return (
										<tbody key={i}>
										<tr>
											<td>{result.length-i}</td>
											<td><FontAwesomeIcon icon={faFeather} /></td>
											<td>답변 상태</td>
											<td colSpan={2}><NavLink to={`/customerservice/listview/qna/${v.id}`}>{v.title}</NavLink></td>
											<td>{v.name}</td>
											<td>{dayjs(v.date).format('YYYY-MM-DD')}</td>
										</tr>
										</tbody>
									);
								}
							})
						)}
				</table>
				<NavLink to='/customerservice/qna_add'><button type="button">WRITE</button></NavLink>
			</div>
		</MyListContainer>
	);
});

export default MyQnAList;