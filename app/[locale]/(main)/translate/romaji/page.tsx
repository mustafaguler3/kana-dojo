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
    pathname: '/translate/romaji',
  });

  return {
    ...base,
    title: isEs
      ? 'Guia de Traductor Romaji (Japones a Romaji) | KanaDojo'
      : 'Romaji Translator Guide (Japanese to Romaji) | KanaDojo',
    description: isEs
      ? 'Aprende a usar salida de japones a romaji para pronunciacion y lectura, con verificaciones practicas para kana y kanji.'
      : 'Learn how to use Japanese to romaji output for pronunciation and reading support, with practical checks for kana and kanji text.',
  };
}

export default async function RomajiPage({ params }: PageProps) {
  const { locale } = await params;
  const isEs = locale === 'es';
  const examples = [
    ['こんにちは', 'konnichiwa', 'Hello'],
    ['ありがとう', 'arigatou', 'Thank you'],
    ['駅はどこですか', 'eki wa doko desu ka', 'Where is the station?'],
    ['漢字', 'kanji', 'Chinese character / kanji'],
    ['日本語を勉強しています', 'nihongo o benkyou shite imasu', 'I am studying Japanese'],
    ['大丈夫です', 'daijoubu desu', 'It is okay'],
    ['お願いします', 'onegaishimasu', 'Please'],
    ['名前', 'namae', 'Name'],
    ['初めまして', 'hajimemashite', 'Nice to meet you'],
    ['字幕を翻訳したい', 'jimaku o honyaku shitai', 'I want to translate subtitles'],
  ];

  return (
    <main className='mx-auto max-w-4xl px-4 py-10'>
      <h1 className='text-3xl font-bold text-(--main-color)'>
        {isEs ? 'Guia de Traductor Romaji Japones' : 'Japanese to Romaji Translator Guide'}
      </h1>
      <p className='mt-4 text-(--secondary-color)'>
        {isEs
          ? 'Romaji representa texto japones con alfabeto latino. Es util para pronunciacion inicial y verificacion rapida del resultado.'
          : 'Romaji represents Japanese text using the Latin alphabet. It is useful for early pronunciation and quick output checks.'}
      </p>
      <h2 className='mt-6 text-xl font-semibold text-(--main-color)'>
        {isEs ? 'Como usar romaji correctamente' : 'How to use romaji correctly'}
      </h2>
      <ul className='mt-3 list-disc space-y-2 pl-5 text-(--secondary-color)'>
        <li>{isEs ? 'Usalo para leer y pronunciar palabras nuevas.' : 'Use it to read and pronounce new words.'}</li>
        <li>{isEs ? 'Verifica con hiragana/katakana cuando sea posible.' : 'Cross-check against hiragana/katakana when possible.'}</li>
        <li>{isEs ? 'No reemplaza estudio de escritura japonesa.' : 'Do not treat it as a replacement for Japanese script study.'}</li>
      </ul>
      <section className='mt-8 rounded-xl border border-(--border-color) bg-(--card-color) p-4'>
        <h2 className='text-xl font-semibold text-(--main-color)'>
          {isEs ? 'Ejemplos de japones a romaji' : 'Japanese to romaji examples'}
        </h2>
        <div className='mt-3 overflow-x-auto'>
          <table className='w-full text-left text-sm'>
            <thead>
              <tr className='border-b border-(--border-color) text-(--main-color)'>
                <th className='px-2 py-2'>{isEs ? 'Japones' : 'Japanese'}</th>
                <th className='px-2 py-2'>Romaji</th>
                <th className='px-2 py-2'>{isEs ? 'Significado' : 'Meaning'}</th>
              </tr>
            </thead>
            <tbody className='text-(--secondary-color)'>
              {examples.map(row => (
                <tr key={row[0]} className='border-b border-(--border-color)/60'>
                  <td className='px-2 py-2'>{row[0]}</td>
                  <td className='px-2 py-2 italic'>{row[1]}</td>
                  <td className='px-2 py-2'>{row[2]}</td>
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
        <Link href='/kana' className='rounded-lg border border-(--border-color) px-4 py-2 font-medium text-(--main-color)'>
          {isEs ? 'Practicar Kana' : 'Practice Kana'}
        </Link>
      </div>
    </main>
  );
}
