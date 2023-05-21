import { useState, useRef } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import styles from './signUp.module.css';

import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '../../components/firebase';

import { BiHide, BiShow } from 'react-icons/bi';
import { user } from '../../interfaces/interface';

interface SignUpProps {
  updateIsSignedIn: () => void;
  updateUserData: (user: user) => void;
  updateFavorites: (newFavorites: number[]) => void;
}

interface SignUpState {
  email: string;
  password: string;
}

function SignUp({
  updateIsSignedIn,
  updateUserData,
  updateFavorites,
}: SignUpProps) {
  const [state, setState] = useState<SignUpState>({
    email: '',
    password: '',
  });

  const [emailErrorMessage, setEmailErrorMessage] = useState<string>('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>('');

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const auth = getAuth();

  const showErrorAnimation = (input: HTMLInputElement | null) => {
    input?.classList.remove('animate__flash');
    void input?.offsetWidth;
    input?.classList.add(
      'animate__animated',
      'animate__flash',
      `${styles.invalidInput}`
    );
  };

  async function createAccount() {
    try {
      const email = state.email;
      const password = state.password;

      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // await sendEmailVerification(userCredentials.user);

      const userData: user | undefined = {
        uid: userCredentials.user.uid,
        email: userCredentials.user.email,
        bookmarks: [],
        likes: [],
      };

      const userRef = doc(db, 'users', userCredentials.user?.uid);
      await setDoc(userRef, {
        ...userData,
      });

      if (userData !== undefined) {
        updateUserData(userData);
        updateFavorites(userData.bookmarks);
        updateIsSignedIn();

        alert('Account Created: ' + userData.email);
        navigate('/recipe-website/');
      } else {
        alert('Error: error creating user');
      }
    } catch (error: any) {
      const errorCode = error.code;

      const emailInput = emailRef?.current;
      const passwordInput = passwordRef?.current;

      emailInput?.classList.remove(`${styles.validInput}`);
      passwordInput?.classList.remove(`${styles.validInput}`);
      showErrorAnimation(passwordInput);
      showErrorAnimation(emailInput);

      switch (errorCode) {
        case 'auth/email-already-in-use':
          setEmailErrorMessage(
            'The email you entered is already registered. Please use a different email address or try logging in with your existing account.'
          );
          break;
        case 'auth/invalid-email':
          setEmailErrorMessage(
            'The email you entered is not in a valid format. Please enter a valid email address.'
          );
          break;
        case 'auth/operation-not-allowed':
          setEmailErrorMessage(
            "Sorry, we're unable to process your request at this time. Please try again later."
          );
          break;
        case 'auth/network-request-failed':
          setEmailErrorMessage(
            'There was a problem with your network connection. Please check your internet connection and try again.'
          );
          break;
        case 'auth/user-not-found':
          setEmailErrorMessage(
            'Error sending verification email: user not found'
          );
          break;
        default:
          alert(errorCode);
      }

      return;
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const emailInput = emailRef?.current;
    const passwordInput = passwordRef?.current;

    const emailRegex = /^\S+@\S+\.\S+$/;
    const passwordRegex = /^(?=.*[A-Z]).{8,}$/;
    const validEmail = emailRegex.test(state.email);
    const validPassword = passwordRegex.test(state.password);

    setEmailErrorMessage('');
    setPasswordErrorMessage('');

    emailInput?.classList.remove(
      `${styles.validInput}`,
      `${styles.invalidInput}`
    );
    passwordInput?.classList.remove(
      `${styles.validInput}`,
      `${styles.invalidInput}`
    );

    if (state.email === '') {
      setEmailErrorMessage('Please enter your email.');
      showErrorAnimation(emailInput);

      return;
    } else if (!validEmail) {
      setEmailErrorMessage('Please enter a valid email address.');
      showErrorAnimation(emailInput);

      return;
    } else {
      setEmailErrorMessage('');

      emailInput?.classList.remove(`${styles.invalidInput}`);
      emailInput?.classList.add(`${styles.validInput}`);
    }

    if (state.password === '') {
      setPasswordErrorMessage('Please enter your password.');
      showErrorAnimation(passwordInput);

      return;
    } else if (!validPassword) {
      setPasswordErrorMessage(
        'Password must contain at least 8 Characters and 1 uppercase letter.'
      );
      showErrorAnimation(passwordInput);

      return;
    } else {
      setPasswordErrorMessage('');

      passwordInput?.classList.remove(`${styles.invalidInput}`);
      passwordInput?.classList.add(`${styles.validInput}`);
    }

    await createAccount();
  }

  function handleShowPassword() {
    setShowPassword((prevPassword) => !prevPassword);
  }

  return (
    <div className={styles.box}>
      <h1>Sign Up Here</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.container}>
          <div className={styles.labelWrapper}>
            <label htmlFor='email'>Email:</label>
            <span>
              <p>Already have an account:</p>
              <Link to='/login'>Log In</Link>
            </span>
          </div>
          <div className={styles.emailInputContainer} ref={emailRef}>
            <input
              type='text'
              id='email'
              name='email'
              placeholder='Enter your email'
              ref={emailRef}
              value={state.email}
              onChange={(event) =>
                setState({
                  ...state,
                  email: event.target.value,
                })
              }
            />
          </div>
          <span className={styles.errorMessage}>{emailErrorMessage}</span>
        </div>
        <div className={styles.container}>
          <label htmlFor='password'>Password:</label>
          <div ref={passwordRef} className={styles.passwordInputContainer}>
            <input
              type={showPassword ? 'text' : 'password'}
              id='password'
              name='password'
              placeholder='Must be at least 8 characters'
              value={state.password}
              autoComplete='off'
              onChange={(event) =>
                setState({
                  ...state,
                  password: event.target.value,
                })
              }
            />
            <button
              type='button'
              className={styles.showPasswordButton}
              onClick={handleShowPassword}
            >
              {showPassword ? <BiHide /> : <BiShow />}
            </button>
          </div>
          <span className={styles.errorMessage}>{passwordErrorMessage}</span>
        </div>
        <button type='submit' className={styles.loginButton}>
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignUp;
