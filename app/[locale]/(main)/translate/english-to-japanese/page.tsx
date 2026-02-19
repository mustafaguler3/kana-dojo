import type { Metadata } from 'next';
import Link from 'next/link';
import { generatePageMetadata } from '@/core/i18n/metadata-helpers';
import { routing } from '@/core/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === 'es';
  const base = await generatePageMetadata('translate', {
    locale,
    pathname: '/translate/english-to-japanese',
  });

  return {
    ...base,
    title: isEs
      ? 'Traductor Online de Ingles a Japones | KanaDojo'
      : 'English to Japanese Translator Online | KanaDojo',
    description: isEs
      ? 'Traduce de ingles a japones online gratis con soporte de romaji para pronunciacion y estudio.'
      : 'Translate English to Japanese online for free. Get Japanese text with romaji support for pronunciation and study.',
  };
}

export default async function EnglishToJapanesePage({ params }: PageProps) {
  const { locale } = await params;
  const isEs = locale === 'es';
  const examples = [
    ['Where is the station?', '駅はどこですか？', 'Eki wa doko desu ka?'],
    ['I need help', '助けが必要です', 'Tasuke ga hitsuyo desu'],
    ['How much is this?', 'これはいくらですか？', 'Kore wa ikura desu ka?'],
    ['Please speak slowly', 'ゆっくり話してください', 'Yukkuri hanashite kudasai'],
    ['Can I pay by card?', 'カードで払えますか？', 'Kaado de haraemasu ka?'],
    ['I am learning Japanese', '日本語を勉強しています', 'Nihongo o benkyo shite imasu'],
    ['Nice to meet you', 'はじめまして', 'Hajimemashite'],
    ['What does this kanji mean?', 'この漢字はどういう意味ですか？', 'Kono kanji wa do iu imi desu ka?'],
    ['Please check this sentence', 'この文を確認してください', 'Kono bun o kakunin shite kudasai'],
    ['See you tomorrow', 'また明日', 'Mata ashita'],
    ['I like this anime', 'このアニメが好きです', 'Kono anime ga suki desu'],
    ['Do you have vegetarian food?', 'ベジタリアン料理はありますか？', 'Bejitarian ryori wa arimasu ka?'],
  ];

  return (
    <main className='mx-auto max-w-4xl px-4 py-10'>
      <h1 className='text-3xl font-bold text-(--main-color)'>
        {isEs ? 'Traductor Online de Ingles a Japones' : 'English to Japanese Translator Online'}
      </h1>
      <p className='mt-4 text-(--secondary-color)'>
        {isEs
          ? 'Usa esta pagina para traducir frases y parrafos de ingles a japones, revisar romaji y continuar con practica de lectura.'
          : 'Use this page to translate phrases and paragraphs from English to Japanese, review romaji, and continue with reading practice.'}
      </p>
      <ul className='mt-6 list-disc space-y-2 pl-5 text-(--secondary-color)'>
        <li>{isEs ? 'Traduccion para frases cotidianas y estudio JLPT.' : 'Translation for everyday phrases and JLPT study.'}</li>
        <li>{isEs ? 'Salida con japones y romaji para pronunciacion.' : 'Output includes Japanese text and romaji for pronunciation.'}</li>
        <li>{isEs ? 'Limite de 5,000 caracteres por solicitud.' : '5,000 character limit per request.'}</li>
      </ul>
      <section className='mt-8 rounded-xl border border-(--border-color) bg-(--card-color) p-4'>
        <h2 className='text-xl font-semibold text-(--main-color)'>
          {isEs ? 'Frases de ejemplo (Ingles a Japones)' : 'Example phrases (English to Japanese)'}
        </h2>
        <div className='mt-3 overflow-x-auto'>
          <table className='w-full text-left text-sm'>
            <thead>
              <tr className='border-b border-(--border-color) text-(--main-color)'>
                <th className='px-2 py-2'>{isEs ? 'Ingles' : 'English'}</th>
                <th className='px-2 py-2'>{isEs ? 'Japones' : 'Japanese'}</th>
                <th className='px-2 py-2'>Romaji</th>
              </tr>
            </thead>
            <tbody className='text-(--secondary-color)'>
              {examples.map(row => (
                <tr key={row[0]} className='border-b border-(--border-color)/60'>
                  <td className='px-2 py-2'>{row[0]}</td>
                  <td className='px-2 py-2'>{row[1]}</td>
                  <td className='px-2 py-2 italic'>{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <div className='mt-8 flex flex-wrap gap-3'>
        <Link href='/translate' className='rounded-lg border border-(--border-color) px-4 py-2 font-medium text-(--main-color)'>
          {isEs ? 'Abrir traductor principal' : 'Open main translator'}
        </Link>
        <Link href='/translate/japanese-to-english' className='rounded-lg border border-(--border-color) px-4 py-2 font-medium text-(--main-color)'>
          {isEs ? 'Japones a Ingles' : 'Japanese to English'}
        </Link>
        <Link href='/translate/romaji' className='rounded-lg border border-(--border-color) px-4 py-2 font-medium text-(--main-color)'>
          {isEs ? 'Guia de Romaji' : 'Romaji guide'}
        </Link>
      </div>
    </main>
  );
}
