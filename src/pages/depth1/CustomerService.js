import React, {memo} from "react";
import styled from "styled-components";
import { NavLink, Routes, Route } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQ, faBell } from "@fortawesome/free-solid-svg-icons";

const CustomerContainer = styled.div`
	width: 80%;
	height: 50vh;
	margin: auto;
	margin-top: 200px;

	h2 {
		font-weight: normal;
		margin-top: 20px;
		margin-bottom: 80px;
		font-size: 30px;
	}

	.box {
		display: flex;
		text-align: center;
		font-size: 20px;

		a {
			display: block;
			width: 80px;
			height: auto;
			margin-right: 70px;
			color: black;
			text-decoration: none;

			&:hover {
				cursor: pointer;
			}

			p {
				display: block;
				margin-top: 30px;
			}
		}
	}

`;

const CustomerService = memo(() => {
	return(
		<CustomerContainer>
			<h2>고객센터</h2>
			<div className="box">
				<NavLink to='list/notice'>
					<FontAwesomeIcon icon={faBell} />
					<p>공지사항</p>
				</NavLink>
				<NavLink to='list/qna'>
					<FontAwesomeIcon icon={faQ} />
					<p>Q&A</p>
				</NavLink>
			</div>
		</CustomerContainer>
	);
});

export default CustomerService;