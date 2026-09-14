import { useEffect, useRef, useState } from 'react';

import heroFrame from '@/assets/frame.png';
import heroVideo from '@/assets/hero-video.mp4';
import { Button } from '@/components/ui/Button';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { hero } from '@/data/hero';

// Fallback color is mandatory: without it the text disappears in browsers
// that don't support -webkit-text-stroke, since -webkit-text-fill-color
// only hides the fill in browsers that support all three properties.
const outlineTextStyle = {
  color: 'var(--color-paper)',
  WebkitTextStroke: '1.5px var(--color-paper)',
  WebkitTextFillColor: 'transparent',
};

// Button's own size classes ship a `has-[>svg]:px-*` override that would
// otherwise win over a plain `px-6`, since they target different modifier
// groups and aren't deduped by the class merger.
const ctaClassName =
  'border-paper text-paper hover:bg-paper hover:text-ink focus-visible:border-paper focus-visible:ring-paper focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-ink mt-8 min-h-11 border px-6 py-3 has-[>svg]:px-6 sm:mt-10';

function Hero() {
  const videoRef = useRef(null);
  const [videoStarted, setVideoStarted] = useState(false);
  const accessibleTitle = `${hero.title.mark} ${hero.title.lines.join(' ')}`;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const tryPlay = () => {
      // Setting muted programmatically in addition to the attribute satisfies
      // stricter browser autoplay checks that inspect the IDL attribute, not HTML.
      video.muted = true;
      video.play().catch(() => {});
    };

    // Immediate attempt.
    tryPlay();

    // Delayed retry: some mobile browsers need the layout to settle before
    // honouring a programmatic play() call.
    const retryTimer = setTimeout(tryPlay, 500);

    // Last-resort fallback for iOS Low Power Mode, which blocks all autoplay
    // until the first user gesture regardless of mute state.
    document.addEventListener('touchstart', tryPlay, { once: true });
    document.addEventListener('click', tryPlay, { once: true });

    return () => {
      clearTimeout(retryTimer);
      document.removeEventListener('touchstart', tryPlay);
      document.removeEventListener('click', tryPlay);
    };
  }, []);

  const ctaContent = (
    <>
      <WhatsAppIcon className="text-whatsapp h-5 w-5" />
      <span className="tracking-label font-sans text-xs uppercase">{hero.cta.label}</span>
    </>
  );

  return (
    <section aria-label="Abertura" className="bg-ink relative isolate h-svh overflow-hidden">
      {/* h-svh, not h-screen: the mobile browser toolbar collapses and vh would jump the
          layout. bg-ink looks unused because the video covers it, but it is the only
          backdrop left once motion-reduce hides the video, and it prevents a white flash
          while the video loads. */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden pointer-events-none"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        onPlay={() => setVideoStarted(true)}
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      {/* Covers the video until it starts playing, hiding the native browser play
          overlay that appears when autoplay is deferred (e.g. iOS Low Power Mode).
          Fades out on play via videoStarted; stays visible for motion-reduce. */}
      <img
        src={heroFrame}
        alt=""
        aria-hidden="true"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 motion-reduce:opacity-100 ${videoStarted ? 'opacity-0' : 'opacity-100'}`}
      />

      <div
        aria-hidden="true"
        className="from-ink via-ink/70 to-ink/35 absolute inset-0 bg-linear-to-t from-15% via-55%"
      />

      <div className="absolute inset-x-0 bottom-0 px-6 pt-16 pb-10 sm:px-10 sm:pb-14 md:px-14 md:pb-16">
        <h1 aria-label={accessibleTitle} className="font-display leading-[0.9] uppercase">
          <span aria-hidden="true" className="text-paper block text-6xl sm:text-7xl md:text-8xl">
            {hero.title.mark}
          </span>
          {hero.title.lines.map((line) => (
            <span
              key={line}
              aria-hidden="true"
              className="block text-6xl sm:text-7xl md:text-8xl"
              style={outlineTextStyle}
            >
              {line}
            </span>
          ))}
        </h1>

        <p className="text-muted-foreground mt-6 max-w-xs font-sans text-sm sm:mt-8 sm:text-sm">
          {hero.tagline.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>

        <Button asChild variant="ghost" className={ctaClassName}>
          <a href={hero.cta.href} target="_blank" rel="noopener noreferrer">
            {ctaContent}
          </a>
        </Button>
      </div>
    </section>
  );
}

export { Hero };
