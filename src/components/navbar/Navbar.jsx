
import React, { useEffect, useState } from 'react';
import './navbar.css';

const Navbar = () => {

    const [toggle, setToggle] = useState(false);

    
    useEffect(() => {

        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                setToggle(false);
            }
        };

        window.addEventListener('keydown', handleEscape);

        return () => {
            window.removeEventListener('keydown', handleEscape);
        };

    }, []);

    return (

        <div className="navWrapper">

            {/* LOGO */}

            <a href="#home" className="logo-desktop">
                AP.
            </a>

            {/* MENU  */}

            <nav className="navigation">

                <button
                    className="hamburger"
                    onClick={() => setToggle(!toggle)}
                    aria-label={toggle ? 'Close menu' : 'Open menu'}
                    aria-expanded={toggle}
                    aria-controls="nav-panel"
                >

                    <img
                        src={toggle
                            ? '/images/close-button.svg'
                            : '/images/menu.svg'
                        }
                        alt=""
                    />

                </button>

                <div
                    id="nav-panel"
                    className={`nav-panel ${toggle ? 'open' : ''}`}
                    inert={!toggle ? true : undefined}
                >

                    <ul>

                        <li>
                            <a href="#home" onClick={() => setToggle(false)}>
                                Home
                            </a>
                        </li>

                        <li>
                            <a href="#about" onClick={() => setToggle(false)}>
                                About
                            </a>
                        </li>

                        <li>
                            <a href="#projects" onClick={() => setToggle(false)}>
                                Projects
                            </a>
                        </li>

                        <li>
                            <a href="#contact" onClick={() => setToggle(false)}>
                                Contact
                            </a>
                        </li>

                    </ul>

                </div>

            </nav>

        </div>

    );
};

export default Navbar;
