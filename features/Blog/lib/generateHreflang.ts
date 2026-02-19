import type { Locale } from '../types/blog';

/**
 * Hreflang tag structure
 */
export interface HreflangTag {
  /** Language/locale code */
  hreflang: string;
  /** URL for this locale version */
  href: string;
}

/**
 * Configuration options for hreflang generation
 */
export interface HreflangOptions {
  /** Base URL override for testing */
  baseUrl?: string;
}

/**
 * Base URL for the site
 */
const BASE_URL = 'https://kanadojo.com';

/**
 * Mapping of locale codes to hreflang values
 */
const LOCALE_TO_HREFLANG: Record<Locale, string> = {
  en: 'en',
  es: 'es',
};

/**
 * Generates hreflang tags for posts that exist in multiple locales
 * Each tag includes the locale code and the URL for that locale version
 *
 * **Validates: Requirements 4.5**
 *
 * @param slug - Post slug
 * @param availableLocales - Array of locales where the post exists
 * @param options - Optional configuration
 * @returns Array of hreflang tag objects
 */
export function generateHreflang(
  slug: string,
  availableLocales: Locale[],
  options: HreflangOptions = {},
): HreflangTag[] {
  const baseUrl = options.baseUrl ?? BASE_URL;

  // Locale prefixes are disabled; all locales resolve to the same public URL.
  const tags: HreflangTag[] = availableLocales.map(locale => ({
    hreflang: LOCALE_TO_HREFLANG[locale],
    href: `${baseUrl}/academy/${slug}`,
  }));

  // Add x-default pointing to the canonical public URL.
  if (availableLocales.length > 0) {
    tags.push({
      hreflang: 'x-default',
      href: `${baseUrl}/academy/${slug}`,
    });
  }

  return tags;
}

/**
 * Generates hreflang link elements as HTML strings
 * Useful for rendering in head section
 *
 * @param slug - Post slug
 * @param availableLocales - Array of locales where the post exists
 * @param options - Optional configuration
 * @returns Array of HTML link element strings
 */
export function generateHreflangLinks(
  slug: string,
  availableLocales: Locale[],
  options: HreflangOptions = {},
): string[] {
  const tags = generateHreflang(slug, availableLocales, options);

  return tags.map(
    tag =>
      `<link rel="alternate" hreflang="${tag.hreflang}" href="${tag.href}" />`,
  );
}
