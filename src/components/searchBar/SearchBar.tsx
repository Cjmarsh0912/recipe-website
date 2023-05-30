import { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from 'context/RecipeContext';
import { useDispatchContext } from 'context/SearchContext';

import { AiOutlineClose, AiOutlineSearch } from 'react-icons/ai';

import styles from './assets/css/search-bar.module.css';

export default function SearchBar() {
  const [searchInput, setSearchInput] = useState<string>('');
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const { recipeData } = useStateContext();
  const { dispatch } = useDispatchContext();

  const navigate = useNavigate();

  function handleSearch(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    const newRecipes = [...recipeData].filter((item) => {
      return item.keywords.includes(searchInput.toLowerCase());
    });

    dispatch({ type: 'SET_SEARCH_INPUT', payload: searchInput });
    dispatch({ type: 'SET_SEARCHED_RECIPES', payload: newRecipes });
    setSearchInput('');

    setIsExpanded(false);

    navigate('/search');
  }

  return (
    <div className={styles.search_bar}>
      <form
        onSubmit={handleSearch}
        className={`${styles.search_bar_container} ${
          isExpanded ? styles.expanded : ''
        }`}
      >
        <button className={styles.search_button} type='submit'>
          <AiOutlineSearch />
        </button>
        <input
          type='search'
          placeholder='Search for recipes here ex: beef'
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearchInput(e.target.value)
          }
          value={searchInput}
        />
        <button
          className={styles.close_button}
          type='button'
          onClick={() => setIsExpanded(false)}
        >
          <AiOutlineClose />
        </button>
      </form>
      <button
        className={styles.search_icon}
        type='button'
        onClick={() => setIsExpanded(true)}
      >
        <AiOutlineSearch />
      </button>
    </div>
  );
}
