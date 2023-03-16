import React, { memo, useState, useCallback, useEffect, useRef} from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getItem, putItem } from "../../slice/AccountSlice";
import styled from 'styled-components';
import regexHelper from '../../helper/RegexHelper';
import cn from 'classnames';
import Eye from '../../assets/img/eye.svg'; // 비번 암호화
import Eye_slash from '../../assets/img/eye-slash.svg';  // 비번 암호화X

const EditPasswordWrapper = styled.div`
    margin-top: 177px;
    padding-left: 12%;
    box-sizing: border-box;
    position: relative;

    h2 {
        font-size: 18px;
        padding: 8px 0;
        margin-bottom: 50px;
    }

    form {
        max-width: 860px;
        width: 290px;

        .form_field {
            display: flex;
            width: 100%;
            flex-wrap: wrap;
            margin: 0;
            padding: 0;
            flex-direction: column;
            align-content: stretch;
            align-items: baseline;

            .form_column {
                display: flex;
                width: 100%;
                //position: relative;
                align-items: baseline;
                margin-bottom: 30px;

                .form_input {
                    display: flex;
                    width: 100%;
                    position: relative;

                    .input_wrapper {
                        width: 100%;

                        .input_label {
                            position: relative;
                            width: 100%;

                            input {
                                width: 100%;
                                outline: none;
                                border: none;
                                border-bottom: 1px solid #aaa;
                                background-color: transparent;
                                margin-right: 20px;

                                
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
                                top: 0;
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

                        }

                        // 눈모양 아이콘 css
                        .pw_display {
                            position: absolute;
                            top: 0;
                            right: 0;
                            background-color: transparent;
                            border: none;
                            outline: none;
                            color: #000;
                            width: 20px;
                            cursor: default;
                            //display: none;
                            

                            img {
                                position: absolute;
                                top: -5px;
                                right: 0;
                                //font-size: 18px;
                            }
                        }
                    }

                    .input_alert {
                        margin-top: 5px;
                        font-size: 5px;
                        color: #EC0909;
                        display: flex;
                        align-items: flex-start;

                        //display: none;

                        i {
                            margin-right: 5px;
                        }
                        span {
                            font-size: 11px;
                            vertical-align:middle;
                            //padding-bottom: 20px;
                             
                        }
                    }
                    .hidden_e {
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
            }
        }
        
        .save {
            display: block;
            width: 100%;
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

const EditPassword = memo(() => {

     // Password Visibility 
     const [showPswd, setShowPswd] = useState(false);

     const onPswdVisibility = useCallback((e) => {
         e.preventDefault();
 
         setShowPswd(!showPswd);
     }, [showPswd]);


    /** path 파라미터 받기 */
    const { id } = useParams();

     /** 리덕스 관련 초기화 */
     const dispatch = useDispatch();
     const { data, loading, error } = useSelector((state) => state.AccountSlice);
     console.log(data);
     
     /** 최초 마운트시 리덕스를 통해 목록을 조회한다. */
     useEffect(() => {
         dispatch(getItem({id: 6}));
     },[dispatch]);

     /** 페이지 강제 이동을 처리하기 위한 navigate함수 생성 */
    const navigate = useNavigate();


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
            ref.current[target.dataset.alert].classList.add('hidden_e');
            setHelp(target.dataset.help);
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

        } else if (target.name == 'pw') {
            try {
                regexHelper.minLength(target, 8, '최소 8자 이상 입력하십시오.');
            } catch (err) {
                setAlert(target.dataset.pw);
            } 
            
        } 
        // else if (inputRef.current.value !== target.value) {
        //     setAlert(target.dataset.match) 
        // } else {
        //     setAlert(!target.dataset.match) 
        // }
    },[]);

     // 인풋값 비교
     const inputRef = useRef();
     const onChange = useCallback((e) => {
         e.preventDefault();
         const target = e.target;
 
         if ( target.value.length != 0 ||inputRef.current.value !== target.value ) {
            setHelp(false);
            setAlert(target.dataset.match) 

        } else {
             setAlert(!target.dataset.match) 
 
         }
 
     },[]);

    useEffect(() => {
        setIsRequired(null);
    },[]);

    // 저장버튼 --- 
    const onSubmit = useCallback((e) => {
        e.preventDefault();
        const current = e.target;

        dispatch(
            putItem({
                id: current.id.value,
                password: current.password.value,
            })
        ).then(({ payload, error }) => {
            if (error) {
                window.alert(payload.data.rtmsg);
                return;
            }

            navigate('/account');
        });

        if (current.value === '') {
            setAlert(true);
        }
    }, []);

    // 브라우저 알림창 없애기
    const removeAlert = useCallback((e) => {
        e.preventDefault();
        const target = e.target.dataset.alert;
        ref.current[target].classList.remove('hidden_e');
        ref.current[target].classList.add('input_alert');
        
    },[]);

    return (
        <EditPasswordWrapper>
            <div>
                <h2>비밀번호 변경</h2>
            </div>

            <form autoComplete='off' method='POST' onSubmit={onSubmit}>
                <div className='form_field'>
                    <div className='form_column'>
                        <div className='form_input' >
                            <div className='input_wrapper'>
                                <div className='input_label'>
                                    <input type={ showPswd ? 'text' : 'password'} onFocus={FocusIn}  onBlur={FocusOut} id='pw'   data-help='1' data-alert='1' className={isRequired == 1 ? 'borderRed' : 'input'} required onInvalid={removeAlert}/>
                                    <label htmlFor='pw' >현재비밀번호</label>
                                </div>
                                <button aria-pressed='true' aria-label='비밀번호 보기' type='button' className='pw_display' onClick={onPswdVisibility}>
                                     {showPswd ? <img src={Eye_slash} alt='비밀번호 보기'/> : <img src={Eye} alt='비밀번호 숨기기' />}
                                </button>
                                <div className= { alert == 1 ? 'input_alert' : 'hidden_e'} ref={(e) => {ref.current[1] = e}} >
                                    <i className="fa-solid fa-exclamation" />
                                    <span>필수 입력란입니다.</span>
                                </div>
                                <div  className={ help == 1 ? 'input_help' : 'hidden_h'} >
                                    <i className="fa-solid fa-info" />
                                    <span >귀하의 현재 비밀번호를 입력하십시오.</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='form_column'>
                        <div className='form_input' >
                            <div className='input_wrapper'>
                                <div className='input_label'>
                                    <input type={ showPswd ? 'text' : 'password'} onFocus={FocusIn}  onBlur={FocusOut} id='new_pw' name='pw'   data-help='2' data-alert='2' data-pw='4' className={isRequired == 2 ? 'borderRed' : 'input'} required onInvalid={removeAlert} ref={inputRef}/>
                                    <label htmlFor='new_pw' >새 비밀번호</label>
                                </div>
                                <button aria-pressed='true' aria-label='비밀번호 보기' type='button' className='pw_display' onClick={onPswdVisibility}>
                                     {showPswd ? <img src={Eye_slash} alt='비밀번호 보기'/> : <img src={Eye} alt='비밀번호 숨기기' />}
                                </button>
                                <div className= { alert == 2 ? 'input_alert' : 'hidden_e'} ref={(e) => {ref.current[2] = e}} >
                                    <i className="fa-solid fa-exclamation" />
                                    <span>필수 입력란입니다.</span>
                                </div>
                                <div className= { alert == 4 ? 'input_alert' : 'hidden_e'}>
                                    <i className="fa-solid fa-exclamation" />
                                    <span>안전한 비밀번호를 입력하세요. 대문자, 소문자 및 숫자를 포함한 최소 8자리이어야합니다.</span>
                                </div>
                                <div  className={ help == 2 ? 'input_help' : 'hidden_h'} >
                                    <i className="fa-solid fa-info" />
                                    <span>안전한 비밀번호를 입력하세요. 대문자, 소문자 및 숫자를 포함한 최소 8자리이어야합니다.</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='form_column'>
                        <div className='form_input' >
                            <div className='input_wrapper'>
                                <div className='input_label'>
                                    <input type={ showPswd ? 'text' : 'password'} onFocus={FocusIn}  onBlur={FocusOut} id='new_pw2' name='pw'   data-help='3' data-alert='3' data-pw='5' data-match='6' className={isRequired == 3 ? 'borderRed' : 'input'} required onInvalid={removeAlert} onChange={onChange}/>
                                    <label htmlFor='new_pw2' >비밀번호를 한 번 더 입력해 주십시오</label>
                                </div>
                                <button aria-pressed='true' aria-label='비밀번호 보기' type='button' className='pw_display' onClick={onPswdVisibility}>
                                     {showPswd ? <img src={Eye_slash} alt='비밀번호 보기'/> : <img src={Eye} alt='비밀번호 숨기기' />}
                                </button>
                                <div className= { alert == 3 ? 'input_alert' : 'hidden_e'} ref={(e) => {ref.current[3] = e}} >
                                    <i className="fa-solid fa-exclamation" />
                                    <span>필수 입력란입니다.</span>
                                </div>
                                <div className= { alert == 5 ? 'input_alert' : 'hidden_e'}>
                                    <i className="fa-solid fa-exclamation" />
                                    <span>안전한 비밀번호를 입력하세요. 대문자, 소문자 및 숫자를 포함한 최소 8자리이어야합니다.</span>
                                </div>
                                <div className= { alert == 6 ? 'input_alert' : 'hidden_e'}>
                                    <i className="fa-solid fa-exclamation" />
                                    <span>본 필드는 비밀번호(와)과 일치해야만 합니다</span>
                                </div>
                                <div  className={ help == 3 ? 'input_help' : 'hidden_h'} >
                                    <i className="fa-solid fa-info" />
                                    <span >비밀번호 재입력</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <button type='submit' className='save'>비밀번호 변경</button>
                </div>
            </form>
        </EditPasswordWrapper>
    );
});

export default EditPassword;