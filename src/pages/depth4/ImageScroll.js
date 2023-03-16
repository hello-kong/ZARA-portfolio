import React from 'react';
import styled from 'styled-components';

import img1 from '../../assets/img/WomanBottom/1-darkBeige-1.jpg';
import img2 from '../../assets/img/WomanBottom/1-darkBeige-2.jpg';
import img3 from '../../assets/img/WomanBottom/1-darkBeige-3.jpg';
import img4 from '../../assets/img/WomanBottom/1-darkBeige-4.jpg';
import img5 from '../../assets/img/WomanBottom/1-darkBeige-5.jpg';

const ImgScroll = styled.div`
    width: 600px;
    position: relative;
    .imgCnt {
        display: block;
        width: 480px;
        height: 660px;
        overflow: auto;
        float: left;
        ::-webkit-scrollbar {
            width: 1px;
        }
        ::-webkit-scrollbar-track {
            background-color: lightgrey;
        }
        ::-webkit-scrollbar-thumb {
            box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.7);
        }
        img {
            width: 95%;
        }
    }
    
    .img_sample {
        display: block;
        opacity: 0;
        float: left;
        margin-left: 23px;
        width: 40px;
        height: 70px;
        transition: all 0.5s;
        
        &:hover {
            opacity: 1;
        }

        img {
            width: 100%;
        }
    }
`;

const ImageScroll = () => {
    return (
        <ImgScroll>
            <div className='imgCnt'>
                <ul>
                    <li>
                        <div>
                            <img src={img1} id="img1"/>
                        </div>
                    </li>
                    <li>
                        <div>
                            <img src={img2} id="img2"/>
                        </div>
                    </li>
                    <li>
                        <div>
                            <img src={img3} id="img3"/>
                        </div>
                    </li>
                    <li>
                        <div>
                            <img src={img4} id="img4"/>
                        </div>
                    </li>
                    <li>
                        <div>
                            <img src={img5} id="img5"/>
                        </div>
                    </li>
                </ul>
            </div>
            <div className='img_sidebar'>
                <div className='scrollbar'></div>
                <div className='img_sample'>
                    <ul>
                        <li>
                            <a href="#img1"><img src={img1} /></a>
                        </li>
                        <li>
                            <a href="#img2"><img src={img2} /></a>
                        </li>
                        <li>
                            <a href="#img3"><img src={img3} /></a>
                        </li>
                        <li>
                            <a href="#img4"><img src={img4} /></a>
                        </li>
                        <li>
                            <a href="#img5"><img src={img5} /></a>
                        </li>
                    </ul>
                </div>
            </div>
        </ImgScroll>
    );
};

export default ImageScroll;