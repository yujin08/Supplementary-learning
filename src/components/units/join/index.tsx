import { InnerWrap, OuterWrap } from "../../../commons/styles/Wrapper";
import * as S from "./styles";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./validation";
import { gql, useMutation } from "@apollo/client";
import {
  IMutation,
  IMutationCreateUserArgs,
} from "../../../commons/types/generated/types";
import Router from "next/router";
import { useRouter } from "next/router";
import { Modal } from "antd";

interface IFormData {
  name: string;
  password: string;
  email: string;
}

const CREATE_USER = gql`
  mutation createUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      _id
      email
      name
    }
  }
`;

export default function Join(){
    const [createUser] = useMutation<
    Pick<IMutation, "createUser">,
    IMutationCreateUserArgs
  >(CREATE_USER);

  const router = useRouter();

  const { register, handleSubmit, formState } = useForm<IFormData>({
    resolver: yupResolver(schema),
  });

  const onClickSubmit = async (data: IFormData) => {
    try {
      const result = await createUser({
        variables: {
          createUserInput: {
            name: data.name,
            email: data.email,
            password: data.password,
          },
        },
      });

      router.push("/login");
    } catch (error) {
      if (error instanceof Error) Modal.error({ content: error });
    }
  };
    return (
        <S.Wrap onSubmit={handleSubmit(onClickSubmit)}>
        <OuterWrap>
            <InnerWrap>
                <S.TopWrap>
                    <S.Title>JOIN MEMBER</S.Title>
                </S.TopWrap>
                <S.Line/>
                <S.BottomWrap>
                    <S.LabelWrap>
                        <S.Label>아이디</S.Label>
                        <S.Label>비밀번호</S.Label>
                        <S.Label>비밀번호 확인</S.Label>
                        <S.Label>이름</S.Label>
                    </S.LabelWrap>
                    <S.InputWrap>
                        <S.Input 
                        type="text" {...register("email")}
                        placeholder="이메일 아이디를 @까지 정확하게 입력하세요."/>
                         <div style={{ color: "red" }}>{formState.errors.email?.message}</div>
                        <S.Input 
                        type="password" {...register("password")}
                        placeholder="영문+숫자 조합 8~16자리를 입력해주세요."/>
                         <div style={{ color: "red" }}>{formState.errors.password?.message}</div>
                        <S.Input 
                        type="password" {...register("password")}
                        placeholder="영문+숫자 조합 8~16자리를 입력해주세요."/>
                        <div style={{ color: "red" }}>{formState.errors.password?.message}</div>
                        <S.Input 
                        type="text" {...register("name")}
                        placeholder="Ex) 홍길동"/>
                        <div style={{ color: "red" }}>{formState.errors.name?.message}</div>
                    </S.InputWrap>
                </S.BottomWrap>
                <S.Line/>
                <S.BtnWrap>
                    <S.Btn1>취소</S.Btn1>
                    <S.Btn2>확인</S.Btn2>
                </S.BtnWrap>
            </InnerWrap>
        </OuterWrap>
        </S.Wrap>
    )
}