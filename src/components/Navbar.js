import { Link } from 'react-router-dom';
import './navbar.css';
export default function Navbar() {
  return (
    <>
      <header className='wrapper'>
        <div className='navbar'>
          <ul className='nav'>
            <li className='website-name'>
              <h2>
                <Link className='no-underline' to='/'>
                  My Favorite Recipes
                </Link>
              </h2>
            </li>
            <li className='dropdown'>
              <Link className='link' to='/all-recipes'>
                Recipes
              </Link>
              <ul className='dropdown-content'>
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
          <hr />
        </div>
      </header>
    </>
  );
}
