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
  | RegExp
  | GrammarValue[]
  | { [key: string]: GrammarValue };

/**
 * A precompiled pattern whose Oniguruma source used `\A` (document start)
 * and/or `\G` (where the enclosing rule's begin match ended). Each is
 * compiled twice, with the anchor allowed and with it replaced by a character
 * that never matches, and the scanner picks the variant for the position:
 * `A[+firstLine]`, `G[+atAnchor]`, or `AG[firstLine * 2 + atAnchor]`.
 */
export type AnchoredPattern = { A: RegExp[] } | { G: RegExp[] } | { AG: RegExp[] };

/**
 * A rule pattern: a precompiled `RegExp` (possibly an oniguruma-to-es
 * `EmulatedRegExp`), an anchored variant set, or `null` for a pattern that
 * could not be compiled.
 */
export type GrammarPattern = RegExp | AnchoredPattern | null;

/** A capture group in a TextMate rule, keyed by capture index. */
export interface GrammarCaptures {
  [index: string]: { name?: string; patterns?: GrammarRule[] };
}

/** A single TextMate rule: an include, a `match`, or a `begin`/`end` pair. */
export interface GrammarRule {
  include?: string;
  match?: GrammarPattern;
  begin?: GrammarPattern;
  end?: GrammarPattern;
  applyEndPatternLast?: boolean;
  name?: string;
  contentName?: string;
  captures?: GrammarCaptures;
  beginCaptures?: GrammarCaptures;
  endCaptures?: GrammarCaptures;
  patterns?: GrammarRule[];
  /** Rules visible to `#include`s inside this rule, merged over the grammar's. */
  repository?: Record<string, GrammarRepositoryEntry>;
  [key: string]: GrammarValue;
}

/** A repository entry, which may be a bare rule or a list of patterns. */
export type GrammarRepositoryEntry = GrammarRule | { patterns: GrammarRule[] };

/** A bundled TextMate grammar. */
export interface Grammar {
  name?: string;
  scopeName: string;
  patterns: GrammarRule[];
  repository?: Record<string, GrammarRepositoryEntry>;
  /** Rules injected into this grammar, keyed by scope selector. */
  injections?: Record<string, { patterns: GrammarRule[] }>;
  /** Scope selector under which this grammar injects itself into others. */
  injectionSelector?: string;
  /** Scope names of grammars this one injects into. */
  injectTo?: string[];
  /**
   * Grammars a grammar includes by scope. Declared explicitly when the
   * includes cannot be discovered from the rules alone.
   */
  dependencies?: string[];
  [key: string]: GrammarValue;
}
