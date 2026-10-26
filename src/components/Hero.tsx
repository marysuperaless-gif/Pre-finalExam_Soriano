import { useState } from "react";

const slides = [
  { small: "GIRLY COLLECTION 2026", title: "BUY MORE IN LOW COST" },
  { small: "NEW ARRIVALS", title: "FRESH LOOKS EVERY WEEK" },
  { small: "LIMITED OFFER", title: "UP TO 40% OFF SALE" },
];


export default function Hero() {
  const [index, setIndex] = useState(0);
  const slide = slides[index];
  const prev = () => setIndex((index - 1 + slides.length) % slides.length);
  const next = () => setIndex((index + 1) % slides.length);
  return (
    <section className="hero" aria-label="Featured banner">
      <button onClick={prev} aria-label="Previous slide">&lsaquo;</button>
      <div className="hero-text">
        <p>{slide.small}</p>
        <h2>{slide.title}</h2>
        <span className="hero-btn">DISCOVER MORE</span>
      </div>
      <button onClick={next} aria-label="Next slide">&rsaquo;</button>
    </section>
  );
}
