import i18next from "i18next";
import {BrowserRouter, Route, Routes} from "react-router";
import LanguageSelector from "./Components/LanguageSelector.jsx";
import Home from "./Pages/Home/Home.jsx";
import {I18nextProvider} from "react-i18next";
import global_en from "./Translations/global_en.json";
import global_ro from "./Translations/global_ro.json";
import {LanguageContext} from "./Context/LanguageProvider.jsx";
import {useContext} from "react";
import ColorBends from "./Components/ColorBends.jsx";
import useIsMobile from "./Components/useIsMobile.jsx";

function Root() {

    const {userLanguage, setUserLanguage} = useContext(LanguageContext);
    const isMobile = useIsMobile();

    i18next.init({
        react: {
            transSupportBasicHtmlNodes:  true
        },
        interpolation: {escapeValue: true},
        lng: userLanguage,
        resources: {
            en: {
                global: global_en
            },
            ro: {
                global: global_ro
            }
        }
    });

    return (
        <I18nextProvider i18n={i18next}>
            <BrowserRouter>
                <div className="fixed top-0 left-0 w-full h-full z-1 opacity-10">
                    <ColorBends
                        colors={["#ffffff"]}
                        rotation={isMobile ? 20 : 60}
                        speed={0.5}
                        scale={1}
                        frequency={1}
                        warpStrength={1}
                        mouseInfluence={1}
                        parallax={0.5}
                        noise={0.5}
                        transparent={true}
                    />
                {/*    <LiquidEther*/}
                {/*        colors={[ '#ffffff', '#cdcdcd', '#a6a6a6' ]}*/}
                {/*        mouseForce={50}*/}
                {/*        cursorSize={100}*/}
                {/*        isViscous={true}*/}
                {/*        viscous={30}*/}
                {/*        iterationsViscous={32}*/}
                {/*        iterationsPoisson={32}*/}
                {/*        resolution={0.5}*/}
                {/*        isBounce={false}*/}
                {/*        autoDemo={true}*/}
                {/*        autoSpeed={0.5}*/}
                {/*        autoIntensity={2.2}*/}
                {/*        takeoverDuration={0.25}*/}
                {/*        autoResumeDelay={1000}*/}
                {/*        autoRampDuration={0.6}*/}
                {/*    />*/}
                </div>
                {/*<div className="fixed bottom-0 right-0 z-15">*/}
                {/*    <LanguageSelector/>*/}
                {/*</div>*/}
                <Routes>
                    <Route index element={<Home />} />
                </Routes>
            </BrowserRouter>
        </I18nextProvider>
    );
}

export default Root;