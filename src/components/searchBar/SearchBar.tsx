import { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from 'context/RecipeContext';
import { useDispatchContext } from 'context/SearchContext';

import { AiOutlineClose, AiOutlineSearch } from 'react-icons/ai';

import styles from './assets/css/search-bar.module.css';
import { RecipeData } from 'interfaces/interface';

export default function SearchBar() {
  const [searchInput, setSearchInput] = useState<string>('');
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<Set<string>>(new Set());

  const { recipeData } = useStateContext();
  const { dispatch } = useDispatchContext();

  const navigate = useNavigate();

  function stringToArray(inputString: string): string[] {
    // Split the string into individual words using regular expression
    var wordArray: string[] = inputString.split(/\s+/);
    return wordArray;
  }

  function findSearchRecipes(searchInput: string): RecipeData[] {
    const newRecipes = recipeData.filter((recipe) => {
      return (
        recipe.keywords.includes(searchInput.toLowerCase()) ||
        recipe.recipe_name.toLowerCase() === searchInput.toLowerCase()
      );
    });

    return newRecipes;
  }

  function findSearchSuggestions(input: string): Set<string> {
    if (input === '' || input === ' ') {
      return new Set();
    }

    const regex = new RegExp(`\\b${input}`, 'i');
    const matchingKeywords = recipeData
      .flatMap((recipe) => [...recipe.keywords, recipe.recipe_name])
      .filter((item) => regex.test(item));

    return new Set(matchingKeywords);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;

    setSearchInput(value);

    const newSuggestions = findSearchSuggestions(value);
    setSuggestions(newSuggestions);
  }

  function handleSearchSuggestionClick(suggestion: string) {
    const newRecipes = findSearchRecipes(suggestion);

    dispatch({ type: 'SET_SEARCH_INPUT', payload: suggestion });
    dispatch({ type: 'SET_SEARCHED_RECIPES', payload: newRecipes });
    setSearchInput('');
    setSuggestions(new Set());

    setIsExpanded(false);

    navigate('/search');
  }

  function handleSearch(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    const newRecipes = findSearchRecipes(searchInput);

    dispatch({ type: 'SET_SEARCH_INPUT', payload: searchInput });
    dispatch({ type: 'SET_SEARCHED_RECIPES', payload: newRecipes });
    setSearchInput('');
    setSuggestions(new Set());

    setIsExpanded(false);

    navigate('/search');
  }

  return (
    <>
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
            onChange={handleInputChange}
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
      {isExpanded && suggestions.size > 0 && (
        <div className={styles.suggestions_container}>
          <ul className={styles.suggestions}>
            {[...suggestions].map((item, id) => (
              <li
                key={id}
                className={styles.suggestion}
                onClick={() => handleSearchSuggestionClick(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
