import { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useDispatchContext,
  useStateContext,
} from '../../Context/RecipeContext';
import { AiOutlineClose, AiOutlineSearch } from 'react-icons/ai';
import styles from './search-bar.module.css';
import { RecipeData } from '../../interfaces/interface';

export default function SearchBar() {
  const [search, setSearch] = useState<string>('');
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const { recipeData, searchInput } = useStateContext();
  const { dispatch } = useDispatchContext();

  const navigate = useNavigate();

  function handleSearch(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    const newRecipes = [...recipeData].filter((item) => {
      return item.keywords.includes(search.toLowerCase());
    });

    dispatch({ type: 'SET_SEARCH_INPUT', payload: search });
    dispatch({ type: 'SET_SEARCHED_RECIPES', payload: newRecipes });
    setSearch('');

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
            setSearch(e.target.value)
          }
          value={search}
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
