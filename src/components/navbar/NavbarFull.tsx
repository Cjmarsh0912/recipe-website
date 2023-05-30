import { useRef, useState } from 'react';
import { useStateContext, useDispatchContext } from 'context/RecipeContext';

import { getAuth } from 'firebase/auth';

import SearchBar from '../searchBar/SearchBar';

import { Link, useNavigate } from 'react-router-dom';

import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { BsBookmarkHeart } from 'react-icons/bs';

import styles from './assets/css/navbarFull.module.css';

import { useOutsideClick } from 'hooks/useOutsideClick';

export default function NavbarFull() {
  const [isRecipesDropdownVisible, setIsRecipesDropdownVisible] =
    useState<boolean>(false);

  const { userData, isSignedIn } = useStateContext();
  const { dispatch } = useDispatchContext();

  // References DOM elements to be used for the outside clicker
  const recipeDropdownRef = useRef<HTMLLIElement>(null);
  const navbarRef = useRef<HTMLUListElement>(null);

  // Handles clicking outside of the referenced DOM element
  const HideRecipesDropdown = (): void => {
    setIsRecipesDropdownVisible(() => false);
  };
  useOutsideClick(recipeDropdownRef, HideRecipesDropdown);

  const auth = getAuth();
  const navigate = useNavigate();
  const HandleSignOut = (): void => {
    const confirmSignOut = window.confirm('Are you sure you want to sign out?');

    if (confirmSignOut) {
      dispatch({ type: 'SET_USER_DATA', payload: null });
      dispatch({ type: 'SET_FAVORITES', payload: [] });
      dispatch({ type: 'SET_IS_SIGNED_IN', payload: false });
      auth.signOut();
      alert('Signed Out!');
      navigate('/recipe-website/');
    }
  };
  return (
    <nav className={styles.navbar}>
      <div className={styles.website_name}>
        <h2>
          <Link className='no_underline' to='/recipe-website/'>
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
                !isRecipesDropdownVisible ? styles.icon_arrow_down : 'hide'
              }
            />
            <IoIosArrowUp
              className={
                isRecipesDropdownVisible ? styles.icon_arrow_up : 'hide'
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
              <Link to='/signUp'>
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
  );
}
