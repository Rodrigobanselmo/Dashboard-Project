import React, { useContext } from "react"
import usePersistedState from '../hooks/usePersistedState.js';


const ThemeContext = React.createContext()

export function useThemeContext() {
  return useContext(ThemeContext)
}

export function ThemeContextProvider({ children }) {
  const [theme, setTheme] = usePersistedState('theme', 'dark');
  console.log('theme')
  return (
    <ThemeContext.Provider value={{theme,setTheme}}>
      {children}
    </ThemeContext.Provider>
  )
}




/*     notification.modal({
      title:'Usuário Adicionado',
      text:'Um email de autenticação foi enviado aos usuários para se tornarem membros de sua equipe.',
      type:'inform',
      rightBnt:'OK',
      open:true,
    }) */
