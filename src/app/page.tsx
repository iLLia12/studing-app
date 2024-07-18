"use client";
import Split from "@uiw/react-split";
import Xterm from "../components/xterm";
import MonacoEditor from "../components/monaco-editor";
import { ProgrammingLanguageOptions } from "../components/monaco-editor/types";

const heigth = "50px";

export default function Home() {
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

  return (
    <div className="min-h-screen">
      <div className={`w-full flex h-[calc(100vh-${heigth})]`}>
        <div className="bg-white min-w-28">
          <button>Langs</button>
        </div>
        <div className="w-full">
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
              <MonacoEditor
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
      <div className={`fixed w-full h-[${heigth}]`}>
        <div className="w-full grid grid-cols-12 gap-2 h-full">
          <button className="bg-slate-400 text-center m-1 col-start-6 col-end-7">
            Add lang
          </button>
          <button className="bg-slate-400 text-center m-1 col-start-7 col-end-8">
            Drawing
          </button>
        </div>
      </div>
    </div>
  );
}
