import { createBrowserRouter } from 'react-router-dom';
import { Error } from '../pages/Error';
import { Layout } from '../pages/Layout';
import { Home } from '../pages/Home';
import { Transactions, transactionAction, transactionLoader } from '../pages/Transactions';
import { Categories, categoriesAction, categoriesLoader } from '../pages/Categories';
// import { Categories, categoriesLoader } from '../pages/Categories';
import { Auth } from '../pages/Auth';
import { ProtectedRoute } from '../components/ProtectedRoute';
// import { categoriesAction } from '../pages/categoriesAction';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'transactions',
        action: transactionAction,
        loader: transactionLoader,
        element: (
          <ProtectedRoute>
            <Transactions />
          </ProtectedRoute>
        )
      },
      {
        path: 'categories',
        action: categoriesAction,
        loader: categoriesLoader,
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        )
      },
      {
        path: 'auth',
        element: <Auth />
      },
    ]
  }
]);
