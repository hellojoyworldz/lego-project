import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import HomeContainer from './containers/HomeContainer';
import AboutContainer from './containers/AboutContainer';
import PageTransition from './components/PageTransition';
import './i18n';

const AnimatedRoutes = () => {
  const location = useLocation();
  const animation = (location.state as { animation?: 'menu' | 'sub' | 'back' } | null)?.animation;
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition animation={animation ?? 'menu'}>
              <HomeContainer />
            </PageTransition>
          }
        />
        <Route
          path="/about"
          element={
            <PageTransition animation={animation ?? 'sub'}>
              <AboutContainer />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;
