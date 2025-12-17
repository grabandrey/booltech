import {motion, useInView, useScroll, useSpring, useTransform} from "framer-motion";
import {useRef} from "react";

const ThirdSection = ({ containerRef, nextSectionRef, actualSectionRef }) => {

    const fullyInView = useInView(actualSectionRef, {
        root: containerRef,
        amount: 0.50,
    });

    return (
        <>
            <motion.div ref={actualSectionRef}
                className={`grid justify-items-center items-center gap-7 text-[40px] z-2 h-dvh bg-red-400`}
            >
                <motion.div className="">Third section</motion.div>
            </motion.div>
        </>
    );
};

export default ThirdSection;
