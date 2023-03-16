import React, { memo } from 'react';
import styled from 'styled-components';

import mq from '../MediaQuery';

import img from '../assets/img/22-creamWhite-1.jpg';

// chart, 데이터 map 돌려서 매출표 및 공지와 문의 표 만들기, 해당 컨텐츠 클릭하면 링크 이동하는 기능 구현 예정

const Container = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-evenly;
	padding-top: 1%;
	box-sizing: border-box;

	.box {
		background-color: #fff;
		width: 48%;
		height: 48%;
		margin-bottom: 20px;

		.title {
			width: 100%;
			height: 50px;
			border-bottom: 1px solid #eee;
			padding: 15px 25px;
			box-sizing: border-box;

			p {
				font-size: 16px;
			}
		}

		&.income {

			table {
				width: 100%;
				text-align: center;

				tr {
					border-bottom: 1px solid #eee;

					th, td {
						padding: 10px;
						font-size: 14px;
					}

					th {
						color: #d5d5d5;
					}
				}
			}
		}

		&.notice, &.qna {

			ul {
				width: 100%;
				padding: 15px 25px;
				box-sizing: border-box;

				li {
					width: 100%;
					height: 60px;
					display: flex;
					margin-bottom: 20px;

					&:last-child {
						margin-bottom: 0;
					}

					.img {
						width: 60px;
						height: 60px;
						margin-right: 20px;
						img {
							width: 100%;
							height: 100%;
							object-fit: cover;
						}
					}

					.text {
						width: 70%;
						display: flex;
						flex-wrap: wrap;
						padding-top: 10px;
						box-sizing: border-box;

						p {
							display: block;
							text-overflow: ellipsis;
							overflow: hidden;
							white-space: nowrap;
							color: #666;

							&:first-child {
								width: 100%;
								margin-bottom: 10px;
								color: #000;
								
							}

							&:nth-of-type(2) {
								margin-right: 10px;
								padding-right: 10px;
								box-sizing: border-box;
								border-right: 1px solid #666;
							}
						}
					}
				}
			}
		}
	}

	${mq.maxWidth('sm')`
		height: auto;
		margin-top: 20vh;
		flex-wrap: nowrap;
		flex-direction: column;
	
		.box {
			width: 100%;
			height: 78vh;
			margin-bottom: 2%;

			&.qna, &.response {
				ul {
					padding: 25px;
					
					li {
						height: 100px;

						.img {
							width: 100px;
							height: 100px;
						}

						.text {
							p {
								height: 20px;
							}
						}
					}
				}
			}
		}
	`}
`;

const adminDash = memo(() => {
	return (
		<Container>
			<div className='box viewChart'>
				<div className='title'>
					<p>매출 현황</p>
				</div>
				<div>차트 들어갈 예정</div>
			</div>

			<div className='box income'>
				<div className='title'>
					<p>일자별 요약</p>
				</div>
				<table>
					<thead>
						<tr>
							<th>일자</th>
							<th>주문수</th>
							<th>매출액</th>
							<th>방문자</th>
							<th>가입</th>
							<th>문의</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>최근 7일 합계</td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td>이번 달 합계</td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
					</tbody>
				</table>
			</div>

			<div className='box notice'>
				<div className='title'>
					<p>공지사항</p>
				</div>
				<ul>
					<li>
						<div className='img'>
							<img src={img} alt="문의사진" />
						</div>
						<div className='text'>
							<p>&#91;문의&#93; 아주아주아주아주아주아주아주아주아주아주긴제목의문의를드립니다.</p>
							<p>작성자 이름</p>
							<p>작성한 날짜 및 시간</p>
						</div>
					</li>

					<li>
						<div className='img'>
							<img src={img} alt="문의사진" />
						</div>
						<div className='text'>
							<p>&#91;문의&#93; 아주아주아주아주아주아주아주아주아주아주긴제목의문의를드립니다.</p>
							<p>작성자 이름</p>
							<p>작성한 날짜 및 시간</p>
						</div>
					</li>

					<li>
						<div className='img'>
							<img src={img} alt="문의사진" />
						</div>
						<div className='text'>
							<p>&#91;문의&#93; 아주아주아주아주아주아주아주아주아주아주긴제목의문의를드립니다.</p>
							<p>작성자 이름</p>
							<p>작성한 날짜 및 시간</p>
						</div>
					</li>

					<li>
						<div className='img'>
							<img src={img} alt="문의사진" />
						</div>
						<div className='text'>
							<p>&#91;문의&#93; 아주아주아주아주아주아주아주아주아주아주긴제목의문의를드립니다.</p>
							<p>작성자 이름</p>
							<p>작성한 날짜 및 시간</p>
						</div>
					</li>

					<li>
						<div className='img'>
							<img src={img} alt="문의사진" />
						</div>
						<div className='text'>
							<p>&#91;문의&#93; 아주아주아주아주아주아주아주아주아주아주긴제목의문의를드립니다.</p>
							<p>작성자 이름</p>
							<p>작성한 날짜 및 시간</p>
						</div>
					</li>
				</ul>
			</div>

			<div className='box qna'>
				<div className='title'>
					<p>문의</p>
				</div>
				<ul>
					<li>
						<div className='img'>
							<img src={img} alt="프로필사진" />
						</div>
						<div className='text'>
							<p>&#91;문의&#93; 아주아주아주아주아주아주아주아주아주아주긴제목의반응을드립니다.</p>
							<p>작성자 이름</p>
							<p>작성한 날짜 및 시간</p>
						</div>
					</li>

					<li>
						<div className='img'>
							<img src={img} alt="프로필사진" />
						</div>
						<div className='text'>
							<p>&#91;문의&#93; 아주아주아주아주아주아주아주아주아주아주긴제목의반응을드립니다.</p>
							<p>작성자 이름</p>
							<p>작성한 날짜 및 시간</p>
						</div>
					</li>

					<li>
						<div className='img'>
							<img src={img} alt="프로필사진" />
						</div>
						<div className='text'>
							<p>&#91;문의&#93; 아주아주아주아주아주아주아주아주아주아주긴제목의반응을드립니다.</p>
							<p>작성자 이름</p>
							<p>작성한 날짜 및 시간</p>
						</div>
					</li>

					<li>
						<div className='img'>
							<img src={img} alt="프로필사진" />
						</div>
						<div className='text'>
							<p>&#91;문의&#93; 아주아주아주아주아주아주아주아주아주아주긴제목의반응을드립니다.</p>
							<p>작성자 이름</p>
							<p>작성한 날짜 및 시간</p>
						</div>
					</li>

					<li>
						<div className='img'>
							<img src={img} alt="프로필사진" />
						</div>
						<div className='text'>
							<p>&#91;문의&#93; 아주아주아주아주아주아주아주아주아주아주긴제목의반응을드립니다.</p>
							<p>작성자 이름</p>
							<p>작성한 날짜 및 시간</p>
						</div>
					</li>
				</ul>
			</div>
		</Container>
	);
});

export default adminDash;