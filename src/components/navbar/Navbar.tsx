import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { CSSTransition } from 'react-transition-group';
import './navbar.css';

export default function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const [navbarClasses, setNavbarClasses] = useState('hide');
  const dropdownRef = useRef<any>();

  // Shows the navbar on the click of the menu. Used on smaller screens.
  function ShowNavbar() {
    setShowNavbar(true);
  }

  function ShowNavbarDropdown() {
    setNavbarClasses('show');
  }

  // Hides the navbar on the click of a x. Used on smaller screens.
  function HideNavbar() {
    setShowNavbar(false);
  }

  function HideNavbarDropdown() {
    setNavbarClasses('hide');
  }

  // Hide or shows a dropdown menu on the click of the recipes link
  function ToggleDropdown() {
    setShowDropdown(!showDropdown);
  }

  function HideDropdown() {
    setShowDropdown(false);
  }

  // Hides the dropdown menu if the user clicks anywhere on the screen
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        HideDropdown();
      }
    }
    // Bind the event listener
    document.addEventListener('click', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('click', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <>
      <header className='wrapper'>
        <nav className='navbar'>
          <div className='website-name mobile'>
            <h2>
              <Link className='no-underline' to='/'>
                My Favorite Recipes
              </Link>
            </h2>
          </div>

          <AiOutlineMenu onClick={ShowNavbar} className='toggle-btn mobile' />
          <CSSTransition
            in={showNavbar}
            timeout={1000}
            classNames={{
              enterActive: 'animate__fadeInRight',
              exitActive: 'animate__fadeOutRight',
            }}
            onEnter={ShowNavbarDropdown}
            onExited={HideNavbarDropdown}
            className={`animate__animated navbar-links ${navbarClasses}`}
          >
            <ul>
              <AiOutlineClose
                onClick={HideNavbar}
                className='close-btn mobile'
              />
              <li className='website-name'>
                <h2>
                  <Link className=' link no-underline' to='/'>
                    My Favorite Recipes
                  </Link>
                </h2>
              </li>
              <li className='dropdown'>
                <a
                  className='link click-text'
                  ref={dropdownRef}
                  onClick={ToggleDropdown}
                  href='#'
                >
                  Recipes
                </a>
                <IoIosArrowDown
                  className={showDropdown == false ? 'icon-arrow-down' : 'hide'}
                />
                <IoIosArrowUp
                  className={showDropdown == true ? 'icon-arrow-up' : 'hide'}
                />
                <ul
                  className={
                    showDropdown == true
                      ? 'dropdown-content animate__animated animate__flipInX'
                      : 'hide'
                  }
                >
                  <li>
                    <Link className='dropdown-link' to='/breakfast-recipes'>
                      Breakfast
                    </Link>
                  </li>
                  <li>
                    <Link className='dropdown-link' to='/lunch-recipes'>
                      Lunch
                    </Link>
                  </li>
                  <li>
                    <Link className='dropdown-link' to='/dinner-recipes'>
                      Dinner
                    </Link>
                  </li>
                  <li>
                    <Link className='dropdown-link' to='/dessert-recipes'>
                      Dessert
                    </Link>
                  </li>
                  <li>
                    <Link className='dropdown-link' to='/all-recipes'>
                      View All
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link className='link' to='/quick-recipes'>
                  30 Minutes Or Less
                </Link>
              </li>
              <li>
                <Link className='link' to='/most-recent-recipes'>
                  Most Recent
                </Link>
              </li>
              <li>
                <Link className='link' to='/favorites'>
                  Favorites
                </Link>
              </li>
            </ul>
          </CSSTransition>

          <hr />
        </nav>
      </header>
    </>
  );
}
