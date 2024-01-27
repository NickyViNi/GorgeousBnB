import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  //Log Out from current user and navigate to home page:
  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    navigate('/');
  };

  //navigate to manage spots page:
  const navigateToManageSpots = () => {
    closeMenu();
    navigate('/spots/current');
  }

  //navigate to manage reviews page:
  // const navigateToManageReviews = () => {
  //   closeMenu();
  //   navigate('/reviews/current');
  // }

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <div>
      <button id='profile-button' onClick={toggleMenu}>
        <i id='menu-bar' className='fas fa-bars'></i>
        <i id='profile-icon' className="fas fa-user-circle fa-lg" />
      </button>

      <div id='dropdown-menu' className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <div>Hello, {user.firstName}</div>
            <div>{user.email}</div>

            <div className='menu-separator'></div>
            <div id='manage-spots-div' onClick={navigateToManageSpots}>Manage Spots</div>
            <div id='manage-reviews-div' onClick={() => alert('Feature Coming Soon...')}>Manage Reviews</div>
            {/* <div id='manage-reviews-div' onClick={navigateToManageReviews}>Manage Reviews</div> */}
            <div className='menu-separator'></div>

            <div>
              <button id='logout-button' onClick={logout}>Log Out</button>
            </div>
          </>
        ) : (
          <>
            <div className='sign-up-menu'>
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </div>
            <div className='log-in-menu'>
              <OpenModalMenuItem
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ProfileButton;
