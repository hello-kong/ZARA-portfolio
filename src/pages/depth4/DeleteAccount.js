import React, { memo } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';


const DeleteAccountWrapper = styled.div`
    margin-top: 177px;
    padding-left: 12%;
    box-sizing: border-box;
    

    h2 {
        font-weight: bold;
        font-size: 18px;
        padding: 8px 0;
        margin-bottom: 50px;
    }

    .contWrap {
        width: 300px;

        span {
            font-size: 11px;
        }

        h3 {
            margin: 35px 0 25px 0;
            font-size: 14px;
        }

        p {
            font-size: 11px;
            margin-top: 10px;
        }

        button {
        display: block;
        border: 1px solid #000;
        width: 100%;
        height: 35px;
        background-color: transparent;
        margin-top: 40px;
        font-size: 11px;

        &:hover {
            border-color: #aaa;
        }
    }
    }

    
`;

const DeleteAccount = memo(() => {
    return (
        <DeleteAccountWrapper>
            <div>
                <h2>계정 삭제</h2>
            </div>
            <div className='contWrap'>
                <span>
                계정 삭제 절차를 시작하고 계십니다. 모든 관련 정보는 시스템에서 영원히 삭제됩니다. 이 작업은 취소되지 않습니다.
                </span>

                <h3>유의:</h3>
                <p>구매, 반품 및/또는 교환을 추적할 수 없게 됩니다.</p>
                <p>ZARA에서 계정에 액세스할 수 없게 됩니다.</p>
                <p>구매하신 상품의 반품/교환 기간이 만료되면 계정이 삭제될 것입니다.</p>

                <NavLink to='confirm_del'>
                <button type='submit'>계속</button>
                </NavLink>
            </div>
            
        </DeleteAccountWrapper>
    );
});

export default DeleteAccount;