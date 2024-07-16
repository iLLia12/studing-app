import Editor from "@monaco-editor/react";
import { useRef } from "react";
import type { ProgrammingLanguageOptions } from "./types";

export default function MonacoEditor({
  lang,
}: {
  lang: ProgrammingLanguageOptions;
}) {
  const editorRef = useRef(null);
  function handleEditorDidMount(editor: any, monaco: any) {
    editorRef.current = editor;
  }

  return (
    <Editor
      height="90vh"
      theme="vs-dark"
      defaultLanguage={lang}
      defaultValue="// some comment"
      onMount={handleEditorDidMount}
    />
  );
}
