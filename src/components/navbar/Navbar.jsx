import React,{useEffect, useState} from 'react'
import './navbar.css'
import menu from '/public/images/menu.svg'
import close from '/public/images/close-button.svg'

const Navbar = () => {

    const [toggle, setToggle] = useState(false);
    // Stop scroll when menu mobile open
    useEffect(()=>{
     if(toggle){
        document.body.classList.add('inactive-scroll');      
     }else{
        document.body.classList.remove('inactive-scroll');
     }
    },[toggle]);

  return (
    <div className="navWrapper">
         {/* desktop- menu-logo */}
         <div className="logo-desktop">
                <img src="images/logo.svg" alt="logo" className="logo" />
            </div>
        <nav className="navigation">
           
            <div className="nav-section">
                <ul className="list-section">
                    <p>Home</p>
                    <p>Projects</p>
                    <p>About me</p>
                    <p>Contact</p>
                </ul>
            </div>

        {/* Mobile-show menu-logo */}
        <div className="mobile-menu">
            <div className ="hamburger">
            <img src={toggle ? close : menu} alt="" 
                onClick={() => setToggle(!toggle)}/>
            </div>
            <div className={`mobile-menu ${toggle ? "open" : "hidden"}`}>
                <ul>
                    <li>Home</li>
                    <li>Projects</li>
                    <li>About me</li>
                    <li>Contact</li>
                </ul>
            </div>
        </div>       
        </nav>
    </div>
  )
}

export default Navbar
