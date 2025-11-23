
import Logo from "./Logo.jsx";
import {motion, useScroll, useSpring, useTransform} from "framer-motion";
import {useNavigate} from "react-router";
import {useTranslation} from "react-i18next";
import {useContext, useEffect, useState} from "react";
import {LanguageContext} from "../Context/LanguageProvider.jsx";
import {AnimatePresence} from "motion/react";
import './hamburger.css';
function Navigation({scrollProgress}) {

    const {userLanguage, setUserLanguage} = useContext(LanguageContext);
    let navigate = useNavigate();
    const [t, i18n] = useTranslation("global");
    const { scrollYProgress } = useScroll();
    const opacity = useTransform(scrollYProgress, [0, 0.01], [0, 1]);
    const smoothOpacity = useSpring(opacity, { stiffness: 200, damping: 28, mass: 0.35 });
    const [expand, setExpand] = useState(false);

    useEffect(() => {
        const unsubscribe = scrollProgress.on("change", (latest) => {
            if (latest < 0.15 ) {
                setExpand(false);
            }
        });

        return () => unsubscribe();
    }, [scrollProgress]);

    return (
        <motion.div className="relative top-0 left-0 w-full z-10 p-5 grid justify-items-center items-center">
            <div className=" overflow-hidden pl-7 pr-7 border-[1px] border-[rgba(255,255,255,0.1)] max-w-500 w-full h-20 rounded-[20px] text-white bg-[rgba(0,0,0,0.3)] md:grid-cols-6 grid-cols-2 backdrop-blur-[50px] justify-center items-center grid">
                <motion.div whileHover={{cursor:'pointer'}} onClick={()=>{navigate('/');}} className="w-30 justify-self-start">
                    <Logo fontSize={20}/>
                </motion.div>
                <div className="hidden md:grid col-span-5 justify-items-end font-clash-sourcecode items-center">
                    <motion.div className="grid-flow-col grid gap-10 items-center ">
                        <div>{t("home_page.navigation.projects")}</div>
                        <div>{t("home_page.navigation.about")}</div>
                        <div className=" cursor-pointer select-none
                        border-[2px] border-gray-400
                        p-1 px-7 rounded-full
                        text-white
                        shadow-[0_0_10px_rgba(255,255,255,0.8),inset_0_0_10px_rgba(255,255,255,0.5)]
                        transition-all duration-300
                        hover:shadow-[0_0_15px_rgba(255,255,255,1),inset_0_0_15px_rgba(255,255,255,0.7)]"
                        >
                            {t("home_page.navigation.lets_talk")}
                        </div>
                    </motion.div>
                </div>
                <div  className="md:hidden grid items-center justify-items-end text-end">
                    <div>
                        <label className="hamburger">
                            <input
                                type="checkbox"
                                checked={expand}
                                onChange={() => setExpand(prev => !prev)}
                            />
                            <svg viewBox="0 0 32 32">
                                <path
                                    className="line line-top-bottom"
                                    d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
                                />
                                <path className="line" d="M7 16 27 16" />
                            </svg>
                        </label>
                    </div>
                </div>
            </div>
            <AnimatePresence initial={false}>
                {expand && (
                    <motion.section
                        key="content"
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                            open: {opacity: 1, height: '50dvh'},
                            collapsed: {opacity: 0, height: 0}
                        }}
                        transition={{duration: 0.3, ease: [0.1, 0.62, 0.23, 0.98]}}
                        className="mt-4 border-[1px] border-[rgba(255,255,255,0.1)] transform-gpu will-change-transform w-full p-5 z-110 rounded-[25px] h-full items-center  backdrop-blur-md bg-[rgba(0,0,0,0.2)]   text-[20px] grid text-center justify-items-center overflow-hidden font-clash-eurostileextended"
                    >
                        <div className="text-white">asdasdasd</div>
                    </motion.section>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

export default Navigation