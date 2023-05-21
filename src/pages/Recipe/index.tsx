import RecipeReviews from './RecipeReviews/index';
import styles from './recipe.module.css';
import { FaStar } from 'react-icons/fa';

import {
  BsHeart,
  BsHeartFill,
  BsArrowRight,
  BsArrowLeft,
} from 'react-icons/bs';

import { RecipeData, user } from '../../interfaces/interface';

import { Link } from 'react-router-dom';

type RecipeProps = {
  recipe: RecipeData;
  userData: user | null;
  bookmarked: number[];
  isSignedIn: boolean;
  addToFavorite: (id: number) => void;
  removeFromFavorite: (id: number) => void;
  updateRecipe: (recipe: RecipeData) => void;
  updateUserData: (user: user) => void;
};

export default function Recipe({
  recipe,
  userData,
  isSignedIn,
  addToFavorite,
  removeFromFavorite,
  bookmarked,
  updateRecipe,
  updateUserData,
}: RecipeProps) {
  const stars: number[] = [0, 1, 2, 3, 4];
  return (
    <>
      {/* Extensions Start */}
      <div className={styles.extensions_container}>
        <div className={styles.extensions}>
          <Link
            to={recipe.category_extension}
            className={styles.extension_name}
          >
            <h2>{recipe.categories[0]} Recipes</h2>
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
        <h1 className={styles.recipe_name}>{recipe.recipe_name}</h1>
        <p className={styles.description}>{recipe.description}</p>
        <p className={styles.date_posted}>
          Date Posted: <span>{recipe.date_posted}</span>
        </p>
      </header>

      <main>
        <section className={styles.recipe_tutorial}>
          {/* Recipe Details Start */}
          <div className={styles.recipe_details}>
            <div className={styles.img_container}>
              <img src={recipe.image} />
            </div>
            <div className={styles.recipe_container}>
              <div>
                <h3>{recipe.recipe_name}</h3>
                <div className={styles.rating_container}>
                  {[...stars].map((star) => (
                    <FaStar
                      key={star}
                      color={recipe.rating >= star ? '#ffc107' : '#e4e5e9'}
                      size={20}
                    />
                  ))}
                  <p>{recipe.times_rated} rating(s)</p>
                </div>
              </div>
              {bookmarked.includes(recipe.id) && (
                <BsHeartFill
                  onClick={() => removeFromFavorite(recipe.id)}
                  className={styles.icon_heart}
                />
              )}
              {!bookmarked.includes(recipe.id) && (
                <BsHeart
                  onClick={() => addToFavorite(recipe.id)}
                  className={styles.icon_heart}
                />
              )}
            </div>
            <div className={styles.time}>
              <p>
                Prep Time: <span>{recipe.prep_time}</span>
              </p>
              <p>
                Cook Time: <span>{recipe.cook_time}</span>
              </p>
              <p>
                Total: <span>{recipe.total_time}</span>
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
                {recipe.ingredients.map((item, id) => {
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
              {recipe.steps.map((item, id) => {
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
        <RecipeReviews
          isSignedIn={isSignedIn}
          updateRecipe={updateRecipe}
          recipeData={recipe}
          userData={userData}
          updateUserData={updateUserData}
        />
      </main>
    </>
  );
}
