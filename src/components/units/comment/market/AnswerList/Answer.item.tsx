import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { IQuery } from "../../../../../commons/types/generated/types";
import { FETCH_USER_LOGGED_IN } from "../../../../commons/layout/header";
import CommentAnswerWriter from "../AnswerWriter";
import * as S from "./index.style";
import {getDate} from "../../../../../commons/libraries/utils"

export default function AnswerItemUI(props) {
  const [isEdit, setIsEdit] = useState(false);
  const [loginUser, setLoginUser] = useState(false)


  const { data } = useQuery<Pick<IQuery, "fetchUserLoggedIn">>(FETCH_USER_LOGGED_IN);

  useEffect(() => {
    console.log(loginUser)
    if(data?.fetchUserLoggedIn._id === props.el.user._id) {
      setLoginUser(true)
    }
  },[data])

  const onClickEdit = () => {
    setIsEdit(true);
  };
  return (
    <S.InnerWrapper key={props.el._id}>
      {!isEdit && (
        <S.AnswerWrap key={props.el._id}>
          <S.MainWrap>
            <S.TitleWrap>
              <S.Title>답변</S.Title>
              {loginUser ?        
              <S.IconWrapper>
                    <S.IconEdit
                      src="/edit.png"
                      id={props.el._id}
                      onClick={onClickEdit}
                    />
                    <S.IconDelete
                      id={props.el._id}
                      onClick={props.onClickDel}
                      src="/delete.png"
                    />
                  </S.IconWrapper>
                  :<></>
                  }
            </S.TitleWrap>
            <S.Date>{getDate(props.el.createdAt)}</S.Date>
            <S.Contents>{props.el.contents}</S.Contents>
          </S.MainWrap>
        </S.AnswerWrap>
      )}
      {isEdit && (
        <CommentAnswerWriter
          isEdit={true}
          setIsEdit={setIsEdit}
          el={props.el}
        />
      )}
    </S.InnerWrapper>
  );
}
