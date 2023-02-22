import { InnerWrap, OuterWrap } from "../../../commons/styles/Wrapper";
import * as S from "./styles";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { gql, useMutation } from "@apollo/client";
import {
  IMutation,
  IMutationLoginUserArgs,
} from "../../../commons/types/generated/types";
import { useRecoilState } from "recoil";
import { accessTokenState } from "../../../commons/stores";
import { useRouter } from "next/router";
import { Modal } from "antd";
import { schema } from "./validation";

interface IFormData {
    email: string;
    password: string;
  }
  
  const LOGIN_USER = gql`
    mutation loginUser($email: String!, $password: String!) {
      loginUser(email: $email, password: $password) {
        accessToken
      }
    }
  `;

export default function Login(){
    const [loginUser] = useMutation<
    Pick<IMutation, "loginUser">,
    IMutationLoginUserArgs
  >(LOGIN_USER);
  const [, setAccessToken] = useRecoilState(accessTokenState);
  const router = useRouter();

  const { register, handleSubmit, formState } = useForm<IFormData>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onClickSubmit = async (data: IFormData) => {
    console.log(data);
    try {
      const result = await loginUser({
        variables: { email: data.email, password: data.password },
      });
      const accessToken = result.data?.loginUser.accessToken;

      if (accessToken === undefined) {
        Modal.error({ content: "로그인에 실패했습니다!" });
        return;
      }
      setAccessToken(accessToken);
      localStorage.setItem("accessToken", accessToken); 

      void router.push("/market");
    } catch (error) {
      if (error instanceof Error) Modal.error({ content: error.message });
    }
  };

    return (
        <OuterWrap>
            <InnerWrap>
            <form onSubmit={handleSubmit(onClickSubmit)}>
                <S.TopWrap>
                    <S.Title>LOGIN</S.Title>
                </S.TopWrap>
                <S.Line/>
                <S.BottomWrap>
                    <S.LabelWrap>
                        <S.Label>아이디</S.Label>
                        <S.Label>비밀번호</S.Label>
                    </S.LabelWrap>
                    <S.InputWrap>
                        <S.Input 
                        type="text"
                        {...register("email")}
                        placeholder="이메일 아이디를 @까지 정확하게 입력하세요."/>
                        <div style={{ color: "red" }}>{formState.errors.email?.message}</div>
                        <S.Input 
                        type="password"
                        {...register("password")}
                        placeholder="영문+숫자 조합 8~16자리를 입력해주세요."/>
                        <div style={{ color: "red" }}>{formState.errors.password?.message}</div>
                    </S.InputWrap>
                    <S.BtnWrap>
                        <S.Btn>로그인</S.Btn>
                    </S.BtnWrap>
                </S.BottomWrap>
                </form>
            </InnerWrap>
        </OuterWrap>
    )
}