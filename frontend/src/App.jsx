import React from 'react'
import './App.css'
import Login from './pages/Login'
import Error from './pages/Error'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'
import TransactionForm from './components/TransactionForm'
import Transactions from './pages/Transactions'
import Profile from './pages/Profile'
import Home from './pages/Home'
import EditTransaction from './components/EditTransaction'

const App = () => {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      ),
      errorElement: <Error />
    },
    {
      path: "login",
      element: <Login />,
      errorElement: <Error />
    },
    {
      path: "signup",
      element: <Signup />,
      errorElement: <Error />
    },
    {
      path: "dashboard",
      element: (
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      ),
      errorElement: <Error />,
    },
    {
      path: "transactionForm",
      element: (
        <ProtectedRoute>
          <TransactionForm />
        </ProtectedRoute>
      ),
      errorElement: <Error />,
    },
    {
      path: "transactions",
      element: (
        <ProtectedRoute>
          <Transactions />
        </ProtectedRoute>
      ),
      errorElement: <Error />,
    },
    {
      path: "profile",
      element: (
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      ),
      errorElement: <Error />,
    },
    {
      path: "editTransaction/:id",
      element: <EditTransaction />,
      errorElement: <Error />,
    },
  ])

  return <RouterProvider router={routes} />
}

export default App
