import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Slider from "react-slick";

import AllProject from "../../Data/ProjectData";
import "./accordion.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

gsap.registerPlugin(ScrollTrigger);

const Portfolio = () => {
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767); // Mobile max width
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      const sections = gsap.utils.toArray(".project-section");

      sections.forEach((section) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "bottom top",
          pin: true,
          pinSpacing: false,
          scrub: true,
        });
      });

      const spacer = document.createElement("div");
      spacer.style.height = "100vh";
      spacer.classList.add("scroll-spacer");
      containerRef.current.appendChild(spacer);

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    }
  }, [isMobile]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div ref={containerRef} className="portfolio-wrapper">
      {isMobile ? (
        <div className="carousel-container">
          <Slider {...sliderSettings}>
            {AllProject.map((project) => (
              <div key={project.id} className="carousel-item">
                <video
                  src={project.videos}
                  controls
                  autoPlay
                  muted
                  playsInline
                  className="full-width-video"
                />
                <h2>{project.name}</h2>
                <p>{project.description}</p>
              </div>
            ))}
          </Slider>
        </div>
      ) : (
        AllProject.map((project) => (
          <section key={project.id} className="project-section">
            <div className="project-inner">
              <div className="project-header">
              <h2>{project.name}</h2>
              </div>
              <video
                className="full-width-video"
                src={project.videos}
                controls
                autoPlay
              />
              <p className="description">{project.description}</p>
            </div>
          </section>
        ))
      )}
    </div>
  );
};

export default Portfolio;
