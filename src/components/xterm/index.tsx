"use client";
import { useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import { Terminal } from "@xterm/xterm";
import "../../../node_modules/@xterm/xterm/css/xterm.css";
import "./xterm.css";

const XTerminal = forwardRef(function Xterminal(props, ref) {
  const terminal = useRef<Terminal | null>(null);
  useEffect(() => {
    terminal.current = new Terminal({
      theme: {
        background: "#1e1e1e",
      },
    });
    const term = document.getElementById("terminal");
    if (term) {
      terminal.current.open(term);
      terminal.current.write("Golang v1.2");
      terminal.current.write("\r\n");
      terminal.current.write("\r\n");
      return () => {
        terminal.current?.dispose();
      };
    }
  }, []);

  useImperativeHandle(ref, () => {
    return {
      push(str: string) {
        console.log("str: ", str);
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
