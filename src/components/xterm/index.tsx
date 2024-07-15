"use client";
import { useRef, useEffect } from "react";
import { Terminal } from "@xterm/xterm";
import "../../../node_modules/@xterm/xterm/css/xterm.css";
import "./xterm.css";

function Xterminal() {
  useEffect(() => {
    const term = document.getElementById("terminal");
    if (term) {
      const terminal = new Terminal({
        theme: {
          background: "",
        },
      });
      terminal.open(term);
      terminal.write("Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ");
      return () => {
        terminal.dispose();
      };
    }
  }, []);
  return <div id="terminal" className="xterm"></div>;
}

export default Xterminal;
