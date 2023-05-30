import { useRef, useState, ChangeEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useOutsideClick } from 'hooks/useOutsideClick';

import { AiOutlineClose, AiOutlineSearch } from 'react-icons/ai';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { BsBookmarkHeart } from 'react-icons/bs';

import { CSSTransition } from 'react-transition-group';
import styles from './assets/css/navbarMobile.module.css';

import SearchBar from '../searchBar/SearchBar';

export default function NavbarMobile() {
  const [isRecipesDropdownMobileVisible, setIsRecipesDropdownMobileVisible] =
    useState<boolean>(false);
  const [isLoginDropdownVisible, setIsLoginDropdownVisible] =
    useState<boolean>(false);

  const [showNavbarMobile, setShowNavbarMobile] = useState<boolean>(false);
  const [navbarClasses, setNavbarClasses] = useState<string>(styles.hide);

  const navbarRef = useRef<HTMLUListElement>(null);
  const recipeDropdownMobileRef = useRef<HTMLLIElement>(null);
  const loginDropdownRef = useRef<HTMLLIElement>(null);

  function ShowNavbarMobile(): void {
    setShowNavbarMobile(() => true);
  }

  function SlideInNavbarMobile(): void {
    setNavbarClasses(styles.show);
  }

  function SlideOutNavbarMobile(): void {
    setNavbarClasses(styles.hide);
  }

  const HideNavbarMobile = (): void => {
    setShowNavbarMobile(() => false);
    if (isRecipesDropdownMobileVisible || isLoginDropdownVisible) {
      setIsRecipesDropdownMobileVisible(() => false);
      setIsLoginDropdownVisible(() => false);
    }
  };

  const HideRecipesDropdownMobile = (): void => {
    setIsRecipesDropdownMobileVisible(() => false);
  };

  const HideLoginDropdown = (): void => {
    setIsLoginDropdownVisible(() => false);
  };

  useOutsideClick(recipeDropdownMobileRef, HideRecipesDropdownMobile);
  useOutsideClick(loginDropdownRef, HideLoginDropdown);
  useOutsideClick(navbarRef, HideNavbarMobile);
  return (
    <nav className={`${styles.navbar_mobile} mobile`}>
      <div onClick={ShowNavbarMobile} className='toggle_btn'>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className={styles.website_name}>
        <h2>
          <Link className='no_underline' to='/recipe-website/'>
            My Favorite Recipes
          </Link>
        </h2>
      </div>

      <CSSTransition
        in={showNavbarMobile}
        timeout={1000}
        classNames={{
          enterActive: 'animate__fadeInLeft',
          exitActive: 'animate__fadeOutLeft',
        }}
        onEnter={SlideInNavbarMobile}
        onExited={SlideOutNavbarMobile}
        className={`animate__animated ${styles.navbar_links} ${navbarClasses}`}
      >
        <ul ref={navbarRef}>
          <AiOutlineClose
            onClick={HideNavbarMobile}
            className={styles.close_btn}
          />

          <li className={styles.search_bar_mobile}>
            <SearchBar />
          </li>

          <li className={`${styles.mobile_favorites}`}>
            <div className={styles.mobile_favorites_container}>
              <Link onClick={HideNavbarMobile} to='/bookmarked'>
                <BsBookmarkHeart />
                <span>Bookmarked Recipes</span>
              </Link>
            </div>
          </li>

          {/* Recipes Tab Start */}
          <li
            className={` ${styles.dropdown} ${styles.recipes}`}
            ref={recipeDropdownMobileRef}
          >
            <div>
              <span
                className={`${styles.link} ${styles.click_text}`}
                onClick={() =>
                  setIsRecipesDropdownMobileVisible(
                    !isRecipesDropdownMobileVisible
                  )
                }
              >
                Recipes
              </span>
              <IoIosArrowDown
                className={
                  !isRecipesDropdownMobileVisible ? 'icon_arrow_down' : 'hide'
                }
              />
              <IoIosArrowUp
                className={
                  isRecipesDropdownMobileVisible ? 'icon_arrow_up' : 'hide'
                }
              />
            </div>
            {isRecipesDropdownMobileVisible && (
              <ul
                className={`${styles.dropdown_content} animate__animated animate__fadeIn`}
              >
                <li>
                  <Link
                    onClick={HideNavbarMobile}
                    className={styles.dropdown_link}
                    to='/lunch-recipes'
                  >
                    Lunch
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={HideNavbarMobile}
                    className={styles.dropdown_link}
                    to='/dinner-recipes'
                  >
                    Dinner
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={HideNavbarMobile}
                    className={styles.dropdown_link}
                    to='/side-recipes'
                  >
                    Sides
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={HideNavbarMobile}
                    className={styles.dropdown_link}
                    to='/dessert-recipes'
                  >
                    Dessert
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={HideNavbarMobile}
                    className={styles.dropdown_link}
                    to='/all-recipes'
                  >
                    View All
                  </Link>
                </li>
              </ul>
            )}
          </li>
          {/* Recipes Tab End */}

          <li
            className={`${styles.mobile_button_container} ${styles.dropdown}`}
            ref={loginDropdownRef}
          >
            <div>
              <span
                className={`${styles.link} ${styles.click_text}`}
                onClick={() =>
                  setIsLoginDropdownVisible(!isLoginDropdownVisible)
                }
              >
                More
              </span>
              <IoIosArrowDown
                className={!isLoginDropdownVisible ? 'icon_arrow_down' : 'hide'}
              />
              <IoIosArrowUp
                className={isLoginDropdownVisible ? 'icon_arrow_up' : 'hide'}
              />
            </div>
            {isLoginDropdownVisible && (
              <ul
                className={`${styles.dropdown_content} animate__animated animate__fadeIn`}
              >
                <li>
                  <button type='button' className={styles.login_button}>
                    Log In
                  </button>
                </li>
                <li>
                  <button type='button' className={styles.signUp_button}>
                    Sign Up
                  </button>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </CSSTransition>
      <SearchBar />
    </nav>
  );
}
