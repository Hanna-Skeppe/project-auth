import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { login } from '../reducers/user';
import { SignUpForm } from './SignUpForm';
import { Button } from './Button';
import '../styles/style.css';

export const LoginForm = () => {
  const dispatch = useDispatch();
  const errorMessage = useSelector(store => store.user.login.errorMessage);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(login(email, password));
    setEmail('');
    setPassword('');
  };

  const handleSetLogin = event => {
    event.preventDefault();
    setIsLogin(false);
  };

  return (
    <main className="main-container">
      {!isLogin ? (
        <SignUpForm />
      ) : (
        <>
          <form className="content" onSubmit={handleSubmit}>
            <div className="form-text-input-fields">
              <label>
                <input
                  className="text-input-field"
                  required
                  type="email"
                  value={email}
                  placeholder="email@email.com"
                  onChange={event => setEmail(event.target.value)}
                ></input>
              </label>
              <label>
                <input
                  className="text-input-field"
                  required
                  type="password"
                  value={password}
                  placeholder="password"
                  onChange={event => setPassword(event.target.value)}
                ></input>
              </label>
            </div>
            <div className="form-buttons">
              <Button
                className={
                  !email || password.length < 5
                    ? 'form-button-disabled'
                    : 'form-button'
                }
                type="submit"
                disabled={!email || password.length < 5}
                text="Login"
              />
              {errorMessage && (
                <p className="text-info error">{errorMessage}</p>
              )}
              <button className="link-button" onClick={handleSetLogin}>
                <span className="link-button-text">
                  Not a member? Sign up here
                </span>
              </button>
            </div>
          </form>
        </>
      )}
    </main>
  );
};
