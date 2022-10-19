import Placeholder from '../../assets/images/placeholder.jpg';
import Placeholder2 from '../../assets/images/placeholder2.jpg';
import Placeholder3 from '../../assets/images/placeholder3.jpg';
import Placeholder4 from '../../assets/images/placeholder4.jpg';
import Placeholder5 from '../../assets/images/placeholder5.jpg';
import Placeholder6 from '../../assets/images/placeholder6.jpg';
import Placeholder7 from '../../assets/images/placeholder7.jpg';
import Placeholder8 from '../../assets/images/placeholder8.jpg';

import { Link } from 'react-router-dom';

import { BsArrowRight, BsSearch } from 'react-icons/bs';

import './home.css';

export default function Home() {
  return (
    <>
      <main>
        <header className='header'>
          <a href='#' className='home-header'>
            <h2>Featured</h2>
            <BsArrowRight className='icon-arrow-right' />
          </a>
        </header>

        <section className='featured'>
          <div className='featured-post'>
            <a href='#'>
              <img loading='lazy' src={Placeholder} />
            </a>
            <h3>
              <a className='recipe-description' href='#'>
                Chicken Salad
              </a>
            </h3>
          </div>
          <div className='featured-post'>
            <a href='#'>
              <img loading='lazy' src={Placeholder2} />
            </a>
            <h3>
              <a className='recipe-description' href='#'>
                French Toast
              </a>
            </h3>
          </div>
          <div className='featured-post'>
            <a href='#'>
              <img loading='lazy' src={Placeholder3} />
            </a>
            <h3>
              <a className='recipe-description' href='#'>
                Meatball Salad
              </a>
            </h3>
          </div>
          <div className='featured-post'>
            <a href='#'>
              <img loading='lazy' src={Placeholder4} />
            </a>
            <h3>
              <a className='recipe-description' href='#'>
                Chicken Burger
              </a>
            </h3>
          </div>
        </section>

        <section className='search-bar'>
          <header className='header'>
            <Link to='/all-recipes' className='home-header'>
              <h2>view all recipes</h2>
              <BsArrowRight className='icon-arrow-right' />
            </Link>
          </header>
          <div className='search-bar-container full-width'>
            <input
              id='search-bar'
              autoComplete='off'
              spellCheck='false'
              placeholder='Search'
            />
            <div className='icon-container'>
              <BsSearch className='icon-search' />
            </div>
          </div>
        </section>

        <section className='quick-recipes'>
          <header className='header'>
            <Link to='/quick-recipes' className='home-header'>
              <h2>Quick recipes</h2>
              <BsArrowRight className='icon-arrow-right' />
            </Link>
          </header>
          <div className='quick-recipes-posts'>
            <article className='quick-recipes-post'>
              <Link to='/chicken-recipe'>
                <img loading='lazy' src={Placeholder5} />
              </Link>
              <h3>
                <Link className='recipe-description' to='/chicken-recipe'>
                  Chicken Salad
                </Link>
              </h3>
            </article>
            <article className='quick-recipes-post'>
              <a href='#'>
                <img loading='lazy' src={Placeholder6} />
              </a>
              <h3>
                <a className='recipe-description' href='#'>
                  Chicken Salad
                </a>
              </h3>
            </article>
            <article className='quick-recipes-post'>
              <a href='#'>
                <img loading='lazy' src={Placeholder7} />
              </a>
              <h3>
                <a className='recipe-description' href='#'>
                  Chicken Salad
                </a>
              </h3>
            </article>
            <article className='quick-recipes-post'>
              <a href='#'>
                <img loading='lazy' src={Placeholder8} />
              </a>
              <h3>
                <a className='recipe-description' href='#'>
                  Chicken Salad
                </a>
              </h3>
            </article>
          </div>
        </section>
      </main>
    </>
  );
}
