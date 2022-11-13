import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { CSSTransition } from 'react-transition-group';
import styles from './navbar.module.css';

export default function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const [navbarClasses, setNavbarClasses] = useState(styles.hide);
  const dropdownRef = useRef<any>();

  // Shows the navbar on the click of the menu. Used on smaller screens.
  function ShowNavbar() {
    setShowNavbar(true);
  }

  function ShowNavbarDropdown() {
    setNavbarClasses(styles.show);
  }

  // Hides the navbar on the click of a x. Used on smaller screens.
  function HideNavbar() {
    setShowNavbar(false);
  }

  function HideNavbarDropdown() {
    setNavbarClasses(styles.hide);
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
        <nav className={styles.navbar}>
          <div className={`${styles.website_name} ${styles.mobile}`}>
            <h2>
              <Link className={styles.no_underline} to='/recipe-website'>
                My Favorite Recipes
              </Link>
            </h2>
          </div>

          <AiOutlineMenu
            onClick={ShowNavbar}
            className={`${styles.toggle_btn} ${styles.mobile}`}
          />
          <CSSTransition
            in={showNavbar}
            timeout={1000}
            classNames={{
              enterActive: 'animate__fadeInRight',
              exitActive: 'animate__fadeOutRight',
            }}
            onEnter={ShowNavbarDropdown}
            onExited={HideNavbarDropdown}
            className={`animate__animated ${styles.navbar_links} ${navbarClasses}`}
          >
            <ul>
              <AiOutlineClose
                onClick={HideNavbar}
                className={`${styles.close_btn} ${styles.mobile}`}
              />
              <li className={styles.website_name}>
                <h2>
                  <Link
                    className={`${styles.link} ${styles.no_underline}`}
                    to='/recipe-website'
                  >
                    My Favorite Recipes
                  </Link>
                </h2>
              </li>
              <li className={styles.dropdown}>
                <a
                  className={`${styles.link} ${styles.click_text}`}
                  ref={dropdownRef}
                  onClick={ToggleDropdown}
                  href='#'
                >
                  Recipes
                </a>
                <IoIosArrowDown
                  className={
                    showDropdown == false ? styles.icon_arrow_down : styles.hide
                  }
                />
                <IoIosArrowUp
                  className={
                    showDropdown == true ? styles.icon_arrow_up : styles.hide
                  }
                />
                <ul
                  className={
                    showDropdown == true
                      ? `${styles.dropdown_content} animate__animated animate__flipInX`
                      : styles.hide
                  }
                >
                  <li>
                    <Link className={styles.dropdown_link} to='/lunch-recipes'>
                      Lunch
                    </Link>
                  </li>
                  <li>
                    <Link className={styles.dropdown_link} to='/dinner-recipes'>
                      Dinner
                    </Link>
                  </li>
                  <li>
                    <Link className={styles.dropdown_link} to='/side-recipes'>
                      Sides
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={styles.dropdown_link}
                      to='/dessert-recipes'
                    >
                      Dessert
                    </Link>
                  </li>
                  <li>
                    <Link className={styles.dropdown_link} to='/all-recipes'>
                      View All
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link className={styles.link} to='/quick-recipes'>
                  30 Minutes Or Less
                </Link>
              </li>
              <li>
                <Link className={styles.link} to='/most-recent-recipes'>
                  Most Recent
                </Link>
              </li>
              <li>
                <Link className={styles.link} to='/favorites'>
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
