export interface RecipeData {
  id: number;
  recipe_name: string;
  keywords: string[];
  extension: string;
  categories: string[];
  category_extension: string;

  rating: number;
  times_rated: number;
  comments: {
    comment_id: string;
    user_uid: string;
    name: string;
    date: string;
    comment: string;
    rating: number;
    likes: string[];
    replies: {
      comment_id: string;
      user_uid: string;
      name: string;
      date: string;
      comment: string;
      rating: number;
      likes: string[];
    }[];
  }[];

  description: string;
  date_posted: string;
  prep_time: string;
  cook_time: string;
  total_time: string;
  image: string;
  ingredients: string[];
  steps: {
    header: string;
    step: string;
  }[];
}

export interface user {
  uid: string;
  email: string | null;
  bookmarks: number[];
  likes: string[];
}

export interface InitialState {
  categories: string[];
  favorites: number[];
  currentRecipes: RecipeData[];
  recipeData: RecipeData[];
  userData: user | null;
  isSignedIn: boolean;
  isLoading: boolean;
}
