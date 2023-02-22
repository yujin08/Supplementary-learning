import styled from "@emotion/styled";

export const  Wrapper = styled.div`
width:87%;
`
export const  InnerWrapper = styled.div`
margin-left: 10%;
width:87%;
padding-top: 30px;
border-top:1px dashed #c0c0c0 ;
`

export const AnswerWrap = styled.div`
  width: 100%;
  display: flex;
`;

export const Icon = styled.div`
  margin-top: 10px;
  margin-right: 10px;
  width: 5%;
  background-size: contain;
  background-repeat: no-repeat;
`;

export const MainWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
export const TitleWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const Edit_Del = styled.div`
  display: flex;
  justify-content: space-between;
  width: 6%;
`;
export const Title = styled.div`
font-size: 15px;
font-weight: 700;
line-height: 15px;
letter-spacing: -0.05em;
text-align: center;
margin-bottom: 30px;
`;
export const Edit = styled.div`
  width: 16px;
  background-size: contain;
  background-repeat: no-repeat;
  :hover {
    cursor: pointer;
  }
`;
export const Del = styled.div`
  width: 16px;
  background-size: contain;
  background-repeat: no-repeat;
  :hover {
    cursor: pointer;
  }
`;

export const Contents = styled.div`
  width: 100%;
font-size: 15px;
padding-top: 16px;
font-weight: 400;
line-height: 15px;
letter-spacing: -0.05em;
text-align: left;
padding-bottom: 46px;
`;

export const Date_Btn = styled.div`
  display: flex;
  margin-bottom: 5px;
`;

export const Date = styled.div`
color: #999999;
font-size: 15px;
font-weight: 400;
line-height: 15px;
letter-spacing: -0.05em;
`;

export const AddAnswer = styled.button`
  background-color: black;
  border: none;
`;
export const IconWrapper = styled.div`
  width: 20%;
  margin-left: 30px;
  display: flex;
  justify-content: flex-end;
`;
export const IconEdit = styled.img`
  width: 18px;
  height: 18px;
  :hover {
    cursor: pointer;
  }
`;
export const IconDelete = styled.img`
  width: 14px;
  height: 14px;
  margin-left: 25px;
  :hover {
    cursor: pointer;
  }
`;
