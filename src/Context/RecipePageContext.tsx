import { createContext, useReducer, ReactNode, useContext } from 'react';
import { RecipeData } from 'interfaces/interface';

type CategoryProviderProps = {
  children: ReactNode;
};

type Action = {
  type: string;
  payload: any;
};

type InitialState = {
  category: string;
  categories: string[];
  pageData: RecipeData[];
  currentRecipes: RecipeData[];
};

const initialState: InitialState = {
  categories: [],
  category: 'set category',
  pageData: [],
  currentRecipes: [],
};

const reducer = (state: InitialState, action: Action) => {
  switch (action.type) {
    case 'SET_CATEGORY':
      return { ...state, category: action.payload };

    case 'SET_CATEGORIES':
      return { ...state, categories: action.payload };

    case 'SET_CURRENT_RECIPES':
      return { ...state, currentRecipes: action.payload };

    case 'SET_PAGE_DATA':
      return { ...state, pageData: action.payload };

    default:
      return state;
  }
};

export const RecipePageContext = createContext<InitialState>({
  ...initialState,
});

export const DispatchContext = createContext<{
  dispatch: React.Dispatch<Action>;
}>({ dispatch: () => {} });

export function useRecipePageContext() {
  return useContext(RecipePageContext);
}

export function useDispatchContext() {
  return useContext(DispatchContext);
}

export const RecipePageProvider: React.FC<CategoryProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <RecipePageContext.Provider value={state}>
      <DispatchContext.Provider value={{ dispatch }}>
        {children}
      </DispatchContext.Provider>
    </RecipePageContext.Provider>
  );
};
