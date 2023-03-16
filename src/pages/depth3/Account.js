import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
// import Header from '../../common/Header';

const AccountWrapper = styled.div`
    margin-top: 177px;
    padding-left: 12%;
    box-sizing: border-box;

    h2 {
        font-weight: bold;
        font-size: 18px;
        padding: 8px 0;
        margin-bottom: 50px;
    }

    
    .a-link-wrap {
        width: 550px;
        display: flex;
        justify-content: space-between;
        margin: 20px 0;

        .a-link {
            display: block;
            width: 100%;
            margin-bottom: 20px;
            
            p {
                font-size: 12px;
            }
        }

        button {
            background-color: transparent;
            border: none;
            cursor: pointer;
            font-size: 20px;
            //font-weight: 100;  얇게 해야 함!!
        }
    }

    .logOut button {
        margin-top: 50px;
        border: 1px solid #000;
        display: block;
        background-color: #fff;
        width: 300px;
        height: 35px;

        &:hover {
            border-color: #aaa;
        }
    }
`;


const Account = memo(() => {
    return (
            <AccountWrapper>
                <div>
                    <h2>계정</h2>
                </div>
                
                <div className='a-link-wrap'>
                    <NavLink className='a-link' to='edit_email'>
                        <div>
                            <p>이메일 변경</p>
                        </div>
                    </NavLink>
                    <button><i className="fa-solid fa-angle-right"></i></button>
                </div>
                <div className='a-link-wrap'>
                    <NavLink className='a-link' to='edit_password'>
                        <p>비밀번호 변경</p>
                    </NavLink>
                    <button><i className="fa-solid fa-angle-right"></i></button>
                </div>
                <div className='a-link-wrap'>
                    <NavLink className='a-link' to='delete_account'>
                        <p>계정삭제</p>
                    </NavLink>
                    <button><i className="fa-solid fa-angle-right"></i></button>
                </div>
                <div className='logOut'>
                    <button>세션 종료</button>
                </div>
            </AccountWrapper>
            
        
    );
  });
  
  export default Account;
  