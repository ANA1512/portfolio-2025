import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './TypingText.css'; // Assurez-vous d'importer les styles CSS

const TypingText = ({ text, delay = 0, className = '' }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const letters = containerRef.current.querySelectorAll('.letter');

    gsap.fromTo(
      letters,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.05,
        stagger: 0.05,
        delay,
        ease: "power1.inOut",
      }
    );
  }, [text, delay]);

  return (
    <div className={`typing-text-container ${className}`} ref={containerRef}>
      {text.split('').map((char, index) => (
        <span key={index} className="letter">
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  );
};

export default TypingText;
