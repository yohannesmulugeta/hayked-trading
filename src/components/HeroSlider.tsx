import { useEffect, useState } from 'react';
import { assetUrl } from '../lib/assets';

export type HeroSlide = {
  image: string;
  label: string;
  alt: string;
};

type HeroSliderProps = {
  slides: HeroSlide[];
  interval?: number;
};

export function HeroSlider({ slides, interval = 6500 }: HeroSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (slides.length < 2 || isPaused) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, interval);

    return () => window.clearInterval(timer);
  }, [interval, isPaused, slides.length]);

  if (!slides.length) return null;

  return (
    <div
      className="hero-slider"
      aria-label="Hayked coffee journey"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
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

      <div className="hero-slider__controls" aria-label="Choose hero image">
        {slides.map((slide, index) => (
          <button
            key={slide.label}
            type="button"
            className={`hero-slider__dot${index === activeIndex ? ' hero-slider__dot--active' : ''}`}
            onClick={() => setActiveIndex(index)}
            aria-label={`Show ${slide.label}`}
            aria-current={index === activeIndex ? 'true' : undefined}
          >
            <span>{slide.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
