import RotatingText from "../Components/RotatingText.jsx";
import {motion, useMotionValueEvent, useScroll, useSpring, useTransform} from "framer-motion";
import {useContext, useEffect, useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import GradientText from "../Components/GradientText.jsx";
import SplitText from "../Components/SplitText.jsx";
import Navigation from "../Components/Navigation.jsx";
import {MouseParallax} from "react-just-parallax";
import TextType from "../Components/TextType.jsx";
import {LanguageContext} from "../Context/LanguageProvider.jsx";
function Home() {

    const {userLanguage, setUserLanguage} = useContext(LanguageContext);

    const [startAnimation, setStartAnimation] = useState(false);

    const [t, i18n] = useTranslation("global");
    const targetRef = useRef(null);
    const secondSectionRef = useRef(null);
    const { scrollYProgress /* also scrollY if you want px */ } = useScroll({
        container: targetRef
    });

    const scale = useTransform(scrollYProgress, [0, 0.2], [1, 50]);
    const smoothScale = useSpring(scale, { stiffness: 200, damping: 28, mass: 0.35 });

    const opacity = useTransform(scrollYProgress, [0, 0.03], [!startAnimation ? 0 : 1, 0]);
    const opacity2 = useTransform(scrollYProgress, [0, 0.01], [!startAnimation ? 1 : 0.05, 0]);
    const opacity3 = useTransform(scrollYProgress, [0, 0.001], [!startAnimation ? 0 : 1, 0]);
    const navopacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
    const navPosition = useTransform(scrollYProgress, [0, 0.2], [-100, 0]);
    const navScale = useTransform(scrollYProgress, [0, 0.2], [0.9, 1]);

    const smoothOpacity = useSpring(opacity, { stiffness: 200, damping: 28, mass: 0.35 });
    const smoothOpacity2 = useSpring(opacity2, { stiffness: 200, damping: 28, mass: 0.35 });
    const smoothOpacity3 = useSpring(opacity3, { stiffness: 200, damping: 28, mass: 0.35 });

    const smoothNavOpacity = useSpring(navopacity, { stiffness: 200, damping: 28, mass: 0.35 });
    const smoothNavPosition = useSpring(navPosition, { stiffness: 200, damping: 28, mass: 0.35 });
    const smoothNavScale = useSpring(navScale, { stiffness: 200, damping: 28, mass: 0.35 });


    const blurAmount = useTransform(scrollYProgress, [0, 0.02], [startAnimation ? 0 : 5, 5]);
    const smoothBlur = useSpring(blurAmount, { stiffness: 200, damping: 28, mass: 0.35 });
    // convert numeric px to a CSS filter string that framer-motion can animate
    const blurFilter = useTransform(smoothBlur, (v) => `blur(${v}px)`);

    function scrollToSection(sectionRef) {
        sectionRef.current?.scrollIntoView({
            behavior: "smooth", // makes it glide nicely
        });
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setStartAnimation(true);
        }, 2000);

        // Cleanup — always be a responsible hook citizen
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        console.log(scrollYProgress.get('current'));
    },[userLanguage])

    const word1 = [
        <div key="w1" className="pointer-events-none px-1 font-clash-cursive relative xl:top-[-4px] xl:text-[58px] text-[50px] top-[-13px] grid justify-items-center items-center">
            <GradientText
                colors={["#f24e1e", "#a259ff", "#1abcfe", "#0acf83"]}
                animationSpeed={3}
                showBorder={false}
            >
                {t("home_page.catch_phrase.design")}
            </GradientText>
        </div>,
    ];

    const word2 = [
        <div key="w1" className="pointer-events-none px-1 inline-block font-clash-tech relative top-[-1px] xl:text-[60px] text-[50px]">{t("home_page.catch_phrase.develop")}</div>,
    ];

    const word3 = [
        <div key="w1" className="pointer-events-none px-1 inline-block font-clash-amazon italic relative top-[0px] xl:left-[-3px] left-[-3px] xl:text-[60px] text-[45px]">{t("home_page.catch_phrase.deploy")}</div>,
    ];

    return (
        <motion.div ref={targetRef}  className={`[scrollbar-width:none] [color-scheme:light] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden custom-scrollbar grid fixed h-screen w-full ${startAnimation ? "overflow-y-scroll" : null} overscroll-contain items-center justify-items-center z-10`}>
            <motion.div className={`fixed top-0 w-full z-10`} style={{opacity:smoothNavOpacity, y: smoothNavPosition, scale: smoothNavScale}}>
                <Navigation/>
            </motion.div>
            <motion.div className={`pointer-events-none font-clash-sourcecode fixed inset-0 grid place-items-center text-[17vw] text-white`}
                        style={{opacity:smoothOpacity2}}>
                <SplitText
                    text="b001tech"
                    className="text-center"
                    delay={200}
                    duration={2}
                    ease="power3.out"
                    splitType="chars"
                    from={{ opacity: 0, y: 40, color: '#ffffff' }}
                    to={{ opacity: 1, y: 0, color: "#ffffff" }}
                    threshold={0.1}
                    rootMargin="-100px"
                    textAlign="center"
                />
                {/*<TextType*/}
                {/*    text={'b001tech'}*/}
                {/*    typingSpeed={150}*/}
                {/*    deletingSpeed={150}*/}
                {/*    loop={true}*/}
                {/*    showCursor={true}*/}
                {/*    cursorCharacter="█"*/}
                {/*/>*/}
            </motion.div>
            <motion.div className={`pointer-events-none top-0 w-full fixed h-dvh grid text-white xl:text-[60px] text-[40px] z-2 font-normal justify-items-center items-center`}>
                <div className="pointer-events-none grid justify-items-center items-center">
                    <motion.div style={{ scale: smoothScale, opacity:smoothOpacity, filter:blurFilter }} className={`grid justify-items-center items-center xl:gap-7 gap-5 xl:p-0 p-10 xl:grid-flow-col`}>
                        <motion.div className="font-clash-sourcecode pointer-events-none"
                                    style={{opacity: smoothOpacity}}>{t("home_page.catch_phrase.we")}</motion.div>
                        <RotatingText
                            texts={[word1, word2, word3]}
                            colors={['white', '#bedf6d', '#ffc43a']} // 💙💚❤️ per-word colors
                            mainClassName={`font-semibold, font-clash-sourcecode`}
                            staggerFrom="last"
                            initial={{y: '100%', opacity: 0}}
                            animate={{y: 0, opacity: 1}}
                            exit={{y: '-100%', opacity: 0}}
                            staggerDuration={0.025}
                            splitLevelClassName="overflow-hidden"
                            transition={{type: 'spring', damping: 30, stiffness: 400}}
                            rotationInterval={!startAnimation ? 5000 : 2000}
                            animateWidth={true}
                            singleLine={true}
                        />
                        <motion.div className="font-clash-sourcecode text-center"
                                    style={{opacity: smoothOpacity}}>{t("home_page.catch_phrase.your_dream_website")}</motion.div>
                    </motion.div>
                </div>
                <motion.div
                    onClick={()=>{scrollToSection(secondSectionRef)}}
                    whileHover={{
                        cursor: 'pointer',
                        backgroundColor: 'rgba(164,204,253,0.15)', // subtle light blue
                        transition: { duration: 0.3 },
                    }}
                    whileTap={{
                        cursor: 'pointer',
                        backgroundColor: 'rgba(164,204,253,0.15)', // subtle light blue
                        transition: { duration: 0.3 },
                    }}
                    style={{opacity:smoothOpacity3 }} className="pointer-events-auto absolute bottom-[15%] border-[1px] border-[rgba(255,255,255,0.1)] font-clash-sourcecode text-[20px] p-5 pl-20 pr-20 rounded-full">
                    <div  className="select-none">{t("home_page.discover_us")}</div>
                </motion.div>
            </motion.div>
            <div className="h-dvh z-1"/>

            <div ref={secondSectionRef}
                className="z-2 grid h-dvh w-full text-white font-clash-sourcecode font-normal justify-items-center items-center">
                <div className="grid justify-items-center items-center gap-7 text-[40px] z-2">
                    <div>second section</div>
                </div>
            </div>

            <div
                className="z-2  grid h-dvh w-full text-white font-clash-sourcecode font-normal justify-items-center items-center">
                <div className="grid justify-items-center items-center gap-7 text-[40px]">
                    <div>third section</div>
                </div>
            </div>
        </motion.div>
    );
}

export default Home;