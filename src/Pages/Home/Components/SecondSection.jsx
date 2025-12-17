import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

const SecondSection = ({ containerRef }) => {
    const sceneRef = useRef(null);

    // Progress through the whole "scene" (taller wrapper), not the sticky element itself
    const { scrollYProgress } = useScroll({
        container: containerRef,
        target: sceneRef,
        offset: ["start start", "end start"], // 0 at top of scene, 1 when scene ends
    });

    const size = useTransform(scrollYProgress, [0, 1], ["50%", "150%"]);
    const smoothSize = useSpring(size, { stiffness: 120, damping: 20, mass: 0.2 });

    const color = useTransform(
        scrollYProgress,
        [0, 0.3],
        ["rgba(0,0,0,0.1)", "rgba(158,158,158,0.1)"]
    );

    return (
        // Make this taller to control how long it stays sticky
        <section ref={sceneRef} className="relative h-[500vh] w-full">
            <motion.div className="sticky top-0 grid overflow-hidden z-1 h-dvh w-full text-white font-clash-sourcecode font-normal justify-items-center items-center">
                <motion.div
                    style={{ width: smoothSize, height: smoothSize, backgroundColor: color }}
                    className="backdrop-blur-[20px] rounded-[20px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
                />
                <motion.div className="grid justify-items-center items-center gap-7 text-[40px] z-20">
                    <motion.div>Second section</motion.div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default SecondSection;
