"use client";

import Split from "@uiw/react-split";
import Editor from "@monaco-editor/react";
import { useRef } from "react";
import Xterm from "../components/xterm";

export default function Home() {
  const editorRef = useRef(null);

  function handleEditorDidMount(editor: any, monaco: any) {
    editorRef.current = editor;
  }

  function handleOnChange(
    preSize: number,
    nextSize: number,
    paneNumber: number
  ) {
    console.log("preSize", preSize);
  }

  const handleKeyDown = (e: any) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "s") {
      e.preventDefault();
      //@ts-ignore
      console.log("Execute...: ", editorRef.current?.getValue());
    }
  };

  return (
    <div className="w-full flex">
      <div className="bg-white">dsadsaas</div>
      <div className="w-full" onKeyDown={handleKeyDown}>
        <Split
          onDragEnd={handleOnChange}
          style={{
            height: "100%",
            width: "100%",
            border: "1px solid #d5d5d5",
            borderRadius: 3,
          }}
        >
          <div style={{ flex: 1 }} className="bg-black">
            <Editor
              height="90vh"
              theme="vs-dark"
              className="bg-black"
              defaultLanguage="php"
              defaultValue="// some comment"
              onMount={handleEditorDidMount}
            />
          </div>
          <div style={{ width: "30%" }} className="bg-vs-dark">
            <Xterm />
          </div>
        </Split>
      </div>
    </div>
  );
}
