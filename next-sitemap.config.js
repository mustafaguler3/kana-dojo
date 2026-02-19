import fs from 'node:fs';
import path from 'node:path';

function getAcademyPostPaths() {
  const postsDir = path.join(
    process.cwd(),
    'features',
    'Blog',
    'content',
    'posts',
    'en',
  );
  const paths = [];

  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
        continue;
      }

      if (entry.isFile() && entry.name.endsWith('.mdx')) {
        paths.push(`/academy/${path.basename(entry.name, '.mdx')}`);
      }
    }
  }

  if (fs.existsSync(postsDir)) {
    walk(postsDir);
  }

  return paths;
}

/** @type {import('next-sitemap').IConfig} */
const sitemapConfig = {
  siteUrl: process.env.SITE_URL || 'https://kanadojo.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  additionalPaths: async config => {
    const academyPaths = getAcademyPostPaths();
    const corePaths = [
      '/',
      '/kana',
      '/kanji',
      '/vocabulary',
      '/translate',
      '/translate/english-to-japanese',
      '/translate/japanese-to-english',
      '/translate/romaji',
      '/conjugate',
      '/academy',
      '/faq',
      '/hiragana-practice',
      '/katakana-practice',
      '/kanji-practice',
      '/jlpt/n5',
      '/jlpt/n4',
      '/jlpt/n3',
      '/resources',
      '/anki-converter',
      '/kana-chart',
    ];

    const uniquePaths = [...new Set([...corePaths, ...academyPaths])];
    return uniquePaths.map(loc => ({
      loc,
      changefreq: config.changefreq,
      priority:
        loc.startsWith('/translate') || loc === '/' || loc === '/conjugate'
          ? 0.9
          : config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    }));
  },
  exclude: [
    '/api/*',
    '/_next/*',
    '/en',
    '/es',
    '/en/*',
    '/es/*',
    '/tools/*',
    '/*/train/*',
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: 'GPTBot',
        allow: '/',
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
      },
      {
        userAgent: 'Claude-Web',
        allow: '/',
      },
      {
        userAgent: 'anthropic-ai',
        allow: '/',
      },
      {
        userAgent: 'PerplexityBot',
        allow: '/',
      },
      {
        userAgent: 'Google-Extended',
        allow: '/',
      },
      {
        userAgent: 'CCBot',
        allow: '/',
      },
      {
        userAgent: 'Applebot',
        allow: '/',
      },
      {
        userAgent: 'Amazonbot',
        allow: '/',
      },
    ],
    additionalSitemaps: [],
  },
  transform: async (config, path) => {
    const priorities = {
      '/': 1.0,
      '/translate': 0.9,
      '/translate/english-to-japanese': 0.85,
      '/translate/japanese-to-english': 0.85,
      '/translate/romaji': 0.85,
      '/kana': 0.9,
      '/kanji': 0.9,
      '/vocabulary': 0.9,
      '/conjugate': 0.9,
      '/anki-converter': 0.85,
      '/academy': 0.85,
      '/resources': 0.85,
    };

    const changefreqs = {
      '/': 'daily',
      '/translate': 'daily',
      '/translate/english-to-japanese': 'weekly',
      '/translate/japanese-to-english': 'weekly',
      '/translate/romaji': 'weekly',
      '/conjugate': 'daily',
      '/academy': 'daily',
      '/resources': 'daily',
    };

    return {
      loc: path,
      changefreq: changefreqs[path] || config.changefreq,
      priority: priorities[path] || config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
};

export default sitemapConfig;
