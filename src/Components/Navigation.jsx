
import Logo from "./Logo.jsx";
import {motion} from "framer-motion";
import {useNavigate} from "react-router";
function Navigation() {

    let navigate = useNavigate();

    return (
        <div className="fixed top-0 left-0 w-full z-10 p-5 grid justify-items-center items-center">
            <div className="pl-10 pr-10 border-[1px] border-[rgba(255,255,255,0.1)] max-w-500 w-full h-20 rounded-[20px] text-white bg-[rgba(0,0,0,0.3)] grid-cols-6 backdrop-blur-[50px] justify-center items-center grid">
                <motion.div whileHover={{cursor:'pointer'}} onClick={()=>{navigate('/');}} className="w-30 justify-self-start">
                    <Logo/>
                </motion.div>
            </div>
        </div>
    )
}

export default Navigation