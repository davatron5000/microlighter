/**
 * Any JSON value that can appear in a TextMate grammar. Grammars carry fields
 * this highlighter does not read, and both grammars and rules are walked
 * generically when resolving scope includes.
 */
export type GrammarValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | GrammarValue[]
  | { [key: string]: GrammarValue };

/** A named capture group in a TextMate rule, keyed by capture index. */
export interface GrammarCaptures {
  [index: string]: { name: string };
}

/** A single TextMate rule: an include, a `match`, or a `begin`/`end` pair. */
export interface GrammarRule {
  include?: string;
  match?: string;
  begin?: string;
  end?: string;
  applyEndPatternLast?: boolean;
  name?: string;
  contentName?: string;
  captures?: GrammarCaptures;
  beginCaptures?: GrammarCaptures;
  endCaptures?: GrammarCaptures;
  patterns?: GrammarRule[];
  [key: string]: GrammarValue;
}

/** A repository entry, which may be a bare rule or a list of patterns. */
export type GrammarRepositoryEntry = GrammarRule | { patterns: GrammarRule[] };

/** A bundled TextMate grammar. */
export interface Grammar {
  scopeName: string;
  patterns: GrammarRule[];
  repository?: Record<string, GrammarRepositoryEntry>;
  /**
   * Grammars a grammar includes by scope. Declared explicitly when the
   * includes cannot be discovered from the rules alone.
   */
  dependencies?: string[];
  [key: string]: GrammarValue;
}
