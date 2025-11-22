
import Logo from "./Logo.jsx";
import {motion, useScroll, useSpring, useTransform} from "framer-motion";
import {useNavigate} from "react-router";
import {useTranslation} from "react-i18next";
import {useContext, useEffect, useState} from "react";
import {LanguageContext} from "../Context/LanguageProvider.jsx";
import {AnimatePresence} from "motion/react";
import { Spin as Hamburger } from 'hamburger-react';
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
            if (latest === 0 ) {
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
                    <div onClick={()=>{!expand ? setExpand(true) : setExpand(false)}}>
                        <Hamburger  size={27} color="white" toggled={expand}/>
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