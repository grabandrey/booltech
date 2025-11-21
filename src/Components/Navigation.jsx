
import Logo from "./Logo.jsx";
import {motion, useScroll, useSpring, useTransform} from "framer-motion";
import {useNavigate} from "react-router";
import {useTranslation} from "react-i18next";
import {useContext} from "react";
import {LanguageContext} from "../Context/LanguageProvider.jsx";
function Navigation() {

    const {userLanguage, setUserLanguage} = useContext(LanguageContext);
    let navigate = useNavigate();
    const [t, i18n] = useTranslation("global");
    const { scrollYProgress } = useScroll();
    const opacity = useTransform(scrollYProgress, [0, 0.01], [0, 1]);
    const smoothOpacity = useSpring(opacity, { stiffness: 200, damping: 28, mass: 0.35 });

    return (
        <motion.div className="relative top-0 left-0 w-full z-10 p-5 grid justify-items-center items-center">
            <div className=" overflow-hidden pl-10 pr-10 border-[1px] border-[rgba(255,255,255,0.1)] max-w-500 w-full h-20 rounded-[20px] text-white bg-[rgba(0,0,0,0.3)] grid-cols-6 backdrop-blur-[50px] justify-center items-center grid">
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
            </div>
        </motion.div>
    )
}

export default Navigation