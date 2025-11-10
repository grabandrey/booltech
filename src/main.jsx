import { createRoot } from 'react-dom/client'
import './index.css'
import Root from "./root.jsx";
import LanguageProvider from "./Context/LanguageProvider.jsx";


createRoot(document.getElementById('root')).render(
    <LanguageProvider>
        <Root/>
    </LanguageProvider>
)
