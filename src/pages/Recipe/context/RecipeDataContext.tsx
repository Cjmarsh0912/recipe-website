import { createContext, useReducer, ReactNode, useContext } from 'react';

import { v4 as uuid } from 'uuid';

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
    cook_time: 0,
    date_posted: '',
    description: '',
    extension: '',
    id: uuid(),
    image: '',
    ingredients: [],
    keywords: [],
    prep_time: 0,
    rating: 0,
    recipe_name: '',
    steps: [],
    total_time: 0,
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
  recipeData: initialState.recipeData,
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

  return (
    <RecipeDataContext.Provider value={state}>
      <DispatchContext.Provider value={{ dispatch }}>
        {children}
      </DispatchContext.Provider>
    </RecipeDataContext.Provider>
  );
};
