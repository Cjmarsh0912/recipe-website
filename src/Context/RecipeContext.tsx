import {
  createContext,
  useReducer,
  ReactNode,
  useContext,
  useCallback,
} from 'react';
import { RecipeData, user, InitialState } from '../interfaces/interface';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../components/firebase';

type RecipeProviderProps = {
  children: ReactNode;
};

type Action = {
  type: string;
  payload: any;
};

type FunctionContext = {
  addToFavorites: (id: number) => void;
  removeFromFavorites: (id: number) => void;
  updateCategories: (test: RecipeData[]) => void;
  sortArray: (category: string, recipeData: RecipeData[]) => void;
  updateUserInDatabase: (newUserData: user) => void;
  updateUserData: (newUserData: user | null) => void;
  updateRecipeInDatabase: (recipe: RecipeData) => void;
};

const initialState: InitialState = {
  categories: [],
  favorites: [],
  currentRecipes: [],
  recipeData: [],
  userData: null,
  isSignedIn: false,
  isLoading: true,
};

const reducer = (state: InitialState, action: Action) => {
  switch (action.type) {
    case 'SET_CATEGORIES':
      return { ...state, categories: action.payload };
    case 'SET_FAVORITES':
      return { ...state, favorites: action.payload };
    case 'SET_CURRENT_RECIPES':
      return { ...state, currentRecipes: action.payload };
    case 'SET_RECIPE_DATA':
      return { ...state, recipeData: action.payload };
    case 'SET_USER_DATA':
      return { ...state, userData: action.payload };
    case 'SET_IS_SIGNED_IN':
      return { ...state, isSignedIn: action.payload };
    case 'SET_IS_LOADING':
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

export const StateContext = createContext<InitialState>({
  ...initialState,
});

export const DispatchContext = createContext<{
  dispatch: React.Dispatch<Action>;
}>({ dispatch: () => {} });

export const FunctionContext = createContext<FunctionContext>({
  addToFavorites: () => {},
  removeFromFavorites: () => {},
  updateCategories: () => {},
  sortArray: () => {},
  updateUserInDatabase: () => {},
  updateUserData: () => {},
  updateRecipeInDatabase: () => {},
});

export function useStateContext() {
  return useContext(StateContext);
}

export function useDispatchContext() {
  return useContext(DispatchContext);
}

export function useFunctionContext() {
  return useContext(FunctionContext);
}

export const RecipeProvider: React.FC<RecipeProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToFavorites = (id: number) => {
    if (!state.favorites.includes(id)) {
      const newFavorites = [...state.favorites, id];
      if (state.isSignedIn && state.userData?.uid !== undefined) {
        const newUserData = { ...state.userData, bookmarks: newFavorites };
        dispatch({ type: 'SET_USER_DATA', payload: newUserData });
        updateUserInDatabase(newUserData);
      }
      dispatch({ type: 'SET_FAVORITES', payload: newFavorites });
      alert('added to favorites');
    }
  };

  const removeFromFavorites = (id: number) => {
    let newFavorites = [...state.favorites].filter((item) => {
      return item !== id;
    });
    dispatch({ type: 'SET_FAVORITES', payload: newFavorites });
    alert('removed from favorites');
  };

  const updateCategories = (testData: RecipeData[]) => {
    const test: string[] = [];
    testData.map((item) => {
      return item.keywords.filter((item2) => {
        const isDuplicate = test.includes(item2);

        if (!isDuplicate) {
          test.push(item2);
          return true;
        }

        return false;
      });
    });
    dispatch({ type: 'SET_CATEGORIES', payload: test });
  };

  const sortArray = useCallback(
    (category: string, recipeData: RecipeData[]) => {
      const sorted = [...recipeData].filter((item) => {
        if (category === 'choose category') return item;
        if (item.keywords.includes(category)) return true;

        return false;
      });
      dispatch({ type: 'SET_CURRENT_RECIPES', payload: sorted });
    },
    [state.currentRecipes]
  );

  const updateUserInDatabase = async (newUserData: user) => {
    const userRef = doc(db, 'users', newUserData.uid);
    await updateDoc(userRef, {
      uid: newUserData.uid,
      email: newUserData.email,
      bookmarks: newUserData.bookmarks,
      username: newUserData.username,
    });
    dispatch({ type: 'SET_USER_DATA', payload: newUserData });
  };

  const updateUserData = (newUserData: user | null) => {
    if (newUserData === null) dispatch({ type: 'SET_FAVORITES', payload: [] });
    dispatch({ type: 'SET_USER_DATA', payload: newUserData });
  };

  const updateRecipeInDatabase = async (recipe: RecipeData) => {
    const recipeRef = doc(db, 'Recipes', recipe.recipe_name);
    await updateDoc(recipeRef, {
      ...recipe,
    });
    const newRecipeData: RecipeData[] = [...state.recipeData].map((item) => {
      if (item.id === recipe.id) return recipe;
      return item;
    });
    dispatch({ type: 'SET_RECIPE_DATA', payload: newRecipeData });
  };

  const stateContextValue: InitialState = {
    categories: state.categories,
    currentRecipes: state.currentRecipes,
    favorites: state.favorites,
    isLoading: state.isLoading,
    isSignedIn: state.isSignedIn,
    recipeData: state.recipeData,
    userData: state.userData,
  };

  const functionContextValue: FunctionContext = {
    addToFavorites,
    removeFromFavorites,
    updateCategories,
    sortArray,
    updateUserInDatabase,
    updateUserData,
    updateRecipeInDatabase,
  };

  return (
    <StateContext.Provider value={stateContextValue}>
      <DispatchContext.Provider value={{ dispatch }}>
        <FunctionContext.Provider value={functionContextValue}>
          {children}
        </FunctionContext.Provider>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};
