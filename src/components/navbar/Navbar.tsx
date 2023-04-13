import {
  useRef,
  useEffect,
  useState,
  MutableRefObject,
  ChangeEvent,
} from 'react';
import { Link } from 'react-router-dom';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { AiOutlineClose, AiOutlineSearch } from 'react-icons/ai';
import { CSSTransition } from 'react-transition-group';
import styles from './navbar.module.css';

// custom hook for detecting when you click outside of an element and running a function as a result
const useOutsideClick = (
  ref: MutableRefObject<HTMLElement | null>,
  callback: () => void
) => {
  const handleClick = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [ref, callback]);
};

export default function Navbar() {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [showNavbarMobile, setShowNavbarMobile] = useState<boolean>(false);
  const [navbarClasses, setNavbarClasses] = useState<string>(styles.hide);
  const [searchInput, setSearchInput] = useState<string>('');
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const dropdownMenuRef = useRef<HTMLLIElement>(null);
  const navbarRef = useRef<HTMLUListElement>(null);
  useOutsideClick(dropdownMenuRef, HideDropdown);
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
    if (showDropdown) setShowDropdown(() => false);
  }

  function SlideOutNavbarMobile(): void {
    setNavbarClasses(styles.hide);
  }

  function HideDropdown(): void {
    setShowDropdown(() => false);
  }

  function HandleSearch(): void {}

  return (
    <>
      <header className='wrapper'>
        <nav className={styles.navbar}>
          <div className={`${styles.website_name} ${styles.mobile}`}>
            <h2>
              <Link className={styles.no_underline} to='/recipe-website/'>
                My Favorite Recipes
              </Link>
            </h2>
          </div>

          <div
            onClick={ShowNavbarMobile}
            className={`${styles.toggle_btn} ${styles.mobile}`}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
          <CSSTransition
            in={showNavbarMobile}
            timeout={1000}
            classNames={{
              enterActive: 'animate__fadeInRight',
              exitActive: 'animate__fadeOutRight',
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

              <li className={styles.website_name}>
                <h2>
                  <Link
                    className={`${styles.link} ${styles.no_underline}`}
                    to='/recipe-website/'
                  >
                    My Favorite Recipes
                  </Link>
                </h2>
              </li>

              {/* Recipes Tab Start */}
              <li className={styles.dropdown} ref={dropdownMenuRef}>
                <span
                  className={`${styles.link} ${styles.click_text}`}
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  Recipes
                </span>
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
                {showDropdown && (
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

              <li>
                <Link
                  onClick={HideNavbarMobile}
                  className={styles.link}
                  to='/favorites'
                >
                  Favorites
                </Link>
              </li>

              <li className={styles.search_bar}>
                <div
                  className={`${styles.search_bar_container} ${
                    isExpanded ? styles.expanded : ''
                  }`}
                >
                  <button
                    className={styles.search_button}
                    type='button'
                    onClick={HandleSearch}
                  >
                    <AiOutlineSearch />
                  </button>
                  <input
                    type='search'
                    placeholder='Search for recipes here ex: beef'
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setSearchInput(e.target.value)
                    }
                    value={searchInput}
                  />
                  <button
                    className={styles.close_button}
                    type='button'
                    onClick={() => setIsExpanded(false)}
                  >
                    <AiOutlineClose />
                  </button>
                </div>
                <button
                  className={isExpanded ? styles.hide : styles.search_icon}
                  type='button'
                  onClick={() => setIsExpanded(true)}
                >
                  <AiOutlineSearch />
                </button>
                {/* <Link
                  onClick={HideNavbarMobile}
                  className={`${styles.link} ${styles.search}`}
                  to='/search'
                >
                  <AiOutlineSearch />
                </Link> */}
              </li>
            </ul>
          </CSSTransition>

          {/* <hr /> */}
        </nav>
      </header>
    </>
  );
}
