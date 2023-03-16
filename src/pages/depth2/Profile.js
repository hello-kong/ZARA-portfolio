import React, { memo, useEffect } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {getItem} from '../../slice/DefaultAddressSlice'
import Spinner from "../../components/Spinner";
import ErrorView from "../../components/ErrorView";

const ProfileWrapper = styled.div`
  margin-top: 320px;
  padding-left: 12%;
  box-sizing: border-box;

  ul {
    display: flex;
    margin-bottom: 50px;

    li {
      margin: 0 10px;
      font-size: 14px;

      &:first-child {
        margin-left: 0;
      }
    }
  }

  .user-info {
    p {
      line-height: 1.4;
      font-size: 14px;

      &:first-child {
        font-weight: bold;
      }

      &:last-child {
        margin-bottom: 50px;
      }
    }
  }
  .a-link-wrap {
    width: 550px;
    display: flex;
    justify-content: space-between;

    .a-link {
      display: block;
      width: 100%;
      margin-bottom: 20px;

      p {
        margin: 5px;

        &:first-child {
          font-weight: bold;
        }
      }
    }

    button {
      background-color: transparent;
      border: none;
      cursor: pointer;
      font-size: 20px;
      //font-weight: 100;  얇게 해야 함!!
    }
  }
`;

const Profile = memo(() => {

  /** 리덕스 관련 초기화 */
  const dispatch = useDispatch();
  const { data, visible, error } = useSelector((state) => state.DefaultAddressSlice);

  useEffect(() => {
    dispatch(getItem({id: 6}));
  },[dispatch]);
  
    return (
      
        <div>
           {/* 로딩바 */}
           <Spinner visible={visible} />

           {error ? (
            <ErrorView error={error} />
           ) : (
            data && 
            <ProfileWrapper>
              <div className='user-info'>
                  <p>{data.item.name}</p>
                  <p>{data.item.email}</p>
              </div>
              <div className='a-link-wrap'>
                  <NavLink className='a-link' to='/account'>
                      <div>
                          <p>계정</p>
                          <p>이메일, 비밀번호, 로그아웃...</p>
                      </div>
                  </NavLink>
                  <button><i className="fa-solid fa-angle-right"></i></button>
              </div>
              <div className='a-link-wrap'>
                  <NavLink className='a-link' to='/address'>
                      <p>주소</p>
                      <p>배송지 및 청구서 주소</p>
                  </NavLink>
                  <button><i className="fa-solid fa-angle-right"></i></button>
              </div>
            </ProfileWrapper>
           )}
            
        </div>
    );
});

export default Profile;
