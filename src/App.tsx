import { useState, useRef} from "react";
import "./App.css";

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Generate random floating notes when playing
  const notes = ["🎵", "🎶", "🎼"];

  return (
    <div className="App">
      <div className="vinyl-container" onClick={handlePlayPause}>
        <img
          src="/vinyl.png"
          alt="vinyl"
          className={`vinyl ${isPlaying ? "spin" : ""}`}
        />

        {/* Floating notes */}
        {notes.map((note, i) => (
          <div
            key={i}
            className={`note note-${i + 1} ${isPlaying ? "animate" : "paused"}`}
          >
            {note}
          </div>
        ))}
      </div>

      <audio ref={audioRef} src="/song1.mp3" />
    </div>
  );
}

export default App;
