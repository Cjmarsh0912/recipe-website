import { useEffect } from 'react';

import CommentSection from './CommentSection';
import RecipeInstructions from './RecipeInstructions';

import { useDispatchContext } from './context/RecipeDataContext';

import styles from './assets/css/recipe.module.css';

import { BsArrowRight, BsArrowLeft } from 'react-icons/bs';

import { RecipeData } from 'interfaces/interface';

import { Link } from 'react-router-dom';

type RecipeProps = {
  recipeData: RecipeData;
};

export default function Recipe({ recipeData }: RecipeProps) {
  const { dispatch } = useDispatchContext();

  useEffect(() => {
    dispatch({ type: 'SET_RECIPE_DATA', payload: recipeData });
  }, []);
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
        <RecipeInstructions />
        <CommentSection />
      </main>
    </>
  );
}
