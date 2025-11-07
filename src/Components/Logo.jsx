import RotatingText from "./RotatingText.jsx";
import {useEffect, useState} from "react";

function Logo({fontSize = 55}) {

    const [logoAnimation1, setLogoAnimation1] = useState(60000);
    const [logoAnimation2, setLogoAnimation2] = useState(60000);
    const [logoAnimation3, setLogoAnimation3] = useState(60000);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLogoAnimation1(5000); // change after 2 seconds
            setLogoAnimation2(6000); // change after 2 seconds
            setLogoAnimation3(7000); // change after 2 seconds
        }, 5000);

    }, []);

    return (
        <div className={`pointer-events-none grid justify-items-center items-center grid-flow-col text-white`} style={{fontSize: fontSize + "px"}}>
            <div className="font-clash-sourcecode font-semibold">b</div>
            <RotatingText
                texts={['0', '1']}
                mainClassName="overflow-hidden justify-center font-clash-sourcecode font-normal text-[#a6a6a6]"
                staggerFrom={"last"}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={logoAnimation1}
            />
            <RotatingText
                texts={['0', '1']}
                mainClassName="overflow-hidden justify-center font-clash-sourcecode font-normal text-[#a6a6a6]"
                staggerFrom={"last"}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={logoAnimation2}
            />
            <RotatingText
                texts={['1', '0']}
                mainClassName="overflow-hidden justify-center font-clash-sourcecode font-normal text-[#a6a6a6]"
                staggerFrom={"last"}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={logoAnimation3}
            />
            <div className="font-clash-sourcecode font-semibold">tech</div>
        </div>
    );
}

export default Logo