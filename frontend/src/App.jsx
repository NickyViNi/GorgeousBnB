import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, createBrowserRouter, RouterProvider } from 'react-router-dom';
// import LoginFormPage from './components/LoginFormPage';
// import SignupFormPage from './components/SignupFormPage';
import Navigation from './components/Navigation/Navigation-bonus';
import * as sessionActions from './store/session';
import SpotList from './components/SpotList/SpotList';
import SpotDetail from './components/SpotDetail/SpotDetail';
import CreateSpotForm from './components/CreateSpotForm/CreateSpotForm';
import ManageSpotsList from './components/ManageSpots/ManageSpotsList';
import UpdateSpotForm from './components/UpdateSpotForm/UpdateSpotForm';
import { Modal } from './context/Modal';
import ManageReviews from './components/ManageReviews/ManageReviews';

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
      <Modal />
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <SpotList />
      },
      {
        path: '/spots/:spotId',
        element: <SpotDetail />
      },
      {
        path: '/spots/new',
        element: <CreateSpotForm />
      },
      {
        path: '/spots/current',
        element: <ManageSpotsList />
      },
      {
        path: 'reviews/current',
        element: <ManageReviews />
      },
      {
        path: '/spots/:spotId/edit',
        element: <UpdateSpotForm />
      },
      // {
      //   path: 'spots/:spotId/bookings',
      //   element: <h2>Create Booking Form: feature coming soon...</h2>
      // },
      {
        path: '*',
        element: <SpotList />
      }
      // {
      //   path: 'login',
      //   element: <LoginFormPage />
      // },
      // {
      //   path: 'signup',
      //   element: <SignupFormPage />
      // }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
