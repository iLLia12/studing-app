"use client";
import { useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import { Terminal } from "@xterm/xterm";
import "../../../node_modules/@xterm/xterm/css/xterm.css";
import "./xterm.css";

type Props = {};

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
      theme: {
        background: "#1e1e1e",
      },
    });
    const term = document.getElementById("terminal");
    if (term) {
      terminal.current.open(term);
      terminal.current.write("Golang v1.2");
      terminal.current.write("\r\n");
      terminal.current.write("\n\x1b[32m>>>\x1b[0m ");
      return () => {
        terminal.current?.dispose();
      };
    }
  }, []);

  useImperativeHandle(ref, () => {
    return {
      push(str: string) {
        terminal.current?.write(str);
      },
    };
  });

  return (
    <div
      id="terminal"
      {...props}
      className="xterm"
      style={{ padding: "20px" }}
    ></div>
  );
});

export default XTerminal;
