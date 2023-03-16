import React, { memo, useRef, useState } from 'react';
import {Link, Routes, Route} from 'react-router-dom';
import styled from 'styled-components';
import Overlay from '../../components/Overlay';

const PasswordBox = styled.div`
    .password_container {
        display: flex;
        flex-direction: column;
        padding: 50px 200px;
        margin-top: 150px;
        width: calc(100% - 40%);
        min-width: 350px;
        h2 {
            font-size: 18px;
            font-weight: 400;
            padding-bottom: 20px;
        }
        p {
            font-size: 12px;
            color: gray
        }
        .passwordSearch {
            display: flex;
            flex-direction: column;
            width: 75%;

            .submitBtn {
                margin-top: 50px;
                width: 94%;
                height: 35px;
                background-color: black;
                border-radius: 0;
                border: 0;
                color: white;
            }
            .input_label {
                position: relative;
                width: 100%;
                margin-top: 30px;

                .password-input {
                    margin: 20px 0 0 0;
                    border: 0;
                    border-bottom: 1px solid lightgrey;
                    padding-bottom: 3px;
                    font-size: 11px;
                    width: 400px;
                }
                
                input {
                    width: calc(100% - 30px);
                    margin: 10px 20px 5px 0;
                    outline: none;
                    border: none;
                    line-height: 25px;
                    box-sizing: border-box;
                    font-size: 12px;
                    color: darkgray;
                    border-bottom: 1px solid #bbb;
                    background-color: transparent;

                    &:focus + label,
                    &:valid + label {
                    transform: translateY(-14px );
                    font-size: 7px;
                    
                        
                    }  
                }

                label {
                    width: 100%;
                    position: absolute;
                    left: 0;
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

                i {
                    margin-right: 5px;
                }
                span {
                    font-size: 11px;
                    vertical-align:middle;
                    /* padding-bottom: 20px; */
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
        }
        
    }
    .confirm {
        .confirm_wrapper {
            .confirm_box {
                display: block;
                position: absolute;
                top: 35%;
                left: 35%;
                z-index: 100000;
                width: 360px;
                height: 190px;
                padding: 35px 30px;
                box-sizing: border-box;
                background-color: white;
                border: 1px solid lightgray;
                box-shadow: 1px 1px 2px rgba(0,0,0,.2);
                h2 {font-size: 15px;}
                p {
                    font-size: 12px;
                    padding: 20px 0;
                    font-weight: 200;
                }
                .confirm_btn {
                        width: 300px;
                        height: 30px;
                        border: 0;
                        border-radius: 0;
                        background-color: black;
                        color: white;
                        a {
                            color: white;
                            display: block;
                            width: 100%;
                            height: 100%;
                            padding-top: 5px;
                        }
                } 
            }
        }
    }
    .hidden {
        display: none;
    }
`;

const FindPassword = memo(() => {
    const inputRef = useRef('');

    const [alert, setAlert] = useState(false);
    const [hint, setHint] = useState(false);
    const [popup, setPopup] = useState(false);

    const submitBtn = (e) => {
        e.preventDefault();
        if(e.target.email.value){
            setPopup(true);
        } else {
            setPopup(false);
        }
        console.log(e.target.email.value);
    }

    const FocusIn = (e) => {
        const target = e.target;

        if(inputRef.current.focus && target.name  === 'email'){
            setHint(true);
            setAlert(false);
        }
    };

    const FocusOut = (e) => {
        const target = e.target;

        if(target.value === '' && target.name === 'email'){
            setAlert(true);
            setHint(false);
        }
    };
    return (
        <PasswordBox>
            <div className='password_container'>
                <h2>비밀번호 찾기</h2>
                <p>비밀번호를 잊으신 경우, 입력해 주시는 이메일 주소로 비밀번호를 재설정 하실 수 있는 이메일을 보내 드리겠습니다.</p>

                <form className='passwordSearch' onSubmit={submitBtn}>
                    <div className='input_label'>
                        <div className='findpassword_input'>
                            <input type='text' className='email-input' name="email" required
                            onFocus={FocusIn} onBlur={FocusOut} ref={inputRef} defaultValue='' />
                            <label htmlFor="email">이메일</label>
                        </div>
                        <div className={ hint ? 'input_help' : 'hidden_h'}>
                                <i className="fa-solid fa-info" />
                                <span>귀하의 이메일 주소를 입력하십시오</span>
                            </div>
                            <div className={ alert ? 'input_error' : 'hidden_e'}>
                                <i className="fa-solid fa-exclamation" />
                                <span>필수 입력란입니다.</span>
                            </div>
                    </div>
                    <button type='submit' className="submitBtn" >계속</button>
                </form>    
            </div>
            <div className={popup ? 'confirm' : 'hidden'}>
                <Overlay/>
                <div className='confirm_wrapper'>
                    <div className='confirm_box'>
                        <h2>신청이 성공적으로 진행되었습니다.</h2>
                        <p>비밀번호 재설정 요청이 정상적으로 접수 되었습니다. <br/> 비밀번호 재설정 이메일을 곧 보내드리겠습니다.</p>
                        <button type="button" className="confirm_btn"><Link to='/login'>수락</Link></button>
                    </div>
                </div>
            </div>
            
        </PasswordBox>
    );
});

export default FindPassword;