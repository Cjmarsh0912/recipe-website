export interface RecipeData {
  id: number;
  recipe_name: string;
  keywords: string[];
  extension: string;
  categories: string[];
  isBookmarked: boolean;
  category_extension: string;
  description: string;
  date_posted: string;
  prep_time: string;
  cook_time: string;
  total_time: string;
  time_num: number;
  image: string;
  ingredients: string[];
  steps: {
    header: string;
    step: string;
  }[];
}

export interface PageData {
  name: string;
  addToFavorites: (id: number) => void;
  removeFromFavorites: (id: number) => void;
  favorites: number[];
  categories: string[];
  updateCategories: (recipes: RecipeData[]) => void;
  updateCurrentData: (data: RecipeData[]) => void;
  sortArray: (type: any, data: RecipeData[]) => void;
  currentData: RecipeData[];
  recipes: RecipeData[];
}
