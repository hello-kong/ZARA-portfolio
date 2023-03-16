import React, { memo, useState, useCallback, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import styled from 'styled-components';

import creditCard from '../../assets/img/credit-card.svg';
import escrow from '../../assets/img/escrow.svg';
import In from '../../assets/img/in.svg';
import bank from '../../assets/img/bank-transfer.svg';
import Overlay from '../../components/Overlay';
import BottomBar from '../../common/BottomBar';

const PaymentWrapper = styled.div`
    margin-top: 177px;
    padding-left: 12%;
    padding-right: 12%;
    box-sizing: border-box;
    position: relative;
    
    h2 {
        font-weight: bold;
        font-size: 18px;
        padding: 8px 0;
        margin-bottom: 45px;
    }

    .container {
        display: grid;
        grid-template-columns: 125px 125px;
        grid-column-gap: 25px;
        grid-row-gap: 17px;
        div {
            width: 125px;
            height: 95px;
            padding: 16px 4px 4px;
            border: 1px solid #ddd;
            text-align: center;
            cursor: pointer;
            transition: all .3s linear;
            
            &:hover {
                transform: translate(0, -10px);
                border-bottom: 1px solid #000;
            }

            &.active {
                border: 2px solid #000;
            }

            img {
                width: 75px;
                margin-bottom: 25px;
            }

            p {
                font-size: 11px;
            }
        }
    }

    .alertPop {
        width: 314px;
        height: 174px;
        padding: 25px 22px;
        box-sizing: border-box;
        border: 1px solid #ddd;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 9999;
        background-color: #fff;

        

        h1 {
            font-size: 16px;
            margin-bottom: 20px;
        }

        p {
            font-size: 11px;
            margin-bottom: 20px;
        }

        button {
            font-size: 12px;
            border: none;
            outline: none;
            background-color: #000;
            color: #fff;
            width: 100%;
            height: 33px;
        }

        
    }

    .hidden {
           display: none;
         
        }

`;

const Payment = memo(() => {
    const [isActive, setIsActive] = useState(false);
    const ref = useRef([]);
    const [selected, setSelected] = useState(0);
    console.log(selected);


    const onClick = useCallback((e) => {

        ref.current.forEach((v, i) => {
            v.classList.remove('active');
        });

        e.currentTarget.classList.add('active');
        setIsActive(!isActive);

        const index = e.currentTarget.dataset.index;
        setSelected(index);

    }, []);

    const params = useParams();
    console.log(params);


    useEffect(() => {
        if (params['*'] !== '') {
            ref.current[params['*']].classList.add('active');
            setIsActive(true);
        }
        
    }, [params]);




    const boxCont = [{
        src: creditCard,
        cont: 'CREDITCARD'
    }, {
        src: In,
        cont: 'IN CARD'
    }, {
        src: escrow,
        cont: '에스크로'
    }, {
        src: bank,
        cont: '계좌이체'
    }]

    // 알림창
    // 결제방법을 선택하지 않고 하단바의 계속버튼을 눌렀을 때 알림창이 뜸. 
    const [popup, setPopup] = useState(false);

    const navigate = useNavigate();

    const OpenPopup = useCallback((e) => {
        e.preventDefault();
        if (!isActive) {
            setPopup(true);
        } else {
            navigate(`/payment_last/${selected}`);
        }

    }, [isActive, navigate,selected]);

    const OnClickClose = useCallback((e) => {
        e.preventDefault();
        setPopup(false);
        console.log(popup);

    }, []);

    // 오버레이스크롤 방지
    useEffect(() => {
        if (popup == true) {
            document.body.style.cssText = `
        position: fixed; 
        top: -${window.scrollY}px;
        overflow-y: hidden;
        width: 100%;`;
            return () => {
                const scrollY = document.body.style.top;
                document.body.style.cssText = '';
                window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
            };
        }

    }, [popup]);


    


    return (
        <PaymentWrapper>
            <h2>결제 방법을 선택하세요.</h2>
            <div className='container'  >
                {boxCont.map(({ src, cont }, i) => {
                    return (
                        <div key={i} data-index={i} onClick={onClick} ref={(e) => { ref.current[i] = e }}  >
                            <img src={src} alt={cont}  />
                            <p>{cont}</p>
                        </div>
                    )
                })}
            </div>
            {/* 알림창 */}
            <div className={popup ? 'alertPop' : 'hidden'} >
                {/* <div className='alertPop'> */}
                <div>
                    <h1>알림</h1>
                </div>
                <div>
                    <p>결제 방법을 선택하셔야 합니다. 아이콘 중 하나를 클릭하여 원하시는 결제 방법을 선택하십시오.</p>
                </div>
                <div>
                    <button onClick={OnClickClose}>닫기</button>
                </div>
            </div>
            <Overlay className={popup ? 'Overlay' : 'hidden'} />
            <BottomBar clickEvent={OpenPopup} link='/payment_last' />
        </PaymentWrapper>
    );
});

export default Payment;