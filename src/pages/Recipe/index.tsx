import RecipeReviews from './RecipeReviews/index';
import {
  useFunctionContext,
  useStateContext,
} from '../../Context/RecipeContext';
import styles from './recipe.module.css';
import { FaStar } from 'react-icons/fa';

import {
  BsHeart,
  BsHeartFill,
  BsArrowRight,
  BsArrowLeft,
} from 'react-icons/bs';

import { RecipeData } from '../../interfaces/interface';

import { Link } from 'react-router-dom';

type RecipeProps = {
  recipeData: RecipeData;
};

export default function Recipe({ recipeData }: RecipeProps) {
  const stars: number[] = [1, 2, 3, 4, 5];

  const { addToFavorites, removeFromFavorites } = useFunctionContext();
  const { favorites } = useStateContext();

  return (
    <>
      {/* Extensions Start */}
      <div className={styles.extensions_container}>
        <div className={styles.extensions}>
          <Link
            to={recipeData.category_extension}
            className={styles.extension_name}
          >
            <h2>{recipeData.categories[0]} Recipes</h2>
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
        <h1 className={styles.recipe_name}>{recipeData.recipe_name}</h1>
        <p className={styles.description}>{recipeData.description}</p>
        <p className={styles.date_posted}>
          Date Posted: <span>{recipeData.date_posted}</span>
        </p>
      </header>
      {/* Recipe Header End */}

      <main>
        <section className={styles.recipe_tutorial}>
          {/* Recipe Details Start */}
          <div className={styles.recipe_details}>
            <div className={styles.img_container}>
              <img src={recipeData.image} />
            </div>

            <div className={styles.recipe_container}>
              <div>
                <h3>{recipeData.recipe_name}</h3>
                <div className={styles.rating_container}>
                  {[...stars].map((star) => (
                    <FaStar
                      key={star}
                      color={recipeData.rating >= star ? '#ffc107' : '#e4e5e9'}
                      size={20}
                    />
                  ))}
                  <p>{recipeData.comments.length} rating(s)</p>
                </div>
              </div>
              {[...favorites].includes(recipeData.id) ? (
                <BsHeartFill
                  onClick={() => removeFromFavorites(recipeData.id)}
                  className={styles.icon_heart}
                />
              ) : (
                <BsHeart
                  onClick={() => addToFavorites(recipeData.id)}
                  className={styles.icon_heart}
                />
              )}
            </div>

            <div className={styles.time}>
              <p>
                Prep Time: <span>{recipeData.prep_time}</span>
              </p>
              <p>
                Cook Time: <span>{recipeData.cook_time}</span>
              </p>
              <p>
                Total: <span>{recipeData.total_time}</span>
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
                {recipeData.ingredients.map((item, id) => {
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
              {recipeData.steps.map((item, id) => {
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
        <RecipeReviews recipeData={recipeData} />
      </main>
    </>
  );
}
