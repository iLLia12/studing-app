import Editor from "@monaco-editor/react";
import { useRef, useState } from "react";
import type { ProgrammingLanguageOptions } from "./types";

export default function MonacoEditor({
  lang,
  onExecute,
  isExecuting = false,
}: {
  lang: ProgrammingLanguageOptions;
  onExecute: (code: string) => void;
  isExecuting: boolean;
}) {
  const editorRef = useRef(null);
  function handleEditorDidMount(editor: any, monaco: any) {
    editorRef.current = editor;
  }

  const handleKeyDown = (e: any) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "s") {
      e.preventDefault();
      //@ts-ignore
      onExecute(editorRef.current?.getValue());
    }
  };

  function executeBtnText() {
    return isExecuting ? "Executing..." : "Run";
  }

  return (
    <>
      <div className="w-full flex justify-between h-12 dark-bg">
        <div className="text-white">lang info</div>
        <button className="bg-slate-400 text-center m-1 col-start-12 px-6">
          {executeBtnText()}
        </button>
      </div>
      <Editor
        height="100%"
        className="border-0"
        theme="vs-dark"
        defaultLanguage={lang}
        defaultValue="// some comment"
        onMount={handleEditorDidMount}
      />
    </>
  );
}
