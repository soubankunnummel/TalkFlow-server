 "use client"
import { ThemeProvider } from 'next-themes'

function TeamProvider({children}) {
  return (
    <ThemeProvider enableSystem={true} attribute='class'>
    {children}
  </ThemeProvider>
  )
}

export default TeamProvider