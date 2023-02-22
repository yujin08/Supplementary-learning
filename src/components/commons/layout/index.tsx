import { useRouter } from "next/router";
import styled from "@emotion/styled";
import Header from "./header";
import Nav from "./nav";
import Nav2 from "./nav/nav2";
import Footer from "./footer";


const BodyWrapper = styled.div`
display:flex;
flex-direction: column;
justify-content: space-between;
`

interface ILayoutProps {
  children: JSX.Element;
}

export default function Layout(props: ILayoutProps) {
  const router = useRouter();
  const isHidden =
    router.asPath.includes("login") ||
    router.asPath.includes("join") 

  return (
    <>
  {!isHidden && <Header/>}
   {!isHidden && <Nav />}
    {isHidden && <Nav2/>}
      <BodyWrapper>
        <div>{props.children}</div>
        <Footer />
      </BodyWrapper>
    
    </>
  );
}
