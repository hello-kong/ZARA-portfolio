import React, { memo, useState, useCallback, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { postItem } from '../../slice/AddrSlice';

import styled from 'styled-components';
import Postcode from '../../components/Postcode';
import regexHelper from '../../helper/RegexHelper';
import cn from 'classnames';


const AddressAddWrapper = styled.div`
    margin-top: 177px;
    padding-left: 12%;
    box-sizing: border-box;

    h2 {
        font-weight: bold;
        font-size: 18px;
        padding: 8px 0;
        margin-bottom: 10px;
    }

    .direction {
        //width: 730px;
        width: 52%;
        height: 16px;
        padding: 16px;
        border: 1px solid #aaa;
        margin-bottom: 28px;

        p {
            font-size: 10px;
            color: #aaa;
        }
    } 
   

    form {
        max-width: 860px;

       
        
        .form_field {
            display: flex;
            width: 100%;
            flex-wrap: wrap;
            margin: 0;
            padding: 0;
            flex-direction: row;
            align-content: stretch;
            align-items: baseline;
            

            .form_column {
                display: flex;
                width: 50%;
                position: relative;
                align-items: baseline;
                margin-bottom: 10px;

                .form_input {
                    /* with help?? */
                    display: flex;
                    width: 100%;
                    
                    .input_wrapper {
                        width: 100%;
                        
                        .input_label {
                            position: relative;
                            width: 100%;

                            input {
                                width: calc(100% - 30px);
                                outline: none;
                                border: none;
                                border-bottom: 1px solid #aaa;
                                background-color: transparent;
                                margin-right: 20px;
                                margin-bottom: 5px;

                                
                                &:focus + label,
                                &:valid + label {
                                transform: translateY( -16px );
                                font-size: 7px;
                                
                                    
                                } 

                                
                            }
                            .borderRed {
                                border-bottom: 1px solid #EC0909;
                            }

                            label {
                                width: 100%;
                                position: absolute;
                                left: 0;
                                transform-origin: left;
                                transition-duration: 0.3s;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                                font-size: 11px;
                                padding-top: 5px;

                                &:hover {
                                    cursor: text;
                                }
                               
                               
                               
                            }

                            .label_up {
                                transform: translateY(-16px);
                                font-size: 5px;
                            }
                            
                        }
                        .addr2, .region {
                            input {
                                margin-top: 20px;
                                user-select: none;
                                

                                &::placeholder {
                                    font-size: 12px;
                                }

                                &:focus + label, &:valid + label {
                                    transition: none;
                                    transform: translateY(0);
                                    -webkit-transform: none;
                                    
                                }
                            }
                            

                            label {
                                font-size: 5px;
                                transition: none;
                                transform: none;
                            }
                            
                        }

                        
                       

                    }

                    .input_alert {
                        margin: 5px 0 15px 0;
                        font-size: 5px;
                        color: #EC0909;

                        //display: none;

                        i {
                            margin-right: 5px;
                        }
                        span {
                            font-size: 11px;
                            vertical-align:middle;
                            padding-bottom: 20px;
                            
                            
                        }
                    }
                    .hidden_a {
                        display: none;
                    }

                    .input_help {
                        font-size: 5px;
                        margin-top: 5px;

                        span {
                            line-height: 1.2;

                        }
                        
                        
                        i {
                                margin-right: 5px;
                                
                            }
                       
                    }
                    .hidden_h {
                            display: none;
     
                    }
                }
                .postcode {

                    
                    margin-right: -10px;
                }

                button {
                    border: none;
                    outline: none;
                    background-color: #000;
                    color: #fff;
                    //margin-top: -10px;   
                    width: 209px;
                    height: 33px;
                    font-size: 11px;
                    display: inline-block;
                    //margin-bottom: 17px;
                    
                }
                
            }
            .country_code {
               //margin-top: 30px;
               position: relative;
               //display: flex;
               .code {
                width: 30%;
               }

               .input_alert {
                width: 70%;
               }

               
            }
            
            .corp {
                display: none;
            }

        }

        .save {
            display: block;
            width: 380px;
            border: none;
            background-color: #000;
            color: #fff;
            padding: 10px;
            box-sizing: border-box;
            margin-top: 40px;
            font-size: 11px;

        }
    }

    
`;

const AddressAdd = memo(() => {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.AddrSlice);

    const navigate = useNavigate();
    
    // 법인회원 상태관리
    // const [corp, setCorp] = useState(true);

    // const onChange = useCallback((e) => {
    //     const target = e.target;
    //     console.log(target.value);
    //     if (target.value == 'corp') {
    //         setCorp(false);
    //     } else {
    //         setCorp(true);
    //     }
    // },[]);

    // 우편번호검색창 상태관리
    const [pop, setPop] = useState(false);
    const [addr, setAddr] = useState({});

    // 우편주소 검색창 열기
    const onClick = useCallback((e) => {
    e.preventDefault();
    setPop(true);

    },[]);


    // 포커스 이벤트
    const [isRequired, setIsRequired] = useState(null);
    const [alert, setAlert] = useState(null);
    const [help, setHelp] = useState(null);
    const ref = useRef([]);

    // onFocus event
    const FocusIn = useCallback((e) => {
        e.preventDefault();
        const target = e.target;

        if ( target.value.length === 0 ) {
            
            setHelp(target.dataset.help);
            //console.log(ref.current[target.dataset.alert]);
            if (ref.current[target.dataset.alert]) {
                ref.current[target.dataset.alert].classList.add('hidden_a');
            }
        } 
        
        setAlert(null);
        setIsRequired(null);
    },[]);

    // onBlur event
    const FocusOut = useCallback((e) => {
        const target = e.target;


        setHelp(null);

        if (target.value === '' ) {
 
            setAlert(target.dataset.alert);
            setIsRequired(target.dataset.alert);

        } else if (target.name == 'tel') {
            try {
     
                regexHelper.phone(target, '숫자만 입력하세요.');
            } catch (err) {
                setAlert(target.dataset.num);
            } 
    } 
    },[]);

    useEffect(() => {
        setIsRequired(null);
    },[]);

    // 저장버튼 --- 
    const onSubmit = useCallback((e) => {
        e.preventDefault();
        const current = e.target;
        
        const addname = current.addname.value;
        const postcode = current.postcode.value;
        const roadaddr = current.roadaddr.value;
        const detailaddr = current.detailaddr.value;
        const tel = current.tel.value;

        // 리덕스를 통한 데이터 저장 요청.
        dispatch(postItem({
            addname: addname,
            postcode: postcode,
            roadaddr: roadaddr,
            detailaddr: detailaddr,
            tel: tel,
        })).then((payload, error) => {
            if (error) {
                window.alert(payload.data.rtmsg);
                return;
            }

           navigate('/address');
        });

        if (current.value === '') {
            setAlert(true);
        }
    }, [dispatch, navigate]);

    // 브라우저 알림창 없애기
    const removeAlert = useCallback((e) => {
        e.preventDefault();
        const target = e.target.dataset.alert;
        ref.current[target].classList.remove('hidden_a');
        ref.current[target].classList.add('input_alert');
        
    },[]);

    // 인풋-숫자만 출력하기
    const onKeyPress= useCallback((e) => {
        if (!/[0-9]/.test(e.key)) {
            e.preventDefault();
        }
    },[]);

    // 국가코드 앞에 '+' 붙이기 --->미완성
    const inputRef = useRef();

    const insertPlus = useCallback((e) => {
        
        const target = e.target;
        if (target.value) {
            inputRef.current.classList.add('plus')
            console.log(inputRef.current);
        }
    },[]);

   
    return (
        <AddressAddWrapper>
                <div>
                    <h2>새로운 주소</h2>
                    <div className='direction'>
                        <p>우편번호를 입력하여 주소를 검색하세요. 주소 필드는 검색을 기반으로 자동 완성됩니다. 주소 2 필드에 필요한 정보를 입력하여 주소를 완성할 수 있습니다.</p>
                    </div>
                </div>
                <form onSubmit={onSubmit} autoComplete='off'>
                   <div className='form_field'>
                        <div className='form_column'>
                            <div className='form_input' >
                                <div className='input_wrapper'>
                                    <div className='input_label'>
                                        <input type='tel' onFocus={FocusIn}  onBlur={FocusOut} id='name' name='input'  value='이름' data-help='0' data-alert='0' className={isRequired == 0 ? 'borderRed' : 'input'} required onInvalid={removeAlert}/>
                                        <label htmlFor='name' >이름</label>
                                    </div>
                                    <div className= { alert == 0 ? 'input_alert' : 'hidden_a'} ref={(e) => {ref.current[0] = e}} >
                                        
                                        <i className="fa-solid fa-exclamation" />
                                        <span>필수 입력란입니다.</span>
                                    </div>
                                    <div  className={ help == 0 ? 'input_help' : 'hidden_h'} >
                                        <i className="fa-solid fa-info" />
                                        <span >이름을 입력해 주십시오.</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='form_column'>
                            <div className='form_input postcode' style={{'width':'210px'}}>
                                <div className='input_wrapper'>
                                    <div className='input_label'>
                                        <input type='text' onFocus={FocusIn} onBlur={FocusOut} id='postcode' name='postcode' value='우편번호' defaultValue={addr['postcode']} required data-alert='1' className={isRequired == 1 ? 'borderRed' : 'input'} onInvalid={removeAlert} />
                                        <label htmlFor='postcode' >우편번호</label>
                                    </div>
                                    <div className= { alert == 1 ? 'input_alert' : 'hidden_a'} ref={(e) => {ref.current[1] = e}}  >
                                        <i className="fa-solid fa-exclamation" />
                                        <span>필수 입력란입니다.</span>
                                    </div>
                                </div>
                            </div>
                            <button onClick={onClick} >우편번호찾기</button>
                        </div>

                        <div className='form_column'>
                            <div className='form_input'>
                                <div className='input_wrapper'>
                                    <div className='input_label'>
                                        <input  required style={{'border': 'none', 'pointerEvents': 'none'}} defaultValue={addr['fullAddress']}  onInvalid={removeAlert} data-alert='2' value='주소'  />
                                        <label>주소</label>
                                    </div>
                                    <div className= { alert == 2 ? 'input_alert' : 'hidden_a'} ref={(e) => {ref.current[2] = e}}  >
                                        <i className="fa-solid fa-exclamation" />
                                        <span>필수 입력란입니다.</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='form_column'>
                            <div className='form_input'>
                                <div className='input_wrapper'>
                                    <div className='input_label addr2'>
                                        <input type='text' placeholder='선택 사항' onFocus={FocusIn}  onBlur={FocusOut} data-help='1' />
                                        <label>주소2</label>
                                    </div>
                                    <div className={help == 1 ? 'input_help' : 'hidden_h'} >
                                        <i className="fa-solid fa-info" />
                                        <span>앞 칸에 입력하신 글자수가 초과되면 다음 칸에 기재하십시오.</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='form_column'>
                            <div className='form_input'>
                                <div className='input_wrapper'>
                                    <div className='input_label region'>
                                        <input type='text' placeholder='대한민국' style={{'border':'none'}} readOnly={true}  />
                                        <label>지역</label>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>

                        <div className='form_column country_code'>
                            <div className='form_input code'>
                                <div className='input_wrapper'>
                                    <div className='input_label country_code' >
                                        <input type='tel'defaultValue='+82' required id='country_code' onFocus={FocusIn}  onBlur={FocusOut} data-alert='3' className={cn({'borderRed' : isRequired === 3})}  onInvalid={removeAlert} onKeyPress={onKeyPress} maxLength={3} onChange={insertPlus} ref={inputRef} />
                                        <label htmlFor='country_code'>지역번호</label>
                                    </div>
                                    <div className= { alert == 3 ? 'input_alert' : 'hidden_a'} ref={(e) => {ref.current[3] = e}}>
                                        <i className="fa-solid fa-exclamation" />
                                        <span>필수 입력란입니다.</span>
                                    </div>
                                </div>
                            </div>
                            <div className='form_input'>
                                <div className='input_wrapper'>
                                    <div className='input_label'>
                                        <input type='tel' id='tel' name='tel' required onFocus={FocusIn}  onBlur={FocusOut} data-help='2' data-alert='4' data-num='5' className={isRequired == 4 ? 'borderRed' : 'input'} onInvalid={removeAlert} autoComplete='on'/>
                                        <label htmlFor='tel'>전화</label>
                                    </div>
                                    <div className= { alert == 4 ? 'input_alert' : 'hidden_a'} ref={(e) => {ref.current[4] = e}}>
                                        <i className="fa-solid fa-exclamation" />
                                        <span>필수 입력란입니다.</span>
                                    </div>
                                    <div className= { alert == 5 ? 'input_alert' : 'hidden_a'}>
                                        <i className="fa-solid fa-exclamation" />
                                        <span>전화번호가 유효하지 않습니다.</span>
                                    </div>
                                    <div className={help == 2 ? 'input_help' : 'hidden_h'} >
                                        <i className="fa-solid fa-info" />
                                        <span>앞자리 '0'을 제외한 전화 번호를 국가 번호와 함께 입력해 주십시오. <br/> 예&#41; +82 1012345678 </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                   </div>
                   <div>
                        <button type='submit' className='save'>저장</button>
                   </div>
                </form>
                <Postcode pop={pop} setPop={setPop} addr={addr} setAddr={setAddr} />
        </AddressAddWrapper>
        
    );
  });
  
  export default AddressAdd;
  