import { useState } from "react";
import { useMutation } from "@apollo/client";
import {
  IMutation,
  IMutationCreateUseditemQuestionArgs,
  IMutationUpdateUseditemQuestionArgs,
} from "../../../../../commons/types/generated/types";
import { ChangeEvent } from "react";
import { useRouter } from "next/router";
import {
  CREATE_USED_ITEM_QUESTION,
  FETCH_USED_ITEM_QUESTIONS,
  UPDATE_USED_ITEM_QUESTION,
} from "./CommentWrite.queries";
import * as S from "./CommentWrite.style";

export default function MarketComment(props: IBoardCommentWriterProps) {
  const router = useRouter();
  const [isEdit, setIsEdit] = useState(false);
  const [contents, setContents] = useState("");
  const [createUseditemQuestion] = useMutation<
    Pick<IMutation, "createUseditemQuestion">,
    IMutationCreateUseditemQuestionArgs
  >(CREATE_USED_ITEM_QUESTION);

  const [updateUseditemQuestion] = useMutation<
    Pick<IMutation, "updateUseditemQuestion">,
    IMutationUpdateUseditemQuestionArgs
  >(UPDATE_USED_ITEM_QUESTION);

  const OnCmtContents = (event: ChangeEvent<HTMLInputElement>) => {
    setContents(event.target.value);
  };

  const onClickWrite = async () => {
    if (contents) {
      const result = await createUseditemQuestion({
        variables: {
          useditemId: String(router.query.useditemId),
          createUseditemQuestionInput: {
            contents,
          },
        },
        refetchQueries: [
          {
            query: FETCH_USED_ITEM_QUESTIONS,
            variables: { useditemId: router.query.useditemId },
          },
        ],
      });
      setContents("");
      console.log(result)
    } else if (!contents) {
      alert("내용을 입력해주세요.");
    }
  };

  const onClickCancel = () => {
    props.setIsEdit(false)
  }

  const onClickUpdate = async () => {
    if (!contents) {
      alert("내용이 수정되지 않았습니다.");
      return;
    }
    try {
      const updateBoardCommentInput: IUpdateUseditemQuestionInput = {};
      if (contents) updateBoardCommentInput.contents = contents;

      await updateUseditemQuestion({
        variables: {
          updateUseditemQuestionInput: { contents },
          useditemQuestionId: props.el?._id,
        },
        refetchQueries: [
          {
            query: FETCH_USED_ITEM_QUESTIONS,
            variables: { useditemQuestionId: router.query.useditemQuestionId },
          },
        ],
      });
      props.setIsEdit?.(false);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
        props.setIsEdit?.(false);
      }
    }
  };
  return (
    <>
      <S.Back>
        <S.CommentWrite>
          <S.CommentBoxWrapper
           style={{paddingRight: props.isEdit ? "27px": "",
                  paddingTop: props.isEdit ? "18px": "",
                  paddingLeft: props.isEdit ? "13px": "",
                  borderTop: props.isEdit ? "1px solid #C0C0C0": ""}}
          >
            <S.CommentBox
              style={{height: props.isEdit ? "76px" : "",
                      padding: props.isEdit ? "26px" : "",
              }}
              placeholder="내용을 입력해 주세요."
              onChange={OnCmtContents}
              value={contents || (props.el?.contents ?? "")}
            />
            <S.EnrollLine>
              {props.isEdit ? 
              <S.CancelBtn
              onClick={onClickCancel}
              >
                취소하기
              </S.CancelBtn>
              : <></>}
              <S.EnrollBtn
                onClick={props.isEdit ? onClickUpdate : onClickWrite}
              >
                {props.isEdit ? "수정하기" : "작성하기"}
              </S.EnrollBtn>
            </S.EnrollLine>
          </S.CommentBoxWrapper>
        </S.CommentWrite>
      </S.Back>
    </>
  );
}
