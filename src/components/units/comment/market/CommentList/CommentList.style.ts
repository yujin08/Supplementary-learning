import styled from "@emotion/styled";
import { Modal } from "antd";

export const OutWrap = styled.div`
`
export const EndLine = styled.div`
width: 87%;
margin: auto;
border: 0.5px solid #C0C0C0;
margin-bottom: 38px;
`

export const Back = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const UserWrap = styled.div`
width:10%;
`
export const User = styled.div`
width: 100%;
height: 27px;
color: #Ffffff;
background-color: #000000;
text-align: center;
`

export const Comment = styled.div`
  padding-left: 24px;
  width: 87%;
  height: 100px;
  display: flex;
  border-top: 1px solid #C0C0C0;
  align-items: center;
`;
export const Wrapper = styled.div`
  display: flex;
  margin-left: 30px;
  width: 100%;
  height: 100%;
  align-items: center;
`;
export const CmtMain = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
`;
export const WriterLine = styled.div`
  display: flex;
`;
export const Icon5 = styled.img`
  width: 50px;
  height: 50px;
  margin-top: 20px;
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
export const Cmt = styled.div`
  font-size: 16px;
  font-weight: 400;
  text-align: left;
  border-radius: 30px;
`;
export const CmtDate = styled.div`
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  text-align: left;
  color: #bdbdbd;
`;

export const CommentWrite = styled.div`
  width: 1200px;
  margin-bottom: 1px solid #bdbdbd;
`;
export const CmtTitleBox = styled.div`
  display: flex;
  flex-direction: row;
`;
export const Icon4 = styled.div`
  margin-top: 5px;
  margin-right: 14px;
`;
export const CmtTitle = styled.div`
  font-size: 18px;
  font-weight: 500;
  line-height: 27px;
  text-align: left;
  margin-bottom: 40px;
`;
export const Writer_Password_Star = styled.div`
  height: 52px;
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
`;
export const Input = styled.input`
  width: 180px;
  height: 52px;
  margin-right: 24px;
  padding-left: 20px;
  border: 1px solid #bdbdbd;
`;
export const CommentBoxWrapper = styled.div`
  width: 1200px;
  margin-bottom: 46px;
`;
export const CommentBox = styled.textarea`
  width: 1200px;
  height: 108px;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  text-align: left;
  color: #bdbdbd;
  padding: 20px;
  padding-left: 20px;
  border: 1px solid #bdbdbd;
  border-bottom: 1px solid #f2f2f2;
  resize: none;
`;
export const PasswordModal = styled(Modal)``;

export const PasswordInput = styled.input`
  width: 100%;
  margin-top: 10px;
`;
export const DateWrapper = styled.div`
  width: 16%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const IconAnswer = styled.img`
:hover{
  cursor: pointer;
}`
export const AnswerBtn = styled.button`
  height: 30px;
  margin: 0px 10px;
  background-color: black;
  color: white;
  border: none;
`;
