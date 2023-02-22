import styled from "@emotion/styled";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(async () => await import("react-quill"), {
    ssr: false,
  });

export const Wrapper = styled.form`
display: flex;
flex-direction: column;
align-items: center;
background-color: #FFFFFF;
`
export const TitleWrap = styled.div`
border-bottom: 3px solid #555555;
padding-top: 104px;
padding-bottom: 31px;
padding-left: 37px;
width: 90%;
`
export const Title = styled.div`
font-size: 40px;
font-weight: 700;
line-height: 40px;
letter-spacing: -0.05em;
text-align: left;
`
export const ItemWrap = styled.div`
padding-left: 37px;
padding-right: 20px;
height: 116px;
border-bottom: 1px solid #999999;
width: 90%;
display: flex;
align-items: center;
justify-content: space-between;
`
export const Name = styled.div`
font-size: 24px;
font-weight: 500;
line-height: 24px;
letter-spacing: -0.05em;
text-align: left;

`
export const LongInput = styled.input`
height: 56px;
width: 80%;
background-color: #E9E9E9;
border: none;
padding-left: 19px;
:focus{
    outline: none;
}
`
export const ContentWrap = styled.div`
padding-left: 37px;
padding-right: 20px;
height: 450px;
border-bottom: 1px solid #999999;
width: 90%;
display: flex;
padding-top:28px;
justify-content: space-between;
`
export const Content = styled.div`
padding-top: 10px;
font-size: 24px;
font-weight: 500;
line-height: 24px;
letter-spacing: -0.05em;
text-align: left;

`

export const CusReactQuill = styled(ReactQuill)`
width: 80%;
height: 350px;
`
export const MapWrapper = styled.div`
padding-top: 38px;
padding-left: 37px;
padding-right: 20px;
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 30px;
  border-bottom:1px solid #999999 ;
`;
export const MapContent = styled.div`
display:flex;
padding-top: 41px;
justify-content: space-between;
`
export const Map_Left = styled.div`
  width: 30%;
`;
export const Map_Right = styled.div`
    margin-top: 20px;
  width: 65%;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export const GPSWrapper = styled.div`
  display: flex;
`;
export const ZonInput = styled.input`
width:77px;
height: 52px;
border: 1px solid #BDBDBD;
color: #BDBDBD;
margin-right: 16px;
padding-left: 16px;

:focus{
    outline: none;
}
`
export const AdWrapper = styled.div`


  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export const MapBox = styled.div`
  height: 252px;
  width: 100%;
  background-color: aqua;
`;
export const Button = styled.button`
background-color: black;
color: white;
  width: 124px;
  height: 52px;
`;
export const AdressDetailInput = styled.input`
  background-color: #E9E9E9;
  color: #CCCCCC;
  width:100%;
  height: 56px;
  padding-left: 19px;
  border: none;
font-size: 18px;
font-weight: 400;
line-height: 18px;
letter-spacing: 0em;
text-align: left;
border:none;

  :focus {
    color: black;
    outline: none;
  }
`;
export const ImgWrapper = styled.div`
  width: 90%;
  padding-left: 37px;
  padding-top: 42px;
  display: flex;
  flex-direction: column;
  padding-bottom: 76px;
  border-bottom: 3px solid #555555; 
`;
export const mainWrapper = styled.div`
  width: 100%;
  margin-bottom: 50px;
`;
export const ButtonWrapper = styled.div`
  display: flex;
`;
export const ImgButton = styled.button`
  border-radius: 100px;
  margin-right: 30px;
  width: 130px;
  height: 130px;
  font-size: 30px;
`;
export const BtnWrap = styled.div`
width: 406px;
display: flex;
justify-content: space-between;
margin-top: 73px;
margin-bottom: 113px;
`
export const CancelBtn = styled.button`
width:195px;
height: 77px;
font-size: 20px;
font-weight: 700;
line-height: 20px;
letter-spacing: -0.05em;
text-align: center;
color: #000000;
background-color:#FFFFFF ;
cursor: pointer;
:focus{
    background-color:#FFFFFF ;
}

`
export const EnrollBtn = styled.button`
width:195px;
height: 77px;
font-size: 20px;
font-weight: 700;
line-height: 20px;
letter-spacing: -0.05em;
text-align: center;
background-color: #000000;
color: white;
cursor: pointer;
`
export const TagBox = styled.div`
  display: flex;
  width: 80%;
  align-items: center;
  flex-wrap: wrap;
  min-height: 52px;
  padding-left: 18px;
  border: none;
  background-color: #E9E9E9;

  &:focus-within {
    border: none;
  }
`;
export const TagItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5px;
  padding: 5px;
  background-color: #555555;
  border-radius: 5px;
  color: white;
  font-size: 13px;
  :hover {
    cursor: pointer;
  }
`;

export const TagInput = styled.input`
  display: inline-flex;
  min-width: 100%;
  background: transparent;
  border: none;
  outline: none;
  cursor: text;
  color: #c4c4c4;
  width: 100%;
  height: 52px;
  :focus {
    color: black;
    outline: none;
  }
`;
export const Text = styled.span``;
