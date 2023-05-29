import { useState, useRef } from 'react';
import { useFunctionContext, useDispatchContext } from 'context/RecipeContext';

import { Link, useNavigate } from 'react-router-dom';

import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth';
import {
  setDoc,
  doc,
  getDocs,
  where,
  query,
  collection,
} from 'firebase/firestore';
import { db } from 'components/firebase';

import { BiHide, BiShow } from 'react-icons/bi';

import styles from './assets/css/signUp.module.css';

import { user } from 'interfaces/interface';

function SignUp() {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [step, setStep] = useState<number>(1);

  const [usernameErrorMessage, setUsernameErrorMessage] = useState<string>('');
  const [emailErrorMessage, setEmailErrorMessage] = useState<string>('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>('');

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const { updateUserData } = useFunctionContext();
  const { dispatch } = useDispatchContext();

  const handleNext = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const usernameInput = usernameRef?.current;
    const emailInput = emailRef?.current;

    const usernameRegex = /^[a-zA-Z0-9]{5,20}$/;
    const emailRegex = /^\S+@\S+\.\S+$/;
    const validUsername = usernameRegex.test(username);
    const validEmail = emailRegex.test(email);

    setUsernameErrorMessage('');
    setEmailErrorMessage('');

    usernameInput?.classList.remove(
      `${styles.validInput}`,
      `${styles.invalidInput}`
    );
    emailInput?.classList.remove(
      `${styles.validInput}`,
      `${styles.invalidInput}`
    );

    if (username === '') {
      setUsernameErrorMessage('Please enter a username.');
      showErrorAnimation(usernameInput);

      return;
    } else if (!validUsername) {
      setUsernameErrorMessage(
        'Username must be between 5 and 20 characters with letters and numbers only.'
      );
      showErrorAnimation(usernameInput);

      return;
    } else if (
      username.toLowerCase() === 'admin' ||
      username.toLowerCase() === 'guest' ||
      username.toLowerCase() === 'support'
    ) {
      setUsernameErrorMessage('Username invalid.');
      showErrorAnimation(usernameInput);

      return;
    } else {
      setUsernameErrorMessage('');

      usernameInput?.classList.remove(`${styles.invalidInput}`);
      usernameInput?.classList.add(`${styles.validInput}`);
    }

    if (email === '') {
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

    const usernameExists = await checkIfUsernameExists(username);
    if (usernameExists) {
      usernameInput?.classList.remove(`${styles.validInput}`);

      setUsernameErrorMessage(
        'Username already exists. Please choose a different username or sign in with your existing account.'
      );
      showErrorAnimation(usernameInput);

      return;
    }
    const emailExists = await checkIfEmailExists(email);
    if (emailExists) {
      emailInput?.classList.remove(`${styles.validInput}`);

      setEmailErrorMessage(
        'Email already exists. Please choose a different email or sign in with your existing account.'
      );
      showErrorAnimation(emailInput);

      return;
    }

    async function checkIfEmailExists(email: string) {
      const docRef = collection(db, 'users');
      const q = query(docRef, where('email', '==', email));

      const snapshot = await getDocs(q);

      return !snapshot.empty;
    }

    async function checkIfUsernameExists(username: string) {
      const docRef = collection(db, 'users');
      const q = query(docRef, where('username', '==', username));

      const snapshot = await getDocs(q);

      return !snapshot.empty;
    }

    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  function handleShowPassword() {
    setShowPassword((prevPassword) => !prevPassword);
  }

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
        username: username,
      };

      const userRef = doc(db, 'users', userCredentials.user?.uid);
      await setDoc(userRef, {
        ...userData,
      });

      if (userData !== undefined) {
        updateUserData(userData);
        dispatch({ type: 'SET_FAVORITES', payload: [] });
        dispatch({ type: 'SET_IS_SIGNED_IN', payload: true });

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

    const passwordInput = passwordRef?.current;

    const passwordRegex = /^(?=.*[A-Z]).{8,}$/;
    const validPassword = passwordRegex.test(password);

    setEmailErrorMessage('');
    setPasswordErrorMessage('');

    passwordInput?.classList.remove(
      `${styles.validInput}`,
      `${styles.invalidInput}`
    );

    if (password === '') {
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

  return (
    <div className={styles.box}>
      <h1>Sign Up</h1>
      {step === 1 && (
        <form onSubmit={handleNext}>
          <div className={styles.container}>
            <label htmlFor='username'>Username:</label>
            <div ref={usernameRef} className={styles.usernameInputContainer}>
              <input
                type='text'
                id='username'
                name='username'
                placeholder='Enter a username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <span className={styles.errorMessage}>{usernameErrorMessage}</span>
          </div>
          <div className={styles.container}>
            <label htmlFor='email'>Email:</label>
            <div ref={emailRef} className={styles.emailInputContainer}>
              <input
                type='text'
                id='email'
                name='email'
                placeholder='Enter your email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <span className={styles.errorMessage}>{emailErrorMessage}</span>
          </div>
          <button className={styles.loginButton} type='submit'>
            Next
          </button>
        </form>
      )}
      {step === 2 && (
        <form onSubmit={handleSubmit}>
          <div className={styles.container}>
            <label htmlFor='password'>Password:</label>
            <div ref={passwordRef} className={styles.passwordInputContainer}>
              <input
                type={showPassword ? 'text' : 'password'}
                id='password'
                name='password'
                placeholder='Must be at least 8 characters'
                autoComplete='off'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
          <div className={styles.buttonGroup}>
            <button
              className={styles.loginButton}
              type='button'
              onClick={handleBack}
            >
              Back
            </button>
            <button className={styles.loginButton} type='submit'>
              Sign Up
            </button>
          </div>
        </form>
      )}
      <p className={styles.note}>
        Step {step} of 2. Already have an account?{' '}
        <Link to='/login'>Log in</Link>
      </p>
    </div>
  );
}

export default SignUp;
