import React from 'react'
// import { Outlet } from 'react-router-dom'

const Dashboard = React.lazy(
  async () => await import('page/dashboard/Dashboard')
)

const routes = [
  { path: '*', name: 'Página no encontrada' },
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: <Dashboard /> }
]

export default routes
