import { createContext, useContext, useState, type ReactNode } from 'react';

type ViewMode = 'skim' | 'deep';

interface ViewModeContextType {
  viewMode: ViewMode;
  toggleViewMode: () => void;
  isDeep: boolean;
}

const ViewModeContext = createContext<ViewModeContextType>({
  viewMode: 'skim',
  toggleViewMode: () => {},
  isDeep: false,
});

export function ViewModeProvider({ children }: { children: ReactNode }) {
  const [viewMode, setViewMode] = useState<ViewMode>('skim');

  const toggleViewMode = () => {
    setViewMode((prev) => (prev === 'skim' ? 'deep' : 'skim'));
  };

  return (
    <ViewModeContext.Provider value={{ viewMode, toggleViewMode, isDeep: viewMode === 'deep' }}>
      {children}
    </ViewModeContext.Provider>
  );
}

export function useViewMode() {
  return useContext(ViewModeContext);
}
