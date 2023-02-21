import { InnerWrap, OuterWrap } from "../../../../commons/styles/Wrapper";
import * as S from "./styles";

export default function Footer(){
    return (
        <OuterWrap>
            <S.InnerWrap>
                <S.Title src="/logo.png"/>
                <S.Group>
                    <S.Text>(주) 딩코</S.Text>
                    <S.Text>대표: 안우엽</S.Text>
                </S.Group>
                <S.Text>사업자등록번호 717-87-02373</S.Text>
                <S.Text>주소: 서울특별시 구로구 디지털로 300, 패스트파이브</S.Text>
                <S.Text>학원 등록 번호: 제 5845호</S.Text>
                <S.Group>
                    <S.Text>개인정보 처리방침</S.Text>
                    <S.Text>서비스 이용 약관</S.Text>
                </S.Group>
                <S.Text>Copyright © 2022. Dingco Corp., Ltd.</S.Text>
            </S.InnerWrap>
        </OuterWrap>
    )
}

