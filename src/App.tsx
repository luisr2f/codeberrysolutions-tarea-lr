import React, { Suspense } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'

import './App.css'

const theme = createTheme({})

const Login = React.lazy(async () => await import('page/login/Login'))

const DefaultLayout = React.lazy(
  async () => await import('layout/DefaultLayout')
)

const loading = <div className="pt-3 text-center"></div>

const App: React.FC = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Suspense fallback={loading}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<DefaultLayout />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ThemeProvider>
    </>
  )
}

export default App
