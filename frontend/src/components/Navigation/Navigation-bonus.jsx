import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton-bonus';
import './Navigation.css';
import logo from "./logo/android-chrome-192x192.png"
import CreateSpotButton from './CreateSpotButton';

function Navigation({ isLoaded }) {
  const navigate = useNavigate();
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className='header'>
      <div className='logo-container'>
        <img id='logo' src={logo} alt='Gorgeous' onClick={() => navigate('/')} />
        <span id='company-name' onClick={() => navigate('/')}>GorgeousBnB</span>
      </div>

      {isLoaded && (
        <div id='user-menu-container'>
          <CreateSpotButton user={sessionUser} />
          <ProfileButton id='profile-button' user={sessionUser} />
        </div>
      )}
    </div>
  );
}

export default Navigation;
