import { useRef, useState, ChangeEvent } from 'react';

import {
  useStateContext,
  useDispatchContext,
} from '../../Context/RecipeContext';

import { getAuth } from 'firebase/auth';

import SearchBar from '../search_bar/SearchBar';

import { Link } from 'react-router-dom';

import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { AiOutlineClose, AiOutlineSearch } from 'react-icons/ai';
import { BsBookmarkHeart } from 'react-icons/bs';

import { CSSTransition } from 'react-transition-group';
import styles from './navbar.module.css';

import { useOutsideClick } from '../../hooks/useOutsideClick';

export default function Navbar() {
  const [isRecipesDropdownVisible, setIsRecipesDropdownVisible] =
    useState<boolean>(false);

  const [isRecipesDropdownMobileVisible, setIsRecipesDropdownMobileVisible] =
    useState<boolean>(false);
  const [isLoginDropdownVisible, setIsLoginDropdownVisible] =
    useState<boolean>(false);

  const [showNavbarMobile, setShowNavbarMobile] = useState<boolean>(false);
  const [navbarClasses, setNavbarClasses] = useState<string>(styles.hide);

  const [searchInput, setSearchInput] = useState<string>('');

  const { userData, isSignedIn } = useStateContext();
  const { dispatch } = useDispatchContext();

  // References DOM elements to be used for the outside clicker
  const recipeDropdownRef = useRef<HTMLLIElement>(null);
  const recipeDropdownMobileRef = useRef<HTMLLIElement>(null);
  const loginDropdownRef = useRef<HTMLLIElement>(null);
  const navbarRef = useRef<HTMLUListElement>(null);

  // Handles clicking outside of the referenced DOM element
  const HideRecipesDropdownMobile = (): void => {
    setIsRecipesDropdownMobileVisible(() => false);
  };
  useOutsideClick(recipeDropdownMobileRef, HideRecipesDropdownMobile);

  const HideRecipesDropdown = (): void => {
    setIsRecipesDropdownVisible(() => false);
  };
  useOutsideClick(recipeDropdownRef, HideRecipesDropdown);

  const HideLoginDropdown = (): void => {
    setIsLoginDropdownVisible(() => false);
  };
  useOutsideClick(loginDropdownRef, HideLoginDropdown);

  const HideNavbarMobile = (): void => {
    setShowNavbarMobile(() => false);
    if (isRecipesDropdownMobileVisible || isLoginDropdownVisible) {
      setIsRecipesDropdownMobileVisible(() => false);
      setIsLoginDropdownVisible(() => false);
    }
  };
  useOutsideClick(navbarRef, HideNavbarMobile);

  // Shows the navbar on the click of the menu. Used on smaller screens.
  function ShowNavbarMobile(): void {
    setShowNavbarMobile(() => true);
  }

  function SlideInNavbarMobile(): void {
    setNavbarClasses(styles.show);
  }

  function SlideOutNavbarMobile(): void {
    setNavbarClasses(styles.hide);
  }

  const HandleSearch = (): void => {};

  const auth = getAuth();
  const HandleSignOut = (): void => {
    dispatch({ type: 'SET_USER_DATA', payload: null });
    dispatch({ type: 'SET_FAVORITES', payload: [] });
    dispatch({ type: 'SET_IS_SIGNED_IN', payload: false });
    auth.signOut();
    alert('Signed Out!');
  };

  return (
    <>
      <header className='wrapper'>
        <nav className={styles.navbar}>
          <div className={styles.website_name}>
            <h2>
              <Link className={styles.no_underline} to='/recipe-website/'>
                My Favorite Recipes
              </Link>
            </h2>
          </div>

          <ul ref={navbarRef} className={styles.navbar_links}>
            {/* Recipes Tab Start */}
            <li
              className={` ${styles.dropdown} ${styles.recipes} `}
              ref={recipeDropdownRef}
            >
              <div>
                <span
                  className={`${styles.link} ${styles.click_text}`}
                  onClick={() =>
                    setIsRecipesDropdownVisible(!isRecipesDropdownVisible)
                  }
                >
                  Recipes
                </span>
                <IoIosArrowDown
                  className={
                    !isRecipesDropdownVisible
                      ? styles.icon_arrow_down
                      : styles.hide
                  }
                />
                <IoIosArrowUp
                  className={
                    isRecipesDropdownVisible
                      ? styles.icon_arrow_up
                      : styles.hide
                  }
                />
              </div>
              {isRecipesDropdownVisible && (
                <ul
                  className={`${styles.dropdown_content} animate__animated animate__fadeIn`}
                >
                  <li>
                    <Link
                      onClick={HideRecipesDropdown}
                      className={styles.dropdown_link}
                      to='/lunch-recipes'
                    >
                      Lunch
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={HideRecipesDropdown}
                      className={styles.dropdown_link}
                      to='/dinner-recipes'
                    >
                      Dinner
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={HideRecipesDropdown}
                      className={styles.dropdown_link}
                      to='/side-recipes'
                    >
                      Sides
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={HideRecipesDropdown}
                      className={styles.dropdown_link}
                      to='/dessert-recipes'
                    >
                      Dessert
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={HideRecipesDropdown}
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

            {!isSignedIn ? (
              <>
                <li className={styles.button_container}>
                  <Link to='login'>
                    <button type='button' className={styles.login_button}>
                      Log In
                    </button>
                  </Link>
                </li>

                <li className={styles.button_container}>
                  <Link to='/signUp' className={styles.signUp_button}>
                    <button type='button' className={styles.signUp_button}>
                      Sign Up
                    </button>
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>{userData?.username}</li>
                <li className={styles.button_container}>
                  <button
                    type='button'
                    className={styles.login_button}
                    onClick={HandleSignOut}
                  >
                    Log Out
                  </button>
                </li>
              </>
            )}
          </ul>

          <div className={styles.favorites}>
            <Link to='/bookmarked'>
              <BsBookmarkHeart />
            </Link>
          </div>
          <SearchBar />
        </nav>

        <nav className={`${styles.navbar_mobile} ${styles.mobile}`}>
          <div onClick={ShowNavbarMobile} className={`${styles.toggle_btn}`}>
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
                className={`${styles.close_btn}`}
              />

              <li className={`${styles.mobile_search}`}>
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
                      !isRecipesDropdownMobileVisible
                        ? styles.icon_arrow_down
                        : styles.hide
                    }
                  />
                  <IoIosArrowUp
                    className={
                      isRecipesDropdownMobileVisible
                        ? styles.icon_arrow_up
                        : styles.hide
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
                    className={
                      !isLoginDropdownVisible
                        ? styles.icon_arrow_down
                        : styles.hide
                    }
                  />
                  <IoIosArrowUp
                    className={
                      isLoginDropdownVisible
                        ? styles.icon_arrow_up
                        : styles.hide
                    }
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

          <div className={styles.favorites}>
            <Link onClick={HideNavbarMobile} to='/bookmarked'>
              <BsBookmarkHeart />
            </Link>
          </div>
          <SearchBar />
        </nav>
      </header>
    </>
  );
}
