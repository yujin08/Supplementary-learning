import * as S from "./styles";
import { InnerWrap, OuterWrap } from "../../../commons/styles/Wrapper";
import List from "../../commons/list";

export default function Main(){
    return (
        <OuterWrap>
            <InnerWrap>
                <S.TopWrap>
                    <S.TopContents></S.TopContents>
                </S.TopWrap>
                <S.BottomWrap>
                    <S.Title>New Arrival</S.Title>
                    <List/>
                </S.BottomWrap>
            </InnerWrap>
        </OuterWrap>
    )
}