import { useState, useRef } from 'react';

import { Link } from 'react-router-dom';

import styles from './signUp.module.css';

import { BiHide, BiShow } from 'react-icons/bi';

interface LoginProps {}

interface SignUpState {
  email: string;
  password: string;
}

function SignUp(props: LoginProps) {
  const [state, setState] = useState<SignUpState>({
    email: '',
    password: '',
  });

  const [emailErrorMessage, setEmailErrorMessage] = useState<string>('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>('');

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
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
    const passwordRegex = /^(?=.*[A-Z]).{8,}$/;
    const validEmail = emailRegex.test(state.email);
    const validPassword = passwordRegex.test(state.password);

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
    } else if (!validPassword) {
      setPasswordErrorMessage(
        'Password must contain at least 8 Characters and 1 uppercase letter'
      );
      showErrorAnimation(passwordInput);

      return;
    } else {
      setPasswordErrorMessage('');

      passwordInput?.classList.remove(`${styles.invalidInput}`);
      passwordInput?.classList.add(`${styles.validInput}`);
    }
  }

  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  return (
    <div className={styles.loginBox}>
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
