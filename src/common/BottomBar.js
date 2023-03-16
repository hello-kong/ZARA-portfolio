import React, { memo, useCallback, useState } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import mq from '../MediaQuery';

// price, main, receive, button, link, clickEvent를 props로 주기.
// price: 상품 총 가격.
// main: 메인에 들어갈 것 (상품 총 가격, 배송비)
// receive: 배송비
// button: 삼각형 버튼 유무 (true면 사라짐, false면 나타남)
// link: 계속 버튼을 눌렀을 때 이동할 페이지 주소
// clickEvent: NavLink에 들어갈 onClick 이벤트 함수

const Container = styled.div`

		width: 100%;
		height: 80px;
		background-color: #fff;
		box-sizing: border-box;
		position: fixed;
		bottom: 0;
		left: 0;
		display: flex;
		justify-content: flex-end;
		z-index: 200;

		&.hide {
			height: 145px;
		}

		p {
			font-weight: bold;
			span {
				font-weight: normal;
			}
		}

		.price {
			height: 20px;
			display: flex;
			position: fixed;
			bottom: 35px;
			right: 300px;
			align-items: center;

			.box {
				height: 20px;

				p {
					font-size: 12px;
					
					button {
						background-color: #fff;
						border: none;
						outline: none;
						font-size: 8px;
	
						&:hover {
							cursor: default;
						}

						&.hidden {
							display: none;
						}
					}
				}
			}

			.hideBox {
				height: 40px;
				background-color: #fff;
				transform: translate(100%, -150%);
				display: none;
				
				p {
					font-size: 10px;
				}

				&.toggle {
					display: block;
				}
			}
		}

		a {
			button {
				width: 240px;
				height: 40px;
				color: #fff;
				background-color: #000;
				border: none;
				position: fixed;
				right: 10px;
				bottom: 15px;

				&:hover {
					background-color: rgba(0,0,0,0.8);
				}
			}
		}

		${mq.maxWidth('sm')`
			flex-direction: row-reverse;
			border-top: 1px solid #000;
			justify-content: space-between;

			.price {
				right: 0px;
				
				.box {
					margin-top: 0;
					bottom: 40px;
				}

			}

			a {
				button {
					width: 40%;
					margin-top: 0;
					bottom: 20px;
					left: 20px;
				}
			}
		`}
`;

const BottomBar = memo(({price, main, receive, button, link, clickEvent}) => {
	const [click, setClick] = useState(false);

	const onClick = useCallback((e) => {
		e.preventDefault();
		setClick(!click);
	}, [click]);

	return (
		<Container className={classNames({hide: click})}>
				<div className='price'>
					<div className={classNames('hideBox', {toggle: click})}>
						<p>상품 가격     <span>{parseInt(price).toLocaleString()}</span>원</p>
						<p>배송비 <span>{receive}</span></p>
						<p>배송 할인 <span>- {receive}</span></p>
					</div>
					<div className='box'>
						<p>{main} <button type='button' onClick={onClick} className={classNames({'hidden': button})}>{click ? '▲' : '▼'}</button></p>
					</div>
				</div>
				<NavLink to={link} onClick={clickEvent}><button type="button">계속</button></NavLink>
		</Container>
	);
});

export default BottomBar;