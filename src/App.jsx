import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import UserList from './pages/UserList';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <UserList />,
    }
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App
