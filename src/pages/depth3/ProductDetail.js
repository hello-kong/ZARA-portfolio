import React, { memo, useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import ImageScroll from '../depth4/ImageScroll';
import RecomProduct from '../depth4/RecomProduct';
import ModalSidebar from '../../components/ModalSidebar';
import Overlay from '../../components/Overlay';
import sizeguideImg from '../../assets/img/sizeguide.jpg';

// 제품 상세페이지 CSS
const ProductDetailWrap = styled.div`

    @keyframes slide {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0%);
        }
    }

	@keyframes rev_slide {
        from {
            opacity: 1;
            transform: translateX(0%);
        }
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }

    margin: 120px auto 0;
    display: block;
    .detail_wrapper {
        width: 1200px;
        height: 660px;
        margin: auto;
        position: relative;

        .item_treat {
            display: block;
            position: absolute;
            bottom: 0;
            width: 200px;
            height: 420px;
            
            .info_1, .info_short {
                width: 220px;
                h2, h3, p {line-height: 17px}
                h2 {font-size: 12px; font-weight: 500;}
                h3 {font-size: 11px; margin-bottom: 15px;}
                p {font-size: 9px; font-weight: 100; margin-bottom: 12px;}
                .info_Block {
                    margin-top: 20px;
                }
            }

            .info_short {
                display: block;
                &.active {
                    display: none;
                }
            }
            
            .info_1 {
                display: none;
                overflow: auto;
                width: 230px;
                ::-webkit-scrollbar {
                    width: 1px;
                }
                ::-webkit-scrollbar-corner {
                    margin: 10px;
                }
                ::-webkit-scrollbar-track {
                    background-color: lightgrey;
                }
                ::-webkit-scrollbar-thumb {
                    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.7);
                }
                &.active {
                    display: block;
                    position: absolute;
                    bottom: 0;
                    height: 600px;
                    overflow: auto;
                }
            }

            button {
                background-color: white;
                border: 0;
                padding: 0;
                font-size: 11px;
                text-decoration: underline;
            }

            
        }
        .product_img {
            display: block;
            position: absolute;
            left: 30%;
        }

        .product_detail_info {
            display: block;
            position: absolute;
            width: 240px;
            right: 0;
            bottom: 0;

            .product_dscr {
                margin-bottom: 10px;
                h1 {
                    font-weight: 500;
                    margin-bottom: 20px;
                }
                p {
                    font-size: 9px;
                    font-weight: 100;
                    word-spacing: px;
                }
            }
            .product_color {
                margin: 20px 0;
            }
            .colorBtn {
                width: 90%;
                ul {
                    display: flex;
                    justify-content: space-between;

                    button {
                        width: 14px;
                        height: 14px;
                        border-radius: 50%;
                        background-color: rgba(0,0,0, .3);
                        border: 0;
                        &:focus {
                            border: 1px solid black;
                            background-color: white;

                        }
                    }
                }
            }
            .color_name {
                font-size: 12px;
                font-weight: 200;
                margin: 15px 0 10px 0;
            }

            .product_price {
                font-size: 11px;
                font-weight: 300;
            }

            .size_tab {
                width: 240px;
                hr {
                    background-color: rgba(0,0,0,.4);
                    margin: 0;
                }
                li {
                    width: 100%;
                    padding: 4px;
                    box-sizing: border-box;
                    &:hover {
                        background-color: rgba(0,0,0,.1);
                    }
                }
                button {
                    border: 0;
                    background-color: rgba(0,0,0,0);
                    font-size: 10px;
                    font-weight: 100;
                }
            }
            
            .size_guide {
                display: block;
                margin: 5px 0 13px 0;
                border: 0;
                width: 100%;
                background-color: white;
                text-align: right;
                font-size: 11px;
                font-weight: 100;
            }
            .wishlist {
                display: block;
                width: 100%;
                height: 35px;
                border: 0;
                background-color: black;
                color: white;
                font-size: 12px;
                font-weight: 400;
                letter-spacing: 1px;
            }

            .side_option {
                margin-top: 20px;
                button {
                    border: 0;
                    background-color: white;
                    font-size: 11px;
                    font-weight: 100;;
                    display: block;
                    margin: 8px 0 ;
                }
            }
        }
    }
`;

// 사이드바 CSS
const Sidebar = styled(ModalSidebar)`
    animation: ${({state}) => state ? "slide" : "rev_slide"} .3s linear;

    // 오프라인 재고 확인
    .offline_shop {
        margin-top: 10px;
        h1 {
            font-size: 15px;
            font-weight: 500;
        }
        .offline_guide {
            margin: 55px 0 20px;
            p {
                font-size: 9px;
                font-weight: 100;
                margin: 25px 0;
            }
        }

        .offline_size_wrap {
            display: flex;
            margin-top: 40px;

            .offline_size {
                font-size: 11px;
                margin-right: 10px;
                
                input[type=checkbox] {
                    display: none;
                }
                input[type=checkbox] + label {
                    cursor: pointer;
                    background-color: white;
                    color: black;
                    border: 1px solid black;
                    padding: 10px 25px;
                }
                input[type=checkbox]:checked + label {
                    cursor: pointer;
                    background-color: black;
                    color: white;
                    padding: 10px 25px;
                }
            }
        }
        
        .offline_btn {
            margin-top: 40px;
            width: 330px;
            height: 33px;
            border: 1px solid black;
            background-color: black;
            color: white;
            font-size: 12px;
            letter-spacing: 1px;
        }
    }

    // 사이즈 가이드
    .size_guide_wrap {
        .size_guide_top {
            position: fixed;
            z-index: 1000;
            width: 100%;
            height: 100px;
            padding: 20px 0;
            box-sizing: border-box;
            background-color: white;
            h1 {
                font-size: 15px;
                margin-bottom: 15px;
            }
            p {
                font-size: 13px;
                margin-bottom: 20px;
            }
        }
        
        .size_scroll_wrap {
            position: relative;
            top: 100px;
            padding-bottom: 30px;
            img {
                width: 300px;
                margin-bottom: 10px;
            }
            .size_select {
                select {
                    width: 100%;
                    height: 40px;
                    border-radius: 0;
                    font-size: 11px;
                    padding-left: 5px;
                    box-sizing: border-box;
                    color: gray;
                }
            }
            .size_table {
                margin-top: 15px;
                table, thead, tr, th {
                    /* border-collapse: collapse; */
                    width: 300px;
                    padding: 18px 20px;
                    box-sizing: border-box;
                    text-align: left;
                    font-size: 12px;
                    font-weight: 200;
                    line-height: 15px;
                    border-bottom: 1px solid rgb(240, 241, 242);

                }
                thead {
                    background-color: rgb(240, 241, 242);
                    padding: 15px 0;
                    th {
                        font-weight: 600;
                        font-size: 11px;
                    }
                    
                }
                th:first-child {
                    width: 30%;
                }
                .EUR {
                    vertical-align: middle;
                }
            }
            .selected_size {
                th {
                    font-weight: 600;
                }
            }
            .size_btn {
                button {
                    display: block;
                    width: 120px;
                    text-decoration: underline;
                    border: 0;
                    background-color: white;
                    margin: 0;
                }
            }
        }
    }
`;

const ProductDetail = memo(() => {
    // 사이드바 상태값 관리
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);

    // 더보기 감추기 상태값
    const [moreInfo, setMoreInfo] = useState("더보기");

    const MoreInfoBtn = (e) => {
        setMoreInfo("감추기");
        
        if(moreInfo === "감추기") {
            setMoreInfo("더보기");
        }
        const show = document.querySelector('.info_1');
        show.classList.toggle('active');
        const hide = document.querySelector('.info_short');
        hide.classList.toggle('active');
    }

    // 사이즈 선택시 상태값
    const [selected, setSelected] = useState(0);

    // 사이즈 선택시 보여지는 테이블
    const handleSelect = (e) => {
        setSelected(e.target.selectedIndex);
        // const size = e.target.value.split(',');
        // setSelected(size);
        // console.log(size);
    };
    console.log(selected);


    // 사이드바 마운트/언마운트 시 애니메이션 적용 할 상태값 관리
    const [mount, setMount] = useState(true);

     // 사이드바 열고 닫는 이벤트
     const onOpenSidebar = useCallback((e) => {
        e.preventDefault();
        setIsOpen(current => !current);
        // setIsOpen(true);
    }, []);

    const onOpenSidebar2 = useCallback((e) => {
        e.preventDefault();
        setIsOpen2(current => !current);
        // setIsOpen(true);
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

    // 모든 사이즈 보기 Button
    const AllSizeBtn = (e) => {
        setSelected(0);
    };

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

    const [colorName, setColorName] = useState("");

    const colorChange = useCallback((e) => {
        e.preventDefault();
        console.log(e.target.value);
        setColorName(e.target.value);
    }, []);

    const sizeOption = [
        {size: "33", sizeEng: "XXS"},
        {size: "44", sizeEng: "XS"},
        {size: "55", sizeEng: "S"},
        {size: "66", sizeEng: "M"},
        {size: "77", sizeEng: "L"},
        {size: "88", sizeEng: "XL"},
        {size: "99", sizeEng: "XXL"},
    ]

    return (
        <div>
            <ProductDetailWrap>
                <div className='detail_wrapper'>
                    <div className='product_detail_view'>
                        <div className='item_treat'>
                            <div className='info'>
                                <div className='info_short'>
                                    <h2>소재, 세탁 방법 및 원산지</h2>
                                    <div className='info_Block'>
                                        <h3>출처</h3>
                                        <p>ZARA는 공급업체, 근로자, 노조 및 다양한 국제 기구와 협력하여 인권을 존중하고 고취하며 UN의 지속 가능한 개발 목표에 기여할 수 있는 공급망을 개발합니다.</p>
                                        <p>공급업체와의 협력을 통해 ZARA 제품을 추적하기 위한 목적으로 ZARA 의류 생산에 사용되는 시설과 공정을 파악하기 위해 노력합니다.</p>
                                        <p>모로코에서 제조</p>
                                    </div>
                                    <div className='info_Block'>
                                        <h3>관리</h3>
                                        <p>환경을 보호하며 의류를 관리할 수 있습니다.</p>
                                        <p>저온 세탁 및 부드러운 탈수 프로그램은 의류를 더 부드럽게 다루기 때문에 직물의 색상, 모양 및 구조를 유지하는 데 도움이 됩니다. 동시에 의류 관리 과정에 사용되는 에너지 소비를 감소합니다.</p>
                                    </div>
                                    <button onClick={MoreInfoBtn} className={
                                        moreInfo==="더보기" ? 'active' : 'hide'
                                    }
                                    >{moreInfo}</button>
                                </div>
                                
                                    <div className='info_1'>
                                        <h2>소재, 세탁 방법 및 원산지</h2>
                                        <div className='info_Block'>
                                            <h3>출처</h3>
                                            <p>ZARA는 공급업체, 근로자, 노조 및 다양한 국제 기구와 협력하여 인권을 존중하고 고취하며 UN의 지속 가능한 개발 목표에 기여할 수 있는 공급망을 개발합니다.</p>
                                            <p>공급업체와의 협력을 통해 ZARA 제품을 추적하기 위한 목적으로 ZARA 의류 생산에 사용되는 시설과 공정을 파악하기 위해 노력합니다.</p>
                                            <p>모로코에서 제조</p>
                                        </div>
                                        <div className='info_Block'>
                                            <h3>관리</h3>
                                            <p>환경을 보호하며 의류를 관리할 수 있습니다.</p>
                                            <p>저온 세탁 및 부드러운 탈수 프로그램은 의류를 더 부드럽게 다루기 때문에 직물의 색상, 모양 및 구조를 유지하는 데 도움이 됩니다. 동시에 의류 관리 과정에 사용되는 에너지 소비를 감소합니다.</p>
                                            <p>물 온도 최고 30도 세탁기 사용 가능, 짧은 탈수 프로그램</p>
                                            <p>표백제 사용 금지</p>
                                            <p>최고 110도 다림질 가능</p>
                                            <p>드라이클리닝 불가</p>
                                            <p>건조기 사용 금지</p>
                                        </div>
                                        <div className='info_Block'>
                                            <h3>소재</h3>
                                            <p>ZARA 제품의 사회, 환경, 안전 및 건강 관련 기준 준수를 보장하기 위해 모니터링 프로그램을 실행하고 있습니다. 기준 준수 여부를 평가하기 위해 감사 프로그램과 지속적인 개선 플랜을 개발하였습니다.</p>
                                        </div>
                                        <div className='info_Block'>
                                            <h3>겉감</h3>
                                            <p>70% 면 . 30% 린넨</p>
                                        </div>
                                        <div className='info_Block'>   
                                            <h3>충전재</h3>
                                            <p>100% 폴리에스터</p>
                                        </div>
                                        <button onClick={MoreInfoBtn} className={
                                            moreInfo==="감추기" ? 'active' : 'hide'
                                        }
                                        >{moreInfo}</button>
                                    </div>
                                    
                            </div>
                        </div>
                        <div className='product_img'>
                            <ImageScroll />
                        </div>
                    </div>
                    <div className="product_detail_info">
                        <div>
                            <div className='product_dscr'>
                                <h1>100% 울 프릴 스커트</h1>
                                <p>100% 울 소재 스커트. 신축성 있는 하이웨이스트 디자인.<br/>
                                옆면 프릴 디테일.</p>
                            </div>
                            <div className='product_color'>
                                <div className='colorBtn'>
                                    <ul>
                                        <li>
                                            <button onClick={colorChange} type="radio" name="color" value="red"/>
                                        </li>
                                        <li>
                                            <button onClick={colorChange} type="radio" name="color" value="yellow"/>
                                        </li>
                                        <li>
                                            <button onClick={colorChange} type="radio" name="color" value="green"/>
                                        </li>
                                        <li>
                                            <button onClick={colorChange} type="radio" name="color" value="blue"/>
                                        </li>
                                        <li>
                                            <button onClick={colorChange} type="radio" name="color" value="black"/>
                                        </li>
                                    </ul>
                                </div>
                                <p className='color_name'>{colorName}</p>
                                <p className='product_price'>89,000 원</p>
                            </div>
                            <div className='size_tab'>
                                <hr/>
                                <ul>
                                    <li>
                                        <button type="button">S (KR 55)</button>
                                    </li>
                                    <li>
                                        <button type="button">M (KR 66)</button>
                                    </li>
                                    <li>
                                        <button type="button">L (KR 77)</button>
                                    </li>
                                    <li>
                                        <button type="button">XL (KR 88)</button>
                                    </li>
                                </ul>
                                <hr/>
                            </div>
                            <button className="size_guide" onClick={onOpenSidebar2}>사이즈 가이드</button>
                            <button className="wishlist" type="submit">장바구니</button>
                            <div className='side_option'>
                                <button onClick={onOpenSidebar}>오프라인 매장에 재고 상태 보기</button>
                                <button type="button">배송, 교환 및 반품</button>
                            </div>
                        </div>
                    </div>
                </div>
                <RecomProduct/>
            </ProductDetailWrap>

            {/* 오프라인 재고 확인 사이드바 */}
            <Sidebar className={isOpen ? 'Sidebar' : 'hidden'} state={mount}
            style={{ width: '560px', padding: '0 49px' }}>
                <div className='x-box'>
                    <button onClick={OnClickClose}>
                        <i className="fa-regular fa-x" />
                    </button>
                </div>
                <div className='offline_shop'>
                    <h1>오프라인 매장에 재고 상태 보기</h1>
                    <div className='offline_guide'>
                        <p>매장 재고 확인을 위해 사이즈를 선택해 주십시오.</p>
                        <p>찾으시는 사이즈는 무엇입니까?</p>
                    </div>
                    
                    <div className='offline_size_wrap'>
                        <div className='offline_size'>
                            <input type="checkbox" name="size" id="size1"/>
                            <label for="size1">XS (KR 44)</label>
                        </div>
                        <div className='offline_size'>
                            <input type="checkbox" name="size" id="size2"/>
                            <label for="size2">S (KR 55)</label>
                        </div>
                        <div className='offline_size'>
                            <input type="checkbox" name="size" id="size3"/>
                            <label for="size3">M (KR 66)</label>
                        </div>
                        <div className='offline_size'>
                            <input type="checkbox" name="size" id="size4"/>
                            <label for="size4">L (KR 77)</label>
                        </div>
                    </div>
                    <button type="submit" className='offline_btn'>재고 확인</button>
                </div>
            </Sidebar>
            <Overlay className={isOpen ? 'Overlay' : 'hidden'} onClick={OnClickClose} />

            {/* 사이즈 가이드 사이드바 */}
            <Sidebar className={isOpen2 ? 'Sidebar' : 'hidden'} state={mount}
            style={{width: '400px', padding: '0 49px'}}>
                <div className='x-box'>
                    <button onClick={OnClickClose2}>
                        <i className="fa-regular fa-x" />
                    </button>
                </div>
                <div className='size_guide_wrap'>
                    <div className='size_guide_top'>
                        <h1>사이즈 가이드</h1>
                        <p>상의</p>
                    </div>
                    
                    <div className='size_scroll_wrap'>
                        <img src={sizeguideImg} />
                        <div className='size_select'>
                            <select onChange={handleSelect}>
                                <option>사이즈를 선택하세요.</option>
                                <option value="33,XXS">33</option>
                                <option value="44,XS">44</option>
                                <option value="55,S">55</option>
                                <option value="66,M">66</option>
                                <option value="77,L">77</option>
                                <option value="88,XL">88</option>
                                <option value="99,XXL">99</option>
                            </select>
                        </div>
                        <div className="size_table">
                            <table  style={{width: '100%'}}>
                                <thead>
                                    <tr>
                                        <th colSpan='2'>사이즈 표</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th>사<br/>이<br/>즈</th>
                                        <th className='EUR'>EUR</th>
                                    </tr>
                                    {sizeOption.map((v, i) => {
                                        if(selected == i+1) {
                                            return (
                                                <tr key={i} className="selected_size">
                                                    <th>{v.size}</th>
                                                    <th>{v.sizeEng}</th>
                                                </tr>
                                            );
                                        } else if (selected == 0) {
                                            return (
                                                <tr key={i}>
                                                    <th>{v.size}</th>
                                                    <th>{v.sizeEng}</th>
                                                </tr>
                                            );
                                        }
                                    })}
                                    {(selected != 0) ?
                                        (
                                        <tr className='size_btn'>
                                            <th>
                                                <button onClick={AllSizeBtn}>모든 사이즈 보기</button>
                                            </th>
                                        </tr>
                                        ) : (null)
                                    }
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </Sidebar>
            <Overlay className={isOpen2 ? 'Overlay' : 'hidden'} onClick={OnClickClose2} />
        </div>
    );
});

export default ProductDetail;