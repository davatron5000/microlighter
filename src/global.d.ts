import type { MicroLighter } from "./micro-lighter-element.js";

declare global {
  interface Element {
    /**
     * Announce a message to assistive technology.
     * Not yet in `lib.dom`; only Chromium ships it today.
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/ariaNotify
     */
    ariaNotify?: (message: string, options?: { priority?: "none" | "important" }) => void;
  }

  interface HTMLElementTagNameMap {
    "micro-lighter": MicroLighter;
  }
}
