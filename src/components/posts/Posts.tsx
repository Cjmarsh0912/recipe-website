import {
  useFunctionContext,
  useStateContext,
} from '../../Context/RecipeContext';

import { Link } from 'react-router-dom';

import styles from './posts.module.css';

import { BsHeart, BsHeartFill } from 'react-icons/bs';

export default function Posts() {
  const { addToFavorites, removeFromFavorites } = useFunctionContext();
  const { currentRecipes, favorites } = useStateContext();

  return (
    <section className='recipes'>
      <div className={styles.posts}>
        {[...currentRecipes].map((item) => {
          return (
            <div key={item.id} className={styles.post}>
              <div>
                <Link to={item.extension}>
                  <img loading='lazy' src={item.image} />
                </Link>
                {[...favorites].includes(item.id) && (
                  <BsHeartFill
                    onClick={() => removeFromFavorites(item.id)}
                    className={styles.icon_heart_noFill}
                  />
                )}
                {![...favorites].includes(item.id) && (
                  <BsHeart
                    onClick={() => addToFavorites(item.id)}
                    className={styles.icon_heart_noFill}
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
