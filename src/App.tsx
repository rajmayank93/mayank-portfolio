import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';
import Experience from './components/Experience/Experience';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import './styles/global.css';

// Minimal Chakra theme — reset most defaults so our vanilla CSS leads
const theme = extendTheme({
  fonts: {
    heading: `'Fraunces', Georgia, serif`,
    body: `'DM Sans', system-ui, sans-serif`,
  },
  colors: {
    brand: {
      50: '#e6f0eb',
      500: '#2a5c45',
      900: '#181810',
    },
  },
  styles: {
    global: {
      // Chakra's global reset is turned off — our global.css handles it
      body: {
        bg: 'transparent',
        color: 'inherit',
      },
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
  return (
    <ChakraProvider theme={theme}>
      <Navbar />
      <main>
        <Hero />
        <Experience />
        <Projects />
        <About />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </ChakraProvider>
  );
}
