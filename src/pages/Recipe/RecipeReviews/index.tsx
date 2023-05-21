import React, { useState, useContext } from 'react';
import {
  useDispatchContext,
  useStateContext,
} from '../../../Context/RecipeContext';

import styles from './recipeReviews.module.css';

import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../components/firebase';

import { v4 as uuidv4 } from 'uuid';

import { useNavigate } from 'react-router-dom';

import { AiOutlineLike, AiFillLike, AiOutlineDelete } from 'react-icons/ai';
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
  likes: string[];
  replies: {
    comment_id: string;
    user_uid: string;
    name: string;
    date: string;
    comment: string;
    rating: number;
    likes: string[];
  }[];
};

type RecipeReviewsProps = {
  recipeData: RecipeData;
  userData: user | null;
  isSignedIn: boolean;
  updateUserData: (user: user) => void;
  updateRecipe: (recipe: RecipeData) => void;
};

const RecipeReviews = ({
  recipeData,
  userData,
  isSignedIn,
  updateRecipe,
  updateUserData,
}: RecipeReviewsProps) => {
  const { state } = useStateContext();
  const [name, setName] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [rating, setRating] = useState<number>(0);
  const [tempRating, setTempRating] = useState<number>(0);

  const [showReplyForm, setShowReplyForm] = useState<string>('');
  const [replyName, setReplyName] = useState<string>('');
  const [replyComment, setReplyComment] = useState<string>('');

  const stars: number[] = [0, 1, 2, 3, 4];
  const date = new Date();

  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const handleAddLike = (comment_id: string) => {
    if (userData === null) return;

    // const newUserData: user = {
    //   ...userData,
    //   likes: [...userData.likes, comment_id],
    // };

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

    // updateUserData(newUserData);
    updateRecipe(newRecipe);
  };

  const handleRemoveLike = (comment_id: string) => {
    if (userData === null) return;

    const newLikes: string[] = userData.likes.filter((item) => {
      return item !== comment_id;
    });

    const newUserData: user = {
      ...userData,
      likes: newLikes,
    };

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

    // updateUserData(newUserData);
    updateRecipe(newRecipe);
  };

  const handleDeleteComment = async (comment_id: string) => {
    if (userData === null) return;

    const confirmDelete = window.confirm(
      'Are you sure you want to delete this comment?'
    );
    if (!confirmDelete) return;

    // const usersRef = collection(db, 'users');

    // const querySnapshot = await getDocs(usersRef);

    // const newUsers: user[] = querySnapshot.docs.map((item) => {
    //   const user: user = {
    //     email: item.data().email,
    //     bookmarks: item.data().bookmarks,
    //     uid: item.data().uid,
    //     likes: item.data().likes.filter((item: string) => {
    //       return item !== comment_id;
    //     }),
    //   };

    //   return user;
    // });

    // console.log(newUsers);

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

  const handleAddComment = (event: React.FormEvent<HTMLFormElement>) => {
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
            likes: [],
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

  const handleAddReply = (
    event: React.FormEvent<HTMLFormElement>,
    comment_id: string
  ) => {
    event.preventDefault();

    if (!isSignedIn) {
      alert('must be signed in to comment');
      setReplyName('');
      setReplyComment('');
      return;
    }

    if (userData !== null) {
      const newRecipe: RecipeData = {
        ...recipeData,
        comments: recipeData.comments.map((item) => {
          if (item.comment_id === comment_id)
            return {
              ...item,
              replies: [
                ...item.replies,
                {
                  comment: replyComment,
                  comment_id: uuidv4(),
                  date: formattedDate,
                  likes: [],
                  name: replyName,
                  rating: 0,
                  user_uid: userData.uid,
                },
              ],
            };
          return item;
        }),
      };

      setShowReplyForm('');
      setReplyName('');
      setReplyComment('');
      updateRecipe(newRecipe);
    }
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
                    <div className={styles.nameInputContainer}>
                      <label htmlFor='name'>Name:</label>
                      <input
                        type='text'
                        id='name'
                        name='name'
                        required
                        value={replyName}
                        onChange={(event) => setReplyName(event.target.value)}
                      />
                    </div>
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

                {comment.replies.length > 0 && (
                  <ul>
                    {comment.replies.map((reply) => (
                      <li key={reply.comment_id}>
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
                                // onClick={() => handleRemoveLike(comment.comment_id)}
                                type='button'
                              >
                                <AiFillLike />
                                <p>{reply.likes.length}</p>
                              </button>
                            ) : (
                              <button
                                // onClick={() => handleAddLike(comment.comment_id)}
                                type='button'
                              >
                                <AiOutlineLike />
                                <p>{reply.likes.length}</p>
                              </button>
                            )}

                            <button
                              // onClick={() =>
                              //   setShowReplyForm((prevVal) => {
                              //     if (prevVal === '') return comment.comment_id;
                              //     return '';
                              //   })
                              // }
                              type='button'
                            >
                              <BsReply />
                              <p>Reply</p>
                            </button>

                            {userData?.uid === reply.user_uid ? (
                              <button
                                // onClick={() => handleDeleteComment(comment.comment_id)}
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
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default RecipeReviews;
