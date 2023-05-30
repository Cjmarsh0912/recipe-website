import { useState } from 'react';
import { useStateContext, useFunctionContext } from 'context/RecipeContext';
import {
  useRecipeDataContext,
  useDispatchContext,
} from './context/RecipeDataContext';

import { v4 as uuidv4 } from 'uuid';

import { AiOutlineLike, AiFillLike, AiOutlineDelete } from 'react-icons/ai';
import { FiMessageSquare } from 'react-icons/fi';
import { BsReply } from 'react-icons/bs';
import { FaStar } from 'react-icons/fa';

import styles from './assets/css/commentSection.module.css';

import { RecipeData, CommentInterface } from 'interfaces/interface';

type CommentSectionProps = {
  Comment: CommentInterface;
};

export default function Comment({ Comment }: CommentSectionProps) {
  const [showReplyForm, setShowReplyForm] = useState<boolean>(false);
  const [showReplies, setShowReplies] = useState<boolean>(false);
  const [replyComment, setReplyComment] = useState<string>('');

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
    dispatch({ type: 'SET_RECIPE_DATA', payload: newRecipe });
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
    dispatch({ type: 'SET_RECIPE_DATA', payload: newRecipe });
  };

  const handleDeleteComment = (comment_id: string) => {
    if (userData === null) return;

    const confirmDelete = window.confirm(
      'Are you sure you want to delete this comment?'
    );
    if (!confirmDelete) return;

    const newComments: CommentInterface[] = [...recipeData.comments].filter(
      (item) => {
        return item.comment_id !== comment_id;
      }
    );

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
    dispatch({ type: 'SET_RECIPE_DATA', payload: newRecipe });
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
      const newComments: CommentInterface[] = [...recipeData.comments].map(
        (item) => {
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
        }
      );
      const newRecipe: RecipeData = {
        ...recipeData,
        comments: newComments,
      };

      setShowReplyForm(false);
      setReplyComment('');
      updateRecipeInDatabase(newRecipe);
      dispatch({ type: 'SET_RECIPE_DATA', payload: newRecipe });
    }
  };

  const handleDeleteReply = (reply_id: string, comment_id: string) => {
    if (userData === null) return;

    const confirmDelete = window.confirm(
      'Are you sure you want to delete this comment?'
    );
    if (!confirmDelete) return;

    const newComments: CommentInterface[] = [...recipeData.comments].map(
      (item) => {
        if (item.comment_id === comment_id) {
          return {
            ...item,
            replies: item.replies.filter(
              (reply) => reply.reply_id !== reply_id
            ),
          };
        }
        return item;
      }
    );

    const newRecipe: RecipeData = {
      ...recipeData,
      comments: newComments,
    };

    updateRecipeInDatabase(newRecipe);
    dispatch({ type: 'SET_RECIPE_DATA', payload: newRecipe });
  };

  const handleAddLikeOnReply = (reply_id: string, comment_id: string) => {
    if (userData === null) return;

    const newComments: CommentInterface[] = [...recipeData.comments].map(
      (item) => {
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
      }
    );

    const newRecipe: RecipeData = {
      ...recipeData,
      comments: newComments,
    };

    updateRecipeInDatabase(newRecipe);
    dispatch({ type: 'SET_RECIPE_DATA', payload: newRecipe });
  };

  const handleRemoveLikeOnReply = (reply_id: string, comment_id: string) => {
    if (userData === null) return;

    const newComments: CommentInterface[] = [...recipeData.comments].map(
      (item) => {
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
      }
    );

    const newRecipe: RecipeData = {
      ...recipeData,
      comments: newComments,
    };

    updateRecipeInDatabase(newRecipe);
    dispatch({ type: 'SET_RECIPE_DATA', payload: newRecipe });
  };

  return (
    <li key={Comment.comment_id}>
      {userData?.uid === Comment.user_uid ? (
        <h3 className={styles.your_comment}>Your comment</h3>
      ) : null}

      <div className={styles.comment} key={Comment.comment_id}>
        <div className={styles.commentHeader}>
          <h4>{Comment.name}</h4>
          <p>{Comment.date}</p>
        </div>
        <p className={styles.commentText}>{Comment.comment}</p>

        <div className={styles.ratingContainer}>
          {[...stars].map((star) => (
            <FaStar
              key={star}
              color={Comment.rating >= star ? '#ffc107' : '#e4e5e9'}
              size={20}
            />
          ))}
        </div>

        <div className={styles.commentIcons}>
          {userData?.uid && Comment.likes.includes(userData?.uid) ? (
            <button
              onClick={() => handleRemoveLike(Comment.comment_id)}
              type='button'
            >
              <AiFillLike />
              <p>{Comment.likes.length}</p>
            </button>
          ) : (
            <button
              onClick={() => handleAddLike(Comment.comment_id)}
              type='button'
            >
              <AiOutlineLike />
              <p>{Comment.likes.length}</p>
            </button>
          )}

          <button
            onClick={() => setShowReplyForm((prevVal) => !prevVal)}
            type='button'
          >
            <BsReply />
            <p>Reply</p>
          </button>

          <button
            onClick={() => setShowReplies((prev) => !prev)}
            className={styles.reply_button}
            type='button'
          >
            <p>{Comment.replies.length}</p>
            <FiMessageSquare />
          </button>

          {userData?.uid === Comment.user_uid ? (
            <button
              onClick={() => handleDeleteComment(Comment.comment_id)}
              className={styles.delete_button}
              type='button'
            >
              <AiOutlineDelete />
              <p>Delete</p>
            </button>
          ) : null}
        </div>
      </div>

      {showReplyForm && (
        <form
          onSubmit={(e) => handleAddReply(e, Comment.comment_id)}
          className={styles.replyFormContainer}
        >
          <div className={styles.commentInputContainer}>
            <label htmlFor='comment'>Comment:</label>
            <textarea
              id='comment'
              required
              value={replyComment}
              onChange={(event) => setReplyComment(event.target.value)}
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
      {Comment.replies.length > 0 && showReplies ? (
        <ul>
          {Comment.replies.map((reply) => (
            <li key={reply.reply_id}>
              <div className={styles.replyComment}>
                <div className={styles.commentHeader}>
                  <h4>{reply.name}</h4>
                  <p>{reply.date}</p>
                </div>
                <p className={styles.commentText}>{reply.comment}</p>
                <div className={styles.commentIcons}>
                  {userData?.uid && reply.likes.includes(userData?.uid) ? (
                    <button
                      onClick={() =>
                        handleRemoveLikeOnReply(
                          reply.reply_id,
                          Comment.comment_id
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
                        handleAddLikeOnReply(reply.reply_id, Comment.comment_id)
                      }
                      type='button'
                    >
                      <AiOutlineLike />
                      <p>{reply.likes.length}</p>
                    </button>
                  )}

                  {userData?.uid === reply.user_uid ? (
                    <button
                      className={`${styles.delete_button_reply} ${styles.delete_button}`}
                      type='button'
                      onClick={() =>
                        handleDeleteReply(reply.reply_id, Comment.comment_id)
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
      ) : null}
    </li>
  );
}
