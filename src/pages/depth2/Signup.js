import React, { memo, useState, useCallback, useRef } from "react";
import styled from "styled-components";
import Exit from "../../assets/img/exit.svg";
import RegexHelper from "../../helper/RegexHelper";
import Overlay from '../../components/Overlay';
// import { data } from "jQuery";

const SignupContainer = styled.div`
  margin: 200px auto;
  width: 80%;
  display: relative;

  h2 {
    font-size: 17px;
    font-weight: 400;
    margin-bottom: 20px;
  }

  .signup-form {
    display: flex;
    flex-direction: column;
    .form_wrapper {
      margin-bottom: 20px;
    }
    .input_label {
      position: relative;
      width: 100%;

      .signup-input {
        margin: 20px 0 0 0;
        border: 0;
        border-bottom: 1px solid lightgrey;
        padding-bottom: 3px;
        font-size: 13px;
        width: 400px;
      }

      input {
        position: relative;
        width: calc(100% - 30px);
        outline: none;
        border: none;
        border-bottom: 1px solid #bbb;
        background-color: transparent;
        margin-right: 20px;
        margin-bottom: 5px;
        z-index: 100;

        &:focus + label,
        &:valid + label {
          transform: translateY(-14px);
          font-size: 4px;
        }
      }

      label {
        width: 100%;
        position: absolute;
        left: 0;
        bottom: 5px;
        transform-origin: left;
        transition-duration: 0.3s;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 11px;
        font-weight: 200;
        padding-top: 10px;

        &:hover {
          cursor: text;
        }
      }

      .label_up {
        transform: translateY(-14px);
        font-size: 4px;
      }
    }

    .input_error {
      margin: 5px 0;
      font-size: 5px;
      color: #ec0909;

      //display: none;

      i {
        margin-right: 5px;
      }
      span {
        font-size: 11px;
        vertical-align: middle;
        padding-bottom: 20px;
      }
    }
    .hidden_e {
      display: none;
    }

    .input_help {
      font-size: 5px;
      margin-top: 5px;
      margin-bottom: 5px;

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

    .success {
      font-size: 5px;
      margin: 5px 0;
      color: #ec0909;
      i {margin-right: 5px;}
    }

    .error {
      display: none;
    }

    .signup-checkbox {
      padding: 5px 0;
      font-size: 11px;
      color: rgba(0, 0, 0, 0.6);

      label {
        padding-left: 3px;

        button {
          background-color: white;
          font-size: 11px;
          border: 0;
          color: rgba(0, 0, 0, 0.6);
          text-decoration: underline;
        }
      }
      input {
        accent-color: black;
      }
    }
  }

  .signup_btn {
    margin-top: 40px;
    font-size: 12px;
    width: 400px;
    height: 30px;
    border-radius: 0;
    border: none;
    background-color: #000;
    color: white;
  }

  .popup {
    .popup_box1,
    .popup_box2 {
      .popup_wrapper {
        display: block;
        border: 1px solid lightgray;
        box-shadow: 0 2px 3px lightgray;
        padding: 20px;
        width: 500px;
        height: 250px;
        z-index: 100000;
        top: 25%;
        left: 30%;
        margin-top: 50px;
        position: absolute;
        background-color: #fff;
        box-sizing: border-box;
        div {
          display: flex;
          justify-content: space-between;
          h2 {
            font-size: 16px;
            word-spacing: 3px;
            margin: 0;
            padding-top: 4px;
          }
          button {
            border: 0;
            background: none;
            img {
              width: 23px;
            }
          }
        }

        table {
          margin-left: 27px;
          margin-top: 12px;
          tbody {
            font-size: 11px;
          }
          th,
          td {
            padding: 15px 110px 15px 0;
            line-height: 18px;
            box-sizing: border-box;
            span {
              font-weight: bold;
            }
          }
          td {
            color: gray;
          }
          tr {
            border-bottom: 1px solid lightgray;
            &:last-child {
              border: 0;
            }
          }
        }
      }
    }
    .hidden2 {
      display: none;
    }
    .hidden1 {
      display: none;
    }

    .checkbox_wrapper {
      text-align: center;
      border-collapse: collapse;
      thead{
        tr{
          th{
            padding: 10px 15px;
            background-color: #888;
            color: #fff;
            font-weight: 700;
          }
        }
      }
      tbody{
        tr{
          td{
            padding: 7px 15px;
            border-bottom: 1px solid #eee;
          }
        }
      }
      .second-row{
        width: 150px;
      }
    }
  }
`;

const Signup = memo(() => {
  const inputRef = useRef();
  const checkRef = useRef([]);

  // 이메일, 비밀번호, 비밀번호 확인, 이름
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [name, setName] = useState('');

  // 오류메세지 상태저장
  const [nameMessage, setNameMessage] = useState('')
  const [emailMessage, setEmailMessage] = useState('')
  const [passwordMessage, setPasswordMessage] = useState('')
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState('')

  // 유효성 검사
  const [isName, setIsName] = useState(false)
  const [isEmail, setIsEmail] = useState(false)
  const [isPassword, setIsPassword] = useState(false)
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false)
  

  

  // 이메일
  const onChangeEmail = useCallback((e) => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
    const emailCurrent = e.target.value
    setEmail(emailCurrent)

    if (!emailRegex.test(emailCurrent)) {
      setEmailMessage('Enter a valid email address');
      setIsEmail(true);
      setHint(false);
      setAlert(false);
    } else {
      setEmailMessage('')
      setIsEmail(false);
      setHint(false);
      setAlert(false);
    }
  }, []);

  // 비밀번호
  const onChangePassword = useCallback((e) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/
    const passwordCurrent = e.target.value
    setPassword(passwordCurrent);

    if (!passwordRegex.test(passwordCurrent)) {
      setPasswordMessage('안전한 비밀번호를 입력하십시오. 대문자, 소문자 및 숫자를 포함하여 최소한 8자이어야 합니다.');
      setIsPassword(true);
      setHint2(false);
      setAlert2(false);
    } else {
      setPasswordMessage('');
      setIsPassword(false);
      setHint2(false);
      setAlert2(false);
    }
  }, [])

  // 비밀번호 확인
  const onChangePasswordConfirm = useCallback(
    (e) => {
      const passwordConfirmCurrent = e.target.value
      setPasswordConfirm(passwordConfirmCurrent)

      if (password !== passwordConfirmCurrent) {
        setPasswordConfirmMessage('비밀번호를 다시 확인해주세요.');
        setIsPasswordConfirm(true);
      } else {
        setPasswordConfirmMessage('')
        setIsPasswordConfirm(false)
      }
    },
    [password]
  )
  // 이름
  const onChangeName = useCallback((e) => {
    const nameRegex = /^[ㄱ-ㅎ가-힣]*$/
    const nameCurrent = e.target.value;
    setName(nameCurrent);
    if (!nameRegex.test(nameCurrent)) {
      setNameMessage('한글만 입력가능합니다.')
      setIsName(true);
      setHint4(false);
      setAlert4(false);
    } else {
      setNameMessage('')
      setIsName(false);
    }
  }, [])

  // 포커스 이벤트
  const [alert, setAlert] = useState(false);
  const [alert2, setAlert2] = useState(false);
  const [alert3, setAlert3] = useState(false);
  const [alert4, setAlert4] = useState(false);

  const [hint, setHint] = useState(false);
  const [hint2, setHint2] = useState(false);
  const [hint4, setHint4] = useState(false);

  // onFocus Event
  const FocusIn = (e) => {
    const target = e.target;
    if (inputRef.current.focus && target.name === "email") {
      setHint(true);
      setAlert(false);
      setIsEmail(false);
    } else if (inputRef.current.focus && target.name === "password") {
      setHint2(true);
      setAlert2(false);
      setIsPassword(false);
    } else if (inputRef.current.focus && target.name === "user_name") {
      setHint4(true);
      setAlert4(false);
      setIsName(false);
    } else if (inputRef.current.focus && target.name === "password_confirm") {
      setAlert3(false);
    }
  };

  const FocusOut = (e) => {
    const target = e.target;

    if (target.value === "" && target.name === "email") {
      setAlert(true);
      setHint(false);
    } else if (target.value === "" && target.name === "password") {
      setAlert2(true);
      setHint2(false);
    } else if (target.value === "" && target.name === "password_confirm") {
      setAlert3(true);
    } else if (target.value === "" && target.name === "user_name") {
      setAlert4(true);
      setHint4(false);
    }
  };

  const [popup1, setPopup1] = useState(false);
  const [popup2, setPopup2] = useState(false);

  const PopupBtn1 = (e) => {
    setPopup1(true);
  };

  const PopupBtn2 = () => {
    setPopup2(true);
  };

  const exitBtn = (e) => {
    // e.preventDefault();
    setPopup1(false);
    setPopup2(false);
  }

  // const data = [
  //   {id: 0, title: '만 14세 이상입니다.'},
  //   {id: 1, title: '필수적 개인정보의 수집 및 이용에 대한 동의'},
  //   {id: 2, title: '선택적 개인정보의 수집 및 이용에 대한 동의'},
  //   {id: 3, title: '광고성 정보 수신에 대한 동의'},
  // ];

  const [checkItems, setCheckItems] = useState([]);


  // 체크박스 단일 선택
  const handleSingleCheck = (checked, id) => {
    if (checked) {
      setCheckItems(prev => [...prev, checkRef.current[id]]);
    } else {
      setCheckItems(checkItems.filter((el) => el !== checkRef.current[id]));
    }
  };

  // 체크박스 전체 선택
  const handleAllCheck = (checked) => {
    if(checked) {
      const idArray = [];
      checkRef.current.forEach((el) => {if(el !== null) {idArray.push(el)}});
      setCheckItems(idArray);
    } else {
      setCheckItems([]);
    }
  }

  return (
    <SignupContainer>
      <h2>개인 정보</h2>
      <form
        className="signup-form"
        name="signup-form"
        id="signup-form"
      >
        <div className="form_wrapper">
          <div className="input_label">
            <input
              type="text"
              className="signup-input"
              name="email"
              onFocus={FocusIn}
              onBlur={FocusOut}
              onChange={onChangeEmail}
              ref={inputRef}
              defaultValue=""
              // required
            />
            
            <label htmlFor="email">E-MAIL</label>
          </div>
          <div className={hint ? "input_help" : "hidden_h"}>
            <i className="fa-solid fa-info" />
            <span>Enter your e-mail address</span>
          </div>
          <div className={alert ? "input_error" : "hidden_e"}>
            <i className="fa-solid fa-exclamation" />
            <span>필수 입력란입니다.</span>
          </div>
          <div>
            {email.length > 0 && <span className={`message ${isEmail ? 'success' : 'error'}`}>
              <i className="fa-solid fa-exclamation" />
              {emailMessage}
            </span>}
          </div>
        </div>

        <div className="form_wrapper">
          <div className="input_label">
            <input
              type="password"
              className="signup-input"
              name="password"
              onFocus={FocusIn}
              onBlur={FocusOut}
              onChange={onChangePassword}
              ref={inputRef}
              defaultValue=""
              required
            /> 
            <label htmlFor="password">비밀번호</label>
          </div>
          <div className={hint2 ? "input_help" : "hidden_h"}>
            <i className="fa-solid fa-info" />
            <span>
              안전한 비밀번호를 입력하세요. 대문자, 소문자 및 숫자를 포함한 최소
              8자리이어야 합니다.
            </span>
          </div>
          <div className={alert2 ? "input_error" : "hidden_e"}>
            <i className="fa-solid fa-exclamation" />
            <span>필수 입력란입니다.</span>
          </div>
          <div>
            {password.length > 0 && (
              <span className={`message ${isPassword ? 'success' : 'error'}`}><i className="fa-solid fa-exclamation" />{passwordMessage}</span>
            )}
          </div>
        </div>

        <div className="form_wrapper">
          <div className="input_label">
            <input
              type="password"
              className="signup-input"
              name="password_confirm"
              onFocus={FocusIn}
              onBlur={FocusOut}
              onChange={onChangePasswordConfirm}
              ref={inputRef}
              defaultValue=""
              required
            />
            <label htmlFor="password_confirm">
              비밀번호를 한 번 더 입력해 주십시오
            </label>
          </div>
          <div className={alert3 ? "input_error" : "hidden_e"}>
            <i className="fa-solid fa-exclamation" />
            <span>필수 입력란입니다.</span>
          </div>
          <div>
            {passwordConfirm.length > 0 && (
              <span className={`message ${isPasswordConfirm ? 'success' : 'error'}`}><i className="fa-solid fa-exclamation" />{passwordConfirmMessage}</span>
            )}
          </div>
        </div>

        <div className="form_wrapper">
          <div className="input_label">
            <input
              type="text"
              className="signup-input"
              name="user_name"
              onFocus={FocusIn}
              onBlur={FocusOut}
              onChange={onChangeName}
              ref={inputRef}
              defaultValue=""
              required
            />
            <label htmlFor="user_name">NAME</label>
          </div>
          <div className={hint4 ? "input_help" : "hidden_h"}>
            <i className="fa-solid fa-info" />
            <span>Enter your name</span>
          </div>
          <div className={alert4 ? "input_error" : "hidden_e"}>
            <i className="fa-solid fa-exclamation" />
            <span>필수 입력란입니다.</span>
          </div>
          <div>
            {name.length > 0 && <span className={`message ${isName ? 'success': 'error'}`}><i className="fa-solid fa-exclamation" />{nameMessage}</span>}
          </div>
        </div>

        <div className="signup-checkbox">
          <input type="checkbox" name="checking" id="checked_all"
          onChange={(e)=> handleAllCheck(e.target.checked)}
          checked={checkItems.length === 4 ? true : false}/>
          <label htmlFor="checked_all">모든 항목에 동의</label>
        </div>
        <div className="signup-checkbox">
          <input type="checkbox" name="checking" id="checked1" ref={(e) => checkRef.current[0] = e}
          onChange={(e)=> handleSingleCheck(e.target.checked, 0)}
          checked = {checkItems.includes(checkRef.current[0]) ? true : false}/>
          <label htmlFor="checked1">*만 14세 이상입니다.</label>
        </div>
        <div className="signup-checkbox">
          <input type="checkbox" name="checking" id="checked2" ref={(e) => checkRef.current[1] = e}
          onChange={(e)=> handleSingleCheck(e.target.checked, 1)}
          checked = {checkItems.includes(checkRef.current[1]) ? true : false}/>
          <label htmlFor="checked2">
            *<button type="button" onClick={PopupBtn1}>필수적 개인정보의 수집 및 이용</button>
            에 대한 동의
          </label>
        </div>
        <div className="signup-checkbox">
          <input type="checkbox" name="checking" id="checked3" ref={(e) => checkRef.current[2] = e}
          onChange={(e)=> handleSingleCheck(e.target.checked, 2)}
          checked = {checkItems.includes(checkRef.current[2]) ? true : false}/>
          <label htmlFor="checked3">
            <button type="button" onClick={PopupBtn2}>선택적 개인정보의 수집 및 이용</button>
            에 대한 동의
          </label>
        </div>
        <div className="signup-checkbox">
          <input type="checkbox" name="checking" id="checked4" ref={(e) => checkRef.current[3] = e}
          onChange={(e)=> handleSingleCheck(e.target.checked, 3)}
          checked = {checkItems.includes(checkRef.current[3]) ? true : false}/>
          <label htmlFor="checked4">광고성 정보 수신에 대한 동의</label>
        </div>

        {/* <table className="checkbox_wrapper">
          <thead>
            <tr>
              <th>
                <input type="checkbox" name='select-all'
                  onChange={(e)=> handleAllCheck(e.target.checked)}
                  checked={checkItems.length === data.length ? true : false} />
              </th>
              <th className="checking">모든 항목에 동의</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((data, key) => (
              <tr key={key}>
                <td>
                  <input type='checkbox' name={`select-${data.id}`}
                    onChange={(e)=> handleSingleCheck(e.target.checked, data.id)}
                    checked = {checkItems.includes(data.id) ? true : false} />
                </td>
                <td className="checking">{data.title}</td>
              </tr>
            ))}
          </tbody>
        </table> */}

        <button type="submit" className="signup_btn" form="signup-form">
          계정 만들기
        </button>
      </form>

      <div className="popup">
        <div className={popup1 ? "popup_box1" : "hidden1"} state={popup1}>
          <Overlay/>
          <div className='popup_wrapper'>
            <div>
              <h2>필수적 개인정보의 수집 및 이용</h2>
              <button type="button" onClick={exitBtn}>
                <img src={Exit} />
              </button>
            </div>
            <table>
              <tbody>
                <tr>
                  <th>수집목적</th>
                  <td>
                    회원계정 관리
                    <br />
                    제품 구매 계약의 체결 및 이행
                    <br />
                    고객상담채널을 통한 민원사항 처리
                  </td>
                </tr>
                <tr>
                  <th>수집항목</th>
                  <td>이메일 주소, 비밀번호, 이름</td>
                </tr>
                <tr>
                  <th>보유기간</th>
                  <td><span>회원탈퇴시까지</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className={popup2 ? "popup_box2" : "hidden2"} state={popup2}>
          <Overlay/>
          <div className='popup_wrapper'>
            <div>
              <h2>선택적 개인정보의 수집 및 이용</h2>
              <button type="button" onClick={exitBtn}>
                <img src={Exit} />
              </button>
            </div>
            <table>
              <tbody>
                <tr>
                  <th>수집목적</th>
                  <td>ZARA 제품 정보 제공</td>
                </tr>
                <tr>
                  <th>수집항목</th>
                  <td>이메일 주소</td>
                </tr>
                <tr>
                  <th>보유기간</th>
                  <td>회원탈퇴시까지</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </SignupContainer>
  );
});

export default Signup;
