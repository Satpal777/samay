import type { MouseEvent } from "react";

interface WindowControlsProps {
  onClose: () => void;
  onMinimize: () => void;
  onFullscreen: () => void;
}

/** macOS-style traffic light window controls (close, minimize, fullscreen) */
export default function WindowControls({
  onClose,
  onMinimize,
  onFullscreen,
}: WindowControlsProps) {
  const stopPropagation = (
    e: MouseEvent,
    handler: () => void
  ) => {
    e.stopPropagation();
    handler();
  };

  return (
    <div className="group/btns flex items-center gap-2">
      <button
        onClick={(e) => stopPropagation(e, onClose)}
        className="flex h-3 w-3 items-center justify-center rounded-full border border-black/10 bg-[#ff5f57] hover:brightness-110"
        aria-label="Close window"
      >
        <span className="text-[8px] font-bold text-black/60 opacity-0 group-hover/btns:opacity-100">
          ✕
        </span>
      </button>

      <button
        onClick={(e) => stopPropagation(e, onMinimize)}
        className="flex h-3 w-3 items-center justify-center rounded-full border border-black/10 bg-[#ffbd2e] hover:brightness-110"
        aria-label="Minimize window"
      >
        <span className="text-[8px] font-bold text-black/60 opacity-0 group-hover/btns:opacity-100">
          −
        </span>
      </button>

      <button
        onClick={(e) => stopPropagation(e, onFullscreen)}
        className="flex h-3 w-3 items-center justify-center rounded-full border border-black/10 bg-[#28c840] hover:brightness-110"
        aria-label="Toggle fullscreen"
      >
        <span className="text-[8px] font-bold text-black/60 opacity-0 group-hover/btns:opacity-100">
          ⤢
        </span>
      </button>
    </div>
  );
}
