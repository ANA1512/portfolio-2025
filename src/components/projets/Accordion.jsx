
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

  const [isMobile, setIsMobile] = useState(
    () => window.innerWidth <= 767
  );

  const containerRef = useRef(null);

  // RESPONSIVE MOBILE

  useEffect(() => {

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };

  }, []);


  // ANIMATION GSAP - DESKTOP

  useEffect(() => {

    if (isMobile || !containerRef.current) return;

    const container = containerRef.current;

    const ctx = gsap.context(() => {

      const sections = gsap.utils.toArray(".project-section");

      sections.forEach((section) => {

        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "bottom top",
          pin: true,
          pinSpacing: false,
          scrub: true,
          invalidateOnRefresh: true,
          markers: false,
        });

      });

    }, container);

    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
    };

  }, [isMobile]);


  // CONFIGURATION CAROUSEL MOBILE

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };


  return (

    <div
      ref={containerRef}
      className="portfolio-wrapper"
    >

      {isMobile ? (

        // VERSION MOBILE

        <div className="carousel-container">

          <Slider {...sliderSettings}>

            {AllProject.map((project) => (

              <div
                key={project.id}
                className="carousel-item"
              >

                <video
                  src={project.videos}
                  controls
                  muted
                  playsInline
                  preload="metadata"
                />

                <h2>{project.name}</h2>

                <p>{project.description}</p>

              </div>

            ))}

          </Slider>

        </div>

      ) : (

        // VERSION DESKTOP

        AllProject.map((project) => (

          <section
            key={project.id}
            className="project-section"
          >

            <div className="project-inner">

              <div className="project-header">

                <h2>{project.name}</h2>

              </div>

              <video
                className="full-width-video"
                src={project.videos}
                controls
                playsInline
                preload="metadata"
              />

              <p className="description">
                {project.description}
              </p>

            </div>

          </section>

        ))

      )}

      {/* SPACER DESKTOP GÉRÉ PAR REACT */}

      {!isMobile && <div className="scroll-spacer" />}

    </div>

  );
};

export default Portfolio;
