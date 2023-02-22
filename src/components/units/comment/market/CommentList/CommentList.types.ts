import { ChangeEvent, MouseEvent } from "react";
import { IQuery } from "../../../../../commons/types/generated/types";

export interface IBoardCommentsListUI {
  data?: Pick<IQuery, "fetchUseditemQuestions">;
  isEdit: boolean;
  onClickComment: (event: MouseEvent<HTMLImageElement>) => void;
  onLoadMore: () => void;
  onClickEdit: (event: MouseEvent<HTMLImageElement>) => void;
  el: any;
  setIsEdit: any;
  isOpenDeleteModal: boolean;
  onClickDelete: (event: MouseEvent<HTMLElement>) => void;
  onClickOpenDeleteModal: (event: MouseEvent<HTMLImageElement>) => void;
  onChangeDeletePassword: (event: ChangeEvent<HTMLInputElement>) => void;
  handleCancel: (event: MouseEvent<HTMLImageElement>) => void;
}
