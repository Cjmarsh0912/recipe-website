import { Link } from 'react-router-dom';

import './recipes.css';

import { RecipeData } from '../../interfaces/interface';

interface Posts {
  posts: RecipeData[];
}

export default function Posts(props: Posts) {
  return (
    <section className='recipes posts'>
      {props.posts.map((item) => {
        return (
          <div className='recipes post'>
            <Link to={item.extension}>
              <img loading='lazy' src='images/placeholder.jpg' />
            </Link>
            <h3>
              <Link className='recipe-description' to={item.extension}>
                {item.recipe_name}
              </Link>
            </h3>
          </div>
        );
      })}
    </section>
  );
}
