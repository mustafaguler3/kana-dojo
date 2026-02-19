'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { CONJUGATOR_FAQ_ITEMS, type FAQItem } from '../lib/seo/structuredData';

interface FAQProps {
  /** Optional custom FAQ items (defaults to CONJUGATOR_FAQ_ITEMS) */
  items?: FAQItem[];
  /** Maximum number of items to display initially */
  initialDisplayCount?: number;
}

/**
 * FAQ - Comprehensive FAQ section for the conjugator page
 *
 * Features:
 * - Semantic HTML structure for accessibility and SEO
 * - Expandable/collapsible FAQ items
 * - 15+ comprehensive questions about Japanese verb conjugation
 * - Proper ARIA labels and roles
 *
 * Requirements: 13.6, 10.2
 */
export default function FAQ({
  items = CONJUGATOR_FAQ_ITEMS,
  initialDisplayCount = 15,
}: FAQProps) {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());
  const [showAll, setShowAll] = useState(false);

  const displayedItems = showAll ? items : items.slice(0, initialDisplayCount);
  const hasMoreItems = items.length > initialDisplayCount;

  const toggleItem = (index: number) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const expandAll = () => {
    setExpandedItems(new Set(displayedItems.map((_, i) => i)));
  };

  const collapseAll = () => {
    setExpandedItems(new Set());
  };

  return (
    <section
      className='mt-20 flex flex-col gap-12'
      aria-labelledby='faq-heading'
      itemScope
      itemType='https://schema.org/FAQPage'
    >
      <div className='flex flex-col gap-4'>
        <div className='flex items-center gap-2 text-[10px] font-bold tracking-widest text-(--secondary-color)/40 uppercase'>
          <div className='h-[1px] w-4 bg-(--main-color)' />
          <span>FAQ</span>
        </div>
        <h2
          id='faq-heading'
          className='text-2xl font-bold tracking-tight text-(--main-color)'
        >
          Frequently Asked Questions
        </h2>
      </div>

      <div className='flex flex-col' role='list' aria-label='FAQ items'>
        {displayedItems.map((item, index) => (
          <FAQItemComponent
            key={index}
            item={item}
            index={index}
            isExpanded={true}
            onToggle={() => {}}
          />
        ))}
      </div>

      {hasMoreItems && (
        <div className='flex justify-center py-4'>
          <button
            onClick={() => setShowAll(!showAll)}
            className='text-[10px] font-bold tracking-widest text-(--main-color) uppercase transition-colors'
          >
            {showAll ? 'Show Fewer' : 'Show All Questions'}
          </button>
        </div>
      )}
    </section>
  );
}

/**
 * Individual FAQ item component
 */
function FAQItemComponent({
  item,
  index,
  isExpanded,
  onToggle,
}: {
  item: FAQItem;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const answerId = `faq-answer-${index}`;

  return (
    <div
      className={cn(
        'group flex flex-col transition-all duration-700',
        'border-b border-(--border-color)/10 last:border-0',
      )}
      itemScope
      itemProp='mainEntity'
      itemType='https://schema.org/Question'
      role='listitem'
    >
      <div className='flex flex-col gap-4 border-b border-(--border-color)/5 py-6 last:border-0'>
        <div className='flex flex-col gap-2'>
          <h3 className='text-lg font-bold text-(--main-color)'>
            {item.question}
          </h3>
          <p className='text-base text-(--secondary-color)/70'>{item.answer}</p>
        </div>
      </div>
    </div>
  );
}
