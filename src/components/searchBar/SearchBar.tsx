import { useState, useRef, ChangeEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useStateContext } from 'context/RecipeContext';
import { useDispatchContext } from 'context/SearchContext';

import { AiOutlineClose, AiOutlineSearch } from 'react-icons/ai';
import { BiLinkExternal } from 'react-icons/bi';

import styles from './assets/css/search-bar.module.css';
import { RecipeData } from 'interfaces/interface';

export default function SearchBar() {
  const [searchInput, setSearchInput] = useState<string>('');
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [recipeSuggestions, setRecipeSuggestions] = useState<RecipeData[]>([]);
  const [suggestions, setSuggestions] = useState<Set<string>>(new Set());

  const inputRef = useRef<HTMLInputElement>(null);

  const { recipeData } = useStateContext();
  const { dispatch } = useDispatchContext();

  const navigate = useNavigate();

  // function stringToArray(inputString: string): string[] {
  //   // Split the string into individual words using regular expression
  //   var wordArray: string[] = inputString.split(/\s+/);
  //   return wordArray;
  // }

  //  function findSearchSuggestions(input: string): Set<string> {
  //   if (input === '' || input === ' ') {
  //     return new Set();
  //   }

  //   const regex = new RegExp(`\\b${input}`, 'i');
  //   const matchingKeywords = recipeData
  //     .flatMap((recipe) => [...recipe.keywords, recipe.recipe_name])
  //     .filter((item) => regex.test(item));

  //   return new Set(matchingKeywords);
  // }

  function handleExpand() {
    setIsExpanded(true);
    inputRef.current?.focus();
  }

  function findTest(value: RecipeData, suggestion: string) {
    return value.recipe_name === suggestion;
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

  function findSearchSuggestions(input: string) {
    if (input === '' || input === ' ') {
      setRecipeSuggestions([]);
      setSuggestions(new Set());

      return;
    }

    const regex = new RegExp(`\\b${input}`, 'i');

    const newSuggestions = new Set(
      [...recipeData]
        .flatMap((recipe) => recipe.keywords)
        .filter((item) => regex.test(item))
    );

    const newRecipeSuggestions = [...recipeData].filter((recipe) =>
      regex.test(recipe.recipe_name)
    );

    setRecipeSuggestions(newRecipeSuggestions);
    setSuggestions(newSuggestions);
  }

  const handleKeyDown = (
    event:
      | React.KeyboardEvent<HTMLLIElement>
      | React.KeyboardEvent<HTMLAnchorElement>,
    item: string
  ) => {
    if (event.key === 'Enter') {
      handleSearchSuggestionClick(item);
    }
  };

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;

    setSearchInput(value);
    findSearchSuggestions(value);

    // const newSuggestions = findSearchSuggestions(value);
    // setSuggestions(newSuggestions);
  }

  function handleSearchSuggestionClick(suggestion: string) {
    const recipe = recipeData.find((recipe) => findTest(recipe, suggestion));
    setSearchInput('');
    setSuggestions(new Set());
    setRecipeSuggestions([]);
    setIsExpanded(false);

    if (recipe !== undefined) {
      navigate(recipe.extension);
      return;
    }

    const newRecipes = findSearchRecipes(suggestion);

    dispatch({ type: 'SET_SEARCH_INPUT', payload: suggestion });
    dispatch({ type: 'SET_SEARCHED_RECIPES', payload: newRecipes });

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
          <button
            className={styles.search_button}
            type='submit'
            tabIndex={isExpanded ? 0 : -1}
          >
            <AiOutlineSearch />
          </button>
          <input
            type='search'
            placeholder='Search for recipes here ex: beef'
            onChange={handleInputChange}
            value={searchInput}
            tabIndex={isExpanded ? 0 : -1}
            ref={inputRef}
          />
          <button
            className={styles.close_button}
            type='button'
            onClick={() => setIsExpanded(false)}
            tabIndex={isExpanded ? 0 : -1}
          >
            <AiOutlineClose />
          </button>
        </form>
        <button
          className={styles.search_icon}
          type='button'
          onClick={handleExpand}
          tabIndex={isExpanded ? -1 : 0}
        >
          <AiOutlineSearch />
        </button>
      </div>

      {isExpanded && (suggestions.size > 0 || recipeSuggestions.length > 0) && (
        <div className={styles.suggestions_container}>
          <ul className={styles.suggestions}>
            {[...recipeSuggestions].map((item, id) => (
              <li
                key={id}
                className={`${styles.recipe_suggestions}`}
                role='button'
              >
                <Link
                  onClick={() => handleSearchSuggestionClick(item.recipe_name)}
                  onKeyDown={(e) => handleKeyDown(e, item.recipe_name)}
                  to={item.extension}
                  tabIndex={0}
                >
                  {item.recipe_name}
                </Link>
                <BiLinkExternal size={18} />
              </li>
            ))}
            {[...suggestions].map((item, id) => (
              <li
                key={id}
                className={styles.suggestion}
                onClick={() => handleSearchSuggestionClick(item)}
                onKeyDown={(e) => handleKeyDown(e, item)}
                role='button'
                tabIndex={0}
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
