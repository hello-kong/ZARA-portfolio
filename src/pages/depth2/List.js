import React, {memo, useEffect} from "react";
import styled from "styled-components";
import { NavLink, Routes, Route } from "react-router-dom";

import QnA from "./QnA";
import Notice from "./Notice";
import Spinner from "../../components/Spinner";
import mq from "../../MediaQuery";

const NoticeContainer = styled.div`
	width: 80%;
	margin: auto;
	margin-top: 200px;

	.menu {
		text-align: center;
		margin: 50px 0;

		a {
			text-decoration: none;
			color: black;
			margin-right: 20px;

			&:first-child {

				&:after {
					display: inline-block;
					content:"|";
					padding-left: 20px;
				}
			}

		}

		.active {
			text-decoration: underline;
		}
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
			margin-top: 20px;
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

const List = memo(() => {

	return (
		<NoticeContainer>
			<div className="menu">
				<NavLink to='notice'>Notice</NavLink>
				<NavLink to='qna'>QnA</NavLink>
			</div>

			<Routes>
				<Route path='notice' element={<Notice />} />
				<Route path='qna' element={<QnA />} />
			</Routes>
		</NoticeContainer>
	);
});

export default List;