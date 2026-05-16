import { useRef } from "react";
import { useWindowManager } from "../hooks/useWindowManager";
import MacBookShell from "./layout/MacBookShell";
import Screen from "./layout/Screen";

/** Root desktop component — wires the window manager to the MacBook UI */
export default function Mac() {
  const screenRef = useRef<HTMLDivElement>(null);
  const {
    windows,
    activeZ,
    hasFullscreenWindow,
    openApp,
    closeApp,
    toggleMinimize,
    toggleFullscreen,
    focusApp,
  } = useWindowManager();

  return (
    <section className="flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#030207] p-6 font-sans text-white sm:p-10">
      <MacBookShell>
        <Screen
          screenRef={screenRef}
          windows={windows}
          activeZ={activeZ}
          hasFullscreenWindow={hasFullscreenWindow}
          onOpenApp={openApp}
          onCloseApp={closeApp}
          onMinimize={toggleMinimize}
          onFullscreen={toggleFullscreen}
          onFocus={focusApp}
        />
      </MacBookShell>
    </section>
  );
}
