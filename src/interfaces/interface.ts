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

export interface Recipes {
  addToFavorites: (id: number) => void;
  removeFromFavorites: (id: number) => void;
  favorites: number[];
  updateType: (test: any) => void;
  categories: string[];
  updateCategories: (recipes: RecipeData[]) => void;
  recipes: RecipeData[];
}
