import { useSelector } from "react-redux";
import styled from "styled-components";
import { getData } from "../../../common-lib/lib";
import { styles } from "../../../constants/styles";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-tomorrow.css";
const StyledEditContent = styled.div`
  margin-top: 30px;
  textarea {
    outline: none;
  }
`;
export const EditContent = ({ value = "", handler }) => {
  const props = useSelector((state) => state.props);
  return (
    <StyledEditContent>
      <Editor
        value={value}
        onValueChange={(code) => handler(code)}
        highlight={(code) => highlight(code, languages.js)}
        padding={12}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 16,
          color: getData(styles, [props.theme, "codeEdit", "editContentColor"]),
          background: getData(styles, [
            props.theme,
            "codeEdit",
            "editContentBg",
          ]),
          minHeight: "350px",
          borderRadius: "5px",
          boxShadow: "0 0 5px rgba(0,0,0,0.2)",
        }}
      />
    </StyledEditContent>
  );
};
