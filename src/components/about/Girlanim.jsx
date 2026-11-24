import React from 'react'

function Girlanim() {
  return (
    <div>
        <video 
          autoPlay
          loop
          muted
          playsInline
          style={{ width: '100%', height: 'auto' }}
        
        >

         <source src= '/videos/Portfolio-portrait.mp4' type ="video/mp4"/>

        </video>
      
    </div>
  )
}

export default Girlanim
