import { useRoutes } from 'react-router-dom';
import Home from './pages/Home';
import NewContact from './pages/NewContact';
import EditContact from './pages/EditContact';

export default function Router() {
  const routes = useRoutes([
    { path: process.env.REACT_APP_BASE_URL, element: <Home /> },
    { path: `${process.env.REACT_APP_BASE_URL}new`, element: <NewContact /> },
    { path: `${process.env.REACT_APP_BASE_URL}edit/:id`, element: <EditContact /> },
  ]);

  return routes;
}
