export interface RecipeData {
  recipe_name: string;
  keywords: string[];
  extension: string;
  category: string;
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
