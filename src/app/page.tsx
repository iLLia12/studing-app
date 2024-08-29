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
import { WriteToTerminalHandler } from "../components/xterm/";

const langToIconMap = {
  [ProgrammingLanguageOptions.GO]: GolangIcon,
  [ProgrammingLanguageOptions.PYTHON]: PythonIcon,
  [ProgrammingLanguageOptions.JAVASCRIPT]: JavaScriptIcon,
  [ProgrammingLanguageOptions.JAVA]: JavaIcon,
};

export default function Home() {
  const [isExecuting, setIsExecuting] = useState(false);
  const xtermRef = useRef<WriteToTerminalHandler | null>(null);
  const [lang, setLang] = useState(ProgrammingLanguageOptions.GO);

  async function handleOnExecute(code: string) {
    setIsExecuting(true);
    try {
      const res = await fetch("http://localhost:8080/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          lang: lang,
        }),
      });
      const { output } = await res.json();
      xtermRef.current?.push(output);
    } catch (e) {
      console.log(e);
    }
    setIsExecuting(false);
  }

  function activeBtn(l: ProgrammingLanguageOptions) {
    if (l == lang) {
      return "shadow-stone-600 shadow-inner";
    }
    return "";
  }

  return (
    <div className="min-h-screen vs-dark-bg">
      <div className={`w-full flex h-[calc(100vh-50px)]`}>
        <div className="min-w-20 dark-bg-sec">
          <div className="w-full grid grid-rows-12 h-full vs-dark-bg pt-1">
            {Object.values(ProgrammingLanguageOptions).map(
              (lang: ProgrammingLanguageOptions) => (
                <button
                  key={lang}
                  className={
                    `dark-bg-normal text-center rounded m-1 flex justify-center items-center transition ease-in-out duration-200 ` +
                    activeBtn(lang)
                  }
                >
                  <Image
                    priority
                    src={langToIconMap[lang]}
                    height={23}
                    width={23}
                    alt={lang}
                  />
                </button>
              )
            )}
            {/* <button className="dark-bg-normal text-center rounded m-1 flex justify-center items-center transition ease-in-out duration-200 shadow-stone-700 shadow-inner">
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
            </button> */}
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
                lang={lang}
              />
            </div>
            <div>
              <Xterm ref={xtermRef} lang={lang} />
            </div>
          </Split>
        </div>
      </div>
      <FooterComponent />
    </div>
  );
}
