import styles from './home.module.css';

import Placeholder5 from '../../assets/images/placeholder5.jpg';
import Placeholder6 from '../../assets/images/placeholder6.jpg';
import Placeholder7 from '../../assets/images/placeholder7.jpg';
import Placeholder8 from '../../assets/images/placeholder8.jpg';

import { Link } from 'react-router-dom';

import { BsArrowRight, BsSearch } from 'react-icons/bs';

export default function Home() {
  return (
    <>
      <main>
        <section className='featured'>
          <header className={styles.extensions}>
            <a href='#' className={styles.extension_name}>
              <h2>Featured</h2>
              <BsArrowRight className={styles.icon_arrow_right} />
            </a>
          </header>

          <div className={styles.posts}>
            <article className={styles.post}>
              <Link to='/spicy-garlic-noodles'>
                <img
                  loading='lazy'
                  src='recipe-website/images/spicy-noodles-placeholder.jpg'
                />
              </Link>
              <h3>
                <Link
                  className={styles.recipe_description}
                  to='/spicy-garlic-noodles'
                >
                  Spicy Garlic Noodles
                </Link>
              </h3>
            </article>

            <article className={styles.post}>
              <Link to='/fried-rice'>
                <img
                  loading='lazy'
                  src='recipe-website/images/fried-rice-placeholder.jpg'
                />
              </Link>
              <h3>
                <Link className={styles.recipe_description} to='/fried-rice'>
                  Fried Rice
                </Link>
              </h3>
            </article>

            <article className={styles.post}>
              <Link to='/baked-potato'>
                <img
                  loading='lazy'
                  src='recipe-website/images/baked-potato-placeholder.jpg'
                />
              </Link>
              <h3>
                <Link className={styles.recipe_description} to='/baked-potato'>
                  Baked Potato
                </Link>
              </h3>
            </article>

            <article className={styles.post}>
              <Link to='/country-fried-steak'>
                <img
                  loading='lazy'
                  src='recipe-website/images/country-fried-steak-placeholder.jpg'
                />
              </Link>
              <h3>
                <Link
                  className={styles.recipe_description}
                  to='/country-fried-steak'
                >
                  Country Fried Steak
                </Link>
              </h3>
            </article>
          </div>
        </section>

        <section className='search-bar'>
          <header className={styles.extensions}>
            <Link to='/all-recipes' className={styles.extension_name}>
              <h2>view all recipes</h2>
              <BsArrowRight className={styles.icon_arrow_right} />
            </Link>
          </header>

          <div
            className={`${styles.search_bar_container} ${styles.full_width}`}
          >
            <input
              id={styles.search_bar}
              autoComplete='off'
              spellCheck='false'
              placeholder='Search'
            />
            <div className={styles.icon_container}>
              <BsSearch className={styles.icon_search} />
            </div>
          </div>
        </section>

        <section className={styles.quick_recipes}>
          <header className={styles.extensions}>
            <Link to='/quick-recipes' className={styles.extension_name}>
              <h2>Quick recipes</h2>
              <BsArrowRight className={styles.icon_arrow_right} />
            </Link>
          </header>

          <div className={styles.posts}>
            <article className={styles.post}>
              <Link to='/chicken-recipe'>
                <img loading='lazy' src={Placeholder5} />
              </Link>
              <h3>
                <Link
                  className={styles.recipe_description}
                  to='/chicken-recipe'
                >
                  Chicken Salad
                </Link>
              </h3>
            </article>
            <article className={styles.post}>
              <a href='#'>
                <img loading='lazy' src={Placeholder6} />
              </a>
              <h3>
                <a className={styles.recipe_description} href='#'>
                  Chicken Salad
                </a>
              </h3>
            </article>
            <article className={styles.post}>
              <a href='#'>
                <img loading='lazy' src={Placeholder7} />
              </a>
              <h3>
                <a className={styles.recipe_description} href='#'>
                  Chicken Salad
                </a>
              </h3>
            </article>
            <article className={styles.post}>
              <a href='#'>
                <img loading='lazy' src={Placeholder8} />
              </a>
              <h3>
                <a className={styles.recipe_description} href='#'>
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
