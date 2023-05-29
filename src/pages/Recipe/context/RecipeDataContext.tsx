import { createContext, useReducer, ReactNode, useContext } from 'react';

import { RecipeData } from 'interfaces/interface';

type RecipeProviderProps = {
  children: ReactNode;
};

type Action = {
  type: string;
  payload: RecipeData;
};

type InitialState = {
  recipeData: RecipeData;
};

const initialState: InitialState = {
  recipeData: {
    categories: [],
    category_extension: '',
    comments: [],
    cook_time: '',
    date_posted: '',
    description: '',
    extension: '',
    id: 0,
    image: '',
    ingredients: [],
    keywords: [],
    prep_time: '',
    rating: 0,
    recipe_name: '',
    steps: [],
    times_rated: 0,
    total_time: '',
  },
};

const reducer = (state: InitialState, action: Action) => {
  switch (action.type) {
    case 'SET_RECIPE_DATA':
      return { ...state, recipeData: action.payload };
    default:
      return state;
  }
};

export const RecipeDataContext = createContext<InitialState>({
  recipeData: {
    categories: [],
    category_extension: '',
    comments: [],
    cook_time: '',
    date_posted: '',
    description: '',
    extension: '',
    id: 0,
    image: '',
    ingredients: [],
    keywords: [],
    prep_time: '',
    rating: 0,
    recipe_name: '',
    steps: [],
    times_rated: 0,
    total_time: '',
  },
});

export const DispatchContext = createContext<{
  dispatch: React.Dispatch<Action>;
}>({ dispatch: () => {} });

export function useRecipeDataContext() {
  return useContext(RecipeDataContext);
}

export function useDispatchContext() {
  return useContext(DispatchContext);
}

export const RecipeDataProvider: React.FC<RecipeProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { recipeData } = state;

  return (
    <RecipeDataContext.Provider value={{ recipeData }}>
      <DispatchContext.Provider value={{ dispatch }}>
        {children}
      </DispatchContext.Provider>
    </RecipeDataContext.Provider>
  );
};
