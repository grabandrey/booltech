import RotatingText from "../Components/RotatingText.jsx";
import {motion, useMotionValueEvent, useScroll, useSpring, useTransform} from "framer-motion";
import {useRef, useState} from "react";
import {useTranslation} from "react-i18next";
function Home() {

    const [t, i18n] = useTranslation("global");
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll();

    const scale = useTransform(scrollYProgress, [0, 0.2], [1, 50]);
    const smoothScale = useSpring(scale, { stiffness: 200, damping: 28, mass: 0.35 });

    const opacity = useTransform(scrollYProgress, [0, 0.03], [1, 0]);
    const opacity2 = useTransform(scrollYProgress, [0, 0.01], [0.05, 0]);
    const opacity3 = useTransform(scrollYProgress, [0, 0.001], [1, 0]);
    const smoothOpacity = useSpring(opacity, { stiffness: 200, damping: 28, mass: 0.35 });
    const smoothOpacity2 = useSpring(opacity2, { stiffness: 200, damping: 28, mass: 0.35 });
    const smoothOpacity3 = useSpring(opacity3, { stiffness: 200, damping: 28, mass: 0.35 });


    const blurAmount = useTransform(scrollYProgress, [0, 0.02], [0, 10]);
    const smoothBlur = useSpring(blurAmount, { stiffness: 200, damping: 28, mass: 0.35 });
    // convert numeric px to a CSS filter string that framer-motion can animate
    const blurFilter = useTransform(smoothBlur, (v) => `blur(${v}px)`);

    const word1 = [
        <div key="w1" className="px-1 inline-block font-clash-gerova">design</div>,
    ];

    const word2 = [
        <div key="w1" className="px-1 inline-block font-clash-tech">develop</div>,
    ];

    const word3 = [
        <div key="w1" className="px-1 inline-block font-clash-sourcecode">deploy</div>,
    ];

    return (
        <motion.div className={`grid items-center justify-items-center`}>
            <motion.div ref={targetRef} className="top-0 w-full fixed h-screen grid text-white xl:text-[60px] text-[40px] z-2 font-normal justify-items-center items-center">
                <motion.div className="pointer-events-none font-clash-sourcecode absolute grid grid-flow-col text-[17vw]" style={{opacity:smoothOpacity2}}>
                    b001tech
                </motion.div>
                <div className="grid justify-items-center items-center">
                    <motion.div style={{ scale: smoothScale, opacity:smoothOpacity, filter:blurFilter }} className={`grid justify-items-center items-center gap-7 xl:grid-flow-col`}>
                        <motion.div className="font-clash-sourcecode pointer-events-none"
                                    style={{opacity: smoothOpacity}}>{t("home_page.catch_phrase.we")}</motion.div>
                        <RotatingText
                            texts={[word1, word2, word3]}
                            colors={['#a4ccfd', '#a7ef62', '#b4ffe2']} // 💙💚❤️ per-word colors
                            mainClassName={`font-semibold, font-clash-sourcecode`}
                            staggerFrom="last"
                            initial={{y: '100%', opacity: 0}}
                            animate={{y: 0, opacity: 1}}
                            exit={{y: '-100%', opacity: 0}}
                            staggerDuration={0.025}
                            splitLevelClassName="overflow-hidden"
                            transition={{type: 'spring', damping: 30, stiffness: 400}}
                            rotationInterval={2000}
                            animateWidth={true}
                            singleLine={true}
                        />
                        <motion.div className="font-clash-sourcecode"
                                    style={{opacity: smoothOpacity}}>{t("home_page.catch_phrase.your_dream_website")}</motion.div>
                    </motion.div>
                </div>
                <motion.div
                    whileHover={{
                        cursor: 'pointer',
                        backgroundColor: 'rgba(164,204,253,0.15)', // subtle light blue
                        transition: { duration: 0.3 },
                    }}
                    style={{opacity:smoothOpacity3 }} className="absolute bottom-[15%] font-clash-sourcecode text-[20px] border-[1px] border-[rgba(164,204,253,0.1)] p-5 pl-20 pr-20 rounded-full">
                    <div className="select-none">Discover us</div>
                </motion.div>
            </motion.div>
            <div className="h-screen z-1"/>

            <div
                className="z-2  grid h-screen w-full text-white font-clash-sourcecode font-normal justify-items-center items-center">
                <div className="grid justify-items-center items-center gap-7 text-[40px]">
                    <div>second section</div>
                </div>
            </div>

            <div
                className="z-2  grid h-screen w-full text-white font-clash-sourcecode font-normal justify-items-center items-center">
                <div className="grid justify-items-center items-center gap-7 text-[40px]">
                    <div>third section</div>
                </div>
            </div>
        </motion.div>
    );
}

export default Home;