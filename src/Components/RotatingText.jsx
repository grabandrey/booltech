'use client';

import {
    forwardRef,
    useCallback,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
} from 'react';
import { motion, AnimatePresence } from 'motion/react';

function cn(...classes) {
    return classes.filter(Boolean).join(' ');
}

/**
 * RotatingText
 *
 * Now supports two shapes for `texts`:
 * 1) string[] — original behavior (split into characters/words/lines)
 * 2) ReactNode[][] — each item is an array of nodes (e.g., <div>Word</div>) that
 *    will be animated as words without auto-inserted spaces.
 */
const RotatingText = forwardRef((props, ref) => {
    const {
        texts,
        colors = [], // color applied to the whole current line
        fonts = [], // Tailwind/next-font classes per word
        transition = { type: 'spring', damping: 25, stiffness: 300 },
        initial = { y: '100%', opacity: 0 },
        animate = { y: 0, opacity: 1 },
        exit = { y: '-100%', opacity: 0 },
        animatePresenceMode = 'sync',
        animatePresenceInitial = false,
        rotationInterval = 2000,
        staggerDuration = 0,
        staggerFrom = 'first',
        loop = true,
        auto = true,
        splitBy = 'characters',
        onNext,
        mainClassName,
        splitLevelClassName,
        elementLevelClassName,
        animateWidth = true,
        singleLine = true,
        ...rest
    } = props;

    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const innerRef = useRef(null);
    const measRef = useRef(null);
    const sizerRef = useRef(null);

    const [measuredWidth, setMeasuredWidth] = useState(null);
    const [lastSolidWidth, setLastSolidWidth] = useState(null);
    const [lineHeightPx, setLineHeightPx] = useState(null);
    const [srText, setSrText] = useState('');

    // Measure line height
    useEffect(() => {
        const measureLine = () => {
            const el = sizerRef.current;
            if (!el) return;
            const h = Math.ceil(el.getBoundingClientRect().height || 0);
            if (h > 0) setLineHeightPx(h);
        };
        measureLine();
        if (typeof document !== 'undefined' && document.fonts) {
            document.fonts.ready.then(measureLine);
        }
        const onResize = () => measureLine();
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, [mainClassName, texts, splitBy]);

    // Split text into animatable parts (string path)
    const splitIntoCharacters = (text) => {
        if (typeof Intl !== 'undefined' && Intl.Segmenter) {
            const segmenter = new Intl.Segmenter('en', { granularity: 'grapheme' });
            return Array.from(segmenter.segment(text), (seg) => seg.segment);
        }
        return Array.from(text);
    };

    const currentText = texts?.[currentTextIndex] ?? '';
    const currentIsNodeArray = Array.isArray(currentText);

    /**
     * elements: normalized shape for renderer & measurer
     * - for strings → array of words with character arrays
     * - for node-arrays → one character per \"word\" which is the node itself
     */
    const elements = useMemo(() => {
        if (!currentIsNodeArray) {
            const str = String(currentText ?? '');
            if (splitBy === 'characters') {
                const words = str.split(' ');
                return words.map((word, i) => ({
                    characters: splitIntoCharacters(word),
                    needsSpace: i !== words.length - 1,
                }));
            }
            if (splitBy === 'words') {
                return str.split(' ').map((word, i, arr) => ({
                    characters: [word],
                    needsSpace: i !== arr.length - 1,
                }));
            }
            if (splitBy === 'lines') {
                return str.split('\n').map((line, i, arr) => ({
                    characters: [line],
                    needsSpace: i !== arr.length - 1,
                }));
            }
            return str.split(splitBy).map((part, i, arr) => ({
                characters: [part],
                needsSpace: i !== arr.length - 1,
            }));
        }

        // Node-array path: treat each provided node as a single animatable unit
        const nodes = currentText;
        return nodes.map((node) => ({ characters: [node], needsSpace: false }));
    }, [currentText, currentIsNodeArray, splitBy]);

    const totalChars = useMemo(
        () => elements.reduce((sum, word) => sum + word.characters.length, 0),
        [elements]
    );

    const getStaggerDelay = useCallback(
        (index, total) => {
            if (staggerFrom === 'first') return index * staggerDuration;
            if (staggerFrom === 'last') return (total - 1 - index) * staggerDuration;
            if (staggerFrom === 'center') {
                const center = Math.floor(total / 2);
                return Math.abs(center - index) * staggerDuration;
            }
            if (staggerFrom === 'random') {
                const randomIndex = Math.floor(Math.random() * total);
                return Math.abs(randomIndex - index) * staggerDuration;
            }
            return Math.abs(staggerFrom - index) * staggerDuration;
        },
        [staggerFrom, staggerDuration]
    );

    // Controls
    const handleIndexChange = useCallback(
        (newIndex) => {
            setCurrentTextIndex(newIndex);
            onNext?.(newIndex);
        },
        [onNext]
    );

    const next = useCallback(() => {
        const nextIndex =
            currentTextIndex === texts.length - 1 ? (loop ? 0 : currentTextIndex) : currentTextIndex + 1;
        if (nextIndex !== currentTextIndex) handleIndexChange(nextIndex);
    }, [currentTextIndex, texts?.length, loop, handleIndexChange]);

    const previous = useCallback(() => {
        const prevIndex = currentTextIndex === 0 ? (loop ? texts.length - 1 : currentTextIndex) : currentTextIndex - 1;
        if (prevIndex !== currentTextIndex) handleIndexChange(prevIndex);
    }, [currentTextIndex, texts?.length, loop, handleIndexChange]);

    const jumpTo = useCallback(
        (index) => {
            const validIndex = Math.max(0, Math.min(index, texts.length - 1));
            if (validIndex !== currentTextIndex) handleIndexChange(validIndex);
        },
        [texts?.length, currentTextIndex, handleIndexChange]
    );

    const reset = useCallback(() => {
        if (currentTextIndex !== 0) handleIndexChange(0);
    }, [currentTextIndex, handleIndexChange]);

    useImperativeHandle(ref, () => ({ next, previous, jumpTo, reset }), [next, previous, jumpTo, reset]);

    useEffect(() => {
        if (!auto) return;
        const id = setInterval(next, rotationInterval);
        return () => clearInterval(id);
    }, [next, rotationInterval, auto]);

    const animatedWidth = measuredWidth ?? lastSolidWidth ?? 'auto';
    const fixedHeight = lineHeightPx ?? undefined;

    // Determine color for current line (loop through colors)
    const currentColor = colors.length > 0 ? colors[currentTextIndex % colors.length] : undefined;

    // Measure width & update screen-reader text
    const updateWidthNow = useCallback(() => {
        const el = measRef.current;
        if (!el) return;
        const w = Math.ceil(el.scrollWidth);
        if (w > 0) {
            setMeasuredWidth(w);
            setLastSolidWidth(w);
        }
        // Update SR-only text from measured content (gets textContent from nodes)
        setSrText(el.textContent || '');
    }, []);

    useEffect(() => {
        if (!animateWidth) return;
        updateWidthNow();
        if (typeof document !== 'undefined' && document.fonts) {
            document.fonts.ready.then(updateWidthNow);
        }
        const ro = new ResizeObserver(() => updateWidthNow());
        const el = measRef.current;
        if (el) ro.observe(el);
        return () => ro.disconnect();
    }, [animateWidth, currentTextIndex, texts, splitBy, fonts, updateWidthNow]);

    return (
        <>
            {/* Hidden line height sizer */}
            <span
                ref={sizerRef}
                aria-hidden="true"
                className={cn('invisible absolute -z-10 pointer-events-none select-none', mainClassName)}
                style={{ position: 'absolute' }}
            >
        Mg
      </span>

            {/* Hidden measurer for width */}
            <span
                ref={measRef}
                aria-hidden="true"
                className={cn(
                    'absolute -z-10 invisible pointer-events-none select-none',
                    singleLine ? 'whitespace-nowrap' : 'whitespace-pre-wrap',
                    mainClassName
                )}
                style={{ position: 'absolute' }}
            >
        {/* Render MEASURE CONTENT mirror */}
                {!currentIsNodeArray &&
                    elements.map((wordObj, wordIndex) => {
                        const fontClass = fonts.length > 0 ? fonts[wordIndex % fonts.length] : '';
                        return (
                            <span key={`meas-${wordIndex}`} className={cn('inline', fontClass)}>
                {wordObj.characters.map((ch, i) => (
                    <span key={`meas-${wordIndex}-${i}`} className={fontClass}>
                    {ch}
                  </span>
                ))}
                                {wordObj.needsSpace ? ' ' : ''}
              </span>
                        );
                    })}
                {currentIsNodeArray &&
                    elements.map((wordObj, wordIndex) => {
                        const fontClass = fonts.length > 0 ? fonts[wordIndex % fonts.length] : '';
                        return (
                            <span key={`meas-node-${wordIndex}`} className={cn('inline-flex', fontClass)}>
                {/* Each node is a single unit */}
                                {wordObj.characters[0]}
              </span>
                        );
                    })}
      </span>

            <motion.span
                className={cn('inline-block relative align-baseline', singleLine ? 'leading-none' : '', mainClassName)}
                {...rest}
                style={{
                    ...(animateWidth ? { width: animatedWidth } : {}),
                    ...(fixedHeight ? { height: fixedHeight, lineHeight: `${fixedHeight}px` } : {}),
                }}
                animate={animateWidth ? { width: animatedWidth } : undefined}
                initial={false}
                transition={transition}
                layout
            >
                {/* SR-only textual fallback */}
                <span className="sr-only">{!currentIsNodeArray ? String(currentText ?? '') : srText}</span>

                <div
                    className={cn('overflow-hidden relative', singleLine ? 'whitespace-nowrap' : 'whitespace-pre-wrap')}
                    style={{ height: fixedHeight ?? '1em' }}
                    aria-hidden="true"
                >
                    <AnimatePresence mode={animatePresenceMode} initial={animatePresenceInitial}>
                        <motion.span
                            key={currentTextIndex}
                            ref={innerRef}
                            className="absolute left-0 top-0 inline-flex"
                            style={{ color: currentColor }}
                            layout={false}
                        >
                            {elements.map((wordObj, wordIndex, array) => {
                                const prevChars = array
                                    .slice(0, wordIndex)
                                    .reduce((sum, word) => sum + word.characters.length, 0);

                                const fontClass = fonts.length > 0 ? fonts[wordIndex % fonts.length] : '';

                                return (
                                    <span
                                        key={wordIndex}
                                        className={cn('inline-flex', splitLevelClassName, fontClass)}
                                        style={{ overflow: 'hidden' }}
                                    >
                    {wordObj.characters.map((char, charIndex) => (
                        <motion.span
                            key={charIndex}
                            initial={initial}
                            animate={animate}
                            exit={exit}
                            transition={{
                                ...transition,
                                delay: getStaggerDelay(prevChars + charIndex, totalChars),
                            }}
                            className={cn('inline-block will-change-transform', elementLevelClassName, fontClass)}
                            style={{ verticalAlign: 'baseline' }}
                        >
                            {char}
                        </motion.span>
                    ))}
                                        {/* For string mode we optionally add spaces; for node mode, spacing is user-controlled */}
                                        {!currentIsNodeArray && wordObj.needsSpace && <span className="whitespace-pre"> </span>}
                  </span>
                                );
                            })}
                        </motion.span>
                    </AnimatePresence>
                </div>
            </motion.span>
        </>
    );
});

RotatingText.displayName = 'RotatingText';
export default RotatingText;
