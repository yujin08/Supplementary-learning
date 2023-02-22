import styled from "@emotion/styled"

export default function Footer() {
    return(
        <Wrapper>
            <Logo src="/logo.png" />
            <ContentsWrap>
                <Contents>
                    <Content>(주) 딩코</Content>
                    <Content>대표: 안우엽</Content>
                </Contents>
                <Contents>사업자등록번호 717-87-02373</Contents>
                <Contents>주소: 서울특별시 구로구 디지털로 300, 패스트파이브</Contents>
                <Contents>학원 등록 번호: 제 5845호</Contents>
                <Contents>
                    <Content>개인정보 처리방침</Content>
                    <Content>서비스 이용 약관</Content>
                </Contents>
                <Contents>Copyright © 2022. Dingco Corp., Ltd.</Contents>
            </ContentsWrap>
        </Wrapper>
    )
}

const Wrapper = styled.div`
background-color:  #F1F1F1;
width: 100%;
height: 317px;
display:flex;
flex-direction: column;
padding-left: 107px;
padding-top: 53px;
;
`
const Logo = styled.img`
    width: 169px;
    height: 52px;
    margin-bottom: 10px;
`
const ContentsWrap = styled.div`
padding-left: 15px;
display:flex;
flex-direction: column;
`
const Contents = styled.div`
width: 300px;
display: flex;
justify-content: space-between;
margin: 3px 0px;
`
const Content = styled.div`
padding-right: 50px;
`