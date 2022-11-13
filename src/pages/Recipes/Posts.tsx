import { Link } from 'react-router-dom';

import styles from './recipes.module.css';

import { RecipeData } from '../../interfaces/interface';

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
              <Link to={item.extension}>
                <img loading='lazy' src={item.image} />
              </Link>
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
