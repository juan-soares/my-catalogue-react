import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomeScreen from '../screens/Home';
import LoginScreen from '../screens/Login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeScreen />
  },
  {
    path: '/login',
    element: <LoginScreen />
  }
]);

export default function Routes() {
  return <RouterProvider router={router} />;
}
