"use client";
import Split from "@uiw/react-split";
import Xterm from "../components/xterm";
import MonacoEditor from "../components/monaco-editor";
import { ProgrammingLanguageOptions } from "../components/monaco-editor/types";
import FooterComponent from "../components/footer";
import GolangIcon from "../components/svg/golang/icon-2.svg";
import PythonIcon from "../components/svg/python/icon-3.svg";
import JavaScriptIcon from "../components/svg/js/icon-1.svg";
import JavaIcon from "../components/svg/java/icon-1.svg";
import { useRef, useState } from "react";
import Image from "next/image";

export default function Home() {
  const [isExecuting, setIsExecuting] = useState(false);
  const xtermRef = useRef<null | HTMLDivElement>(null);

  async function handleOnExecute(code: string) {
    setIsExecuting(true);
    await fetch("http://localhost:8080/execute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code,
        lang: "go",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data: ", data);
        //@ts-ignore
        xtermRef.current?.push(`$ ${data}`);
        //@ts-ignore
        xtermRef.current?.push("\r\n");
      })
      .catch((e) => {
        console.log("Error: ", e.message);
      });
    setIsExecuting(false);
  }

  return (
    <div className="min-h-screen vs-dark-bg">
      <div className={`w-full flex h-[calc(100vh-50px)]`}>
        <div className="min-w-20 dark-bg-sec">
          <div className="w-full grid grid-rows-12 h-full vs-dark-bg pt-1">
            <button className="dark-bg-normal text-center rounded m-1 flex justify-center items-center transition ease-in-out duration-200 shadow-stone-700 shadow-inner">
              <Image
                priority
                src={GolangIcon}
                height={33}
                width={33}
                alt="Golang"
              />
            </button>
            <button className="dark-bg-normal text-center rounded m-1 flex justify-center items-center transition ease-in-out duration-200 shadow-stone-700 shadow-inner">
              <Image
                priority
                src={PythonIcon}
                height={30}
                width={30}
                alt="Python"
              />
            </button>
            <button className="dark-bg-normal text-center m-1 rounded flex justify-center items-center transition ease-in-out duration-200 shadow-stone-700 shadow-inner">
              <Image
                priority
                src={JavaScriptIcon}
                height={27}
                width={27}
                alt="Javascript"
              />
            </button>
            <button className="dark-bg-normal text-center m-1 rounded flex justify-center items-center transition ease-in-out duration-200 shadow-stone-700 shadow-inner">
              <Image
                priority
                src={JavaIcon}
                height={30}
                width={30}
                alt="Java"
              />
            </button>
          </div>
        </div>
        <div className="w-full">
          <Split
            lineBar
            style={{
              height: "100%",
              width: "100%",
            }}
          >
            <div style={{ flex: 10 }}>
              <MonacoEditor
                isExecuting={isExecuting}
                onExecute={handleOnExecute}
                lang={ProgrammingLanguageOptions.GO}
              />
            </div>
            <div style={{ flex: 1 }}>
              <Xterm ref={xtermRef} />
            </div>
          </Split>
        </div>
      </div>
      <FooterComponent />
    </div>
  );
}
