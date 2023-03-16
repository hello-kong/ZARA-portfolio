import React, {useState, useCallback, useEffect, useRef} from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import img from '../../assets/img/modelsample.jpg';
import ModalSidebar from '../../components/ModalSidebar';
import Overlay from '../../components/Overlay';
import sizeguideImg from '../../assets/img/sizeguide.jpg';

const RecomProductWrap = styled.div`
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

    margin-top: 100px;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
    h1 {
        font-size: 15px;
        margin: 20px 0;
    }

    .product_grid {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
    
    .recom_item {
        margin-bottom: 3%;
        width: 15%;
        position: relative;
        .item_img {
            width: 100%;
            position: relative;
            img {
                width: 100%;
            }
            button {
                position: absolute;
                bottom: 8%;
                left: 42%;
                border: 0;
                width: 30px;
                height: 30px;
                max-width: 30px;
                max-height: 30px;
                border-radius: 50%;
                background-color: rgba(255,255,255,0.6);
                font-weight: 100;
                &:hover {
                    background-color: rgba(255,255,255,0.8);
                }
            }
        }
        .item_info {
            display: flex;
            justify-content: space-between;
            margin-top: 5px;
            h3, span {
                font-size: 12px;
                font-weight: 200;
            }
            a:hover {
                text-decoration: underline;
            }
            span {font-weight: 400;}
        }

        .size_bar {
            width: 99%;
            position: absolute;
            bottom: 0;
            z-index: 10;
            background-color: white;
            border: 1px solid black;
            
            li {
                button {
                    display: block;
                    width: 100%;
                    height: 100%;
                    padding: 5px 10px;
                    box-sizing: border-box;
                    text-align: left;
                    border: 0;
                    font-size: 11px;
                    background-color: white;
                    &:hover {
                        background-color: rgb(240, 241, 242);
                    }
                }
                .size_guide_btn {
                    border-top: 1px solid gray;
                    color: gray;
                    button {
                        font-size: 12px;
                    }
                    &:hover {background-color: white;}
                    
                }
            }
        }
        .hidden {
            display: none;
        }
    }
`;
const Sidebar = styled(ModalSidebar)`
    animation: ${({state}) => state ? "slide" : "rev_slide"} .3s linear;
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
        }
    }
`;


const RecomProduct = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);

    const [mount, setMount] = useState(true);

    const onOpenSizeBar = useCallback((e) => {
        e.preventDefault();
        setIsOpen(current => !current);
    }, []);

    const onOpenSidebar = useCallback((e) => {
        e.preventDefault();
        setIsOpen2(current => !current);
        // setIsOpen(true);
    }, []);

    const OnClickClose = useCallback((e) => {
        e.preventDefault();
        setMount(false);
            setTimeout(() => {
                setIsOpen2(false);
				setMount(true);
              }, 250);
    }, []);

    // 사이드바 오버레이에서 스크롤 방지
    useEffect(() => {
       if (isOpen2 == true) {
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

    }, [isOpen2]);
    


    return (
        <div>
            <RecomProductWrap>
                <h1>추천 제품</h1>
                <div className='product_grid'>
                    <div className='recom_item'>
                        <div className='item_img'>
                            <a><img src={img} /></a>
                            <button onClick={(onOpenSizeBar)}  ><FontAwesomeIcon icon={faPlus} size="sm"/></button>
                        </div>
                        <div className='item_info'>
                            <a><h3>안녕하세요</h3></a>
                            <h3><span>59,000</span> 원</h3>
                        </div>
                        <div className={isOpen ? 'size_bar' : 'hidden'}>
                            <ul>
                                <li><button>XXS (KR 33)</button></li>
                                <li><button>XS (KR 44)</button></li>
                                <li><button>S (KR 55)</button></li>
                                <li><button>M (KR 66)</button></li>
                                <li><button>L (KR 77)</button></li>
                                <li><button>XL (KR 88)</button></li>
                                <li><button>XXL (KR 99)</button></li>
                                <li><button className="size_guide_btn" onClick={onOpenSidebar}>사이즈 가이드</button></li>
                            </ul>
                        </div>
                    </div>
                    <div className='recom_item'>
                        <div className='item_img'>
                            <a><img src={img} /></a>
                            <button><FontAwesomeIcon icon={faPlus} size="sm"/></button>
                        </div>
                        <div className='item_info'>
                            <a><h3>안녕하세요</h3></a>
                            <h3><span>59,000</span> 원</h3>
                        </div>
                    </div>
                    <div className='recom_item'>
                        <div className='item_img'>
                            <a><img src={img} /></a>
                            <button><FontAwesomeIcon icon={faPlus} size="sm"/></button>
                        </div>
                        <div className='item_info'>
                            <a><h3>안녕하세요</h3></a>
                            <h3><span>59,000</span> 원</h3>
                        </div>
                    </div>
                    <div className='recom_item'>
                        <div className='item_img'>
                            <a><img src={img} /></a>
                            <button><FontAwesomeIcon icon={faPlus} size="sm"/></button>
                        </div>
                        <div className='item_info'>
                            <a><h3>안녕하세요</h3></a>
                            <h3><span>59,000</span> 원</h3>
                        </div>
                    </div>
                    <div className='recom_item'>
                        <div className='item_img'>
                            <a><img src={img} /></a>
                            <button><FontAwesomeIcon icon={faPlus} size="sm"/></button>
                        </div>
                        <div className='item_info'>
                            <a><h3>안녕하세요</h3></a>
                            <h3><span>59,000</span> 원</h3>
                        </div>
                    </div>
                    <div className='recom_item'>
                        <div className='item_img'>
                            <a><img src={img} /></a>
                            <button><FontAwesomeIcon icon={faPlus} size="sm"/></button>
                        </div>
                        <div className='item_info'>
                            <a><h3>안녕하세요</h3></a>
                            <h3><span>59,000</span> 원</h3>
                        </div>
                    </div>
                    <div className='recom_item'>
                        <div className='item_img'>
                            <a><img src={img} /></a>
                            <button><FontAwesomeIcon icon={faPlus} size="sm"/></button>
                        </div>
                        <div className='item_info'>
                            <a><h3>안녕하세요</h3></a>
                            <h3><span>59,000</span> 원</h3>
                        </div>
                    </div>
                    <div className='recom_item'>
                        <div className='item_img'>
                            <a><img src={img} /></a>
                            <button><FontAwesomeIcon icon={faPlus} size="sm"/></button>
                        </div>
                        <div className='item_info'>
                            <a><h3>안녕하세요</h3></a>
                            <h3><span>59,000</span> 원</h3>
                        </div>
                    </div>
                    <div className='recom_item'>
                        <div className='item_img'>
                            <a><img src={img} /></a>
                            <button><FontAwesomeIcon icon={faPlus} size="sm"/></button>
                        </div>
                        <div className='item_info'>
                            <a><h3>안녕하세요</h3></a>
                            <h3><span>59,000</span> 원</h3>
                        </div>
                    </div>
                    <div className='recom_item'>
                        <div className='item_img'>
                            <a><img src={img} /></a>
                            <button><FontAwesomeIcon icon={faPlus} size="sm"/></button>
                        </div>
                        <div className='item_info'>
                            <a><h3>안녕하세요</h3></a>
                            <h3><span>59,000</span> 원</h3>
                        </div>
                    </div>
                    <div className='recom_item'>
                        <div className='item_img'>
                            <a><img src={img} /></a>
                            <button><FontAwesomeIcon icon={faPlus} size="sm"/></button>
                        </div>
                        <div className='item_info'>
                            <a><h3>안녕하세요</h3></a>
                            <h3><span>59,000</span> 원</h3>
                        </div>
                    </div>
                    <div className='recom_item'>
                        <div className='item_img'>
                            <a><img src={img} /></a>
                            <button><FontAwesomeIcon icon={faPlus} size="sm"/></button>
                        </div>
                        <div className='item_info'>
                            <a><h3>안녕하세요</h3></a>
                            <h3><span>59,000</span> 원</h3>
                        </div>
                    </div>
                    <div className='recom_item'>
                        <div className='item_img'>
                            <a><img src={img} /></a>
                            <button><FontAwesomeIcon icon={faPlus} size="sm"/></button>
                        </div>
                        <div className='item_info'>
                            <a><h3>안녕하세요</h3></a>
                            <h3><span>59,000</span> 원</h3>
                        </div>
                    </div>
                    <div className='recom_item'>
                        <div className='item_img'>
                            <a><img src={img} /></a>
                            <button><FontAwesomeIcon icon={faPlus} size="sm"/></button>
                        </div>
                        <div className='item_info'>
                            <a><h3>안녕하세요</h3></a>
                            <h3><span>59,000</span> 원</h3>
                        </div>
                    </div>
                    <div className='recom_item'>
                        <div className='item_img'>
                            <a><img src={img} /></a>
                            <button><FontAwesomeIcon icon={faPlus} size="sm"/></button>
                        </div>
                        <div className='item_info'>
                            <a><h3>안녕하세요</h3></a>
                            <h3><span>59,000</span> 원</h3>
                        </div>
                    </div>
                    <div className='recom_item'>
                        <div className='item_img'>
                            <a><img src={img} /></a>
                            <button><FontAwesomeIcon icon={faPlus} size="sm"/></button>
                        </div>
                        <div className='item_info'>
                            <a><h3>안녕하세요</h3></a>
                            <h3><span>59,000</span> 원</h3>
                        </div>
                    </div>
                    <div className='recom_item'>
                        <div className='item_img'>
                            <a><img src={img} /></a>
                            <button><FontAwesomeIcon icon={faPlus} size="sm"/></button>
                        </div>
                        <div className='item_info'>
                            <a><h3>안녕하세요</h3></a>
                            <h3><span>59,000</span> 원</h3>
                        </div>
                    </div>
                    <div className='recom_item'>
                        <div className='item_img'>
                            <a><img src={img} /></a>
                            <button><FontAwesomeIcon icon={faPlus} size="sm"/></button>
                        </div>
                        <div className='item_info'>
                            <a><h3>안녕하세요</h3></a>
                            <h3><span>59,000</span> 원</h3>
                        </div>
                    </div>
                    <div className='recom_item'>
                        <div className='item_img'>
                            <a><img src={img} /></a>
                            <button><FontAwesomeIcon icon={faPlus} size="sm"/></button>
                        </div>
                        <div className='item_info'>
                            <a><h3>안녕하세요</h3></a>
                            <h3><span>59,000</span> 원</h3>
                        </div>
                    </div>
                    <div className='recom_item'>
                        <div className='item_img'>
                            <a><img src={img} /></a>
                            <button><FontAwesomeIcon icon={faPlus} size="sm"/></button>
                        </div>
                        <div className='item_info'>
                            <a><h3>안녕하세요</h3></a>
                            <h3><span>59,000</span> 원</h3>
                        </div>
                    </div>
                    <div className='recom_item'>
                        <div className='item_img'>
                            <a><img src={img} /></a>
                            <button><FontAwesomeIcon icon={faPlus} size="sm"/></button>
                        </div>
                        <div className='item_info'>
                            <a><h3>안녕하세요</h3></a>
                            <h3><span>59,000</span> 원</h3>
                        </div>
                    </div>
                    <div className='recom_item'>
                        <div className='item_img'>
                            <a><img src={img} /></a>
                            <button><FontAwesomeIcon icon={faPlus} size="sm"/></button>
                        </div>
                        <div className='item_info'>
                            <a><h3>안녕하세요</h3></a>
                            <h3><span>59,000</span> 원</h3>
                        </div>
                    </div>
                    <div className='recom_item'>
                        <div className='item_img'>
                            <a><img src={img} /></a>
                            <button><FontAwesomeIcon icon={faPlus} size="sm"/></button>
                        </div>
                        <div className='item_info'>
                            <a><h3>안녕하세요</h3></a>
                            <h3><span>59,000</span> 원</h3>
                        </div>
                    </div>
                    <div className='recom_item'>
                        <div className='item_img'>
                            <a><img src={img} /></a>
                            <button><FontAwesomeIcon icon={faPlus} size="sm"/></button>
                        </div>
                        <div className='item_info'>
                            <a><h3>안녕하세요</h3></a>
                            <h3><span>59,000</span> 원</h3>
                        </div>
                    </div>
                </div>
            </RecomProductWrap>
            {/* 사이즈 가이드 사이드바 */}
            <Sidebar className={isOpen2 ? 'Sidebar' : 'hidden'} state={mount}
            style={{width: '400px', padding: '0 49px'}}>
                <div className='x-box'>
                    <button onClick={OnClickClose}>
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
                            <select>
                                <option value="default">사이즈를 선택하세요.</option>
                                <option value="33">33</option>
                                <option value="44">44</option>
                                <option value="55">55</option>
                                <option value="66">66</option>
                                <option value="77">77</option>
                            </select>
                        </div>
                        <div className="size_table">
                            <tabel  style={{width: '100%'}}>
                                <thead>
                                    <tr>
                                        <th colspan='2'>사이즈 표</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th>사<br/>이<br/>즈</th>
                                        <th className='EUR'>EUR</th>
                                    </tr>
                                    <tr>
                                        <th>33</th>
                                        <th>XXS</th>
                                    </tr>
                                    <tr>
                                        <th>44</th>
                                        <th>XS</th>
                                    </tr>
                                    <tr>
                                        <th>55</th>
                                        <th>S</th>
                                    </tr>
                                    <tr>
                                        <th>66</th>
                                        <th>M</th>
                                    </tr>
                                    <tr>
                                        <th>77</th>
                                        <th>L</th>
                                    </tr>
                                    <tr>
                                        <th>88</th>
                                        <th>XL</th>
                                    </tr>
                                    <tr>
                                        <th>99</th>
                                        <th>XXL</th>
                                    </tr>
                                </tbody>
                            </tabel>
                        </div>
                        
                    </div>
                </div>
            </Sidebar>
            <Overlay className={isOpen2 ? 'Overlay' : 'hidden'} onClick={OnClickClose} />
        </div>
    );
};

export default RecomProduct;