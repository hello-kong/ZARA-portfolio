import React, { memo, useCallback, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { NavLink, useNavigate } from 'react-router-dom';
import { useQueryString } from '../../hooks/useQueryString';
import { useSelector, useDispatch } from "react-redux";
import { getItem } from "../../slice/DefaultAddressSlice";
import { getList, deleteItem } from "../../slice/AddrSlice";

import Spinner from "../../components/Spinner";
import ErrorView from '../../components/ErrorView';

const AddressWrapper = styled.div`
    margin-top: 177px;
    padding-left: 12%;
    box-sizing: border-box;
    width: 750px;

    .add {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-bottom: 50px;

            h2 {
                font-weight: bold;
                font-size: 18px;
                padding: 8px 0;
            }

            a {
                display: block;
                background-color: #fff;
                border: 1px solid #000;
                padding: 8px 70px;
                font-size: 12px;

                &:hover {
                    border: 1px solid #aaa;
                }
            }
        }

    .contWrap {
        display: flex;
        justify-content: space-between;
        position: relative;

        .name {
            font-weight: bold;
            margin-bottom: 10px;
        }

        .addressInfo {
            p:last-child {
                margin-bottom: 5px;
            }
        }

        .addressType {
            margin-bottom: 15px;
            span {
                border-radius: 20px;
                font-size: 10px;
                color: #fff;
                background-color: #000;
                padding: 2px 12px;
            }
        }

        .ellipsis {
            margin-top: 60px;
            //position: relative;
           

            button {
                background-color: transparent;
                border: none;
                font-size: 18px;

                &:hover {
                color: #aaa;
                }
            }

            .click {
                width: 150px;
                border: 1px solid #ddd;
                background-color: #fff;
                padding: 10px 0;
                position: absolute;
                right: 0;
                bottom: -30px;
                
                ul li {
                    display: flex;
                    flex-direction: column;
                    text-align: left; 
                    font-size: 12px;

                    a {
                        width: 100%;
                        display: block;
                        height: 50px;
                        line-height: 50px;
                        padding: 0 10px;
                        box-sizing: border-box;

                        &:hover {
                            background-color: #F7F7F7;
                        }
                    }

                    button {
                        width: 100%;
                        height: 50px;
                        font-size: 12px;
                        display: block;
                        padding: 0;
                        text-align: left;
                        padding: 0 10px;
                        box-sizing: border-box;

                        &:hover {
                            background-color: #F7F7F7;
                            color: #000;
                        }
                    }

                }
            }
            .click2 {
                width: 150px;
                border: 1px solid #ddd;
                background-color: #fff;
                padding: 10px 0;
                position: absolute;
                right: 0;
                bottom: -100px;

                ul li {
                    display: flex;
                    flex-direction: column;
                    text-align: left; 
                    font-size: 12px;

                    a {
                        width: 100%;
                        display: block;
                        height: 50px;
                        line-height: 50px;
                        padding: 0 10px;
                        box-sizing: border-box;

                        &:hover {
                            background-color: #F7F7F7;
                        }
                    }

                    button {
                        width: 100%;
                        height: 50px;
                        font-size: 12px;
                        display: block;
                        padding: 0;
                        text-align: left;
                        padding: 0 10px;
                        box-sizing: border-box;

                        &:hover {
                            background-color: #F7F7F7;
                            color: #000;
                        }
                    }

                }
            }
        }

        .isClick {
            display: none;
        }
    }
`;


const Address = memo(() => {
    //const ref = useRef();
    
    const [isActive, setIsActive] = useState(null); // 메뉴의 초기값을 false로 설정
    const [isActive2, setIsActive2] = useState(false); // 메뉴의 초기값을 false로 설정


    const handleClick = useCallback((e) => {
        e.preventDefault();
        const current = e.currentTarget;

       if (current.dataset.btn == isActive) {
        setIsActive(null);
       } else {
        setIsActive(current.dataset.btn);
       }
        
      },[isActive]);

    const handleClick2 = useCallback((e) => {
        e.preventDefault();
        setIsActive2(!isActive2);

    },[isActive2]);


    /** 리덕스 관련 초기화 */
    const dispatch = useDispatch();
    const { data, visible, error } = useSelector((state) => state.DefaultAddressSlice);
    console.log(data);
    const { data: data2 } = useSelector((state) => state.AddrSlice);
    
    /** 최초 마운트시 리덕스를 통해 목록을 조회한다. */
    useEffect(() => {
        dispatch(getItem({id: 6}));
        dispatch(getList());
    },[dispatch]);

    /** 페이지 강제 이동을 처리하기 위한 navigate함수 생성 */
    //const navigate = useNavigate();

    /** 삭제 버튼에 대한 이벤트 리스너 */
    const onAddrDelete = useCallback((e) => {
        e.preventDefault();

        const current = e.currentTarget;

        if (window.confirm(`정말 삭제하시겠습니까?`)) {
            dispatch(deleteItem({ id: current.dataset.id })).then(({ payload, error }) => {
                if (error) {
                    window.alert(payload.data.rtmsg);
                    return;
                }

                window.alert("삭제되었습니다.");
            });
        }
    },[]);
   
    return (
        <div>

            {/* <AddressWrapper>
                <div className='add'>
                    <h2>주소</h2>
                    <NavLink to='/address_add'>주소추가</NavLink>
                </div>
                <div className='contWrap'>
                    
                        <div className='float' >
                            <p className='name'>김고객</p>
                            <div className='addressInfo'>
                                <p>서울시 00구 00동</p>
                                <p>1122</p>
                                <p>대한민국</p>
                                <p>+82 1012345678</p>
                            </div>
                            <div className='addressType'>
                                <span>기본주소</span>
                            </div>
                        </div>
                    
                    <div className='ellipsis'>
                        <button type='button' onClick={handleClick} data-btn='default' ><i className="fa-solid fa-ellipsis"></i></button>
                        <div className={['click', isActive !== 'default' ? 'isClick' : ''].join(" ")}>
                            <ul>
                                <li>
                                    <NavLink to='/address_edit'>편집</NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr />
            </AddressWrapper> */}


            {/* 로딩바 */}
            <Spinner visible={visible} />
             
             {/* 주소록 목록 */}
             {error ? (
                <ErrorView error={error} />
             ) : (
                data &&  <AddressWrapper>
                <div className='add'>
                    <h2>주소</h2>
                    <NavLink to='/address_add'>주소추가</NavLink>
                </div>
                <div className='contWrap'>
                    {data && 
                        <div className='float' >
                            <p className='name'>{data.item.name}</p>
                            <div className='addressInfo'>
                                <p>{data.item.roadaddr}</p>
                                <p>{data.item.postcode}</p>
                                <p>대한민국</p>
                                <p>+82{data.item.tel}</p>
                            </div>
                            <div className='addressType'>
                                <span>기본주소</span>
                            </div>
                        </div>
                        }
                    
                    <div className='ellipsis'>
                        <button type='button' onClick={handleClick} data-btn='default' ><i className="fa-solid fa-ellipsis"></i></button>
                        <div className={['click', isActive !== 'default' ? 'isClick' : ''].join(" ")}>
                            <ul>
                                <li>
                                    <NavLink to='/address_edit'>편집</NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr style={{'marginBottom':'20px'}}/>

                {data2 && data2.item.map((v2, i) => {
                    return (
                    <>
                    <div className='contWrap'  key={i}>
                            <div className='float'>
                                <p className='name' data-name='addname'>{v2.addname}</p>
                                <div className='addressInfo'>
                                    <p>{v2.roadaddr}</p>
                                    <p>{v2.postcode}</p>
                                    <p>대한민국</p>
                                    <p>+82{v2.tel}</p>
                                </div>
                            </div>
                            
                            <div className='ellipsis'>
                                <button type='button' onClick={handleClick2}><i className="fa-solid fa-ellipsis" /></button>
                                <div className={['click2', !isActive2 ? 'isClick' : ''].join(" ")}>
                                    <ul>
                                        <li>
                                            <NavLink to='/address_edit'>편집</NavLink>
                                        </li>
                                        <li>
                                            <button type='button' onClick={onAddrDelete}>삭제</button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                    </div>
                    <hr  />
                    </>
                    )
                })}

            </AddressWrapper>
             )} 
           
        </div>
    );
  });
  
  export default Address;
  