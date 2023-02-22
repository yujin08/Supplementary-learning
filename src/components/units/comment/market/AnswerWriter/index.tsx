import { useMutation } from "@apollo/client";
import { result } from "lodash";
import { ChangeEvent, useState } from "react";
import {
  IMutation,
  IMutationCreateUseditemQuestionAnswerArgs,
  IMutationUpdateUseditemQuestionAnswerArgs,
} from "../../../../../commons/types/generated/types";
import { FETCH_USED_ITEM_QUESTION_ANSWERS } from "../AnswerList/index.query";
import {
  CREATE_USED_ITEM_QUESTION_ANSWER,
  UPDATE_USED_ITEM_QUESTION_ANSWER,
} from "./index.query";
import * as S from "./index.style";

export default function CommentAnswerWriter(props) {
  const [isActive, setIsActive] = useState(true);
  const [contents, setContents] = useState("");
  const [createUseditemQuestionAnswer] = useMutation<
    Pick<IMutation, "createUseditemQuestionAnswer">,
    IMutationCreateUseditemQuestionAnswerArgs
  >(CREATE_USED_ITEM_QUESTION_ANSWER);

  const [updateUseditemQuestionAnswer] = useMutation<
    Pick<IMutation, "updateUseditemQuestionAnswer">,
    IMutationUpdateUseditemQuestionAnswerArgs
  >(UPDATE_USED_ITEM_QUESTION_ANSWER);

  const onChangeAnswer = (event: ChangeEvent<HTMLInputElement>) => {
    setContents(event.target.value);
  };
  const onClickCancel = () => {
    props.setIsActive(false)
  }

  const onClickWrite = async () => {
    if (contents) {
      const result = await createUseditemQuestionAnswer({
        variables: {
          useditemQuestionId: String(props.el._id),
          createUseditemQuestionAnswerInput: {
            contents,
          },
        },
        refetchQueries: [
          {
            query: FETCH_USED_ITEM_QUESTION_ANSWERS,
            variables: { useditemQuestionId: String(props.el._id) },
          },
        ],
      });
      setContents("");
      setIsActive((prev) => !prev);
    } else if (!contents) {
      alert("내용을 입력해주세요.");
    }
  };
  const onClickUpdate = async (event) => {
    if (!contents) {
      alert("내용이 수정되지 않았습니다.");
      return;
    }
    try {
      const updateUseditemQuestionAnswerInput: IUpdateUseditemQuestionAnswerInput =
        {};
      if (contents) updateUseditemQuestionAnswerInput.contents = contents;

      await updateUseditemQuestionAnswer({
        variables: {
          updateUseditemQuestionAnswerInput: { contents },
          useditemQuestionAnswerId: String(props.el._id),
        },
        refetchQueries: [
          {
            query: FETCH_USED_ITEM_QUESTION_ANSWERS,
            variables: { useditemQuestionId: String(props.el._id) },
          },
        ],
      });
      props.setIsEdit?.(false);
      setContents("");
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
        props.setIsEdit?.(false);
      }
    }
  };

  

  return isActive ? (
    <S.Back>
      <S.Wrapper>
        <S.contentsWrap>
          <S.Contents
            onChange={onChangeAnswer}
            placeholder="답글을 작성하세요."
            value={contents}
          ></S.Contents>
          <S.BtnWrap>
            <S.Cancel onClick={onClickCancel}>
              취소하기
            </S.Cancel>
            <S.Submit onClick={props.isEdit ? onClickUpdate : onClickWrite}>
            {props.isEdit ? "수정하기" : "작성하기"}
            </S.Submit>
          </S.BtnWrap>
        </S.contentsWrap>
      </S.Wrapper>
    </S.Back>
  ) : (
    ""
  );
}
