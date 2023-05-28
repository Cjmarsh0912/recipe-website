import React, { useState } from 'react';
import {
  useStateContext,
  useFunctionContext,
} from '../../../../Context/RecipeContext';

import styles from './commentSection.module.css';

import { v4 as uuidv4 } from 'uuid';

import { AiOutlineLike, AiFillLike, AiOutlineDelete } from 'react-icons/ai';
import { BsReply } from 'react-icons/bs';
import { FaStar } from 'react-icons/fa';
import { RecipeData, Comment } from '../../../../interfaces/interface';

type RecipeReviewsProps = {
  recipeData: RecipeData;
};

const CommentSection = ({ recipeData }: RecipeReviewsProps) => {
  const [comment, setComment] = useState<string>('');
  const [rating, setRating] = useState<number>(1);
  const [tempRating, setTempRating] = useState<number>(1);

  const [showReplyForm, setShowReplyForm] = useState<string>('');
  const [replyComment, setReplyComment] = useState<string>('');

  const { userData, isSignedIn } = useStateContext();
  const { updateRecipeInDatabase } = useFunctionContext();

  const stars: number[] = [1, 2, 3, 4, 5];
  const date = new Date();

  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const handleAddLike = (comment_id: string) => {
    if (userData === null) return;

    const newRecipe: RecipeData = {
      ...recipeData,
      comments: [
        ...recipeData.comments.map((item) => {
          if (item.comment_id === comment_id)
            return {
              ...item,
              likes: [...item.likes, userData.uid],
            };
          return item;
        }),
      ],
    };

    updateRecipeInDatabase(newRecipe);
  };

  const handleRemoveLike = (comment_id: string) => {
    if (userData === null) return;

    const newRecipe: RecipeData = {
      ...recipeData,
      comments: [
        ...recipeData.comments.map((item) => {
          if (item.comment_id === comment_id)
            return {
              ...item,
              likes: item.likes.filter((item) => {
                return item !== userData.uid;
              }),
            };
          return item;
        }),
      ],
    };

    updateRecipeInDatabase(newRecipe);
  };

  const handleDeleteComment = (comment_id: string) => {
    if (userData === null) return;

    const confirmDelete = window.confirm(
      'Are you sure you want to delete this comment?'
    );
    if (!confirmDelete) return;

    const newComments: Comment[] = [...recipeData.comments].filter((item) => {
      return item.comment_id !== comment_id;
    });

    // uses a reducer function to find the recipe rating without the deleted comment
    const newRecipeRating =
      newComments.length > 0
        ? newComments.reduce((total, comment) => total + comment.rating, 0) /
          newComments.length
        : 0;

    const newRecipe: RecipeData = {
      ...recipeData,
      comments: newComments,
      rating: newRecipeRating,
    };

    updateRecipeInDatabase(newRecipe);
  };

  const handleAddComment = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isSignedIn) {
      alert('must be signed in to comment');
      setComment('');
      setRating(1);
      return;
    }

    if (userData !== null) {
      const newComment: Comment = {
        comment: comment,
        comment_id: uuidv4(),
        date: formattedDate,
        likes: [],
        name: userData.username,
        rating: rating,
        user_uid: userData?.uid,
        replies: [],
      };

      const newComments: Comment[] = [...recipeData.comments, newComment];

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
    }
  };

  const handleAddReply = (
    event: React.FormEvent<HTMLFormElement>,
    comment_id: string
  ) => {
    event.preventDefault();

    if (!isSignedIn) {
      alert('must be signed in to comment');
      setReplyComment('');
      return;
    }

    if (userData !== null) {
      const newComments: Comment[] = [...recipeData.comments].map((item) => {
        if (item.comment_id === comment_id)
          return {
            ...item,
            replies: [
              ...item.replies,
              {
                comment: replyComment,
                reply_id: uuidv4(),
                date: formattedDate,
                likes: [],
                name: userData.username,
                replies: [],
                user_uid: userData.uid,
              },
            ],
          };
        return item;
      });
      const newRecipe: RecipeData = {
        ...recipeData,
        comments: newComments,
      };

      setShowReplyForm('');
      setReplyComment('');
      updateRecipeInDatabase(newRecipe);
    }
  };

  const handleDeleteReply = (reply_id: string, comment_id: string) => {
    if (userData === null) return;

    const confirmDelete = window.confirm(
      'Are you sure you want to delete this comment?'
    );
    if (!confirmDelete) return;

    const newComments: Comment[] = [...recipeData.comments].map((item) => {
      if (item.comment_id === comment_id) {
        return {
          ...item,
          replies: item.replies.filter((reply) => reply.reply_id !== reply_id),
        };
      }
      return item;
    });

    const newRecipe: RecipeData = {
      ...recipeData,
      comments: newComments,
    };

    updateRecipeInDatabase(newRecipe);
  };

  const handleAddLikeOnReply = (reply_id: string, comment_id: string) => {
    if (userData === null) return;

    const newComments: Comment[] = [...recipeData.comments].map((item) => {
      if (item.comment_id === comment_id) {
        return {
          ...item,
          replies: item.replies.map((reply) => {
            if (reply.reply_id === reply_id) {
              return {
                ...reply,
                likes: [...reply.likes, userData.uid],
              };
            }
            return reply;
          }),
        };
      }
      return item;
    });

    const newRecipe: RecipeData = {
      ...recipeData,
      comments: newComments,
    };

    updateRecipeInDatabase(newRecipe);
  };

  const handleRemoveLikeOnReply = (reply_id: string, comment_id: string) => {
    if (userData === null) return;

    const newComments: Comment[] = [...recipeData.comments].map((item) => {
      if (item.comment_id === comment_id) {
        return {
          ...item,
          replies: item.replies.map((reply) => {
            if (reply.reply_id === reply_id) {
              return {
                ...reply,
                likes: reply.likes.filter((like) => {
                  return like !== userData.uid;
                }),
              };
            }
            return reply;
          }),
        };
      }
      return item;
    });

    const newRecipe: RecipeData = {
      ...recipeData,
      comments: newComments,
    };

    updateRecipeInDatabase(newRecipe);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2>{recipeData.comments.length} Comment(s):</h2>
      </header>

      <section className={styles.commentSection}>
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

        <div className={styles.comments}>
          <header className={styles.header}></header>
          <ul>
            {recipeData.comments.map((comment) => (
              <li key={comment.comment_id}>
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
                    {userData?.uid && comment.likes.includes(userData?.uid) ? (
                      <button
                        onClick={() => handleRemoveLike(comment.comment_id)}
                        type='button'
                      >
                        <AiFillLike />
                        <p>{comment.likes.length}</p>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleAddLike(comment.comment_id)}
                        type='button'
                      >
                        <AiOutlineLike />
                        <p>{comment.likes.length}</p>
                      </button>
                    )}

                    <button
                      onClick={() =>
                        setShowReplyForm((prevVal) => {
                          if (prevVal === '') return comment.comment_id;
                          return '';
                        })
                      }
                      type='button'
                    >
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

                {showReplyForm === comment.comment_id && (
                  <form
                    onSubmit={(e) => handleAddReply(e, comment.comment_id)}
                    className={styles.replyFormContainer}
                  >
                    <div className={styles.commentInputContainer}>
                      <label htmlFor='comment'>Comment:</label>
                      <textarea
                        id='comment'
                        required
                        value={replyComment}
                        onChange={(event) =>
                          setReplyComment(event.target.value)
                        }
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
                )}

                {/* Comment Replies */}
                {comment.replies.length > 0 && (
                  <ul>
                    {comment.replies.map((reply) => (
                      <li key={reply.reply_id}>
                        <div className={styles.replyComment}>
                          <div className={styles.commentHeader}>
                            <h4>{reply.name}</h4>
                            <p>{reply.date}</p>
                          </div>
                          <p className={styles.commentText}>{reply.comment}</p>
                          <div className={styles.commentIcons}>
                            {userData?.uid &&
                            reply.likes.includes(userData?.uid) ? (
                              <button
                                onClick={() =>
                                  handleRemoveLikeOnReply(
                                    reply.reply_id,
                                    comment.comment_id
                                  )
                                }
                                type='button'
                              >
                                <AiFillLike />
                                <p>{reply.likes.length}</p>
                              </button>
                            ) : (
                              <button
                                onClick={() =>
                                  handleAddLikeOnReply(
                                    reply.reply_id,
                                    comment.comment_id
                                  )
                                }
                                type='button'
                              >
                                <AiOutlineLike />
                                <p>{reply.likes.length}</p>
                              </button>
                            )}

                            <button
                              onClick={() =>
                                setShowReplyForm((prevVal) => {
                                  if (prevVal === '') return comment.comment_id;
                                  return '';
                                })
                              }
                              type='button'
                            >
                              <BsReply />
                              <p>Reply</p>
                            </button>

                            {userData?.uid === reply.user_uid ? (
                              <button
                                className={styles.delete_button}
                                type='button'
                                onClick={() =>
                                  handleDeleteReply(
                                    reply.reply_id,
                                    comment.comment_id
                                  )
                                }
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
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default CommentSection;
