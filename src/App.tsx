import { useState, useRef } from "react";
import "./App.css";

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const themes = [
    { background: "url('/wfh.webp')" },
    { background: "url('/city.jpg')" },
    { background: "url('/cherry.webp')" },
    { background: "url('/street.webp')" },
    { background: "url('/tower.jpg')" }
  ];

  const [themeIndex, setThemeIndex] = useState(0);

  const nextTheme = () => {
    setThemeIndex((prev) => (prev + 1) % themes.length);
  };

  const vinylOptions = {
    none: null,
    vinyl1: "/vinyls/vinyl.png",
    vinyl2: "/vinyls/vinyl01.png",
  };

  const [selectedVinyl, setSelectedVinyl] = useState<string | null>(
    vinylOptions.vinyl1
  );

  const [showUI, setShowUI] = useState(true);
  let hideTimeout: any = null;

  const handleVinylChange = () => {
    if (selectedVinyl === vinylOptions.none) {
      setSelectedVinyl(vinylOptions.vinyl1);
    } else if (selectedVinyl === vinylOptions.vinyl1) {
      setSelectedVinyl(vinylOptions.vinyl2);
    } else {
      setSelectedVinyl(vinylOptions.none);
    }
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) audio.pause();
    else audio.play();

    setIsPlaying(!isPlaying);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  
  const handleMouseMove = () => {
    setShowUI(true);

    if (hideTimeout) clearTimeout(hideTimeout);

    hideTimeout = setTimeout(() => {
      if (isPlaying) setShowUI(false);
    }, 2000);
  };


  return (
    <div
      className="app"
      onMouseMove={handleMouseMove}
      style={{
        backgroundImage: themes[themeIndex].background,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}

      onClick={() => {
        if (!selectedVinyl) togglePlay();
      }}
    >
      <button className={`theme-switch-btn ${showUI ? "controls-visible" : "controls-hidden"}`} onClick={nextTheme}>
        🩶
      </button>

      <button className={`vinyl-switch-btn ${showUI ? "controls-visible" : "controls-hidden"}`} onClick={handleVinylChange}>
        💿
      </button>

      <button className={`fullscreen-btn ${showUI ? "controls-visible" : "controls-hidden"}`} onClick={toggleFullscreen}>
        ⛶
      </button>

      <div
        className="vinyl-container"

        onClick={(e) => {
          e.stopPropagation();
          if (selectedVinyl) togglePlay();
        }}
      >
        {selectedVinyl ? (
          <img
            src={selectedVinyl}
            className={`vinyl ${isPlaying ? "spin" : ""}`}
          />
        ) : (
          <div className="no-vinyl-placeholder"></div>
        )}

        {selectedVinyl &&
          isPlaying &&
          ["🎵", "🎶", "🎼"].map((note, i) => (
            <div key={i} className={`note note-${i + 1} animate`}>
              {note}
            </div>
          ))}
      </div>

      <audio ref={audioRef} src="/song1.mp3" loop />
    </div>
  );
}

export default App;
