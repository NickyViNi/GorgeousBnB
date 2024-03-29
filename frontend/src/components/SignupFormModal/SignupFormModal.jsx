import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as sessionActions from '../../store/session';
import './SignupForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});

      const data = await dispatch(sessionActions.signup({email, username, firstName, lastName, password}));
      if (data.errors) {
        return setErrors(data.errors.errors);
      }

      closeModal();

      // return dispatch(
      //   sessionActions.signup({
      //     email,
      //     username,
      //     firstName,
      //     lastName,
      //     password
      //   })
      // )
      //   .then(closeModal)
      //   .catch(async (res) => {
      //     const data = await res.json();
      //     if (data?.errors) {
      //       setErrors(data.errors);
      //     }
      //   });
    }

    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });

  };

  const emptyFieldCheck = () => {
    return email.trim().length === 0 || username.trim().length < 4 || firstName.trim().length === 0 || lastName.trim().length === 0 || password.trim().length < 6 || confirmPassword.trim().length < 6;
  }

  return (
    <>
      <form className='sign-up-form' onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <label id='email'>
          Email {errors.email && <div className='error'>{errors.email}</div>}
        </label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>
          Username {errors.username && <div>{errors.username}</div>}
        </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        <label>
          First Name {errors.firstName && <div>{errors.firstName}</div>}
        </label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <label>
          Last Name {errors.lastName && <div>{errors.lastName}</div>}
        </label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <label>
          Password {errors.password && <div>{errors.password}</div>}
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label>
          Confirm Password {errors.confirmPassword && <div>{errors.confirmPassword}</div>}
        </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        <button id='sign-up-btn' onClick={handleSubmit} type="submit" disabled={emptyFieldCheck()} className={`red-btn ${emptyFieldCheck() ? 'disabled' : ''}` }>Sign Up</button>
      </form>
    </>
  );
}

export default SignupFormModal;
