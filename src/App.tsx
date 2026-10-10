import Navbar from './components/layout/Navbar';
import HeroSection from './components/hero/HeroSection';
import CaseFilesSection from './components/cases/CaseFilesSection';
import ExperienceSection from './components/experience/ExperienceSection';
import ToolkitSection from './components/toolkit/ToolkitSection';
import CredentialsSection from './components/credentials/CredentialsSection';
import ContactSection from './components/contact/ContactSection';
import { ViewModeProvider } from './hooks/useViewMode';
import { ThemeProvider } from './hooks/useTheme';

export default function App() {
  return (
    <ThemeProvider>
      <ViewModeProvider>
        <div className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] transition-colors duration-300">
          <Navbar />
          <main>
            <HeroSection />
            <hr className="section-divider" />
            <CaseFilesSection />
            <hr className="section-divider" />
            <ExperienceSection />
            <hr className="section-divider" />
            <ToolkitSection />
            <hr className="section-divider" />
            <CredentialsSection />
            <hr className="section-divider" />
            <ContactSection />
          </main>
        </div>
      </ViewModeProvider>
    </ThemeProvider>
  );
}
