import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './LoginForm.css';

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e, cred, pass) => {
    if(e.target.className.includes('disabled')) return;
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential: cred || credential, password: pass || password }))
      .then(() => {
        closeModal();
        if(window.location.href.includes('unauthorized')) {
          window.location = '/';
        }
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  return (
    <>

      <form className='sign-in-form' onSubmit={handleSubmit}>
        <h1>Log In</h1>
        <div className='credential-errors'>{errors.credential}</div>
        <label>
          Username or Email
        </label>
        <input
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
        />
        <label>
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className={`credential-submit-btn red-btn ${credential.length < 4 || password < 6 ? 'disabled' : ''}`} id='log-in-btn' onClick={handleSubmit}>Log In</button>
        <button id='demo-user-btn' onClick={e => handleSubmit(e, 'daveCode', 'password1')}>Demo User</button>
        {/* {errors.credential && <p>{errors.credential}</p>}
        <button type="submit">Log In</button> */}
      </form>
    </>
  );
}

export default LoginFormModal;
