"use client";
import Split from "@uiw/react-split";
import Xterm from "../components/xterm";
import MonacoEditor from "../components/monaco-editor";
import { ProgrammingLanguageOptions } from "../components/monaco-editor/types";

export default function Home() {
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
    <div>
      <div className="w-full flex">
        <div className="bg-white min-w-28">
          <button>Langs</button>
        </div>
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
              <MonacoEditor lang={ProgrammingLanguageOptions.JAVASCRIPT} />
            </div>
            <div style={{ width: "30%" }} className="bg-vs-dark">
              <Xterm />
            </div>
          </Split>
        </div>
      </div>
      <div className="bg-slate-400">FOOTER</div>
    </div>
  );
}
