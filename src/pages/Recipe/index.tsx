import styles from './recipe.module.css';

import {
  BsHeart,
  BsHeartFill,
  BsArrowRight,
  BsArrowLeft,
} from 'react-icons/bs';

import { RecipeData } from '../../interfaces/interface';

import { Link } from 'react-router-dom';

interface Recipe {
  recipe: RecipeData;
  addToFavorite: (id: number) => void;
  removeFromFavorite: (id: number) => void;
  bookmarked: number[];
}

export default function Recipe(props: Recipe) {
  return (
    <>
      {/* Extensions Start */}
      <div className={styles.extensions_container}>
        <div className={styles.extensions}>
          <Link
            to={props.recipe.category_extension}
            className={styles.extension_name}
          >
            <h2>{props.recipe.categories[0]} Recipes</h2>
            <BsArrowRight className={styles.icon_arrow_right} />
          </Link>
        </div>
        <div className={`${styles.extensions} ${styles.all}`}>
          <Link to='/all-recipes' className={styles.extension_name}>
            <BsArrowLeft className={styles.icon_arrow_right} />
            <h2>All Recipes</h2>
          </Link>
        </div>
      </div>
      {/* Extensions End */}

      {/* Recipe Header Start */}
      <header className={styles.recipe_header}>
        <h1 className={styles.recipe_name}>{props.recipe.recipe_name}</h1>
        <p className={styles.description}>{props.recipe.description}</p>
        <p className={styles.date_posted}>
          Date Posted: <span>{props.recipe.date_posted}</span>
        </p>
      </header>

      <main>
        <section className={styles.recipe_tutorial}>
          {/* Recipe Details Start */}
          <div className={styles.recipe_details}>
            <div className={styles.img_container}>
              <img src={props.recipe.image} />
            </div>
            <div className={styles.recipe_container}>
              <h3>{props.recipe.recipe_name}</h3>
              {props.bookmarked.includes(props.recipe.id) && (
                <BsHeartFill
                  onClick={() => props.removeFromFavorite(props.recipe.id)}
                  className={styles.icon_heart}
                />
              )}
              {!props.bookmarked.includes(props.recipe.id) && (
                <BsHeart
                  onClick={() => props.addToFavorite(props.recipe.id)}
                  className={styles.icon_heart}
                />
              )}
            </div>
            <div className={styles.time}>
              <p>
                Prep Time: <span>{props.recipe.prep_time}</span>
              </p>
              <p>
                Cook Time: <span>{props.recipe.cook_time}</span>
              </p>
              <p>
                Total: <span>{props.recipe.total_time}</span>
              </p>
            </div>
          </div>
          {/* Recipe Details End */}

          {/* Recipe Ingredients Start */}
          <div className={styles.recipe_ingredients}>
            <header className={styles.header}>
              <h2>Ingredients</h2>
            </header>
            <div className={styles.ingredients}>
              <ul>
                {props.recipe.ingredients.map((item, id) => {
                  return <li key={id}>{item}</li>;
                })}
              </ul>
            </div>
          </div>
          {/* Recipe Ingredients End */}

          {/* Recipe Directions Start */}
          <div className={styles.recipe_directions}>
            <header className={styles.header}>
              <h2>Directions</h2>
            </header>

            <div className={styles.directions}>
              {props.recipe.steps.map((item, id) => {
                return (
                  <div key={id} className={styles.step}>
                    <header className={styles.step_header}>
                      <span>{id + 1}.</span>
                      <h3>{item.header}</h3>
                    </header>
                    <div className={styles.step_direction}>
                      <p>{item.step}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Recipe Directions End */}
        </section>
      </main>
    </>
  );
}
