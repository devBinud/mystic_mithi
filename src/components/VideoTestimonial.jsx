import { useRef, useState } from 'react';
import { FaPlay } from 'react-icons/fa6';
import reviewVideo from '../assets/videos/video_review_by_client.mp4';

// Portrait (9:16) reader video review with a click-to-play cover.
// preload="metadata" keeps the 22MB file from downloading until the visitor presses play.
export default function VideoTestimonial() {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    setPlaying(true);
    v.play().catch(() => setPlaying(false));
  };

  return (
    <div className="mm-video-review">
      <div className="mm-video-frame">
        <video
          ref={videoRef}
          src={`${reviewVideo}#t=0.1`}
          preload="metadata"
          playsInline
          controls={playing}
          onEnded={() => setPlaying(false)}
        />
        {!playing && (
          <button type="button" className="mm-video-cover" onClick={handlePlay} aria-label="Play reader video review">
            <span className="mm-video-play">
              <FaPlay size={20} />
            </span>
            <span className="mm-video-badge">Watch · 1:13</span>
          </button>
        )}
      </div>

      <div className="mm-video-copy">
        <span className="insp-eyebrow">IN THEIR OWN WORDS</span>
        <h3 className="mm-video-title">A reader&rsquo;s video review</h3>
        <p>
          Some feelings are better spoken than written. A reader opens <em>When the Mystic Meets a
          Starfish</em> and shares, in their own voice, what its pages meant to them.
        </p>
      </div>
    </div>
  );
}
