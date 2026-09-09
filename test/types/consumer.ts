import { highlightAll, type HighlightAllOptions } from "../../dist/index.js";
import javascript from "../../dist/grammars/javascript.js";
import type { MicroLighter } from "../../dist/micro-lighter-element.js";

const options: HighlightAllOptions = { selector: "pre > code", root: document };

export const scopeName: string = javascript.scopeName;
export const codeBlocks: Promise<HTMLElement[]> = highlightAll(options);
export const element: MicroLighter = document.createElement("micro-lighter");
