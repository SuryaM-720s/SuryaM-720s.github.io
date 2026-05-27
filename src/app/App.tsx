import { IntroSection } from './components/IntroSection';
import { HomeSection } from './components/HomeSection';

export default function App() {
  return (
    <div
      style={{
        height: '100vh',
        overflowY: 'scroll',
        scrollSnapType: 'y mandatory',
        scrollBehavior: 'smooth',
        background: '#000',
      }}
    >
      <IntroSection />
      <HomeSection />
    </div>
  );
}
