import { Link } from 'react-router-dom';

import styles from './posts.module.css';

import { RecipeData } from '../../interfaces/interface';

import { BsHeart, BsHeartFill } from 'react-icons/bs';

interface Posts {
  posts: RecipeData[];
}

export default function Posts(props: Posts) {
  return (
    <section className='recipes'>
      <div className={styles.posts}>
        {props.posts.map((item) => {
          return (
            <div className={styles.post}>
              <div>
                <Link to={item.extension}>
                  <img loading='lazy' src={item.image} />
                </Link>
                {!item.isBookmarked && (
                  <BsHeart className={styles.icon_heart_noFill} />
                )}
                {item.isBookmarked && (
                  <BsHeartFill className={styles.icon_heart_noFill} />
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
