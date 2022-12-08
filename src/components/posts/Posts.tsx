import { Link } from 'react-router-dom';

import styles from './posts.module.css';

import { RecipeData } from '../../interfaces/interface';

import { BsHeart, BsHeartFill } from 'react-icons/bs';

interface Posts {
  posts: RecipeData[];
  addToFavorite: (id: number) => void;
  removeFromFavorite: (id: number) => void;
  bookmarked: number[];
}

export default function Posts(props: Posts) {
  return (
    <section className='recipes'>
      <div className={styles.posts}>
        {props.posts.map((item) => {
          return (
            <div key={item.id} className={styles.post}>
              <div>
                <Link to={item.extension}>
                  <img loading='lazy' src={item.image} />
                </Link>
                {props.bookmarked.includes(item.id) && (
                  <BsHeartFill
                    onClick={() => props.removeFromFavorite(item.id)}
                    className={styles.icon_heart_noFill}
                  />
                )}
                {!props.bookmarked.includes(item.id) && (
                  <BsHeart
                    onClick={() => props.addToFavorite(item.id)}
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
