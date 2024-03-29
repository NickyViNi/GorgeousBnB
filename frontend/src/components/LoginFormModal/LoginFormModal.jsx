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

  const handleSubmit = async (e, cred, pass) => {
    if(e.target.className.includes('disabled')) return;
    e.preventDefault();
    setErrors({});
    const data = await dispatch(sessionActions.login({ credential: cred || credential, password: pass || password }));

    if (data.errors) {
       return setErrors(data.errors.errors);
    }

    closeModal();
    // return dispatch(sessionActions.login({ credential: cred || credential, password: pass || password }))
    //   .then(() => {
    //     closeModal();
    //     if(window.location.href.includes('unauthorized')) {
    //       window.location = '/';
    //     }
    //   })
    //   .catch(async (res) => {
    //     const data = await res.json();
    //     if (data && data.errors) {
    //       setErrors(data.errors);
    //     }
    //   });
  };

  return (
    <>

      <form className='sign-in-form' >
        <h2>Log In</h2>
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
        <button disabled={credential.length < 4 || password.length <6} className={`credential-submit-btn ${credential.length < 4 || password.length < 6 ? 'disabled' : ''}`} id='log-in-btn' onClick={handleSubmit}>Log In</button>
        <div id='demo-user-btn' onClick={e => handleSubmit(e, 'daveCode', 'password1')}>Demo User</div>
        {/* {errors.credential && <p>{errors.credential}</p>}
        <button type="submit">Log In</button> */}
      </form>
    </>
  );
}

export default LoginFormModal;
