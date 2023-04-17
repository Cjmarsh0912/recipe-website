import { useRef, useState, ChangeEvent } from 'react';

import SearchBar from '../search_bar/SearchBar';

import { Link } from 'react-router-dom';

import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { AiOutlineClose, AiOutlineSearch } from 'react-icons/ai';
import { BsBookmarkHeart } from 'react-icons/bs';

import { CSSTransition } from 'react-transition-group';
import styles from './navbar.module.css';

import { useOutsideClick } from '../../hooks/useOutsideClick';

export default function Navbar() {
  const [showRecipesDropdown, setShowRecipesDropdown] =
    useState<boolean>(false);
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [showNavbarMobile, setShowNavbarMobile] = useState<boolean>(false);
  const [navbarClasses, setNavbarClasses] = useState<string>(styles.hide);

  const [searchInput, setSearchInput] = useState<string>('');
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const recipeDropdownRef = useRef<HTMLLIElement>(null);
  const loginDropdownRef = useRef<HTMLLIElement>(null);
  const navbarRef = useRef<HTMLUListElement>(null);
  useOutsideClick(recipeDropdownRef, HideRecipesDropdown);
  useOutsideClick(loginDropdownRef, HideLoginDropdown);
  useOutsideClick(navbarRef, HideNavbarMobile);

  // Shows the navbar on the click of the menu. Used on smaller screens.
  function ShowNavbarMobile(): void {
    setShowNavbarMobile(() => true);
  }

  function SlideInNavbarMobile(): void {
    setNavbarClasses(styles.show);
  }

  // Hides the navbar on the click of a x. Used on smaller screens.
  function HideNavbarMobile(): void {
    setShowNavbarMobile(() => false);
    if (showRecipesDropdown) setShowRecipesDropdown(() => false);
  }

  function SlideOutNavbarMobile(): void {
    setNavbarClasses(styles.hide);
  }

  function HideRecipesDropdown(): void {
    setShowRecipesDropdown(() => false);
  }

  function HideLoginDropdown(): void {
    setShowLogin(() => false);
  }

  function HandleSearch(): void {}

  return (
    <>
      <header className='wrapper'>
        <nav className={styles.navbar}>
          <div
            onClick={ShowNavbarMobile}
            className={`${styles.toggle_btn} ${styles.mobile}`}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className={styles.website_name}>
            <h2>
              <Link className={styles.no_underline} to='/recipe-website/'>
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
                className={`${styles.close_btn} ${styles.mobile}`}
              />

              <li className={`${styles.mobile} mobile_search`}>
                <div className={styles.search_bar_mobile}>
                  <div className={styles.search_bar_mobile_container}>
                    <button
                      className={styles.search_button}
                      type='button'
                      onClick={HandleSearch}
                    >
                      <AiOutlineSearch />
                    </button>
                    <input
                      type='search'
                      placeholder='Search for recipes here'
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setSearchInput(e.target.value)
                      }
                      value={searchInput}
                    />
                  </div>
                </div>
              </li>

              <li className={`${styles.mobile} mobile_favorites`}>
                <div className={styles.mobile_favorites_container}>
                  <Link onClick={HideNavbarMobile} to='/favorites'>
                    <BsBookmarkHeart />
                    <span>Bookmarked Recipes</span>
                  </Link>
                </div>
              </li>

              {/* Recipes Tab Start */}
              <li
                className={` ${styles.dropdown} ${styles.recipes} `}
                ref={recipeDropdownRef}
              >
                <div>
                  <span
                    className={`${styles.link} ${styles.click_text}`}
                    onClick={() => setShowRecipesDropdown(!showRecipesDropdown)}
                  >
                    Recipes
                  </span>
                  <IoIosArrowDown
                    className={
                      !showRecipesDropdown
                        ? styles.icon_arrow_down
                        : styles.hide
                    }
                  />
                  <IoIosArrowUp
                    className={
                      showRecipesDropdown ? styles.icon_arrow_up : styles.hide
                    }
                  />
                </div>
                {showRecipesDropdown && (
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
                className={`${styles.mobile} ${styles.mobile_button_container} ${styles.dropdown}`}
                ref={loginDropdownRef}
              >
                <div>
                  <span
                    className={`${styles.link} ${styles.click_text}`}
                    onClick={() => setShowLogin(!showLogin)}
                  >
                    More
                  </span>
                  <IoIosArrowDown
                    className={
                      !showLogin ? styles.icon_arrow_down : styles.hide
                    }
                  />
                  <IoIosArrowUp
                    className={showLogin ? styles.icon_arrow_up : styles.hide}
                  />
                </div>
                {showLogin && (
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

              <li className={styles.button_container}>
                <button type='button' className={styles.login_button}>
                  Log In
                </button>
              </li>

              <li className={styles.button_container}>
                <button type='button' className={styles.signUp_button}>
                  Sign Up
                </button>
              </li>
            </ul>
          </CSSTransition>

          <div className={styles.favorites}>
            <Link onClick={HideNavbarMobile} to='/favorites'>
              <BsBookmarkHeart />
            </Link>
          </div>
          <SearchBar />
        </nav>
      </header>
    </>
  );
}
