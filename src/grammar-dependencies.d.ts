import type { Grammar } from "./grammar.js";

export interface LoadedGrammars {
  languages: Record<string, Grammar>;
  scopes: Map<string, Grammar>;
}

/** Convert a supported language alias to its grammar module name. */
export function normalizeLanguage(language: string, aliases?: Record<string, string>): string;

/**
 * Find grammar modules referenced by external TextMate scope includes.
 * Local repository references (`#...`, `$self`, and `$base`) are ignored.
 */
export function getExternalLanguages(value: unknown): Set<string>;

/** Create a cached loader that also resolves external grammar dependencies. */
export function createGrammarLoader(
  importLanguage?: (language: string) => Promise<Grammar | null>
): (languages: string[]) => Promise<LoadedGrammars>;
