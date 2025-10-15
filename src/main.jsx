import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter, Route, Routes} from "react-router";
import LiquidEther from "./Components/LiquidEther.jsx";
import Navigation from "./Components/Navigation.jsx";

createRoot(document.getElementById('root')).render(
      <BrowserRouter>
          <div className="absolute top-0 left-0 w-full h-full z-0 opacity-40">
              <LiquidEther
                  colors={[ '#2eff27', '#baff9f', '#b2ef9e' ]}
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
          <Navigation />
          <Routes>
              <Route index element={<App />} />
          </Routes> 
      </BrowserRouter>,
)
