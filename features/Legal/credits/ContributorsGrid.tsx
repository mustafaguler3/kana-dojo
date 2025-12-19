'use client';
import React from 'react';
import Image from 'next/image';
import type { Contributor } from './types';

export default function ContributorsGrid({
  contributors,
}: {
  contributors: Contributor[];
}) {
  return (
    <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {contributors.map((c) => (
        <a
          key={c.login}
          href={c.url}
          target="_blank"
          rel="noreferrer"
          className="flex flex-col items-center text-center p-2 rounded hover:bg-[var(--card-color)] transition-colors text-[var(--secondary-color)]"
        >
          <Image
            src={c.avatar}
            alt={c.login}
            width={48}
            height={48}
            className="rounded-full mb-2"
            loading="lazy"
            sizes="48px"
            unoptimized
          />
          <span className="text-sm truncate max-w-full">{c.login}</span>
        </a>
      ))}
    </div>
  );
}
