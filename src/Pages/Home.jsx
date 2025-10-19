import RotatingText from "../Components/RotatingText.jsx";
import {motion, useScroll, useSpring, useTransform} from "framer-motion";
import {useRef} from "react";
function Home() {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll();

    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 50]);
    const smoothScale = useSpring(scale, { stiffness: 200, damping: 28, mass: 0.35 });

    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const smoothOpacity = useSpring(opacity, { stiffness: 200, damping: 28, mass: 0.35 });

    const bg = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <motion.div className={`grid items-center justify-items-center`}>
            <motion.div ref={targetRef} style={{ scale: smoothScale, opacity:smoothOpacity }} className="top-0 w-full fixed h-screen grid text-white font-clash-sourcecode xl:text-[70px] text-[40px] z-2 font-normal justify-items-center items-center">
                <motion.div className={`grid justify-items-center items-center gap-7 xl:grid-flow-col`}>
                    <motion.div style={{opacity:smoothOpacity }}>We</motion.div>
                    <RotatingText
                        texts={['design', 'develop', 'deploy']}
                        colors={['#a4ccfd', '#abacfb', '#b4ffe2']} // 💙💚❤️ per-word colors
                        mainClassName={`font-clash-sourcecode font-bold`}
                        staggerFrom="last"
                        initial={{ y: '100%', opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: '-100%', opacity: 0 }}
                        staggerDuration={0.025}
                        splitLevelClassName="overflow-hidden"
                        transition={{ type: 'spring', damping: 30, stiffness: 400 }}
                        rotationInterval={2000}
                        animateWidth={true}
                        singleLine={true}
                    />
                    <motion.div style={{opacity:smoothOpacity }}>your</motion.div>
                    <motion.div style={{opacity:smoothOpacity }}>dream</motion.div>
                    <motion.div style={{opacity:smoothOpacity }}>website.</motion.div>
                </motion.div>
            </motion.div>
            <div className="h-screen z-1"/>

            <div className="z-2 grid h-screen w-full text-white font-clash-sourcecode font-normal justify-items-center items-center">
                <div className="grid justify-items-center items-center gap-7 text-[40px]">
                    <div>second section</div>
                </div>
            </div>
        </motion.div>
    );
}

export default Home;