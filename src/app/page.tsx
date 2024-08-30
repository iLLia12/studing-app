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
  [ProgrammingLanguageOptions.GO]: {
    icon: GolangIcon,
    size: {
      height: 35,
      width: 35,
    },
  },
  [ProgrammingLanguageOptions.PYTHON]: {
    icon: PythonIcon,
    size: {
      height: 30,
      width: 30,
    },
  },
  [ProgrammingLanguageOptions.JAVASCRIPT]: {
    icon: JavaScriptIcon,
    size: {
      height: 23,
      width: 23,
    },
  },
  [ProgrammingLanguageOptions.JAVA]: {
    icon: JavaIcon,
    size: {
      height: 30,
      width: 30,
    },
  },
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
      return "dark-bg-normal";
    }
    return "";
  }

  return (
    <div className="min-h-screen">
      <div className={`w-full flex h-[calc(100vh-50px)]`}>
        <div className="min-w-20">
          <div className="w-full h-full dark-bg-sec">
            {Object.values(ProgrammingLanguageOptions).map(
              (lang: ProgrammingLanguageOptions) => (
                <button
                  key={lang}
                  className={
                    `dark-bg-sec border-b border-neutral-700 w-full min-h-16 text-center flex justify-center items-center transition ease-in-out duration-200 ` +
                    activeBtn(lang)
                  }
                >
                  <Image
                    priority
                    src={langToIconMap[lang].icon}
                    height={langToIconMap[lang].size.height}
                    width={langToIconMap[lang].size.width}
                    alt={lang}
                  />
                </button>
              )
            )}
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
