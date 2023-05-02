import { useState, useRef } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import styles from './logIn.module.css';

import { user } from '../../interfaces/interface';

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../components/firebase';

import { BiHide, BiShow } from 'react-icons/bi';

interface LoginProps {
  updateIsSignedIn: () => void;
  updateUserData: (user: user) => void;
}

interface LoginState {
  email: string;
  password: string;
}

function Login({ updateIsSignedIn, updateUserData }: LoginProps) {
  const [state, setState] = useState<LoginState>({
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
      const userDoc = (await getDoc(userRef)).data();

      const userData: user = {
        uid: userDoc?.uid,
        email: userDoc?.email,
        bookmarks: [],
      };

      return userData;
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode + ' ' + errorMessage);
      return;
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const showErrorAnimation = (input: HTMLInputElement | null) => {
      input?.classList.remove('animate__flash');
      void input?.offsetWidth;
      input?.classList.add(
        'animate__animated',
        'animate__flash',
        `${styles.invalidInput}`
      );
    };

    const emailInput = emailRef?.current;
    const passwordInput = passwordRef?.current;

    const emailRegex = /^\S+@\S+\.\S+$/;
    const validEmail = emailRegex.test(state.email);

    emailInput?.classList.remove(`${styles.validInput}`);
    passwordInput?.classList.remove(`${styles.validInput}`);

    if (state.email === '') {
      setEmailErrorMessage('Please enter your email!');
      showErrorAnimation(emailInput);

      return;
    } else if (!validEmail) {
      setEmailErrorMessage('Please enter a valid email address!');
      showErrorAnimation(emailInput);

      return;
    } else {
      setEmailErrorMessage('');

      emailInput?.classList.remove(`${styles.invalidInput}`);
      emailInput?.classList.add(`${styles.validInput}`);
    }

    if (state.password === '') {
      setPasswordErrorMessage('Please enter your password!');
      showErrorAnimation(passwordInput);

      return;
    } else {
      setPasswordErrorMessage('');

      passwordInput?.classList.remove(`${styles.invalidInput}`);
      passwordInput?.classList.add(`${styles.validInput}`);
    }

    const user = await logIn();

    if (user !== undefined) {
      updateUserData(user);
      updateIsSignedIn();
      alert('signed in with email: ' + user.email);
      navigate('/recipe-website/');
    }
  }

  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  return (
    <div className={styles.loginBox}>
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
