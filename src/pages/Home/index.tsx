import Placeholder from '../../assets/images/placeholder.jpg';
import Placeholder2 from '../../assets/images/placeholder2.jpg';
import Placeholder3 from '../../assets/images/placeholder3.jpg';
import Placeholder4 from '../../assets/images/placeholder4.jpg';
import Placeholder5 from '../../assets/images/placeholder5.jpg';
import Placeholder6 from '../../assets/images/placeholder6.jpg';
import Placeholder7 from '../../assets/images/placeholder7.jpg';
import Placeholder8 from '../../assets/images/placeholder8.jpg';

import SearchBar from '../../components/search_bar/SearchBar';

import { Link } from 'react-router-dom';

import { BsArrowRight } from 'react-icons/bs';

import './home.css';

export default function Home() {
  return (
    <>
      <main>
        <section className='featured'>
          <header className='header'>
            <a href='#' className='header-name'>
              <h2>Featured</h2>
              <BsArrowRight className='icon-arrow-right' />
            </a>
          </header>

          <div className='posts'>
            <article className='post'>
              <Link to='/chicken-recipe'>
                <img loading='lazy' src={Placeholder} />
              </Link>
              <h3>
                <Link className='recipe-description' to='/chicken-recipe'>
                  Chicken Salad
                </Link>
              </h3>
            </article>

            <article className='post'>
              <Link to='steak-recipe'>
                <img loading='lazy' src={Placeholder2} />
              </Link>
              <h3>
                <Link className='recipe-description' to='/steak-recipe'>
                  French Toast
                </Link>
              </h3>
            </article>

            <article className='post'>
              <a href='#'>
                <img loading='lazy' src={Placeholder3} />
              </a>
              <h3>
                <a className='recipe-description' href='#'>
                  Meatball Salad
                </a>
              </h3>
            </article>

            <article className='post'>
              <a href='#'>
                <img loading='lazy' src={Placeholder4} />
              </a>
              <h3>
                <a className='recipe-description' href='#'>
                  Chicken Burger
                </a>
              </h3>
            </article>
          </div>
        </section>

        <section className='search-bar'>
          <header className='header'>
            <Link to='/all-recipes' className='header-name'>
              <h2>view all recipes</h2>
              <BsArrowRight className='icon-arrow-right' />
            </Link>
          </header>
          <SearchBar size='full-width' />
        </section>

        <section className='quick-recipes'>
          <header className='header'>
            <Link to='/quick-recipes' className='header-name'>
              <h2>Quick recipes</h2>
              <BsArrowRight className='icon-arrow-right' />
            </Link>
          </header>

          <div className='posts'>
            <article className='post'>
              <Link to='/chicken-recipe'>
                <img loading='lazy' src={Placeholder5} />
              </Link>
              <h3>
                <Link className='recipe-description' to='/chicken-recipe'>
                  Chicken Salad
                </Link>
              </h3>
            </article>
            <article className='post'>
              <a href='#'>
                <img loading='lazy' src={Placeholder6} />
              </a>
              <h3>
                <a className='recipe-description' href='#'>
                  Chicken Salad
                </a>
              </h3>
            </article>
            <article className='post'>
              <a href='#'>
                <img loading='lazy' src={Placeholder7} />
              </a>
              <h3>
                <a className='recipe-description' href='#'>
                  Chicken Salad
                </a>
              </h3>
            </article>
            <article className='post'>
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
