import { useEffect, useState } from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { ThemeProvider } from './context/ThemeContext';
import Navbar          from './components/Navbar/Navbar';
import Hero            from './components/Hero/Hero';
import Experience      from './components/Experience/Experience';
import Projects        from './components/Projects/Projects';
import About           from './components/About/About';
import Skills          from './components/Skills/Skills';
import Magic           from './components/Magic/Magic';
import Contact         from './components/Contact/Contact';
import Footer          from './components/Footer/Footer';
import CommandPalette  from './components/CommandPalette/CommandPalette';
import CursorFollower  from './components/CursorFollower/CursorFollower';
import ReadingProgress from './components/ReadingProgress/ReadingProgress';
import GrainOverlay    from './components/GrainOverlay/GrainOverlay';
import './styles/global.css';

const chakraTheme = extendTheme({
  fonts: {
    heading: `'Fraunces', Georgia, serif`,
    body:    `'DM Sans', system-ui, sans-serif`,
  },
  colors: {
    brand: { 50: '#e6f0eb', 500: '#2a5c45', 900: '#181810' },
  },
  styles: {
    global: {
      body: { bg: 'transparent', color: 'inherit' },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontFamily: `'DM Sans', system-ui, sans-serif`,
        fontWeight: 500,
        borderRadius: '100px',
      },
    },
  },
});

export default function App() {
  const [paletteOpen, setPaletteOpen] = useState(false);

  // Global ⌘K / Ctrl+K shortcut
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <ThemeProvider>
      <ChakraProvider theme={chakraTheme}>
        {/* Global overlays — rendered outside main flow */}
        <CursorFollower />
        <ReadingProgress />
        <GrainOverlay />

        <Navbar onOpenPalette={() => setPaletteOpen(true)} />

        <main>
          <Hero />
          <Experience />
          <Projects />
          <About />
          <Skills />
          <Magic />
          <Contact />
        </main>

        <Footer />

        <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
      </ChakraProvider>
    </ThemeProvider>
  );
}
