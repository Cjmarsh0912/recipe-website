import styles from './recipeInstructions.module.css';

import { useFunctionContext, useStateContext } from '@context/RecipeContext';

import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { FaStar } from 'react-icons/fa';

import { RecipeData } from '../../../../interfaces/interface';

type RecipeProps = {
  recipeData: RecipeData;
};
