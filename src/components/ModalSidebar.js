import React, { memo, useState, useEffect, useCallback } from 'react';
//import PropTypes from 'prop-types';
import styled from 'styled-components';

// 사이드바 CSS
const ModalSidebar = styled.div`
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


// 사이드바의 기본 width,padding를 설정함.
    
    width: 431px;
    height: 100vh;
    position: fixed;
    right: 0;
    top: 0;
    background-color: #fff;
    z-index: 9999;
    border-left: 1px solid #ddd;
    padding: 0 40px;
    box-sizing: border-box;
    overflow: auto;
    -ms-overflow-style: none;
		&::-webkit-scrollbar {
			display: none;
		}

        // 사이드바의 닫기 버튼(X)
        .x-box {
        width: 100%;
        display: flex;
        justify-content: right;
        position: sticky;
        top: 0px;
        background-color: #fff;
        z-index: 1;

        button {
            background: transparent;
            border: none;
            height: 50px;
            margin-top: 20px;
           
            i {
                font-size: 20px;
                
            }
        }
    }

    &.hidden {
        display: none;
    }
    
    // 사이드바의 콘텐츠 영역
    .cont {
        width: 100%;
        height: 100%;
        background-color: #fff;
    }
`;




export default ModalSidebar;