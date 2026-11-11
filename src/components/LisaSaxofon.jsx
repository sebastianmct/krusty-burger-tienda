import Personaje from "./Personaje";
import { useRef } from 'react';

export default function LisaSaxofon() {
  const audioRef = useRef(null);

  const reproducirAudio = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  return (
    <div className="kb-lisa">
      <audio
        ref={audioRef}
        src={`${import.meta.env.BASE_URL}assets/intro-saxofon.mp3`}
      />
      <Personaje quien="lisa" tam="lg" />
      <span className="kb-sax" role="img" aria-label="Saxofón">
        <img
          src={`${import.meta.env.BASE_URL}assets/saxofon.png`}
          alt="Saxofón"
          onClick={reproducirAudio}
          role="button"
          tabIndex={0}
          style={{ cursor: 'pointer' }}
        />
      </span>
      <span className="kb-nota kb-nota-1" aria-hidden="true">
        ♪
      </span>
      <span className="kb-nota kb-nota-2" aria-hidden="true">
        ♫
      </span>
      <span className="kb-nota kb-nota-3" aria-hidden="true">
        ♪
      </span>
      <p className="kb-lisa-texto">Lisa toca jazz mientras lees.</p>
    </div>
  );
}