import React, { memo, useCallback, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import classNames from 'classnames';

import mq from "../../MediaQuery";
import img from "../../assets/img/22-creamWhite-1.jpg";

const Container = styled.div`
	width: 100%;
	height: 100%;

	.top {
		width: 100%;
		display: flex;
		justify-content: flex-end;
		position: fixed;
		top: 10%;
		box-sizing: border-box;
		z-index: 200;

		.menu {
			width: 300px;
			text-align: center;
			margin: auto;
			transform: translate(60%, 0);

			a {
				margin-right: 40px;

				&:hover {
					cursor: pointer;
				}
			}

			.active {
				font-weight: bold;
			}
		}

		.filter {
			width: 300px;
			text-align: right;
			vertical-align: middle;
			
			input {
				-webkit-appearance: none;
				width: 40%;
				height: 1px;
				background-color: #000;
				accent-color: #000;
				outline: none;

				&::-webkit-slider-thumb {
					-webkit-appearance: none;
					width: 10px;
					height: 10px;
					border-radius: 50%;
					background-color: #000;
				}

				&:hover {
					cursor: pointer;
				}
			}

			button {
				padding: 10px;
				margin-left: 30px;
				margin-right: 20px;
				background-color: #fff;
				border: 1px solid #000;
			}
			
		}
	}

	.side {
		width: 40%;
		height: 100%;
		background-color: #fff;
		position: fixed;
		top: 0;
		right: 0;
		z-index: 9999;
		display: none;

		input {
			-webkit-appearance: none;
			width: 120px;
			height: 1px;
			background-color: #000;
			accent-color: #000;
			outline: none;

			&:hover {
				cursor: pointer;
			}
		}
	}

	.product_box {
		width: 60%;
		margin: auto;
		margin-top: 230px;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;

		.product {
			margin-bottom: 30px;
				img {
					width: 100%;
					height: 100%;
					object-fit: cover;
				}
				.product_text {
					display: flex;
					justify-content: space-between;
				}
		}

		.zero {
			width: 49%;
		}

		.one {
			width: 24%;
		}

		.two {
			width: 12%;

			.product_text {
				display: none;
			}
		}

	}

	.product_box2 {
		width: 95%;
	}

	${mq.maxWidth('lg')`
		.menu {
			display: none;
		}
	`}

	${mq.maxWidth('sm')`
		.top {
			margin-top: 30px;
			margin-bottom: 20px;
			justify-content: auto;
			flex-wrap: wrap;

			.menu {
				display: block;
				transform: none;
				z-index: 300;
				margin-bottom: -30px;
			}

			.filter {
				flex: 0 0 99%;
				display: flex;
				flex-wrap: wrap;
				flex-direction: column-reverse;
				align-items: flex-end;

				input {
					width: 99%;
					margin-top: 20px;
				}

				button {
					width: 77px;
				}
			}
		}

		.topHide {
			display: none;
		}

		.product_box {
			width: 95%;
		}
	`}

`;

const ProductList = memo(({gender, category}) => {

	const [value, setValue] = useState(0);
	const [wheel, setWheel] = useState(false);
	let lastScrollY = 0;

	useEffect(() => {
		window.addEventListener('scroll', topHide);

		return () => {
			window.removeEventListener('scroll', topHide);
		}
	}, []);

	const topHide = useCallback((e) => {
		const scrollY = window.scrollY;
		scrollY > lastScrollY ? setWheel(true) : setWheel(false);
		lastScrollY = scrollY;
	}, [lastScrollY]);

	const onChange = useCallback((e) => {
		e.preventDefault();
		const current = e.currentTarget;
		setValue(current.value);
	}, [value]);

	return (
		<Container>
			<div className={classNames('top', {topHide: wheel})}>
				<div className='menu'>
					<NavLink to={`/product/${gender}-toplist`}>Top</NavLink>
					<NavLink to={`/product/${gender}-bottomlist`}>Bottom</NavLink>
					<NavLink to={`/product/${gender}-shoeslist`}>Shoes</NavLink>
				</div>
				<div className='filter'>
					<input type='range' defaultValue={0} min={0} max={2} onChange={onChange} />
					<button type='button'>FILTERS</button>
				</div>
			</div>
			<div className='side'>
				<p>제품 유형</p>
				<div>

				</div>
				<p>사이즈</p>
				<div>

				</div>
				<p>색상</p>
				<div>

				</div>
				<p>가격</p>
				<div>
					<input type='range' defaultValue={0} min={0} max={2} />
				</div>
			</div>
			<div className={classNames('product_box', {product_box2: value == 1 || value == 2})}>
				<div className={classNames('product', {zero: value == 0}, {one: value == 1}, {two: value == 2})}>
					<div>
						<img src={img} alt='상품' />
					</div>
					<div className='product_text'>
						<p>신발</p>
						<p>130000원</p>
					</div>
				</div>

				<div className={classNames('product', {zero: value == 0}, {one: value == 1}, {two: value == 2})}>
					<div>
						<img src={img} alt='상품' />
					</div>
					<div className='product_text'>
						<p>신발</p>
						<p>130000원</p>
					</div>
				</div>

				<div className={classNames('product', {zero: value == 0}, {one: value == 1}, {two: value == 2})}>
					<div>
						<img src={img} alt='상품' />
					</div>
					<div className='product_text'>
						<p>신발</p>
						<p>130000원</p>
					</div>
				</div>

				<div className={classNames('product', {zero: value == 0}, {one: value == 1}, {two: value == 2})}>
					<div>
						<img src={img} alt='상품' />
					</div>
					<div className='product_text'>
						<p>신발</p>
						<p>130000원</p>
					</div>
				</div>

				<div className={classNames('product', {zero: value == 0}, {one: value == 1}, {two: value == 2})}>
					<div>
						<img src={img} alt='상품' />
					</div>
					<div className='product_text'>
						<p>신발</p>
						<p>130000원</p>
					</div>
				</div>

				<div className={classNames('product', {zero: value == 0}, {one: value == 1}, {two: value == 2})}>
					<div>
						<img src={img} alt='상품' />
					</div>
					<div className='product_text'>
						<p>신발</p>
						<p>130000원</p>
					</div>
				</div>

				<div className={classNames('product', {zero: value == 0}, {one: value == 1}, {two: value == 2})}>
					<div>
						<img src={img} alt='상품' />
					</div>
					<div className='product_text'>
						<p>신발</p>
						<p>130000원</p>
					</div>
				</div>

				<div className={classNames('product', {zero: value == 0}, {one: value == 1}, {two: value == 2})}>
					<div>
						<img src={img} alt='상품' />
					</div>
					<div className='product_text'>
						<p>신발</p>
						<p>130000원</p>
					</div>
				</div>

				<div className={classNames('product', {zero: value == 0}, {one: value == 1}, {two: value == 2})}>
					<div>
						<img src={img} alt='상품' />
					</div>
					<div className='product_text'>
						<p>신발</p>
						<p>130000원</p>
					</div>
				</div>
			</div>
		</Container>
	);
});

export default ProductList;