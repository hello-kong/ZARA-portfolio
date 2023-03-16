import styled from 'styled-components';

// 오버레이 CSS
const Overlay = styled.div`
    background-color: #fff9;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1000;

    &.hidden {
        display: none;
    }
`;

export default Overlay;