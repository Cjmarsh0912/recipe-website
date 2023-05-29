export interface RecipeData {
  id: number;
  recipe_name: string;
  keywords: string[];
  extension: string;
  categories: string[];
  category_extension: string;

  rating: number;
  times_rated: number;
  comments: CommentInterface[];
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
  username: string;
}

export interface CommentInterface {
  comment_id: string;
  user_uid: string;
  name: string;
  date: string;
  comment: string;
  rating: number;
  likes: string[];
  replies: ReplyInterface[];
}

export interface ReplyInterface {
  reply_id: string;
  user_uid: string;
  name: string;
  date: string;
  comment: string;
  replies: ReplyInterface[];
  likes: string[];
}

export interface InitialState {
  categories: string[];
  category: string;
  searchInput: string;
  searchedRecipes: RecipeData[];
  favorites: number[];
  currentRecipes: RecipeData[];
  recipeData: RecipeData[];
  userData: user | null;
  isSignedIn: boolean;
  isLoading: boolean;
}
