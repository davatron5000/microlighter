export class MicroLighter extends HTMLElement {
  static readonly observedAttributes: string[];
  connectedCallback(): void;
  disconnectedCallback(): void;
  attributeChangedCallback(): void;
}

declare global {
  interface HTMLElementTagNameMap {
    "micro-lighter": MicroLighter;
  }
}
