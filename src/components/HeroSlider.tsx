import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { assetUrl } from '../lib/assets';

export type HeroSlide = {
  image: string;
  label: string;
  alt: string;
};

type HeroSliderProps = {
  slides: HeroSlide[];
};

export function HeroSlider({ slides }: HeroSliderProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;

    let frame = 0;
    const updateFromScroll = () => {
      frame = 0;
      const hero = rootRef.current?.closest('.hero--scroll') as HTMLElement | null;
      if (!hero) return;

      const start = hero.offsetTop;
      const distance = Math.max(hero.offsetHeight - window.innerHeight, 1);
      const nextProgress = Math.min(1, Math.max(0, (window.scrollY - start) / distance));
      const nextIndex = Math.min(slides.length - 1, Math.floor(nextProgress * slides.length));

      setProgress(nextProgress);
      setActiveIndex(nextIndex);
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateFromScroll);
    };

    updateFromScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [slides.length]);

  if (!slides.length) return null;

  const goToSlide = (index: number) => {
    const hero = rootRef.current?.closest('.hero--scroll') as HTMLElement | null;
    if (!hero) return;
    const distance = Math.max(hero.offsetHeight - window.innerHeight, 1);
    window.scrollTo({
      top: hero.offsetTop + (distance * index) / Math.max(slides.length - 1, 1),
      behavior: 'smooth',
    });
  };

  return (
    <div
      ref={rootRef}
      className="hero-slider hero-slider--scroll"
      aria-label="Hayked coffee journey controlled by page scroll"
      style={{ '--hero-progress': progress } as CSSProperties}
    >
      {slides.map((slide, index) => (
        <img
          key={slide.image}
          className={`hero-slider__image${index === activeIndex ? ' hero-slider__image--active' : ''}`}
          src={assetUrl(slide.image)}
          alt={index === activeIndex ? slide.alt : ''}
          aria-hidden={index !== activeIndex}
          loading={index === 0 ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={index === 0 ? 'high' : 'auto'}
        />
      ))}

      <div className="hero-slider__controls" aria-label="Jump to a stage of the coffee journey">
        {slides.map((slide, index) => (
          <button
            key={slide.label}
            type="button"
            className={`hero-slider__dot${index === activeIndex ? ' hero-slider__dot--active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Scroll to ${slide.label}`}
            aria-current={index === activeIndex ? 'true' : undefined}
          >
            <span>{slide.label}</span>
          </button>
        ))}
      </div>

      <div className="hero-slider__progress" aria-hidden="true">
        <span style={{ transform: `scaleX(${Math.max(progress, 0.02)})` }} />
      </div>
    </div>
  );
}
