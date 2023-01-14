import { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import { RecipeData } from '../../interfaces/interface';

import styles from './search.module.css';

interface Test {
  recipe: RecipeData[];
}

export default function Search(props: Test) {
  const [searchInput, setSearchInput] = useState<string>('');
  const [currentlyDisplayedRecipes, setCurrentlyDisplayedRecipes] = useState<
    RecipeData[]
  >([]);

  const handleChange = (e: any): void => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  useEffect(() => {
    if (searchInput.length > 0) {
      const temp: RecipeData[] = props.recipe.filter((item) => {
        return item.recipe_name.toLowerCase().match(searchInput.toLowerCase());
      });
      setCurrentlyDisplayedRecipes(temp);
    } else {
      setCurrentlyDisplayedRecipes([]);
    }
  }, [searchInput]);

  return (
    <main>
      <section className={styles.test}>
        <input
          type='search'
          placeholder='Search Here'
          onChange={handleChange}
          value={searchInput}
          id={styles.testInput}
        />
      </section>

      <section className={styles.results_container}>
        {currentlyDisplayedRecipes.map((item) => {
          return (
            <div key={item.id} className={styles.results}>
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
      </section>
    </main>
  );
}
