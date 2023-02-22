import * as yup from "yup";

export const schema = yup.object({
  name: yup.string().required("제품 이름은 필수 입력입니다."),
  price: yup.number().required("가격은 필수 입력입니다."),
  contents: yup.string().required("내용은 필수 입력입니다.")
});
