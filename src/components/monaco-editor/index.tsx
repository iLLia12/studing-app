import Editor from "@monaco-editor/react";
import { useRef } from "react";
import type { ProgrammingLanguageOptions } from "./types";

export default function MonacoEditor({
  lang,
  onExecute,
}: {
  lang: ProgrammingLanguageOptions;
  onExecute: (code: string) => void;
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

  return (
    <Editor
      height="100%"
      theme="vs-dark"
      defaultLanguage={lang}
      defaultValue="// some comment"
      onMount={handleEditorDidMount}
    />
  );
}
