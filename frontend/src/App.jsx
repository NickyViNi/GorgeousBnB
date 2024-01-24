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
        element: <h2>ManageSpotsList</h2>
      },
      {
        path: 'reviews/current',
        element: <h2>ManageReviewList</h2>
      },
      {
        path: '/spots/:spotId/edit',
        element: <h2>UpdateSpotForm</h2>
      },
      {
        path: 'spots/:spotId/bookings',
        element: <h2>CreateBookingForm</h2>
      },
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
