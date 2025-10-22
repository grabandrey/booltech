import {StrictMode, useState} from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter, Route, Routes} from "react-router";
import LiquidEther from "./Components/LiquidEther.jsx";
import Navigation from "./Components/Navigation.jsx";
import Home from "./Pages/Home.jsx";
import i18next from "i18next";
import {I18nextProvider} from 'react-i18next';
import global_en from "./Translations/global_en.json";
import global_ro from "./Translations/global_ro.json";

i18next.init({
    react: {
        transSupportBasicHtmlNodes:  true
    },
    interpolation: {escapeValue: true},
    lng: 'en',
    resources: {
        en: {
            global: global_en
        },
        ro: {
            global: global_ro
        }
    }
});


createRoot(document.getElementById('root')).render(
    <I18nextProvider i18n={i18next}>
      <BrowserRouter>
          <div className="fixed top-0 left-0 w-full h-full z-1 opacity-30">
              <LiquidEther
                  colors={[ '#ffffff', '#cdcdcd', '#a6a6a6' ]}
                  mouseForce={50}
                  cursorSize={100}
                  isViscous={true}
                  viscous={30}
                  iterationsViscous={32}
                  iterationsPoisson={32}
                  resolution={0.5}
                  isBounce={false}
                  autoDemo={true}
                  autoSpeed={0.5}
                  autoIntensity={2.2}
                  takeoverDuration={0.25}
                  autoResumeDelay={1000}
                  autoRampDuration={0.6}
              />
          </div>
          <Routes>
              <Route index element={<Home />} />
          </Routes> 
      </BrowserRouter>
    </I18nextProvider>,
)
