
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
                className="bg-[rgba(255,255,255,0.1)] rounded-[10px])] grid-flow-col grid gap-3 p-2 rounded-full backdrop-blur-[50px]">
                <motion.div animate={{opacity: userLanguage !== 'en' ? 1 : 0.3, scale: userLanguage === 'ro' ? 1 : 0.85}}
                            className={`bg-cover w-7 h-7 bg-center`}
                            style={{backgroundImage: `url('${romanian}')`}}/>
                <motion.div animate={{opacity: userLanguage === 'en' ? 1 : 0.3, scale: userLanguage === 'en' ? 1 : 0.85}}
                            className={`bg-cover w-7 h-7 bg-center`}
                            style={{backgroundImage: `url('${english}')`}}
                            />
            </motion.div>
        </div>
    );
}

export default LanguageSelector;