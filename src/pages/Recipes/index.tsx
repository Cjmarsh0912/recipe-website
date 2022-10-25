import { Link } from 'react-router-dom';

import SearchBar from '../../components/search_bar/SearchBar';
import { RecipeData } from '../../interfaces/interface';

import './recipes.css';

interface Recipe {
  recipes: RecipeData[];
}

export default function Recipes(props: Recipe) {
  return (
    <main>
      <header className='test-header'>
        <h3>All recipes</h3>
        <SearchBar />
      </header>

      <section className='all-recipes posts'>
        {props.recipes.map((item, id) => {
          return (
            <>
              <div key={id} className='all-recipes post'>
                <Link to={item.extension}>
                  <img loading='lazy' src={item.image} />
                </Link>
                <h3>
                  <Link className='recipe-description' to={item.extension}>
                    {item.recipe_name}
                  </Link>
                </h3>
              </div>
            </>
          );
        })}
      </section>
    </main>
  );
}
