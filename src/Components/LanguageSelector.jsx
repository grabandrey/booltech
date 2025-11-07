
import romanian from '../assets/romanian.png';
import english from '../assets/english.png';
import {useState} from "react";
import {motion, useMotionValueEvent, useScroll, useSpring, useTransform} from "framer-motion";

function LanguageSelector() {

    const [language, setLanguage] = useState('ro');

    return (
        <div className="grid justify-items-center items-center p-5" >
            <motion.div
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0 , opacity: 1}}
                whileHover={{cursor:'pointer'}}
                transition={{duration:1}}
                onClick={()=>{
                    if(language === 'en')
                    {setLanguage('ro')}
                    else
                    {setLanguage('en')
                    }
                }}
                className="bg-[rgba(255,255,255,0.1)] rounded-[10px])] grid-flow-col grid gap-3 p-2 rounded-full backdrop-blur-[50px]">
                <motion.div animate={{opacity: language !== 'en' ? 1 : 0.3, scale: language === 'ro' ? 1 : 0.85}}
                            className={`bg-cover w-7 h-7 bg-center`}
                            style={{backgroundImage: `url('${romanian}')`}}/>
                <motion.div animate={{opacity: language === 'en' ? 1 : 0.3, scale: language === 'en' ? 1 : 0.85}}
                            className={`bg-cover w-7 h-7 bg-center`}
                            style={{backgroundImage: `url('${english}')`}}
                            />
            </motion.div>
        </div>
    );
}

export default LanguageSelector;