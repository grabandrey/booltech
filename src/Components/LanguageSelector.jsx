
import romanian from '../assets/romanian.png';
import english from '../assets/english.png';
import {useContext, useEffect, useState} from "react";
import {motion, useMotionValueEvent, useScroll, useSpring, useTransform} from "framer-motion";
import {LanguageContext} from "../Context/LanguageProvider.jsx";

function LanguageSelector() {

    const {userLanguage, setUserLanguage} = useContext(LanguageContext);

    const [startAnimation, setStartAnimation] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setStartAnimation(true);
        }, 2000);

        // Cleanup — always be a responsible hook citizen
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="grid justify-items-center items-center p-5" >
            <motion.div
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0 , opacity: startAnimation ? 1 : 0}}
                whileHover={{cursor:'pointer'}}
                transition={{duration:3, type:'spring', damping: 30}}
                onClick={()=>{
                    if(userLanguage === 'en')
                    {setUserLanguage('ro')}
                    else
                    {setUserLanguage('en')
                    }
                }}
                className="bg-[rgba(255,255,255,0.1)] text-[13px] rounded-[10px])] font-bold grid-flow-col grid gap-3 p-2 rounded-full backdrop-blur-[50px] relative">
                <motion.div animate={{opacity: userLanguage !== 'en' ? 1 : 0.3, scale: userLanguage === 'ro' ? 1.05 : 1, color: userLanguage === 'ro' ? '#ffffff' : '#cdcdcd'}}
                            className={`bg-cover w-7 h-7 bg-center text-center justify-items-center items-center grid`}
                            >RO</motion.div>
                <motion.div animate={{opacity: userLanguage === 'en' ? 1 : 0.3, scale: userLanguage === 'en' ? 1.05 : 1, color: userLanguage === 'en' ? '#ffffff' : '#cdcdcd'}}
                            className={`bg-cover w-7 h-7 bg-center text-center justify-items-center items-center grid`}
                            >EN</motion.div>
                <motion.div
                    animate={{ left: userLanguage === 'ro' ? '5%' : '52%'}}
                    transition={{duration:1, type:'spring', damping: 20}}
                    className={`absolute h-9 w-9 bg-[rgba(255,255,255,0.1)] rounded-full top-1`}/>
            </motion.div>
        </div>
    );
}

export default LanguageSelector;