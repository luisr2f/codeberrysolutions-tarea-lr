import React from 'react'

const Dashboard = React.lazy(
  async () => await import('page/dashboard/Dashboard')
)
const Popular = React.lazy(async () => await import('page/popular/Popular'))

const routes = [
  { path: '/', name: 'Dashboard', element: <Dashboard /> },
  { path: '/popular', name: 'Películas más populares', element: <Popular /> },
  { path: '*', name: 'Página no encontrada' }
]

export default routes
