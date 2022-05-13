import "quill/dist/quill.snow.css";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useQuill } from "react-quilljs";
import styled from "styled-components";
import { getData } from "../../common-lib/lib";
import { styles } from "../../constants/styles";
import { noop } from "lodash";
// listener
import { Mousedown } from "../../common-lib/hooks";
// api
import { fetchUpload } from "../Common/fetchData";

const StyledQuill = styled.div`
  position: relative;
  width: 100%;
  .ql-toolbar {
    background-color: ${({ theme }) =>
      getData(styles, [theme, "newsEdit", "toolBarBG"])};
  }
  .ql-editor {
    background-color: ${({ theme }) =>
      getData(styles, [theme, "newsEdit", "editorBG"])};
  }
  .quill-title {
    margin: 25px 0 20px 0;
    font-size: 18px;
  }
  .ql-editor {
    min-height: 300px;
  }
  .ql-snow .ql-tooltip {
    transform: translate(50%, -10px);
  }
  strong {
    font-weight: bold;
  }
  em {
    font-style: italic;
  }
  .ql-customize-formats {
    font-size: 13px;
    font-weight: bold;
    color: ${({ theme }) => getData(styles, [theme, "newsEdit", "color"])};
    cursor: pointer;
  }
`;
const StyledAddLinkLocalVideoBtn = styled.div`
  position: absolute;
  right: 10px;
  top: 0;
  border-radius: 5px;
  padding: 8px 12px;
  display: flex;
  align-items: center;
  font-size: 13px;
  border: 1px solid
    ${({ theme }) => getData(styles, [theme, "linkSelector", "border"])};
  background-color: ${({ theme }) =>
    getData(styles, [theme, "linkSelector", "backround"])};
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  input {
    padding: 5px;
    border: 1px solid
      ${({ theme }) => getData(styles, [theme, "linkSelector", "border"])};
    margin-right: 10px;
  }
  button {
    color: #06c;
    padding: 4px 6px;
    cursor: pointer;
  }
`;
const AddLinkLocalVideoBtn = ({ quill, setLinkVideoBtnStatus }) => {
  const props = useSelector((state) => state.props);
  const urlInputRef = useRef(null);
  Mousedown((e) => {
    const videoUrlEdit = document.getElementById("video-url-edit");
    if (videoUrlEdit && !videoUrlEdit.contains(e.target)) {
      setLinkVideoBtnStatus(false);
    }
  });
  return (
    <StyledAddLinkLocalVideoBtn id="video-url-edit" theme={props.theme}>
      <div>影片連結：</div>
      <input ref={urlInputRef} placeholder="請輸入網址" />
      <button
        onClick={() => {
          const createLink = `<p class="m3u8Video"><% ${urlInputRef.current.value} %></p>`;
          if (urlInputRef.current.value) {
            quill.root.innerHTML += createLink;
          }
          setLinkVideoBtnStatus(false);
        }}
      >
        確定
      </button>
    </StyledAddLinkLocalVideoBtn>
  );
};

export const Quill = ({ content = "", setContent = noop }) => {
  const props = useSelector((state) => state.props);
  const [LinkVideoBtnStatus, setLinkVideoBtnStatus] = useState(false);
  const { quill, quillRef } = useQuill({
    modules: {
      toolbar: [
        ["bold", "italic", "underline", "strike"],
        [{ align: [] }],
        [{ size: ["small", false, "large", "huge"] }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["link", "image", "video"],
        [{ color: [] }, { background: [] }],
        ["clean"],
      ],
    },
    placeholder: "請輸入報導內容",
    theme: "snow",
    formats: [
      "bold",
      "italic",
      "underline",
      "strike",
      "align",
      "list",
      "indent",
      "size",
      "header",
      "link",
      "image",
      "video",
      "color",
      "background",
      "clean",
    ],
  });
  const createLocalVideoButton = () => {
    const toolbar = document.querySelector(".ql-toolbar");
    const btn = document.createElement("span");
    btn.innerHTML = "站內影片(m3u8)";
    btn.classList.add("ql-customize-formats");
    btn.setAttribute("id", "customize-video");
    btn.addEventListener("click", () => setLinkVideoBtnStatus((prev) => !prev));
    toolbar.append(btn);
  };
  useEffect(() => {
    // Insert Image(selected by user) to quill
    const insertToEditor = (url, type) => {
      const range = quill.getSelection();
      quill.insertEmbed(range.index, type, url);
    };
    // Open Dialog to select Image/video File
    const selectLocalFile = (type = "image") => {
      const sendType = () => {
        switch (type) {
          case "video":
            return "video";
          default:
            return "news";
        }
      };
      const input = document.createElement("input");
      input.setAttribute("type", "file");
      input.setAttribute("accept", `${type}/*`);
      input.click();
      input.onchange = () => {
        const fileData = new FormData();
        fileData.append("file", input.files[0]);
        fileData.append("type", sendType());
        fetchUpload(fileData, (data = {}) => {
          insertToEditor(
            `${getData(data, ["url"])}${getData(data, ["file_name"])}`,
            type
          );
        });
      };
    };
    if (quill) {
      createLocalVideoButton();
      quill.clipboard.dangerouslyPasteHTML(content);
      quill
        .getModule("toolbar")
        .addHandler("image", () => selectLocalFile("image"));
      quill.on("text-change", (delta, oldDelta, source) => {
        setContent(quill.root.innerHTML);
      });
    }
  }, [content, quill, setContent]);
  useEffect(() => {
    if (!quill) {
      return;
    }
    if (props.confirm.status) {
      quill.disable();
    } else {
      quill.enable();
    }
  }, [quill, props]);
  return (
    <StyledQuill theme={props.theme}>
      <div className="quill-title">內容:</div>
      <div ref={quillRef} />
      {LinkVideoBtnStatus && (
        <AddLinkLocalVideoBtn
          quill={quill}
          setLinkVideoBtnStatus={setLinkVideoBtnStatus}
        />
      )}
    </StyledQuill>
  );
};
