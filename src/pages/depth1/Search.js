import React, { memo } from 'react';
import styled from 'styled-components';
import img from '../../assets/img/22-creamWhite-1.jpg';
import img1 from '../../assets/img/WomanBottom/1-darkBeige-1.jpg';
import img2 from '../../assets/img/WomanBottom/2-beige-1.jpg';
import img3 from '../../assets/img/WomanBottom/3-black-1.jpg';
import img4 from '../../assets/img/WomanBottom/4-black-1.jpg';
import img5 from '../../assets/img/WomanBottom/5-multiColor-1.jpg';
import img6 from '../../assets/img/WomanBottom/6-black-1.jpg';
import img7 from '../../assets/img/WomanBottom/7-cream-1.jpg';
import img8 from '../../assets/img/WomanBottom/8-multiColor-1.jpg';
import img9 from '../../assets/img/WomanBottom/9-scratchWhite-1.jpg';
import img10 from '../../assets/img/WomanBottom/10-black-1.jpg';
import img11 from '../../assets/img/WomanBottom/11-black-1.jpg';
import img12 from '../../assets/img/WomanBottom/12-white-1.jpg';
import img13 from '../../assets/img/WomanBottom/13-blue-1.jpg';
import img14 from '../../assets/img/WomanBottom/14-blue-1.jpg';
import img15 from '../../assets/img/WomanBottom/15-blue-1.jpg';
import img16 from '../../assets/img/WomanBottom/16-blue-1.jpg';
import img17 from '../../assets/img/WomanBottom/17-blue-1.jpg';
import img18 from '../../assets/img/WomanBottom/18-blue-1.jpg';
import img19 from '../../assets/img/WomanBottom/19-gray-1.jpg';
import img20 from '../../assets/img/WomanBottom/20-blue-1.jpg';
import img21 from '../../assets/img/WomanBottom/21-Khaki-1.jpg';
import img22 from '../../assets/img/WomanBottom/22-black-1.jpg';
import img23 from '../../assets/img/WomanBottom/23-blue-1.jpg';



// 반응형
// 1440px
// 768px
const SearchContainer = styled.div`
    margin: 0;
    padding: 0;

    .search-header {
        position: fixed;
        top: 125px;
        width: 100%;
        background-color: white;

        .search-tab {
            margin: 0 10px;
            button{
                background-color: white;
                border: none;
                margin: 0 5px;
                font-size: 11px;
                font-weight: 100;
            }
        }
        .search-form {
            display: block;
            margin: auto;
            width: 98%;
            padding: 30px 20px 20px;
            
            input {
                border: 0;
                outline: none;
                border-bottom: 1px solid #000;
                width: 100%;
                padding: 5px 5px 12px 5px;
                font-size: 12px;
                font-weight: 100;
            }
        }
    }

    
    .recom-title {
            margin: 280px 0 12px;
            font-size: 13px;
            letter-spacing: 1px;
            font-weight: 400;
            text-align: left;
            padding: 0 0 10px 20px;
        }
    .recom-item {
        width: 100%;
        margin: auto;
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        grid-gap: 1rem;

        .list-item {
            .itemBox {
                .list-item-link {
                    .thumbnail {
                        display: block;
                        padding: 0;
                        img {
                            width: 100%;
                            overflow: hidden;
                        }
                    }

                    .list-info {
                        padding-top: 10px;
                        font-size: 11px;
                        display: flex;
                        justify-content: space-between;
                        h3 {
                            font-weight: 200;
                            &:last-child {
                                font-weight: 400;
                            }
                        }
                        .list-name {
                            letter-spacing: 1px;
                        }
                    }
                }
            }
            
        }
    }

    a {
        text-decoration: none;
        color: #000;
    }
    ul {
        list-style: none;
        padding: 0;
        margin: 0;
        width: 100%;
        box-sizing: border-box;
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 30px;
    }
`;

const Search = memo(() => {
    const data = [
        {id: 0, img: img, title: '100% 울 프릴 스커트', price: '109,000'},
        {id: 1, img: img1, title: '100% 울 프릴 스커트', price: '109,000'},
        {id: 2, img: img2, title: '글리터 플레어 스커트', price: '55,000'},
        {id: 3, img: img3, title: '파라슈트 팬츠', price: '59,000'},
        {id: 4, img: img4, title: '페이크 레더 셔링 버뮤다 팬츠', price: '49,000'},
        {id: 5, img: img5, title: '페이크 퍼 미디 스커트', price: '39,000'},
        {id: 6, img: img6, title: '프릴 미디 스커트', price: '79,000'},
        {id: 7, img: img7, title: '프릴 미디 스커트', price: '79,000'},
        {id: 8, img: img8, title: '프릴 미디 스커트', price: '79,000'},
        {id: 9, img: img9, title: '프릴 미디 스커트', price: '79,000'},
        {id: 10, img: img10, title: '프릴 미디 스커트', price: '79,000'},
        {id: 11, img: img11, title: '프릴 미디 스커트', price: '79,000'},
        {id: 12, img: img12, title: '프릴 미디 스커트', price: '79,000'},
        {id: 13, img: img13, title: '프릴 미디 스커트', price: '79,000'},
        {id: 14, img: img14, title: '프릴 미디 스커트', price: '79,000'},
        {id: 15, img: img15, title: '프릴 미디 스커트', price: '79,000'},
        {id: 16, img: img16, title: '프릴 미디 스커트', price: '79,000'},
        {id: 17, img: img17, title: '프릴 미디 스커트', price: '79,000'},
        {id: 18, img: img18, title: '프릴 미디 스커트', price: '79,000'},
        {id: 19, img: img19, title: '프릴 미디 스커트', price: '79,000'},
        {id: 20, img: img20, title: '프릴 미디 스커트', price: '79,000'},
        {id: 21, img: img21, title: '프릴 미디 스커트', price: '79,000'},
        {id: 22, img: img22, title: '프릴 미디 스커트', price: '79,000'},
        {id: 23, img: img23, title: '프릴 미디 스커트', price: '79,000'},
    ];
    return (
        // <header/>
        <SearchContainer>
            <div className='search-header'>
                <div className="search-tab">
                    <button type='button'>여성</button>
                    <button type='button'>남성</button>
                    <button type='button'>어린이</button>
                </div>

                <form className="search-form">
                    <input type="search" placeholder="상품, 색상, 컬렉션 등을 검색하세요"/>
                </form>
            </div>

            <h2 className='recom-title'>추천 아이템</h2>
            <div className="recom-item">
                
                {data?.map((data, key)=> (
                    <ul key={key} className='list-item'>
                        <li>
                            <div className='itemBox'>
                                <a className="list-item-link" href="#!">
                                    <div className='thumbnail'>
                                        <img src={data.img} />
                                    </div>
                                    <div className='list-info'>
                                        <h3 className='list-name'>{data.title}</h3>
                                        <h3 className='list-price'>{data.price}원</h3>
                                    </div>
                                </a>
                            </div>
                        </li>
                    </ul>
                ))}
                {/* <ul>
                    <li className="list-item">
                        <div className='itemBox'>
                            <a className="list-item-link" href="#!">
                                <div className="thumbnail">
                                    <img src={img} />
                                </div>
                                <div className="list-info">
                                    <h3 className="list-name">상품 이름</h3>
                                    <h3 className="list-price">상품 가격</h3>
                                </div>
                            </a>
                        </div>
                        
                    </li>
                </ul> */}
            </div>
        </SearchContainer>
        // <footer/>
    );
});

export default Search;