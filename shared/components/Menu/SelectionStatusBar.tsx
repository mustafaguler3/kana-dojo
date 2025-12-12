'use client';
import { useEffect, useState, useMemo } from 'react';
import clsx from 'clsx';
import useKanjiStore from '@/features/Kanji/store/useKanjiStore';
import useVocabStore from '@/features/Vocabulary/store/useVocabStore';
import useKanaStore from '@/features/Kana/store/useKanaStore';
import { kana } from '@/features/Kana/data/kana';
import { usePathname } from 'next/navigation';
import { removeLocaleFromPath } from '@/shared/lib/pathUtils';
import { useClick } from '@/shared/hooks/useAudio';
import { CircleCheck, Trash } from 'lucide-react';
import { ActionButton } from '@/shared/components/ui/ActionButton';
import { AnimatePresence, motion } from 'framer-motion';
import { formatLevelsAsRanges } from '@/shared/lib/helperFunctions';

type ContentType = 'kana' | 'kanji' | 'vocabulary';

const SelectionStatusBar = () => {
  const { playClick } = useClick();
  const pathname = usePathname();
  const pathWithoutLocale = removeLocaleFromPath(pathname);
  const contentType = pathWithoutLocale.slice(1) as ContentType;

  const isKana = contentType === 'kana';
  const isKanji = contentType === 'kanji';

  // Kana store
  const kanaGroupIndices = useKanaStore(state => state.kanaGroupIndices);
  const addKanaGroupIndices = useKanaStore(state => state.addKanaGroupIndices);

  // Kanji store
  const { selectedKanjiSets, clearKanjiObjs, clearKanjiSets } = useKanjiStore();

  // Vocab store
  const { selectedVocabSets, clearVocabObjs, clearVocabSets } = useVocabStore();

  const { kanaGroupNamesFull, kanaGroupNamesCompact } = useMemo(() => {
    const selected = new Set(kanaGroupIndices);
    const nonChallengeIndices = kana
      .map((k, i) => ({ k, i }))
      .filter(({ k }) => !k.groupName.startsWith('challenge.'))
      .map(({ i }) => i);
    const allNonChallengeSelected = nonChallengeIndices.every(i =>
      selected.has(i)
    );

    const full: string[] = [];
    const compact: string[] = [];

    if (allNonChallengeSelected) {
      full.push('all kana');
      compact.push('all kana');
    }

    kanaGroupIndices.forEach(i => {
      const group = kana[i];
      if (!group) {
        const fallback = `Group ${i + 1}`;
        if (!allNonChallengeSelected) {
          full.push(fallback);
          compact.push(fallback);
        }
        return;
      }

      const isChallenge = group.groupName.startsWith('challenge.');
      if (!isChallenge && allNonChallengeSelected) return;

      const firstKana = group.kana[0];
      full.push(
        isChallenge ? `${firstKana}-group (challenge)` : `${firstKana}-group`
      );
      compact.push(firstKana);
    });

    return { kanaGroupNamesFull: full, kanaGroupNamesCompact: compact };
  }, [kanaGroupIndices]);

  const hasSelection = isKana
    ? kanaGroupIndices.length > 0
    : isKanji
      ? selectedKanjiSets.length > 0
      : selectedVocabSets.length > 0;

  const handleClear = () => {
    playClick();
    if (isKana) {
      // Clear all kana by toggling all currently selected indices
      addKanaGroupIndices(kanaGroupIndices);
    } else if (isKanji) {
      clearKanjiSets();
      clearKanjiObjs();
    } else {
      clearVocabSets();
      clearVocabObjs();
    }
  };

  const [layout, setLayout] = useState<{
    top: number;
    left: number | string;
    width: number | string;
  }>({
    top: 0,
    left: 0,
    width: '100%'
  });

  useEffect(() => {
    const updateLayout = () => {
      const sidebar = document.getElementById('main-sidebar');
      const width = window.innerWidth;

      const top = 0;
      let left: number | string = 0;
      let barWidth: number | string = '100%';

      // Calculate Horizontal Layout
      if (width >= 1024) {
        // Desktop: Stretch from sidebar's right edge to viewport right edge
        if (sidebar) {
          const sidebarRect = sidebar.getBoundingClientRect();
          left = sidebarRect.right;
          barWidth = width - sidebarRect.right;
        }
      } else {
        // Mobile: Full width
        left = 0;
        barWidth = '100%';
      }

      setLayout({ top, left, width: barWidth });
    };

    updateLayout();

    let observer: ResizeObserver | null = null;
    const sidebar = document.getElementById('main-sidebar');

    if (sidebar) {
      observer = new ResizeObserver(() => {
        updateLayout();
      });
      observer.observe(sidebar);
    }

    window.addEventListener('resize', updateLayout);

    return () => {
      window.removeEventListener('resize', updateLayout);
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  // For kanji/vocab: sort by set number
  const selectedSets = isKanji ? selectedKanjiSets : selectedVocabSets;
  const sortedSets =
    selectedSets.length > 0
      ? selectedSets.sort((a, b) => {
          const numA = parseInt(a.replace('Set ', ''));
          const numB = parseInt(b.replace('Set ', ''));
          return numA - numB;
        })
      : [];

  // Compact: "1-5, 8-10" for kanji/vocab
  const formattedSelectionCompact = isKana
    ? kanaGroupNamesCompact.length > 0
      ? kanaGroupNamesCompact.join(', ')
      : 'None'
    : formatLevelsAsRanges(sortedSets);

  // Full: "Level 1-5, Level 8-10" for kanji/vocab
  const formattedSelectionFull = isKana
    ? kanaGroupNamesFull.length > 0
      ? kanaGroupNamesFull.join(', ')
      : 'None'
    : sortedSets.length > 0
      ? formatLevelsAsRanges(sortedSets)
          .split(', ')
          .map(range => `Level ${range}`)
          .join(', ')
      : 'None';

  // Label text
  const selectionLabel = isKana ? 'Selected Groups:' : 'Selected Levels:';

  return (
    <AnimatePresence>
      {hasSelection && (
        <motion.div
          initial={{ y: '-100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          style={{
            top: `${layout.top}px`,
            left:
              typeof layout.left === 'number'
                ? `${layout.left}px`
                : layout.left,
            width:
              typeof layout.width === 'number'
                ? `${layout.width}px`
                : layout.width
          }}
          className={clsx(
            'fixed z-40',
            'bg-[var(--background-color)]',
            'border-b-2 border-[var(--border-color)] w-full '
          )}
        >
          <div
            className={clsx(
              'flex flex-row items-center justify-center gap-2 md:gap-4',
              'w-full ',
              'py-3 px-4'
            )}
          >
            {/* Selected Levels Info */}
            <div className="flex flex-row items-start gap-2 flex-1 ">
              <CircleCheck
                className="text-[var(--secondary-color)] shrink-0 mt-0.5"
                size={20}
              />
              <span className="text-sm md:text-base whitespace-nowrap">
                {selectionLabel}
              </span>
              {/* Compact form on small screens: "1, 2, 3" */}
              <span className="text-[var(--secondary-color)] text-sm break-words md:hidden">
                {formattedSelectionCompact}
              </span>
              {/* Full form on medium+ screens: "Level 1, Level 2" */}
              <span className="text-[var(--secondary-color)] text-base break-words hidden md:inline">
                {formattedSelectionFull}
              </span>
            </div>

            {/* Clear Button */}
            <ActionButton
              // colorScheme='main'
              borderColorScheme="main"
              borderRadius="2xl"
              borderBottomThickness={8}
              className="py-3 px-4 bg-[var(--main-color)]/80 w-auto"
              onClick={handleClear}
              aria-label="Clear selected levels"
            >
              <Trash size={20} />
            </ActionButton>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SelectionStatusBar;
