import React, { memo, useState, useEffect, useCallback, useRef } from 'react';

import styled from 'styled-components';
import box from '../../assets/img/box.svg'
import shop from '../../assets/img/Icon-Shop.svg'
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import BottomBar from '../../common/BottomBar';
import ModalSidebar from '../../components/ModalSidebar';
import Overlay from '../../components/Overlay';
import Map from '../../components/map';
import { useQueryString } from '../../hooks/useQueryString';
import { useSelector, useDispatch } from "react-redux";
import { getItem } from "../../slice/DefaultAddressSlice";
import { getList } from "../../slice/AddrSlice";
import Spinner from "../../components/Spinner";
import ErrorView from '../../components/ErrorView';
import sample from '../../assets/img/sample.jpg';

import dayjs from 'dayjs';
import 'dayjs/locale/ko';
dayjs.locale('ko');

const ShippingContainer = styled.div`

    
    margin-top: 177px;
    padding-left: 12%;
    padding-right: 12%;
    box-sizing: border-box;
    
    p {
        font-size: 11px;
        letter-spacing: 0.4px;
    }

    h2 {
        font-weight: bold;
        font-size: 18px;
        padding: 8px 0;
        margin-bottom: 45px;
    }

    .shippingLoc {
        display: flex;
        margin-bottom: 25px;

        button {
            display: block;
            width: 123px;
            height: 102px;
            padding: 20px;
            cursor: pointer;
            background-color: transparent;
            /* box-sizing: border-box; */
            text-align: center;
            border: 1px solid #000;
            &:first-child {
                margin-right: 16px;
            }
            &:last-child {
                border-color: #aaa;
            }
            img {
                /* margin-bottom: 10px; */
            }
           
        }
        
    }

    .address {
        cursor: pointer;
        width: 650px;
        p {
            margin-bottom: 10px;
        }
        button {
            font-size: 11px;
            background-color: transparent;
            border: none;
            text-decoration: underline;
            text-align: left;
            padding: 0;
        }
    }

    .orderList {
        margin-top: 70px;
        h3 {
            font-size: 16px ;
            margin-bottom: 22px;
        }
        img {
            width: 127px;
            height: 186px;
            //background-color: #0002;
            margin-bottom: 60px;
        }
    }
    
    .boxWrap {
        border-top: 1px solid #f1f1f1;
        padding: 30px 5px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;

        &:last-child {
            border-bottom: 1px solid #f1f1f1;
        }

        .radioWrap {
            display: flex;
            
            input[type=radio] {
                margin-right: 10px;
                accent-color: #000;
               
            }
        
        }

        .margin {
            margin-top: 10px;
        }

    }
    
`;

// 사이드바 CSS
const Sidebar = styled(ModalSidebar)`
    animation: ${({ state }) => state ? "slide" : "rev_slide"} .3s linear;

   
    .cont {
       
        p{
            font-size: 11px;
        }
        span {
            font-size: 11px;

        }

        .searchTitle{
            width: 100%;
            height: 100px;
            position: fixed;
            background-color: #fff;
            top: 50px;

            h3{
                font-size: 16px;
                margin-left: 3px;
                //line-height: 108px;
                position: fixed;
                top: 86px;
                //background-color: #fff;

                span {
                    font-weight: bold;
                    margin-right: 6px;
                }
            }
        }
        
        .addrBox {
            width: 100%;
            background-color: #fff;
            display: flex;
            justify-content: space-between;
            position: sticky;
            top: 160px;
            cursor: pointer;

            ul {
                width: 100%;

                .addrWrap {
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 40px;

                    .rec_name {
                        font-size: 12px;
                        font-weight: bold;
                        margin-bottom: 12px;
                    }

                    .addr {
                        p:last-of-type {
                            margin-bottom: 12px;
                        }
                    }

                    .edit {
                        text-decoration: underline;
                        margin-top: 12px;
                    }

                }

            }
            
            

            
        }

        .newAddr {
           position: sticky;
           top: 745px;
           border-top: 1px solid #000;
           
         
            button {
                background: #fff;
                border: 1px solid #000;
                width: 100%;
                padding: 8px 0;
                margin-top: 20px;

            }
        }

        .notice {
            margin-top: 95px;
            margin-bottom: 45px;
            width: 307.362px;
            height: 16px;
            padding: 20px;
            //box-sizing: border-box;
            background-color: #e5e5e5;
            p {
                font-size: 12px;
                text-align: center;
            }
        }
        
        .searchStore {
            display: flex;

            .searchAddr {
                span {
                    font-size: 8px;
                    display: block;
                }
                input {
                    width: 280px;
                    height: 21px;
                    border: none;
                    border-bottom: 1px solid #aaa;
                    outline: none;
                    margin-bottom: 25px;
                }
               
            }

            button {
                    width: 148px;
                    height: 34px;
                    background-color: #000;
                    color: #fff;
                    border: none;
                    margin-left: 30px;
                    font-size: 12px;
                }
        }

        .checkbox {
            input[type=checkbox] {
                margin-right: 7px;
                accent-color: #000;
            }
            span {
                font-size: 10px;
                vertical-align: middle;
            }
        }

        .stickyMenu {
            /* position: sticky;
            top: 143px;
            height: auto; */

            .tabMenu {
                width: 475px;
                position: sticky;
                top: 131px;
                background-color: #fff;
           
                button {
                    width: 231px;
                    height: 40px;
                    padding: 0 12px;
                    box-sizing: border-box;
                    text-align: center;
                    background-color: #fff;
                    border: 0;
                    outline: none;
                    border-bottom: 1px solid #AFAFAF;
                    color: #AFAFAF;

                    &.active {
                        border-bottom: 1px solid #000;
                        color: #000;
                    }
                    
                }

            }

            .nearestStoreList, .map {
                display: none;
                width: calc(100% - 12px);

                &.visible {
                    display: block;
                }
            }

            .nearestStoreList {
                margin-top: 33px;
                //height: auto;
                background-color: #fff;

                

                span {
                    font-size: 11px;
                }
                p {
                    font-size: 11px;
                    span {

                    }
                }
                ul {
                    margin-top: 40px;
                    //margin-bottom: 130px;


                    li {
                        margin-bottom: 40px;
                        &:last-of-type {
                            padding-bottom: 170px;
                        }

                        

                        .store {
                            display: flex;
                            
                            input {
                                margin-right: 10px;
                                margin-top:-8px;
                                cursor: pointer;
                                accent-color: #000;
                            }
                            
                            span {
                                display: block;
                                margin-bottom: 5px;
                                cursor: pointer;

                                &:first-child {
                                    color: #aaa;
                                }
                                
                            }

                           
                        }

                        .storeAddr {
                        margin-left: 28px;
                        margin-top: 15px;

                            
                            button {
                                margin-top: 15px;
                                background-color: transparent;
                                outline: none;
                                border: 0;
                                text-decoration: underline;
                                cursor: pointer;
                            }
                        }
                        .hidden {
                               display: none;
                            }

                        

                    }

                }
            }

            .map {
                margin-top: 8px;
                width: 100%;
				height: 450px;
            }

        }
        
        .saveBox {
            border-top: 1px solid #000;
            position: fixed;
            bottom: 0;
            width: 475px ;
            height: 110px;
            background-color: #fff;

            button {
                margin-top: 26px;
                background-color: #000;
                color: #fff;
                width: 100%;
                height: 37px;
                font-size: 12px;
            }
        }  
    }
    
`;





const Shipping = memo(() => {

    // 배송날짜&배송비
    let date1 = dayjs().add(3, 'day');
    let date2 = dayjs().add(1, 'day');

    if (date1.format('dddd') == '일요일') {
        date1 = date1.add(1, 'day').format('dddd DD, MM');
    } else {
        date1 = date1.format('dddd DD, MM');
    }

    if (date2.format('dddd') == '일요일') {
        date2 = date2.add(1, 'day').format('dddd DD, MM') + '월';
    } else {
        date2 = '내일';
    }

    /** 리덕스 관련 초기화 */
    const dispatch = useDispatch();
    const { data, visible, error } = useSelector((state) => state.DefaultAddressSlice);
    const { data: data2 } = useSelector((state) => state.AddrSlice);
    
    /** 최초 마운트시 리덕스를 통해 목록을 조회한다. */
    useEffect(() => {
        dispatch(getItem({id: 6}));
        dispatch(getList());
    },[dispatch]);


    //탭메뉴
    const [tab, setTab] = useState(false);

    
    // 사이드바 상태값 관리
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);

    /** QueryString 변수 받기 */
    const { sidebaropen } = useQueryString();
    console.log(sidebaropen);

    useEffect(() => {
        if (sidebaropen) {
            setIsOpen(true);
        }
    }, []);



    // 사이드바 마운트/언마운트 시 애니메이션 적용 할 상태값 관리
    const [mount, setMount] = useState(true);

    // 주소 검색 값 담을 상태값
    const [search, setSearch] = useState('');

    // 사이드바 열고 닫는 이벤트
    const onOpenSidebar = useCallback((e) => {
        e.preventDefault();
        setIsOpen(current => !current);
    }, []);

    const onOpenSidebar2 = useCallback((e) => {
        e.preventDefault();
        setIsOpen2(current => !current);
    }, []);

    const OnClickClose = useCallback((e) => {
        e.preventDefault();
        setMount(false);
        setTimeout(() => {
            setIsOpen(false);
            setMount(true);
        }, 250);
    }, []);

    const OnClickClose2 = useCallback((e) => {
        e.preventDefault();
        setMount(false);
        setTimeout(() => {
            setIsOpen2(false);
            setMount(true);
        }, 250);
    }, []);

    // 사이드바 오버레이에서 스크롤 방지
    useEffect(() => {
        if (isOpen == true) {
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
        } else if (isOpen2 == true) {
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

    }, [isOpen, isOpen2]);

    
    // 탭 클릭 이벤트
    const tabClick = useCallback((e) => {
        e.preventDefault();
        const current = e.currentTarget;
        const target = current.classList.contains('active');

        if (!target) {
            setTab(!tab);
        }

    }, [tab]);

    // 매장 상세주소 
    const addrRef = useRef();
    console.log(addrRef.current);
    const [showAddr, setShowAddr] = useState([]);
    const [showAddr2, setShowAddr2] = useState(false);

    const onShowAddr = useCallback((e) => {
        
        const selected = e.target;
        console.log(selected);

        if (selected) {
            setShowAddr2(true);
        } else {
            setShowAddr2(false);
        }
        

    }, []);

    // 검색 input 가져오기
    const ref = useRef([]);
   

    // 검색버튼 
    const onSearch = useCallback((e) => {
        e.preventDefault();
        const searchValue = ref.current.value;
        setSearch(searchValue);
    }, []);

    // sum > 49000 ? '무료' : '3,000 원';
    return (
        <div>
            <ShippingContainer>
                <div>
                    <h2>물품을 배송 받을 장소</h2>
                </div>
                <div className='shippingLoc'>
                    <button>
                        <img src={box} alt='box' />
                        <p>자택</p>
                    </button>
                    <button onClick={onOpenSidebar2}>
                        <img src={shop} alt='shop' />
                        <p>ZARA 매장</p>
                    </button>
                </div>
                <div className='address' onClick={onOpenSidebar}>
                    <p>감자동 123-45</p>
                    <button><span>편집</span></button>
                </div>
                <div className='orderList'>
                    <h3>품목</h3>
                    <div>
                        <img src={sample} alt='sample' />
                    </div>
                    <div>
                        <div className='boxWrap'>
                            <div className='radioWrap'>
                                <input type='radio' name='shippingOption' defaultChecked='true' />
                                <div className='check'></div>
                                <div>
                                    <p>{date1 + '월'}</p>
                                    <p>할인이 적용되지 않은 제품의 경우에만 49,000 원 이상 구매 시 무료 배송.</p>
                                </div>

                            </div>
                            <div className='margin'>
                                <p>무료</p>
                            </div>
                        </div>
                        <div className='boxWrap'>
                            <div className='radioWrap'>
                                <input type='radio' name='shippingOption' />
                                <p>{date2}</p>
                            </div>
                            <div>
                                <p>4,000 원</p>
                            </div>
                        </div>
                    </div>
                </div>

            </ShippingContainer>

            {/* 사이드바  */}

            <Sidebar className={isOpen ? 'Sidebar' : 'hidden'} state={mount}>
                <div className='x-box'>
                    <button onClick={OnClickClose} >
                        <i className="fa-regular fa-x" />
                    </button>

                </div>
                <div className='cont'>
                    <div className='searchTitle'>
                        <h3>배송 위치를 선택하세요</h3>
                    </div>
                    {/**addrBox클릭 시 선택된 주소로 배송지가 바뀐 후 저장됨. */}
                    <div className='addrBox'>
                        
                    
                        <ul>
                        {/* 로딩바 */}
                        <Spinner visible={visible} />

                        {/* 주소록 목록 */}
                        { error ? (<ErrorView error={error}/>) : (data && <li>
                                <NavLink className='addrWrap' onClick={OnClickClose}>
                                    <div className='left'>
                                        <div>
                                            <div className='rec_name'>{data.item.name}</div>
                                        </div>
                                        <div className='addr'>
                                            <p>{data.item.roadaddr}</p>
                                            <p>{data.item.postcode}</p>
                                            <p>대한민국</p>
                                            <p>+82 {data.item.tel}</p>
                                        </div>
                                        <NavLink to='/address_edit' ><span className='edit'>편집</span></NavLink>
                                    </div>
                                    <div className='right'>
                                        <i className="fa-solid fa-angle-right" />
                                    </div>
                                </NavLink>
                            </li> )}

                            {data2 && data2.item.map((v, i) => {
                                return (<>
                                <li>
                                    <NavLink className='addrWrap' onClick={OnClickClose}>
                                        <div className='left'>
                                            <div>
                                                <div className='rec_name'>{v.addname}</div>
                                            </div>
                                            <div className='addr'>
                                                <p>{v.roadaddr}</p>
                                                <p>{v.postcode}</p>
                                                <p>대한민국</p>
                                                <p>+82 {v.tel}</p>
                                            </div>
                                            <NavLink to='/address_edit' ><span className='edit'>편집</span></NavLink>
                                        </div>
                                        <div className='right'>
                                            <i className="fa-solid fa-angle-right" />
                                        </div>
                                    </NavLink>
                                </li> 
                                </>)
                            })}
                            
                        </ul>
                    </div>

                    <div className='newAddr'>

                        <NavLink to='/address_add' >
                            <button>새로운 주소 추가</button>
                        </NavLink>

                    </div>
                </div>

            </Sidebar>
            <Overlay className={isOpen ? 'Overlay' : 'hidden'} onClick={OnClickClose} />

            {/*  매장 찾기 사이드바 */}
            <Sidebar className={isOpen2 ? 'Sidebar' : 'hidden'} state={mount} style={{ width: '560px', padding: '0 49px' }}>
                <div className='x-box'>
                    <button onClick={OnClickClose2}>
                        <i className="fa-regular fa-x" />
                    </button>

                </div>
                <div className='cont'>
                    <div className='searchTitle'>
                        <h3><span>ZARA</span>매장 검색 및 선택</h3>
                    </div>
                    <div className='notice'>
                        <p>일시적으로 일부 매장을 이용하지 못하실 수 있습니다.</p>
                    </div>
                    <form>
                        <div className='searchStore'>
                            <div className='searchAddr'>
                                <span>도로명, 지역 또는 우편번호</span>
                                <input type='text' name='address' ref={ref} />
                            </div>
                            <div>
                                <button onClick={onSearch} >검색</button>
                            </div>
                        </div>
                        <div className='checkbox'>
                            <input type='checkbox' />
                            <span>재활용 헌옷 방문 수거 프로그램.</span>
                        </div>
                    </form>
                    <div className='stickyMenu'>
                        <div className='tabMenu'>
                            <button onClick={tabClick} className={classNames({ 'active': !tab })} >목록</button>
                            <button onClick={tabClick} className={classNames({ 'active': tab })}>맵</button>
                        </div>
                        {showAddr.length !== 0 ? (
                            <div className={classNames('nearestStoreList', { 'visible': !tab })}>
                                <p><span>"{search}"</span>에 가까운 매장</p>
                                <ul>
                                    {showAddr && showAddr.map((v, i) => {
                                        const area = v.address_name.split(" ");
                                        return (
                                            <li key={i}>
                                                <div className='store'>
                                                    <input type='radio' id='indexNum' name='radioCheck' onClick={onShowAddr} />
                                                    <label htmlFor='indexNum' >
                                                        <span >{area[0]}</span>
                                                        <span>{v.place_name}</span>
                                                    </label>
                                                </div>
                                                <div className={showAddr2 ? 'storeAddr' : 'hidden' } ref={addrRef}> {/** 매장 상세주소 */}
                                                    <p>{v.road_address_name}</p>
                                                    <p>ZARA 여성, 남성, 아동</p>
                                                    <p>재활용 헌옷 방문 수거 프로그램.</p>
                                                    <button onClick={tabClick}><span>맵에서보기</span></button>
                                                </div>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        ) : (
                            <div className={classNames('nearestStoreList', { 'visible': !tab })}>
                                <p><span>{search}</span>에 가까운 검색 결과가 없습니다.</p>
                                <p>검색 기준이 정확한지 확인하고 도시 이름도 포함하십시오.</p>
                            </div>
                        )}
                        <div className={classNames('map', { 'visible': tab })}>
                            <Map address={search} relayout={tab} setShowAddr={setShowAddr} />
                        </div>
                    </div>
                    <div className='saveBox'>
                        <button className='save'>저장</button>
                    </div>
                </div>
            </Sidebar>
            <Overlay className={isOpen2 ? 'Overlay' : 'hidden'} onClick={OnClickClose2} />

            <BottomBar link='/payment' />
        </div>

    );
});

export default Shipping;