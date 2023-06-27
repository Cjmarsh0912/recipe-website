import { useState, useRef } from 'react';
import { useFunctionContext, useDispatchContext } from 'context/RecipeContext';

import { Link, useNavigate } from 'react-router-dom';

import styles from './assets/css/logIn.module.css';

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';

import { BiHide, BiShow } from 'react-icons/bi';

import { user } from 'interfaces/interface';

interface LoginState {
  email: string;
  password: string;
}

function Login() {
  const [state, setState] = useState<LoginState>({
    email: '',
    password: '',
  });
  const { dispatch } = useDispatchContext();

  const [emailErrorMessage, setEmailErrorMessage] = useState<string>('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>('');

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { updateUserData } = useFunctionContext();

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

  async function logIn() {
    try {
      const email: string = state.email;
      const password: string = state.password;

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const userRef = doc(db, 'users', userCredential.user?.uid);
      const userDoc = await getDoc(userRef);
      const userData = (userDoc?.data?.() as user) ?? undefined;

      if (userData !== undefined) {
        updateUserData(userData);
        dispatch({ type: 'SET_IS_SIGNED_IN', payload: true });

        alert('signed in with email: ' + userData.email);
        navigate('/recipe-website/');
      } else {
        alert('Error: no user found!');
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
        case 'auth/wrong-password':
          setPasswordErrorMessage(
            'The password you entered is incorrect. Please enter the correct password and try again.'
          );
          break;
        case 'auth/user-not-found':
          setEmailErrorMessage(
            'The email you entered is not registered. Please check your email address and try again.'
          );
          break;
        case 'auth/invalid-email':
          setEmailErrorMessage(
            'The email you entered is not in a valid format. Please enter a valid email address.'
          );
          break;
        case 'auth/user-disabled':
          setEmailErrorMessage('Your account has been disabled.');
          break;
        case 'auth/network-request-failed':
          setEmailErrorMessage(
            'There was a problem with your network connection. Please check your internet connection and try again.'
          );
          break;
        case 'auth/operation-not-allowed':
          setEmailErrorMessage(
            "Sorry, we're unable to process your request at this time. Please try again later."
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
    } else if (!validEmail || state.email === 'admin@admin.com') {
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

    await logIn();
  }

  function handleShowPassword() {
    setShowPassword((prevPassword) => !prevPassword);
  }

  return (
    <div className={styles.box}>
      <h1>Login Here</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.container}>
          <div className={styles.labelWrapper}>
            <label htmlFor='email'>Email:</label>
            <span>
              <p>Don't have an account:</p>
              <Link to='/signUp'>Sign Up</Link>
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
              placeholder='Enter your password'
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
          Log In
        </button>
      </form>
    </div>
  );
}

export default Login;
