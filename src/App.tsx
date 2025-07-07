import { Header } from "./features/landing/Header";
import { Hero } from "./features/landing/Hero";
import { Stats } from "./features/landing/Stats";
import { Features } from "./features/landing/Features";
import { Footer } from "./features/landing/Footer";

function App() {
  return (
    <div className='bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 text-white font-sans'>
      <div className='absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none'>
        <div className='absolute w-96 h-96 bg-blue-500/30 rounded-full -top-20 -left-40 animate-pulse'></div>
        <div className='absolute w-96 h-96 bg-blue-500/30 rounded-full -bottom-20 -right-40 animate-pulse delay-500'></div>
      </div>

      <Header />
      <main>
        <Hero />
        <Stats />
        <Features />
        <Footer />
      </main>
    </div>
  );
}

export default App;
