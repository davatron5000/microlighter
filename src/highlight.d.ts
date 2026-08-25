export interface HighlightAllOptions {
  /** Element or document to search. Defaults to `document`. */
  root?: ParentNode;
  /** Selector used to find code blocks. Defaults to `"pre > code"`. */
  selector?: string;
  /** Extra aliases mapped to bundled grammar names. */
  languageAliases?: Record<string, string>;
}

/**
 * Find code blocks, load their TextMate grammars, and register CSS highlights.
 * Resolves with the code elements that were scanned.
 */
export function highlightAll(options?: HighlightAllOptions): Promise<HTMLElement[]>;
