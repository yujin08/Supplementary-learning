import { gql, useMutation, useQuery } from "@apollo/client";
import styled from "@emotion/styled"
import { Modal } from "antd";
import Head from "next/head";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { basketsState } from "../../../../commons/stores";
import { IQuery } from "../../../../commons/types/generated/types";
import React from 'react';
import { Select, Space } from 'antd';

export const FETCH_USER_LOGGED_IN = gql`
  query fetchUserLoggedIn {
    fetchUserLoggedIn {
      _id
      email
      name
      userPoint {
        _id
        amount
        user {
          _id
        }
      }
    }
  }
`;
export const LOGOUT_USER = gql`
  mutation logoutUser{
    logoutUser
  }
`
export const CREATE_POINT_TRANSACTION_OF_LOADING = gql`
  mutation createPointTransactionOfLoading($impUid: ID!) {
    createPointTransactionOfLoading(impUid: $impUid) {
      impUid
    }
  }
`;

export default function Header() {
  const [BasketsState, setBasketsState] = useRecoilState(basketsState);
  const [basketsCount, setBasketsCount] = useState(0)
  const [cost, setCost] = useState(0);
  const [isActive, setIsActive] = useState(false)
  const [isOpen, setIsOpen] = useState(false);
    const router = useRouter()
    const { data } = useQuery<Pick<IQuery, "fetchUserLoggedIn">>(FETCH_USER_LOGGED_IN);
    const [logoutUser] = useMutation(LOGOUT_USER)
    const [createPointTransactionOfLoading] = useMutation(
      CREATE_POINT_TRANSACTION_OF_LOADING
      );  

      const handleChange = (value) => {
        setCost(value)
        setIsActive(true)
      };
    const [user,setUser] = useState(false)
    useEffect(() => {
        if(data) {
            setUser(true)
        }
    },[data])

    const onClickLogin = () => {
        router.push('/login')
    }

    const onClickJoin = () => {
        router.push('/join')
      }

    const onClickLogout = async() => {
        const result = await logoutUser({})
        window.localStorage.removeItem("baskets");
        window.localStorage.removeItem("accessToken");
        location.reload();
        console.log(result)
      }

      const onClickPayment = () => {
        setIsActive(false)
        onToggleModal();
        const IMP = window.IMP; // 생략 가능
        IMP.init("imp49910675"); // Example: imp00000000
      
        // IMP.request_pay(param, callback) 결제창 호출
        IMP.request_pay(
          {
            // param
            pg: "nice",
            pay_method: "card", // card, vbank 등
            // merchant_uid: "ORD20180131-0000011", // 중복될 시, 결제 안됨!
            name: "POINT",
            amount: cost,
            buyer_email: data?.fetchUserLoggedIn.email,
            buyer_name: data?.fetchUserLoggedIn.name,
            buyer_tel: "010-4242-4242",
            buyer_addr: "서울특별시 강남구 신사동",
            buyer_postcode: "01181",
            m_redirect_url: "http://localhost:3000/28-01-payment", // 모바일에서는 결제시, 결제페이지로 사이트가 이동됨
          },
          (rsp: any) => {
            if (rsp.success) {
              console.log(rsp);
              const result = createPointTransactionOfLoading({
                variables: {
                  impUid: rsp.imp_uid,
                  amount: rsp.paid_amount,
                },refetchQueries: [
                  {
                    query: FETCH_USER_LOGGED_IN
                  },
                ],
              });
              alert("포인트 충전이 완료되었습니다.");
              console.log(result);
            } else {
              alert("결제에 실패했습니다! 다시 시도해 주세요!");
            }
          }
        );
      };
      const onToggleModal = () => {
        setIsOpen((prev) => !prev);
      };

      useEffect(() =>{
        if(!(JSON.parse(localStorage.getItem("baskets")))){
          setBasketsCount(0)
        }else{
          setBasketsCount(JSON.parse(localStorage.getItem("baskets")).length)
        }
      
      },[BasketsState])
    return(
      <>
      <Head>
        {/* jQuery */}
        <script
          type="text/javascript"
          src="https://code.jquery.com/jquery-1.12.4.min.js"
        ></script>
        {/* iamport.payment.js */}
        <script
          type="text/javascript"
          src="https://cdn.iamport.kr/js/iamport.payment-1.2.0.js"
        ></script>
      </Head>
        <Wrapper>
            <Logo src="/Logo.png" />
            <MenuWrap
            style={{
                width: user ? '400px' : ""
            }}
            >
                {user
                ? <UserInfo>
                    <UserName>
                        {data?.fetchUserLoggedIn.name}
                    </UserName>
                    <UserPoint>
                        님 포인트
                    </UserPoint>
                    <Point>{data?.fetchUserLoggedIn.userPoint?.amount}</Point>
                    <P>P</P>
                    <FillPoint onClick={onToggleModal}>충전</FillPoint>
                    {isOpen && (
                <CusModal
                  open={true}
                  width={464}
                  onOk={onClickPayment}
                  onCancel={onToggleModal}
                >
                  <ModalTitle>충전하실 금액을 선택해주세요!</ModalTitle>
                  <MySpace wrap>
    <MySelect
      defaultValue="포인트 선택"
      style={{ width: "384px" }}
      onChange={handleChange}
      options={[
        { value: 100, label: 100 },
        { value: 500, label: 500 },
        { value: 2000, label: "2,000" },
        { value: 5000, label: "5,000"},
      ]}
    />
  </MySpace>
  <FillBtn 
  onClick={onClickPayment}
  style={{backgroundColor: isActive ? "#000000" : "#BDBDBD"}}
  >충전하기</FillBtn>
                </CusModal>
              )}
                  </UserInfo>
                :<Menu onClick={onClickLogin}>
                    로그인
                </Menu>
                }   
                <Menu onClick={user ?onClickLogout :onClickJoin}>
                    {user ?  "로그아웃" : "회원가입" }
                </Menu>
                <Menu>
                    장바구니
                    <Num>{basketsCount}</Num>
                </Menu>
            </MenuWrap>
        </Wrapper>
        </>
    )
}

const Wrapper = styled.div`
    width: 100%;
    height: 100px;
    padding: 0px 76px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const Logo = styled.img`
    width:181px;
    height: 49px;
    cursor: pointer;
`
const MenuWrap = styled.div`
    display:flex;
    width:  250px;
    justify-content: space-between;
    align-items: center;
    `
const Menu = styled.div`
font-size: 14px;
font-weight: 400px;
line-height: 14px;
display: flex;
align-items: center;
cursor: pointer;
`
const Num = styled.div`
text-align: center;
width: 20px;
height: 20px;
border-radius: 100px;
margin-left:5px;
font-size: 12px;
line-height: 19px;
background-color: #F65656;
color: white;
 ;
`
const UserInfo = styled.div`
display: flex;
font-size: 14px;
font-weight: 400;
line-height: 14px;
`
const UserName = styled.div`
font-weight: 700;
`
const UserPoint = styled.div`
margin-right: 5px;
`
const Point = styled.div`
text-decoration: underline;
`
const P = styled.div`
margin: 0px 5px;
`
const FillPoint = styled.div`
margin-left: 10px;
cursor: pointer;
`

const MySpace = styled(Space)`
width: 384px;
border: none;
border-bottom: 2px solid #000000;
display: flex;
justify-content: space-between;
.ant-space-item{
  width: 100%;
display: flex;
justify-content: space-between;
}
`
const MySelect = styled(Select)`
border: none;
.ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
    width: 100%;
    height: 32px;
    border: none;

}
.ant-select-selector {
  width: 100%;
    display: flex;
    justify-content: space-between;

}
.ant-select .ant-select-single .ant-select-show-arrow{
  width: 100%;

}
.ant-select-arrow{
  color: #000000;
}
`
const ModalTitle = styled.div`
  padding-top: 52px;
  padding-bottom: 20px;
font-size: 20px;
font-weight: 700;
line-height: 29px;
letter-spacing: 0em;
text-align: center;

`
const CusModal = styled(Modal)`
  .ant-modal-footer {
    display: none;
}
.ant-select-single .ant-select-selector .ant-select-selection-item{
font-size: 16px;
font-weight: 700;
line-height: 24px;
letter-spacing: 0px;
text-align: left;

}
.ant-modal-body {
  display: flex;
  flex-direction: column;
  align-items: center;
    height: 300px;
    font-size: 14px;
    /* line-height: 1.5715; */
    word-wrap: break-word;
}
.ant-modal-close {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 10;
    padding: 0;
    color: #C4C4C4;
    font-weight: 700;
    line-height: 1;
    text-decoration: none;
    background: transparent;
    border: 0;
    outline: 0;
    cursor: pointer;
    transition: color 0.3s;
}
.ant-modal-content {
    position: relative;
    background-color: #fff;
    background-clip: padding-box;
    border: 0;
    border-radius: 2px;
    box-shadow: 0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%), 0 9px 28px 8px rgb(0 0 0 / 5%);
    pointer-events: auto;
    border-radius: 20px;
}
`
const FillBtn = styled.button`
border: none;
margin-top: 40.5px;
width:384px;
height: 51px;
color: #ffffff;
border-radius: 10px;
cursor: pointer;
`