import { useStateContext } from 'context/RecipeContext';

import styles from './assets/css/home.module.css';

import { Link } from 'react-router-dom';

import { BsArrowRight } from 'react-icons/bs';

export default function Home() {
  const { recipeData } = useStateContext();

  return (
    <>
      <main>
        <section className='featured'>
          <header className={styles.extensions}>
            <Link to='/featured' className={styles.extension_name}>
              <h2>Featured</h2>
              <BsArrowRight className={styles.icon_arrow_right} />
            </Link>
          </header>

          <div className={styles.posts}>
            {[...recipeData].map((item, id) => {
              if (id >= 3) return;
              return (
                <article key={item.id} className={styles.post}>
                  <Link className={styles.extension_link} to={item.extension}>
                    <img loading='lazy' src={item.image} />
                  </Link>
                  <h3>
                    <Link
                      className={styles.recipe_description}
                      to={item.extension}
                    >
                      {item.recipe_name}
                    </Link>
                  </h3>
                </article>
              );
            })}
          </div>
        </section>

        <section className='search-bar'>
          <header className={styles.extensions}>
            <Link to='/all-recipes' className={styles.extension_name}>
              <h2>View all recipes</h2>
              <BsArrowRight className={styles.icon_arrow_right} />
            </Link>
          </header>

          <Link
            to='/search'
            className={`${styles.search_bar_container} ${styles.full_width}`}
          >
            <input
              id={styles.search_bar}
              autoComplete='off'
              spellCheck='false'
              placeholder='Search'
            />
          </Link>
        </section>

        <section className={styles.quick_recipes}>
          <header className={styles.extensions}>
            <Link to='/all-recipes' className={styles.extension_name}>
              <h2>Quick recipes</h2>
              <BsArrowRight className={styles.icon_arrow_right} />
            </Link>
          </header>

          <div className={styles.posts}>
            {[...recipeData].map((item, id) => {
              if (id >= 3) return;
              return (
                <article key={item.id} className={styles.post}>
                  <Link className={styles.extension_link} to={item.extension}>
                    <img loading='lazy' src={item.image} />
                  </Link>
                  <h3>
                    <Link
                      className={styles.recipe_description}
                      to={item.extension}
                    >
                      {item.recipe_name}
                    </Link>
                  </h3>
                </article>
              );
            })}

            {/* <article className={styles.post}>
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
            </article> */}
          </div>
        </section>
      </main>
    </>
  );
}
