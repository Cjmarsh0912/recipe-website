import { useFunctionContext, useStateContext } from 'context/RecipeContext';
import { useRecipePageContext } from 'context/RecipePageContext';

import { Link } from 'react-router-dom';

import styles from './assets/css/posts.module.css';

import { BsHeart, BsHeartFill } from 'react-icons/bs';

export default function Posts() {
  const { addToFavorites, removeFromFavorites } = useFunctionContext();
  const { favorites } = useStateContext();
  const { currentRecipes } = useRecipePageContext();

  return (
    <section className='recipes'>
      <div className={styles.posts}>
        {[...currentRecipes].map((item) => {
          return (
            <div key={item.id} className={styles.post}>
              <div>
                <Link tabIndex={-1} to={item.extension}>
                  <img tabIndex={0} loading='lazy' src={item.image} />
                </Link>
                {[...favorites].includes(item.id) && (
                  <BsHeartFill
                    onClick={() => removeFromFavorites(item.id)}
                    onKeyDown={(key) => {
                      if (key.key === 'Enter') removeFromFavorites(item.id);
                    }}
                    className={styles.icon_heart_noFill}
                    tabIndex={0}
                  />
                )}
                {![...favorites].includes(item.id) && (
                  <BsHeart
                    onClick={() => addToFavorites(item.id)}
                    onKeyDown={(key) => {
                      if (key.key === 'Enter') addToFavorites(item.id);
                    }}
                    className={styles.icon_heart_noFill}
                    tabIndex={0}
                  />
                )}
              </div>
              <h3>
                <Link className={styles.recipe_description} to={item.extension}>
                  {item.recipe_name}
                </Link>
              </h3>
            </div>
          );
        })}
      </div>
    </section>
  );
}
