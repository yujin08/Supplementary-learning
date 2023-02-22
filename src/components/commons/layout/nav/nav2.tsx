import styled from "@emotion/styled"
import { useRouter } from "next/router"

export default function Nav2() {
    const router = useRouter()
    const isHidden = router.asPath.includes("login")
    const onClickBrand = () => {
        router.push(`/market`)
    }
    
    return(
        <Wrapper>
            <Logo src="/white-logo.png" />
            <MenuWrap>
                <Menu onClick={onClickBrand} >BRAND</Menu>
                <Menu>CATEGORY</Menu>
                <Menu>LIFE</Menu>
                <Menu>BEAUTY </Menu>
                <Bar>|</Bar>
                <Menu>#STYLE</Menu>
                <Menu>EVENT</Menu>
                <Menu>BEST</Menu>
            </MenuWrap>
            <BasketMenuWrap>
                <BasketMenu>
                {isHidden ?  "회원가입" : "로그인"}
                </BasketMenu>
                <BasketMenu>
                    장바구니
                    <Num>0</Num>
                </BasketMenu>
            </BasketMenuWrap>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 100%;
    height: 100px;
    background-color: #000000;
    color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 42px;
`
const Logo = styled.img`
    width:181px;
    height: 49px;
    cursor: pointer;
`
const MenuWrap = styled.div`
padding-right: 100px;
display: flex;
font-size: 22px;
font-weight: 700;
width: 65%;
justify-content: space-between;
align-items: center;
`
const Menu = styled.div`
cursor: pointer;
`
const Bar = styled.div`
`
const BasketMenuWrap = styled.div`
    display:flex;
    width: 10%;
    justify-content: space-between;
    align-items: center;
    `
const BasketMenu = styled.div`
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