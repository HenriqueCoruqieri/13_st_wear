import { Footer } from '@/components/layout/Footer';
import { About } from '@/components/sections/About';
import { Hero } from '@/components/sections/Hero';

function App() {
  return (
    <>
      <main>
        <Hero />
        <About />
      </main>
      <Footer />
    </>
  );
}

export default App;
