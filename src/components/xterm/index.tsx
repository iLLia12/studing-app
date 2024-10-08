"use client";
import { useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import { Terminal } from "@xterm/xterm";
import "../../../node_modules/@xterm/xterm/css/xterm.css";
import "./xterm.css";
import { ProgrammingLanguageOptions } from "../../components/monaco-editor/types";

type Props = {
  lang: ProgrammingLanguageOptions;
};

export type WriteToTerminalHandler = {
  push: (str: string) => void;
};

const XTerminal = forwardRef<WriteToTerminalHandler, Props>(function Xterminal(
  props,
  ref
) {
  const terminal = useRef<Terminal | null>(null);
  useEffect(() => {
    terminal.current = new Terminal({
      fontFamily: "monospace",
      fontSize: 12,
      lineHeight: 1.2,
      rows: 34, // <--- scroll issue
      theme: {
        background: "#1e1e1e",
      },
    });
    const term = document.getElementById("terminal");
    if (term) {
      terminal.current.open(term);
      terminal.current.write(props.lang);
      terminal.current.write("\r\n");
      terminal.current?.write("\n\x1b[32m>>>\x1b[0m ");
      return () => {
        terminal.current?.dispose();
      };
    }
  }, []);

  useImperativeHandle(ref, () => {
    return {
      push(str: string) {
        terminal.current?.write(str);
        terminal.current?.write("\n\x1b[32m>>>\x1b[0m ");
      },
    };
  });

  return <div id="terminal" {...props} className="xterm"></div>;
});

export default XTerminal;
