import { InnerWrap, OuterWrap } from "../../../commons/styles/Wrapper";
import * as S from "./styles";

export default function Join(){
    return (
        <OuterWrap>
            <InnerWrap>
                <S.TopWrap>
                    <S.Title>JOIN MEMBER</S.Title>
                </S.TopWrap>
                <S.Line/>
                <S.BottomWrap>
                    <S.LabelWrap>
                        <S.Label>아이디</S.Label>
                        <S.Label>비밀번호</S.Label>
                        <S.Label>비밀번호 확인</S.Label>
                        <S.Label>이름</S.Label>
                    </S.LabelWrap>
                    <S.InputWrap>
                        <S.Input placeholder="이메일 아이디를 @까지 정확하게 입력하세요."/>
                        <S.Input placeholder="영문+숫자 조합 8~16자리를 입력해주세요."/>
                        <S.Input placeholder="영문+숫자 조합 8~16자리를 입력해주세요."/>
                        <S.Input placeholder="Ex) 홍길동"/>
                    </S.InputWrap>
                </S.BottomWrap>
                <S.Line/>
                <S.BtnWrap>
                    <S.Btn1>취소</S.Btn1>
                    <S.Btn2>확인</S.Btn2>
                </S.BtnWrap>
            </InnerWrap>
        </OuterWrap>
    )
}