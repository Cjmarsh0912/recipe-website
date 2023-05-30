import { useState } from 'react';
import { useStateContext, useFunctionContext } from 'context/RecipeContext';

import {
  useRecipeDataContext,
  useDispatchContext,
} from './context/RecipeDataContext';

import styles from './assets/css/commentSection.module.css';

import { v4 as uuidv4 } from 'uuid';

import { FaStar } from 'react-icons/fa';

import { RecipeData, CommentInterface } from 'interfaces/interface';

export default function AddComment() {
  const [comment, setComment] = useState<string>('');
  const [rating, setRating] = useState<number>(1);
  const [tempRating, setTempRating] = useState<number>(1);

  const { recipeData } = useRecipeDataContext();
  const { dispatch } = useDispatchContext();

  const { userData, isSignedIn } = useStateContext();
  const { updateRecipeInDatabase } = useFunctionContext();

  const stars: number[] = [1, 2, 3, 4, 5];
  const date = new Date();

  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const handleAddComment = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isSignedIn) {
      alert('must be signed in to comment');
      setComment('');
      setRating(1);
      return;
    }

    if (userData !== null) {
      const newComment: CommentInterface = {
        comment: comment,
        comment_id: uuidv4(),
        date: formattedDate,
        likes: [],
        name: userData.username,
        rating: rating,
        user_uid: userData?.uid,
        replies: [],
      };

      const newComments: CommentInterface[] = [
        ...recipeData.comments,
        newComment,
      ];

      const newRecipeRating =
        newComments.reduce((total, comment) => total + comment.rating, 0) /
        newComments.length;

      const newRecipe: RecipeData = {
        ...recipeData,
        comments: newComments,
        rating: Math.round(newRecipeRating),
      };
      setComment('');
      setRating(1);
      updateRecipeInDatabase(newRecipe);
      dispatch({ type: 'SET_RECIPE_DATA', payload: newRecipe });
    }
  };

  return (
    <form onSubmit={handleAddComment} className={styles.commentSectionForm}>
      <div className={styles.ratingContainer}>
        {[...stars].map((star) => (
          <label key={star}>
            <input
              type='radio'
              name='rating'
              value={star}
              className={styles.ratingInput}
              onChange={(event) => setRating(parseInt(event.target.value))}
            />
            <FaStar
              className={styles.star}
              color={
                tempRating > star
                  ? '#ffc107'
                  : star <= rating
                  ? '#ffc107'
                  : '#e4e5e9'
              }
              size={25}
              onMouseEnter={() => setTempRating(star + 1)}
              onMouseLeave={() => setTempRating(1)}
            />
          </label>
        ))}
      </div>
      <div className={styles.commentInputContainer}>
        <label htmlFor='comment'>Comment:</label>
        <textarea
          id='comment'
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          rows={8}
        />
      </div>
      <div className={styles.submitButtonContainer}>
        <input
          type='submit'
          name='submit'
          id='submit'
          value='Submit'
          className={styles.submit}
        />
      </div>
    </form>
  );
}
