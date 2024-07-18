"use client";
import Split from "@uiw/react-split";
import Xterm from "../components/xterm";
import MonacoEditor from "../components/monaco-editor";
import { ProgrammingLanguageOptions } from "../components/monaco-editor/types";
import FooterComponent from "../components/footer";
import { useState } from "react";

//const heigth = "50px";

export default function Home() {
  const [isExecuting, setIsExecuting] = useState(false);
  function handleOnChange(
    preSize: number,
    nextSize: number,
    paneNumber: number
  ) {
    console.log("preSize", preSize);
  }

  function handleOnExecute(code: string) {
    console.log("The code is being executed: ", code);
  }

  const handleKeyDown = (e: any) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "s") {
      e.preventDefault();
      //@ts-ignore
      onExecute(editorRef.current?.getValue());
    }
  };

  return (
    <div className="min-h-screen vs-dark-bg">
      <div className={`w-full flex h-[calc(100vh-50px)]`}>
        <div className="bg-zinc-900 min-w-20 dark-bg-sec">
          <div className="w-full grid grid-rows-12 h-full vs-dark-bg">
            <button className="bg-slate-400 text-center m-1">Add lang</button>
            <button className="bg-slate-400 text-center m-1">Drawing</button>
            <button className="bg-slate-400 text-center m-1">Drawing</button>
            <button className="bg-slate-400 text-center m-1">Drawing</button>
            <button className="bg-slate-400 text-center m-1">Drawing</button>
          </div>
        </div>
        <div className="w-full">
          <Split
            lineBar
            onDragEnd={handleOnChange}
            style={{
              height: "100%",
              width: "100%",
            }}
          >
            <div style={{ flex: 1 }} className="bg-vs-dark">
              <MonacoEditor
                isExecuting={isExecuting}
                onExecute={handleOnExecute}
                lang={ProgrammingLanguageOptions.JAVASCRIPT}
              />
            </div>
            <div style={{ width: "30%" }} className="bg-vs-dark">
              <Xterm />
            </div>
          </Split>
        </div>
      </div>
      <FooterComponent />
    </div>
  );
}
