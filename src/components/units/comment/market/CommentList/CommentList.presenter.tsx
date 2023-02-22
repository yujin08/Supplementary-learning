import InfiniteScroll from "react-infinite-scroller";
import CommentListItemUI from "./CommentList.presenterItem";
import { IBoardCommentsListUI } from "./CommentList.types";
import * as S from './CommentList.style'

export default function BoardCommentsListUI(props: IBoardCommentsListUI) {
  console.log(props.data);
  if (!props.data) return <div />;
  return (
    <S.OutWrap>
      <InfiniteScroll pageStart={0} loadMore={props.onLoadMore} hasMore={true}>
        {props.data.fetchUseditemQuestions.map((el) => (
          <CommentListItemUI
            key={el._id}
            el={el}
            onClickDelete={props.onClickDelete}
          />
        ))}
      </InfiniteScroll>
      <S.EndLine></S.EndLine>
    </S.OutWrap>
  );
}
