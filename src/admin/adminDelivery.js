import React, { memo } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faSortDown } from "@fortawesome/free-solid-svg-icons";

// nav 버튼에 따라 진행상태 조회, 주문 체크 후 top 버튼을 눌러 진행상태 변경, 주문번호, 주문자명, 연락처로 주문 검색 기능, 전체 체크 기능, 데이터에 따라 map으로 table 생성, 주문 데이터가 없을 때 나타날 영역 생성, pagenation, 해당 주문 디테일 페이지로 넘어가는 기능 구현 예정.

const Container = styled.div`
	width: 100%;
	height: 100%;
	padding: 3%;
	box-sizing: border-box;

	.nav {
		width: 100%;
		height: 50px;
		background-color: #fff;
		margin-bottom: 20px;

		ul {
			display: flex;

			li {
				width: 100px;
				text-align: center;
				line-height: 50px;
				font-size: 14px;

				&:hover {
					background-color: #d5d5d5;
				}
			}
		}
	}

	.deliveryBox {
		width: 100%;
		background-color: #fff;

		.top {
			display: flex;
			justify-content: space-between;
			height: 50px;
			border-bottom: 1px solid #eee;

			.topBtn {
				button {
					width: 100px;
					height: 50px;
					background-color: #fff;
					border: none;
				}
			}

			.topSearch {
				input {
					width: 200px;
					height: 50px;
					box-sizing: border-box;
					border: none;
					outline: none;
				}

				button {
					width: 50px;
					height: 50px;
					background-color: #fff;
					border: none;
				}
			}
		}

		.deliveryList {
			width: 100%;

			.listTable {
				width: 100%;

				table {
					width: 100%;

					thead {
						tr {
							border-bottom: 1px solid #eee;
						}
					}

					th {
						background-color: #888;
						color: #fff;
					}

					th, td {
						width: calc(100%/6);
						text-align: center;
						padding: 20px 0;
						box-sizing: border-box;
					}

					tr {
						th:nth-of-type(1), td:nth-of-type(1) {
							width: 5%;
						}
					}
				}
			}
		}
	}
`;

const adminDelivery = memo(() => {
	return (
		<Container>
			<div className='nav'>
				<ul>
					<li>신규주문</li>
					<li>입금대기</li>
					<li>결제완료</li>
					<li>배송준비중</li>
					<li>배송중</li>
					<li>배송완료</li>
				</ul>
			</div>
			<div className='deliveryBox'>
				<div className='top'>
					<div className='topBtn'>
						<button type='button'>발송처리</button>
						<button type='button'>배송준비 처리</button>
						<button type='button'>입금확인 처리</button>
						<button type='button'>판매취소</button>
						<button type='button'>반품처리</button>
						<button type='button'>교환처리</button>
					</div>
					<div className='topSearch'>
						<form>
							<input type='text' placeholder='주문번호, 주문자명, 연락처' />
							<button type="submit"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
						</form>
					</div>
				</div>
				<div className='deliveryList'>
					<div className='listTable'>
						<table>
							<thead>
								<tr>
									<th><input type="checkbox" /></th>
									<th>주문일시</th>
									<th>주문번호</th>
									<th>주문인</th>
									<th>연락처</th>
									<th>진행상태</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td><input type="checkbox" /></td>
									<td>2022.12.28</td>
									<td><NavLink to='/admin/delivery_detail'>000001</NavLink></td>
									<td>사람1</td>
									<td>01011111111</td>
									<td>배송준비</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</Container>
	);
});

export default adminDelivery;