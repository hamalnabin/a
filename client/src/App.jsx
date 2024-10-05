import React, { Suspense, lazy } from 'react';
import { Home, About } from './containers';
import { f } from '../src/assets';
const Gallery = lazy(() => import('./containers/Gallery'));
const Contact = lazy(() => import('./containers/Contact'));
const Footer = lazy(() => import('./components/Footer'));

const App = () => (
  <div className="flex flex-col items-center w-full min-h-screen">
    <div className="w-full max-w-[1300px] py-32 px-4 lg:px-12 flex-grow flex flex-col items-center">
      <div
        className="relative w-full lg:bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${f})`, // Full-screen background
        }}
      >
        <Home />
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <About />
        <Gallery />
        <Contact />
      </Suspense>
    </div>
    <div className="w-full max-w-[1300px]">
      <Suspense fallback={<div>Loading...</div>}>
        <Footer />
      </Suspense>
    </div>
  </div>
);

export default App;
