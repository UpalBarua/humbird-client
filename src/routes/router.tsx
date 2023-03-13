import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from '../Layouts/RootLayout';
import { Signup } from '../components/Signup/Signup';
import { Signin } from '../components/Signin/Signin';
import { Profile } from '../components/Profile/Profile';
import { Home } from '../components/Home/Home';
import { PostDetails } from '../components/PostDetails/PostDetails';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'post/:id',
        element: <PostDetails />,
      },
      {
        path: 'signup',
        element: <Signup />,
      },
      {
        path: 'signin',
        element: <Signin />,
      },
    ],
  },
]);
