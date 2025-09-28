import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useTheme } from './contexts/ThemeContext'
import GlobalStyles from './styles/GlobalStyles'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import AppContainer from './utils/AppContainer'
import Spinner from './components/GDG-Spinner'
import CertificateDisplay from './pages/CertificateDisplay'
import CheckOut from './pages/CheckOut'
const HomePage =lazy(()=>import( './pages/HomePage'));
const Events =lazy(()=>import('./pages/Events'));
const Team =lazy(()=>import('./pages/Team'));
const AuthPage=lazy(()=>import('./pages/AuthPage'));

const AuthProvider =lazy(()=>import('./contexts/AuthContext'));
const AuthCallback =lazy(()=>import('./pages/AuthCallback'));
const About =lazy(()=>import('./pages/About'));
const FollowCursor =lazy(()=>import('./components/FollowCursor'));
function App() {
  const { theme } = useTheme();

  
  useEffect(() => {
    document.title = "GDG MMMUT - Google Developer Group"
  }, []);

  return (
    <AuthProvider>
      <Suspense fallback={<Spinner />}>
      {/* Using StyledThemeProvider to apply the theme */}
        <StyledThemeProvider theme={theme}>
      <GlobalStyles />
      <FollowCursor />
      <Routes>
            <Route element={<AppContainer />} >
             <Route path='/' index element={<HomePage />} />
            <Route path='/events' element={<Events />} />
            <Route path='/about' element={<About />} />
            <Route path='/team' element={<Team />} />
            
             </Route>
             <Route path='/auth' element={<AuthPage />} />
             <Route path="/auth/callback" element={<AuthCallback/>} />
             <Route path="/verification/:serial" element={<CertificateDisplay />} />
             <Route path='/rsvp' element={<CheckOut />} />
          </Routes>
    </StyledThemeProvider>
      </Suspense>
    </AuthProvider>
  )
}

export default App