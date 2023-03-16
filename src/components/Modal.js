import React, { memo, useState, useCallback, useEffect, useRef } from 'react';



const Modal = memo(({width, height, title, body, pop }) => {

    const myStyle= {
        width: width,
        height: height,
        backgroundColor: '#fff',
        border: '1px solid #ccc',
        padding: '24px 20px',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        boxSizing: 'border-box',
        zIndex: 9999,
        display: pop ? 'block' : 'none',
    }

    const close = {
        display: 'none',
    }

    // 모달창 닫기 버튼
    const [modalClose, setModalClose] = useState(false);
    
    const onClick = useCallback((e) => {
        e.preventDefault();
        const target = e.target;
        console.log(target);

        setModalClose(true);
    },[]);

    return (
        <div>
            <div style={modalClose ? close : myStyle}  >
                <div className='modal_title'>
                    <h1 style={{fontSize: '16px', marginBottom: '15px'}}>{title}</h1>
                </div>
                <div className='modal_body'>
                    <p style={{fontSize: '11px', marginBottom: '25px'}}>{body}</p>
                </div>
                <button style={{width: '100%', backgroundColor: '#000', color: '#fff', cursor: 'pointer', padding: '8px 12px', fontSize: '11px'}} onClick={onClick} >닫기</button>
            </div>
        </div>
        
        
    );
});

Modal.defaultProps = {
    width: '312px' ,
    height: '157px',
   
}

export default Modal;