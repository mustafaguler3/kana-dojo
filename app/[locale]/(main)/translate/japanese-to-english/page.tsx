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
    pathname: '/translate/japanese-to-english',
  });

  return {
    ...base,
    title: isEs
      ? 'Traductor Online de Japones a Ingles | KanaDojo'
      : 'Japanese to English Translator Online | KanaDojo',
    description: isEs
      ? 'Traduce de japones a ingles online gratis. Funciona con hiragana, katakana y kanji para revision rapida.'
      : 'Translate Japanese to English online for free. Works with hiragana, katakana, and kanji for quick comprehension checks.',
  };
}

export default async function JapaneseToEnglishPage({ params }: PageProps) {
  const { locale } = await params;
  const isEs = locale === 'es';
  const examples = [
    ['おはようございます', 'Good morning', 'Ohayo gozaimasu'],
    ['よろしくお願いします', 'Please treat me favorably', 'Yoroshiku onegaishimasu'],
    ['本日は晴天なり', 'Today is clear weather', 'Honjitsu wa seiten nari'],
    ['この漢字は難しい', 'This kanji is difficult', 'Kono kanji wa muzukashii'],
    ['電車が遅れています', 'The train is delayed', 'Densha ga okurete imasu'],
    ['明日の予定を教えてください', 'Please tell me tomorrow’s plan', 'Ashita no yotei o oshiete kudasai'],
    ['今何時ですか', 'What time is it now?', 'Ima nanji desu ka'],
    ['ここで写真を撮ってもいいですか', 'May I take a photo here?', 'Koko de shashin o totte mo ii desu ka'],
    ['すみません、道に迷いました', 'Excuse me, I am lost', 'Sumimasen, michi ni mayoimashita'],
    ['会議は三時から始まります', 'The meeting starts at three', 'Kaigi wa sanji kara hajimarimasu'],
    ['アニメの字幕を翻訳したい', 'I want to translate anime subtitles', 'Anime no jimaku o honyaku shitai'],
    ['この名前の読み方は何ですか', 'How do you read this name?', 'Kono namae no yomikata wa nan desu ka'],
  ];

  return (
    <main className='mx-auto max-w-4xl px-4 py-10'>
      <h1 className='text-3xl font-bold text-(--main-color)'>
        {isEs ? 'Traductor Online de Japones a Ingles' : 'Japanese to English Translator Online'}
      </h1>
      <p className='mt-4 text-(--secondary-color)'>
        {isEs
          ? 'Traduce hiragana, katakana y kanji a ingles para revisar significado, contexto y comprension general.'
          : 'Translate hiragana, katakana, and kanji into English to validate meaning, context, and overall comprehension.'}
      </p>
      <ul className='mt-6 list-disc space-y-2 pl-5 text-(--secondary-color)'>
        <li>{isEs ? 'Ideal para subtitulos, notas de estudio y lectura.' : 'Useful for subtitles, study notes, and reading practice.'}</li>
        <li>{isEs ? 'Manejo de texto mixto en todos los sistemas de escritura japoneses.' : 'Handles mixed Japanese scripts in one request.'}</li>
        <li>{isEs ? 'Incluye limites de uso para mantener estabilidad del servicio.' : 'Includes fair-use rate limits to keep service stable.'}</li>
      </ul>
      <section className='mt-8 rounded-xl border border-(--border-color) bg-(--card-color) p-4'>
        <h2 className='text-xl font-semibold text-(--main-color)'>
          {isEs ? 'Frases de ejemplo (Japones a Ingles)' : 'Example phrases (Japanese to English)'}
        </h2>
        <div className='mt-3 overflow-x-auto'>
          <table className='w-full text-left text-sm'>
            <thead>
              <tr className='border-b border-(--border-color) text-(--main-color)'>
                <th className='px-2 py-2'>{isEs ? 'Japones' : 'Japanese'}</th>
                <th className='px-2 py-2'>{isEs ? 'Ingles' : 'English'}</th>
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
        <Link href='/translate/english-to-japanese' className='rounded-lg border border-(--border-color) px-4 py-2 font-medium text-(--main-color)'>
          {isEs ? 'Ingles a Japones' : 'English to Japanese'}
        </Link>
        <Link href='/translate/romaji' className='rounded-lg border border-(--border-color) px-4 py-2 font-medium text-(--main-color)'>
          {isEs ? 'Guia de Romaji' : 'Romaji guide'}
        </Link>
      </div>
    </main>
  );
}
