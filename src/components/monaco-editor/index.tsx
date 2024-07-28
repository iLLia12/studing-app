import Editor from "@monaco-editor/react";
import { useEffect, useRef } from "react";
import { editor } from "monaco-editor";
import type { ProgrammingLanguageOptions } from "./types";
import Image from "next/image";
import PlayIcon from "../../components/svg/play/icon-2.svg";

export default function MonacoEditor({
  lang,
  onExecute,
  isExecuting = false,
}: {
  lang: ProgrammingLanguageOptions;
  onExecute: (code: string) => void;
  isExecuting: boolean;
}) {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  function handleEditorDidMount(
    editor: editor.IStandaloneCodeEditor,
    monaco: any
  ) {
    console.log("editor: ", editor);
    editor.focus();
    editorRef.current = editor;
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "s") {
      e.preventDefault();
      //@ts-ignore
      onExecute(editorRef.current?.getValue());
    }
  };

  function executeBtnText() {
    return isExecuting ? (
      "Executing..."
    ) : (
      <Image priority src={PlayIcon} height={30} width={30} alt="Run" />
    );
  }

  useEffect(() => {
    editorRef.current?.focus();
  }, [editorRef.current]);

  return (
    <div className="h-screen" onKeyDown={handleKeyDown}>
      <div className="w-full flex justify-between h-12 dark-bg text-white px-8">
        <div className="text-neutral-300 text-xs py-4">
          Running node.js v20.0.0
        </div>
        <button className="bg-green-400 text-center m-1 col-start-12 px-6 rounded-sm">
          {executeBtnText()}
        </button>
      </div>
      <Editor
        className="border-0"
        theme="vs-dark"
        defaultLanguage={lang}
        defaultValue="// some comment"
        onMount={handleEditorDidMount}
      />
    </div>
  );
}
