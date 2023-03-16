import React, { memo, useCallback, useRef, useState} from 'react';
import {NavLink, Routes, Route} from 'react-router-dom';
import styled from 'styled-components';

import FindPassword from '../depth2/FindPassword';
import Signup from '../depth2/Signup';
import RegexHelper from '../../helper/RegexHelper';


const LoginContainer = styled.div`
    .login-content {
        width: 70%;
        display: flex;
        justify-content: space-around;
        padding: 250px 200px 0;
        margin: auto;

        h2 {
            font-size: 20px;
            font-weight: 400;
        }
        button {
            width: 230px;
            height: 38px;
            color: white;
            background-color: black;
            border: 0;
            border-radius: 0;
        }

        .login-box {
            h2 {padding-bottom: 20px;}
            .login-form {
                padding-right: 70px;
                display: flex;
                flex-direction: column;
                
                /* input {
                    width: 230px;
                    border: 0;
                    border-bottom: 1px solid lightgray;
                    padding: 20px 0 3px 0;
                    font-size: 12px;

                    &:focus {
                        outline: none;
                    }
                    
                } */

                a {
                    padding-top: 20px;
                    text-decoration: none;
                    font-size: 11px;
                    color: gray;
                }

                .login_btn {
                    margin-top: 40px;
                }
                .form_wrapper {
                    margin-bottom: 20px;
                }
                .input_label {
                    position: relative;
                    width: 100%;

                    .signup-input {
                        margin: 20px 0 0 0;
                        border: 0;
                        border-bottom: 1px solid lightgrey;
                        padding-bottom: 3px;
                        font-size: 13px;
                    }

                    input {
                        width: calc(100% - 30px);
                        outline: none;
                        border: none;
                        border-bottom: 1px solid #bbb;
                        background-color: transparent;
                        margin-right: 20px;
                        margin-bottom: 5px;

                        &:focus + label,
                        &:valid + label {
                        transform: translateY( -14px );
                        font-size: 7px;
                        
                            
                        }  
                    }

                    label {
                        width: 100%;
                        position: absolute;
                        left: 0;
                        bottom: 5px;
                        transform-origin: left;
                        transition-duration: 0.3s;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        font-size: 11px;
                        font-weight: 200;
                        padding-top: 10px;

                        &:hover {
                            cursor: text;
                        }
                    }

                    .label_up {
                        transform: translateY(-14px);
                        font-size: 4px;
                    }
                }
                .input_error {
                    margin: 5px 0;
                    font-size: 5px;
                    color: #EC0909;

                    //display: none;

                    i {
                        margin-right: 5px;
                    }
                    span {
                        font-size: 11px;
                        vertical-align:middle;
                        padding-bottom: 20px;
                    }
                }
                .hidden_e {
                    display: none;
                }

                .input_help {
                    font-size: 5px;
                    margin-top: 5px;
                    margin-bottom: 5px;

                    span {
                        line-height: 1.2;

                    }
                    
                    
                    i {
                            margin-right: 5px;
                            
                        }
                    
                }
                .hidden_h {
                        display: none;

                }

                .success {
                    font-size: 5px;
                    margin: 5px 0;
                    color: #ec0909;
                    i {margin-right: 5px;}
                }

                .error {
                    display: none;
                }
            }
        }
        
        .signup-box {
            float: right;
            width: 400px;
            font-weight: 200;
            p {
                padding: 3px 0;
                font-size: 12px;
            }
            h2 {
                padding-bottom: 35px;
            }
            a {
                color: white;
                text-decoration: none;
            }
            span {
                font-weight: 700;
            }
            button {
                margin-top: 40px;
            }
        }
    }
`;

const Login = memo(() => {
    const inputRef = useRef();

    // 이메일, 비밀번호, 비밀번호 확인, 이름
    const [email, setEmail] = useState('');

    // 오류메세지 상태저장
    const [emailMessage, setEmailMessage] = useState('');

    // 유효성 검사
    const [isEmail, setIsEmail] = useState(false);

    // 이메일
    const onChangeEmail = useCallback((e) => {
        const emailRegex =
        /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
        const emailCurrent = e.target.value
        setEmail(emailCurrent)

        if (!emailRegex.test(emailCurrent)) {
        setEmailMessage('Enter a valid email address');
        setIsEmail(true);
        setHint(false);
        setAlert(false);
        } else {
        setEmailMessage('')
        setIsEmail(false);
        setHint(false);
        setAlert(false);
        }
    }, []);


    // 포커스 이벤트
    const [alert, setAlert] = useState(false);
    const [alert2, setAlert2] = useState(false);

    const [hint, setHint] = useState(false);


    // onFocus Event
    const FocusIn = (e) => {
        const target = e.target;
        if(inputRef.current.focus && target.name === 'email') {
            setHint(true);
            setAlert(false);
            setIsEmail(false);
        } else if (
            inputRef.current.focus && target.name === 'password'
        ) {
            setAlert2(false);
        } 
    };

    const FocusOut = (e) => {
        const target = e.target;
        
        if(target.value === '' && target.name === 'email') {
            setAlert(true);
            setHint(false);
            setIsEmail(false);
        } else if (
            target.value === '' && target.name === 'password'
        ) {
            setAlert2(true);
        }
    };
    
    return (
        <LoginContainer>
            <div className='login-content'>
                <div className='login-box'>
                    <h2>로그인</h2>
                    <form className='login-form'>
                        <div className='form_wrapper'>
                            <div className='input_label'>
                                <input type="text" className="signup-input" 
                                name="email" id="email_address" required
                                onFocus={FocusIn}
                                onBlur={FocusOut}
                                onChange={onChangeEmail}
                                ref={inputRef} defaultValue=''/>
                                <label htmlFor='email_address'>이메일</label>
                            </div>
                            <div className={ hint ? 'input_help' : 'hidden_h'}>
                                <i className="fa-solid fa-info" />
                                <span>귀하의 이메일 주소를 입력하십시오</span>
                            </div>
                            <div className={ alert ? 'input_error' : 'hidden_e'}>
                                <i className="fa-solid fa-exclamation" />
                                <span>필수 입력란입니다.</span>
                            </div>
                            <div>
                                {email.length > 0 && <span className={`messsage ${isEmail ? 'success' : 'error'}`}>
                                    <i className="fa-solid fa-exclamation" />
                                    {emailMessage}
                                </span>}
                            </div>
                        </div>
                        <div className='form_wrapper'>
                            <div className='input_label'>
                                <input type="password" className="signup-input" name="password" id="password"  required
                                onFocus={FocusIn}
                                onBlur={FocusOut}
                                ref={inputRef} defaultValue=''/>
                                <label htmlFor='password'>비밀번호</label>
                            </div>
                            <div className={ alert2 ? 'input_error' : 'hidden_e'}>
                                <i className="fa-solid fa-exclamation" />
                                <span>필수 입력란입니다.</span>
                            </div>
                        </div>
                        
                        
                        <NavLink to='/find_password'><span>비밀번호를 잊으셨습니까?</span></NavLink>
                        <button type="submit" className="login_btn">로그인</button>
                    </form>
                </div>
                <div className='signup-box'>
                    <h2>등록</h2>
                    <p><span>ZARA.COM</span> 회원으로 가입하시면 빠르고 편리하게 이용하실 수 있습니다.</p>
                    <p>아직  <span>ZARA.COM</span> 의 회원이 아니시라면 이메일로 간편하게 가입하실 수 있습니다.</p>
                    <NavLink to='/signup'><button type="button">계정 만들기</button></NavLink>
                </div>
            </div>

        </LoginContainer>
    );
});

export default Login;