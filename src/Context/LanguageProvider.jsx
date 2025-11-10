import {createContext, useEffect, useState} from "react";

export const LanguageContext = createContext(null);

export default function LanguageProvider ({children}) {
    const [userLanguage, setUserLanguage] = useState('en');

    return (
        <LanguageContext.Provider value={{userLanguage,setUserLanguage}}>
            {children}
        </LanguageContext.Provider>
    );
}