export interface RecipeData {
  recipe_name: string;
  keywords: string[];
  extension: string;
  category: string;
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
