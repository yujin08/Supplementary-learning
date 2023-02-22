import styled from "@emotion/styled";

export const Back = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CommentWrite = styled.div`
padding-top: 71px;
  color: white;
  width:87%;
`;
export const CmtTitleBox = styled.div`
  display: flex;
  flex-direction: row;
`;
export const Icon4 = styled.div`
  margin-top: 5px;
  margin-right: 14px;
`;
export const img = styled.img`
  width: 30px;
`;
export const CmtTitle = styled.div`
  color: white;
  font-size: 18px;
  font-weight: 500;
  line-height: 35px;
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
  background-color: #222222;
  color: white;
  width: 180px;
  height: 52px;
  margin-right: 24px;
  padding-left: 20px;
  border: none;
  border-radius: 10px;
  :focus {
    color: white;
    outline: none;
  }
`;
export const StarBox = styled.div`
  width: 200px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
export const CommentBoxWrapper = styled.div`
  width: 100%;
  margin-bottom: 46px;
`;
export const CommentBox = styled.textarea`
background-color: #E9E9E9;
padding: 40px;
  width: 100%;
  height: 231px;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  text-align: left;
  color: #A9A9A9;
  resize: none;
  border: none;
  margin-bottom: 17px;
  :focus {
    outline: none;
  }
`;
export const EnrollLine = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;
export const StrCount = styled.div`
  padding-left: 20px;
  height: 52px;
  padding-top: 14px;
`;
export const CancelBtn = styled.button`
  border: 1px solid #000000;
  position: relative;
  font-size: 20px;
  font-weight: 400;
  width: 195px;
  height: 77px;
  text-align: center;
  background-color: #ffffff;
  color: #000000;
  margin-right: 16px;
  :hover {
    cursor: pointer;
  }`
export const EnrollBtn = styled.button`
  border: none;
  position: relative;
  font-size: 20px;
  font-weight: 400;
  width: 195px;
  height: 77px;
  text-align: center;
  background-color: #000000;

  :hover {
    cursor: pointer;
  }
`;
