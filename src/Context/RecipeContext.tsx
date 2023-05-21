import { createContext, useReducer, ReactNode, useContext } from 'react';
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
  updateUserInDatabase: (newUserData: user) => void;
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

export const StateContext = createContext<{ state: InitialState }>({
  state: initialState,
});

export const DispatchContext = createContext<{
  dispatch: React.Dispatch<Action>;
}>({ dispatch: () => {} });

export const FunctionContext = createContext<FunctionContext>({
  addToFavorites: () => {},
  updateUserInDatabase: () => {},
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
    console.log('ran');
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

  const updateUserInDatabase = async (newUserData: user) => {
    const userRef = doc(db, 'users', newUserData.uid);
    await updateDoc(userRef, {
      uid: newUserData.uid,
      email: newUserData.email,
      bookmarks: newUserData.bookmarks,
      likes: newUserData.likes,
    });
    dispatch({ type: 'SET_USER_DATA', payload: newUserData });
  };

  const functionContextValue: FunctionContext = {
    addToFavorites,
    updateUserInDatabase,
  };

  return (
    <StateContext.Provider value={{ state }}>
      <DispatchContext.Provider value={{ dispatch }}>
        <FunctionContext.Provider value={functionContextValue}>
          {children}
        </FunctionContext.Provider>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};
