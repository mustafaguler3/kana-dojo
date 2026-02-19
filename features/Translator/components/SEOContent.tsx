'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { cn } from '@/shared/lib/utils';

interface SEOContentProps {
  locale?: string;
}

export default function SEOContent({ locale: _locale = 'en' }: SEOContentProps) {
  const t = useTranslations('translator');

  const steps = [
    t('seo.howToUse.steps.step1'),
    t('seo.howToUse.steps.step2'),
    t('seo.howToUse.steps.step3'),
    t('seo.howToUse.steps.step4'),
    t('seo.howToUse.steps.step5'),
  ];

  const faqItems = [
    {
      q: t('seo.faq.isFree.question'),
      a: t('seo.faq.isFree.answer'),
    },
    {
      q: t('seo.faq.accuracy.question'),
      a: t('seo.faq.accuracy.answer'),
    },
    {
      q: t('seo.faq.romanization.question'),
      a: t('seo.faq.romanization.answer'),
    },
    {
      q: t('seo.faq.historySaved.question'),
      a: t('seo.faq.historySaved.answer'),
    },
    {
      q: t('seo.faq.maxLength.question'),
      a: t('seo.faq.maxLength.answer'),
    },
    {
      q: 'Are there usage limits?',
      a: 'Yes. We apply fair-use rate limits during high demand to keep the translator reliable for everyone.',
    },
  ];

  return (
    <section
      className={cn(
        'mt-6 flex flex-col gap-6 rounded-2xl border border-(--border-color) bg-(--card-color) p-4 shadow-lg shadow-black/5 sm:mt-8 sm:p-6',
      )}
      aria-label='Japanese translation guide and educational content'
    >
      <header>
        <h2 className='text-2xl font-bold text-(--main-color)'>
          {t('seo.guideTitle')}
        </h2>
        <p className='mt-2 text-sm text-(--secondary-color)'>
          Translate English and Japanese text, review romaji, and use linked study tools to keep learning.
        </p>
      </header>

      <div className='rounded-xl border border-(--border-color) bg-(--background-color) p-4'>
        <h3 className='mb-2 text-lg font-semibold text-(--main-color)'>
          {t('seo.howToUse.title')}
        </h3>
        <p className='mb-3 text-sm text-(--secondary-color)'>
          {t('seo.howToUse.intro')}
        </p>
        <ol className='space-y-2 text-sm text-(--secondary-color)'>
          {steps.map((step, index) => (
            <li key={step} className='flex gap-3'>
              <span className='inline-flex h-6 w-6 items-center justify-center rounded-full bg-(--main-color)/10 text-xs font-bold text-(--main-color)'>
                {index + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
        <p className='mt-3 text-sm text-(--secondary-color)'>
          {t('seo.howToUse.proTip')}
        </p>
      </div>

      <div className='rounded-xl border border-(--border-color) bg-(--background-color) p-4'>
        <h3 className='mb-2 text-lg font-semibold text-(--main-color)'>
          Search-focused translator pages
        </h3>
        <div className='grid gap-3 sm:grid-cols-3'>
          <Link href='/translate/english-to-japanese' className='rounded-lg border border-(--border-color) p-3 text-sm font-medium text-(--main-color) hover:bg-(--card-color)'>English to Japanese</Link>
          <Link href='/translate/japanese-to-english' className='rounded-lg border border-(--border-color) p-3 text-sm font-medium text-(--main-color) hover:bg-(--card-color)'>Japanese to English</Link>
          <Link href='/translate/romaji' className='rounded-lg border border-(--border-color) p-3 text-sm font-medium text-(--main-color) hover:bg-(--card-color)'>Japanese Romaji Guide</Link>
        </div>
      </div>

      <div className='rounded-xl border border-(--border-color) bg-(--background-color) p-4'>
        <h3 className='mb-3 text-lg font-semibold text-(--main-color)'>
          {t('seo.faq.title')}
        </h3>
        <div className='space-y-3'>
          {faqItems.map(item => (
            <div key={item.q}>
              <h4 className='font-medium text-(--main-color)'>{item.q}</h4>
              <p className='text-sm text-(--secondary-color)'>{item.a}</p>
            </div>
          ))}
        </div>
      </div>

      <div className='rounded-xl border border-(--border-color) bg-(--background-color) p-4'>
        <h3 className='mb-2 text-lg font-semibold text-(--main-color)'>
          Accuracy and limitations
        </h3>
        <ul className='list-disc space-y-1 pl-5 text-sm text-(--secondary-color)'>
          <li>
            Machine translation may miss nuance in humor, slang, honorifics, and
            context-heavy writing.
          </li>
          <li>
            Names, dialects, and anime-style expressions can have multiple valid
            readings.
          </li>
          <li>
            For important content, compare alternatives and verify key terms with
            kana/kanji study tools.
          </li>
          <li>
            Best practice: split long paragraphs into shorter sentences for
            cleaner results.
          </li>
        </ul>
      </div>

      <div className='grid gap-3 sm:grid-cols-2'>
        <Link href='/kana' className='rounded-xl border border-(--border-color) p-4 text-sm text-(--secondary-color) hover:bg-(--background-color)'>
          <span className='block font-semibold text-(--main-color)'>Hiragana & Katakana practice</span>
          Build reading speed and recognition.
        </Link>
        <Link href='/kanji' className='rounded-xl border border-(--border-color) p-4 text-sm text-(--secondary-color) hover:bg-(--background-color)'>
          <span className='block font-semibold text-(--main-color)'>Kanji study by JLPT level</span>
          Verify translation context and meaning.
        </Link>
      </div>
    </section>
  );
}
