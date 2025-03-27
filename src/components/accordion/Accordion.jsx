import {  useRef, useEffect, useState } from "react";
import "./accordion.css";
import { motion,  useScroll, useTransform } from "motion/react";
import Project from '../../Data/ProjectData';


const Portfolio = () => {
  const [isMobile, setIsMobile] = useState(false);
  const ref = useRef(null);
   // - Accordion state, we track which project is open
   const [openProjectId, setOpenProjectId] = useState(null);

   // - Toggle project
   const toggleProject = (id) => {
     if (openProjectId === null) {
       setOpenProjectId(id);
     } else {
       setOpenProjectId(null); 
       
     }
   };

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

  // framer scroll horizontal
  const { scrollYProgress } = useScroll({ target: ref });
  const xTranslate = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -window.innerWidth * Project.length]
  );

  return (
    <div className="section-project" ref={ref}>
      <motion.div className="hori-section" style={{ x: isMobile ? 0 : xTranslate }} >
        <div className="empty"/>
        {Project.map((projects) => (
          <div
            className="accordion-item"
            key={projects.id}
            onClick={() => toggleProject(projects.id)}
          >
            <div className="accordion-header" style={{ display: "flex", justifyContent:"center"}}>
              {/* icon open close right and left*/}
               {projects.id % 2 !==0 &&(
                  <span
                    className= "circle"
                    style ={{marginRight :"8px" , fontSize:"20px"}}>
                    {openProjectId === projects.id ? "-" : "+"}
                  </span>
                )}
               <div className="text">
               <span>{projects.name}</span>
               </div>
             {projects.id % 2 ===0 &&(
                <span
                  className ="circle"
                  style ={{marginLeft :"8px", fontSize:"20px"}}>
                {openProjectId === projects.id ? "-" : "+"}
                </span>
             )}
            </div>
            {openProjectId === projects.id && (
              <div className="accordion-content">
                 <video
                  className="video-project"
                  controls
                  autoPlay
                  src={projects.videos} 
                  alt={projects.name}
                />
                <p>{projects.description}</p>
                <button onClick={() => window.open(projects.videos)}>Watch Video</button>
              </div>
            )}     
          </div>
        ))}
      </motion.div>
      <section />
      
    </div>
  );
};

export default Portfolio;
