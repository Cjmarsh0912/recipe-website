import { RecipeData } from 'interfaces/interface';
import { createContext, useReducer, ReactNode, useContext } from 'react';

type SearchProviderProps = {
  children: ReactNode;
};

type Action = {
  type: string;
  payload: any;
};

type InitialState = {
  searchInput: string;
  searchRecipes: RecipeData[];
};

const initialState: InitialState = {
  searchInput: '',
  searchRecipes: [],
};

const reducer = (state: InitialState, action: Action) => {
  switch (action.type) {
    case 'SET_SEARCH_INPUT':
      return { ...state, searchInput: action.payload };

    case 'SET_SEARCHED_RECIPES':
      return { ...state, searchRecipes: action.payload };

    default:
      return state;
  }
};

export const SearchContext = createContext<InitialState>({
  ...initialState,
});

export const DispatchContext = createContext<{
  dispatch: React.Dispatch<Action>;
}>({ dispatch: () => {} });

export function useSearchContext() {
  return useContext(SearchContext);
}

export function useDispatchContext() {
  return useContext(DispatchContext);
}

export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <SearchContext.Provider value={state}>
      <DispatchContext.Provider value={{ dispatch }}>
        {children}
      </DispatchContext.Provider>
    </SearchContext.Provider>
  );
};
