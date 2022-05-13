import { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
// reducers
import { setLangList } from "../../reducer/props";
// api
// import { fetchLangList } from "../Common/fetchData";
import { langData } from "../../demoData";
// component
import { Aside } from "./Aside";
import { Header } from "./Header";
import { Alert } from "./Alert";
import { Confirm } from "./Confirm";

const StyledLayout = styled.main`
  padding: 95px 15px 15px 265px;
  min-width: 800px;
`;
export const Layout = ({ children, pathname }) => {
  const props = useSelector((state) => state.props);
  const dispatch = useDispatch();
  useEffect(() => {
    // fetchLangList((e) => dispatch(setLangList(e || [])));
    const timeout = setTimeout(() => {
      dispatch(setLangList(langData));
      return () => clearTimeout(timeout);
    }, 100);
  }, [dispatch]);
  return (
    <>
      <Header />
      <StyledLayout>{children}</StyledLayout>
      <Aside pathname={pathname} />
      {props.alert.status && <Alert />}
      {props.confirm.status && <Confirm />}
    </>
  );
};
