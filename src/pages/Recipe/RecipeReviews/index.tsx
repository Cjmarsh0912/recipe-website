import React, { useState } from 'react';
import styles from './recipeReviews.module.css';

import { v4 as uuidv4 } from 'uuid';

import { useNavigate } from 'react-router-dom';

import { AiOutlineLike, AiOutlineDelete } from 'react-icons/ai';
import { BsReply } from 'react-icons/bs';
import { FaStar } from 'react-icons/fa';
import { RecipeData, user } from '../../../interfaces/interface';

type Comment = {
  comment_id: string;
  user_uid: string;
  name: string;
  date: string;
  comment: string;
  rating: number;
  likes: number;
  replies: {
    comment_id: string;
    user_uid: string;
    name: string;
    date: string;
    comment: string;
    rating: number;
    likes: number;
  }[];
};

type RecipeReviewsProps = {
  recipeData: RecipeData;
  userData: user | null;
  isSignedIn: boolean;
  updateRecipe: (recipe: RecipeData) => void;
};

const RecipeReviews = ({
  recipeData,
  userData,
  isSignedIn,
  updateRecipe,
}: RecipeReviewsProps) => {
  const [name, setName] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [rating, setRating] = useState<number>(0);
  const [tempRating, setTempRating] = useState<number>(0);

  const stars: number[] = [0, 1, 2, 3, 4];
  const date = new Date();

  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const handleDeleteComment = (comment_id: string) => {
    if (userData === null) return;

    const newComments: Comment[] = recipeData.comments.filter((item) => {
      return item.comment_id !== comment_id;
    });

    const newRecipe: RecipeData = {
      ...recipeData,
      comments: newComments,
      times_rated: recipeData.times_rated - 1,
    };

    updateRecipe(newRecipe);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isSignedIn) {
      alert('must be signed in to comment');
      setName('');
      setComment('');
      setRating(0);
      return;
    }

    if (userData !== null) {
      const newRecipe: RecipeData = {
        ...recipeData,
        comments: [
          ...recipeData.comments,
          {
            comment: comment,
            comment_id: uuidv4(),
            date: formattedDate,
            likes: 0,
            name: name,
            rating: rating,
            user_uid: userData?.uid,
            replies: [],
          },
        ],
        times_rated: recipeData.times_rated + 1,
      };
      setName('');
      setComment('');
      setRating(0);
      updateRecipe(newRecipe);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2>{recipeData.comments.length} Comment(s):</h2>
      </header>
      <section className={styles.commentSection}>
        <form onSubmit={handleSubmit} className={styles.commentSectionForm}>
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
                  onMouseLeave={() => setTempRating(0)}
                />
              </label>
            ))}
          </div>
          <div className={styles.nameInputContainer}>
            <label htmlFor='name'>Name:</label>
            <input
              type='text'
              id='name'
              name='name'
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className={styles.commentInputContainer}>
            <label htmlFor='comment'>Comment:</label>
            <textarea
              id='comment'
              required
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

        <div className={styles.comments}>
          <header className={styles.header}></header>
          <ul>
            {recipeData.comments.map((comment) => (
              <li>
                {userData?.uid === comment.user_uid ? (
                  <h3 className={styles.your_comment}>Your comment</h3>
                ) : null}
                <div className={styles.comment} key={comment.comment_id}>
                  <div className={styles.commentHeader}>
                    <h4>{comment.name}</h4>
                    <p>{comment.date}</p>
                  </div>
                  <p className={styles.commentText}>{comment.comment}</p>
                  <div className={styles.ratingContainer}>
                    {[...stars].map((star) => (
                      <FaStar
                        key={star}
                        color={comment.rating >= star ? '#ffc107' : '#e4e5e9'}
                        size={20}
                      />
                    ))}
                  </div>
                  <div className={styles.commentIcons}>
                    <button type='button'>
                      <AiOutlineLike />
                      <p>{comment.likes}</p>
                    </button>
                    <button type='button'>
                      <BsReply />
                      <p>Reply</p>
                    </button>
                    {userData?.uid === comment.user_uid ? (
                      <button
                        onClick={() => handleDeleteComment(comment.comment_id)}
                        className={styles.delete_button}
                        type='button'
                      >
                        <AiOutlineDelete />
                        <p>Delete</p>
                      </button>
                    ) : null}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default RecipeReviews;
