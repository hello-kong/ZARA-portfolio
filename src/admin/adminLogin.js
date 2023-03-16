import React, { memo, useCallback } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import axios from "axios";

import img from '../assets/img/zaralogoW.png';

const Container = styled.div`
	
	.box {
		background-color: #000;
		color: #fff;
		width: 500px;
		height: 500px;
		margin: auto;
		transform: translateY(50%);

		.top {
			text-align: center;
			margin-bottom: 50px;

			img {
				width: 50%;
				margin: 30px 0;
			}

			p {
				font-size: 30px;
			}
		}

		.login {
			form {
				display: flex;
				flex-direction: column;
				align-items: center;

				input {
					width: 50%;
					height: 30px;
					margin-bottom: 20px;
					border: none;
					outline: none;
				}

				button {
					width: 30%;
					padding: 10px 0;
					background-color: #fff;
					border: none;
				}
			}
		}
	}
`;

const adminLogin = memo(() => {

	const navigate = useNavigate();

	const logIn = useCallback( async (e) => {
		e.preventDefault();
		const current = e.target;
		const email = current.email.value;
		const password = current.password.value;

		try {
			const response = await axios.post("/admin/login", {
				email: email,
				password: password
			});
			navigate('/admin/main');
		} catch (err) {
			window.alert(err.response.data.rtmsg);
		}
	}, []);

	return (
		<Container>
			<div className='box'>
				<div className='top'>
					<img src={img} alt='logo' />
					<p>관리자 페이지</p>
				</div>
				<div className='login'>
					<form onSubmit={logIn}>
						<input type='email' name='email' placeholder='이메일' required />
						<input type='password' name='password' placeholder='비밀번호' required />
						<button type='submit'>로그인</button>
					</form>
				</div>
			</div>
		</Container>
	);
});

export default adminLogin;