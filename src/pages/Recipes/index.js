import { Link } from 'react-router-dom';

import SearchBar from '../../components/search_bar/SearchBar';

import './recipes.css';

export default function Recipes({ recipes }) {
  return (
    <main>
      <header className='test-header'>
        <h3>All recipes</h3>
        <SearchBar />
      </header>

      <section className='all-recipes posts'>
        {recipes.map((item, id) => {
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
