import styled from "@emotion/styled";

export const Back = styled.div`
  width: 87%;
`;

export const Wrapper = styled.div`
  padding-left: 10%;
  width: 100%;
  display: flex;
`;

export const contentsWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-top:1px dashed #c0c0c0;
  padding-top: 20px;
`;
export const Contents = styled.textarea`
  height: 152px;
  background-color: #E9E9E9;
  border: none;
  resize: none;
  padding: 20px;
  :focus {
    outline: none;
  }
`;

export const Count = styled.div``;

export const Submit = styled.button`
width: 195px;
height: 77px;
background-color: #000000;
color: white;
cursor: pointer;
`;
export const Cancel = styled.button`
width: 195px;
height: 77px;
background-color: #FFFFFF;
color: black;
margin-right: 16px;
cursor: pointer;
`;
export const BtnWrap = styled.div`
font-size: 20px;
font-weight: 700;
line-height: 20px;
letter-spacing: -0.05em;
text-align: center;
display:flex;
justify-content: flex-end;
padding-top: 20px;
margin-bottom: 20px;
`